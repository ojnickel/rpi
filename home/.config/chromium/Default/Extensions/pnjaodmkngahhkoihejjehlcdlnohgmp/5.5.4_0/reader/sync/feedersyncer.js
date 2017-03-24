"use strict";

var FEEDER_SYNCER_CHECK_TIMER_INTERVAL = 60 * 60 * 1000;

var FeederSyncer = Syncer.extend({
	startListening: function() {
		this._super.apply(this, arguments);

		app.events.subscribe("feeder:connect", this.receivedConnectRequest);
		app.events.subscribe("feeder:fetchFeeds", this.receivedFetchFeedsRequest);
		app.events.subscribe("feeder:statusMightHaveChanged", this.checkToken);

		this.checkResponse = {};

		this.checkToken();
		this.checkTokenTimer = setInterval(this.checkToken, FEEDER_SYNCER_CHECK_TIMER_INTERVAL);

		if (Ext.isSafari()) {
			safari.extension.addContentScriptFromURL(Ext.path("content/feeder_api.js"), ["http://*.feeder.co/*", "https://*.feeder.co/*"], [], true);
    }
	},

	destroy: function() {
		this._super.apply(this, arguments);

		app.events.unsubscribe("feeder:connect", this.receivedConnectRequest);
		app.events.unsubscribe("feeder:fetchFeeds", this.receivedFetchFeedsRequest);
		app.events.unsubscribe("feeder:statusMightHaveChanged", this.checkToken);
		clearInterval(this.checkTokenTimer);

		if (Ext.isSafari()) {
			safari.extension.removeContentScriptFromURL(Ext.path("content/feeder_api.js"));
    }
	},

	uninstall: function(callback) {
		var oldToken = app.user.preferences.get("feeder:token");

		var removeTokenRequest = new Request({
			url: Config.feeder.destroyTokenURL,
			method: "POST"
		});

		removeTokenRequest.send({
			post: {
				client_id: app.user.preferences.get("client_id"),
				token: oldToken
			}
		});

		this.removeProPreferences();

		app.sync.removeSyncer("online");

		chain(app.user.moveToLocalDatabase)
		.and(app.user.reloadFeeds)
		.and(app.sync.reloadSyncers)
		.andSync(function() {
			app.events.send("feeder:expiredChanged");
		})
		.end(callback);
	},

	removeProPreferences: function() {
		app.user.preferences.remove("feeder:token");
		app.user.preferences.remove("feeder:email");
		app.user.preferences.remove("feeder:intercom_hash");
		app.user.preferences.remove("feeder:intercom_app_id");
	},

	receivedConnectRequest: function(evt) {
		var connectURL = evt.connectURL;
		this.doMerge = evt.doMerge;

		var clientId = app.user.preferences.get("client_id");

		var req = new Request({
			url: connectURL,
			onComplete: this.connectRequestComplete.andArguments(evt.tab)
		});

		req.send({
			get: {
				client_id: clientId
			}
		});
	},

	connectRequestComplete: function(status, text, xml, tab) {
		var resp = tryToParseJSON(text);

		if (!resp || resp.error || !resp.token) {
			return alert(resp.error || "Could not connect to Feeder account");
		}
		this.receivedToken(resp.token, resp.email);
		this.syncFeeds(this.connectDone.withArguments(tab, resp.redirect));
	},

	connectDone: function(tab, redirect) {
		UI.tabChangeURL(tab, redirect)
		app.events.send("feeder:connected");
	},

	receivedToken: function(token, email) {
		app.user.preferences.set("feeder:token", token);
		app.user.preferences.set("feeder:email", email);
	},

	checkToken: function(callback) {
		var token = app.user.preferences.get("feeder:token");
		var clientId = app.user.preferences.get("client_id");

		if (!token && !Ext.isOnline()) {
			return fireCallback(callback, false);
		}

		var req = new Request({
			url: app.config.feeder.checkURL,
			onComplete: this.checkedToken.withCallback(callback)
		});

		req.send({
			get: {
				token: token || "",
				client_id: clientId
			}
		});
	},

	checkedToken: function(status, responseText, responseXML, callback) {
		app.user.proExpired = false;

		var response = tryToParseJSON(responseText);
		this.checkResponse = response || {};

		if (response && response.is_pro) {
			app.user.preferences.set("feeder:email", response.email);
			app.user.preferences.set("feeder:id", response.user_id);
			app.user.preferences.set("feeder:intercom_hash", response.intercom_hash);
			app.user.preferences.set("feeder:intercom_app_id", response.intercom_app_id);
			fireCallback(callback, true);
		} else if (response && response.expired) {
			app.user.proExpired = true;
			fireCallback(callback, false);
		} else if (response && response.no_pro_for_token) {
			this.removeProPreferences();
			app.user.switchToLocalDatabase();
			console.error(response, "indicated invalid feeder token");
		} else {
			app.events.send("feeder:connected");
			fireCallback(callback, false);
		}

		app.events.send("feeder:expiredChanged");
	},

	syncFeeds: function(callback) {
		var opml = ExportImport.Export.exportFeeds();
		var importer = new ExportImport.Import(opml);

		var unreads = ExportImport.Export.exportUnreads();

		chain(ExportImport.Export.exportUnreads)
		.thenSync(function(unreadContainer) {
			app.sync.get("feeder").unreadContainer = unreadContainer;
		})
		.and(app.user.moveToAPIDatabase)
		.and(app.sync.addOnline)
		.and(app.user.hasFeeds() && this.doMerge ? importer.load : function(next) { next(true); })
		.thenSync(function(success) {
			if ( ! success )
				alert("There was a problem syncing your feeds");
		})
		.and(this.doMerge ? this.syncUnreads : function(next) { next(true); })
		.thenSync(function(success) {
			if ( ! success )
				alert("There was a problem syncing your feeds")
		})
		.and(app.user.unreads.forceCount)
		.end(callback);
	},

	syncUnreads: function(callback) {
		var data = this.unreadContainer.toJSON();

		// Reroute request to API
		var request = new Request({
			method: 'POST',
			url: OnlineSyncer.path('/api/sync-posts-of-interest.json'),
			onComplete: this.syncUnreadsComplete.withCallback(callback),
			addFeederAuthorization: true
		});

		request.send({post: {feeds: data}});
	},

	syncUnreadsComplete: function(status, text, xml, callback) {
		callback(status == 200);
	},

	processFeed: function(feed, callback) { fireCallback(callback); },
	preferencesChanged: function(callback) { fireCallback(callback); },
	feedAdded: function(evt, callback) { fireCallback(callback); },
	feedUpdated: function(evt, callback) { fireCallback(callback); },
	feedRemoved: function(evt, callback) { fireCallback(callback); },
	postUpdated: function(evt, callback) { fireCallback(callback); },
	folderUpdated: function(evt, callback) { fireCallback(callback); },
	folderAdded: function(evt, callback) { fireCallback(callback); },
	folderRemoved: function(evt, callback) { fireCallback(callback); },
	fetchUpstream: function(callback) { fireCallback(callback); },

	pushUp: function(order, callback) { fireCallback(callback); },

	getEmail: function() {
		return app.user.preferences.get("feeder:email");
	},

	receivedFetchFeedsRequest: function(evt) {
		var container = app.user.structure.base.toContainer().toJSON();
		app.events.send("feeder:feedsFetched", {feeds: container});
	},

	loginToPro: function(data, callback) {
		var request = new Request({
			method: "POST",
			contentType: "json",
			url: OnlineSyncer.path("/1/session.json"),
			onComplete: function(status, text, xml) {
				var resp = tryToParseJSON(text) || {};
				var token = resp.session && resp.session.token;
				if (token) {
					this.receivedToken(token, data.email);

					chain(this.syncFeeds)
					.and(this.checkToken)
					.end(function() {
						app.events.send("feeder:connected");
						callback(true, false);
					});
				} else {
					callback(false, resp.errors);
				}
			}.bind(this)
		});

		data.client_id = app.user.preferences.get("client_id");
		request.send({
			post: {
				session: data
			}
		});
	},

	signupToPro: function(data, callback) {
		var request = new Request({
			method: "POST",
			contentType: "json",
			url: OnlineSyncer.path("/1/user.json"),
			onComplete: function(status, text, xml) {
				var resp = tryToParseJSON(text) || {};
				if (resp.session) {
					this.receivedToken(resp.session.token, data.email);

					chain(this.syncFeeds)
					.and(this.checkToken)
					.end(function() {
						app.events.send("feeder:connected");
						callback(true, false);
					});
				} else {
					callback(false, resp.errors);
				}
			}.bind(this)
		});

		data.client_id = app.user.preferences.get("client_id");

		request.send({
			post: {
				user: data
			}
		});
	},

  downgradeToLite: function(callback) {
		app.user.setDidChooseToUseBasic(true);

    var proFeeds = {};
    var proFolders = {};
    var proStarred = {};
    var proUnread = {};

    var localFeeds = {};
    var localFolders = {};
    var localStarred = {};
    var localUnread = {};

    // list all feeds
    chain(Mapper.get("feed").find, {}, {})
    .thenSync(function(feeds) {
      console.log("1. feeds", feeds);
      if (!feeds) {
        callback(false);
        return chain.exit;
      }

      feeds.forEach(function(feed) {
        proFeeds[feed.id] = feed.getValues();
      });
    })
    // list all folders
    .and(Mapper.get("folder").find, {}, {})
    .thenSync(function(folders) {
      console.log("2. folders", folders);
      if (!folders) {
        callback(false);
        return chain.exit;
      }

      folders.forEach(function(folder) {
        proFolders[folder.id] = folder.getValues();
      });
    })
    // list all starred
    .and(Mapper.get("post").find, {is_starred: 1}, {limit: 1000})
    .thenSync(function(posts) {
      console.log("3. starred", posts);
      if (!posts) {
        callback(false);
        return chain.exit;
      }

      posts.forEach(function(post) {
        proStarred[post.id] = post.getValues();
      });
    })
    // list all unread
    .and(Mapper.get("post").find, {is_read: 0}, {limit: 1000})
    .thenSync(function(posts) {
      console.log("4. unreads", posts);

      if (!posts) {
        callback(false);
        return chain.exit;
      }

      posts.forEach(function(post) {
        proUnread[post.id] = post.getValues();
      });
    })

    // switch database
    .and(app.user.moveToLocalDatabase)
    .and(app.user.truncateAll)

    // add feeds, map ids
    .and(function(next) {
      console.log("5. add feeds");

      var queue = chain();
      Object.keys(proFeeds).forEach(function(feedId) {
        var localFeed = new Feed();
        localFeed.copyPropertiesFrom(proFeeds[feedId]);
        delete localFeed.id;
        localFeed.quirks = "";
        localFeed.type = "rss";
				localFeed.guid = localFeed.path;

        queue.and(localFeed.save)
        .thenSync(function(res) {
          localFeeds[feedId] = localFeed;
        });
      });
      queue.end(next);
    })
    // add folders with remapped ids
    .and(function(next) {
      console.log("6. add folders");

      var queue = chain();
      Object.keys(proFolders).forEach(function(folderId) {
        var localFolder = new Folder();
        localFolder.copyPropertiesFrom(proFolders[folderId]);
        delete localFolder.id;

        localFolder.orderstring = "";
        queue.and(localFolder.save)
        .thenSync(function(res) {
          localFolders[folderId] = localFolder;
        });
      });
      queue.end(next);
    })
    // remap folder ids
    .and(function(next) {
      console.log("7. remap folders");

      var queue = chain();
      Object.keys(proFolders).forEach(function(folderId) {
        var proFolder = proFolders[folderId];
        var localFolder = localFolders[folderId];

        localFolder.orderstring = (proFolder.orderstring || "").split(",").map(function(str) {
          var pieces = str.split(":");
          if (pieces.length != 2) {
            return false;
          }

          var id = false;
          if (pieces[0] === "f") {
            id = localFeeds[pieces[1]] && localFeeds[pieces[1]].id;
          } else if (pieces[0] === "d") {
            id = localFolders[pieces[1]] && localFolders[pieces[1]].id;
          }

          if (!id) {
            return false;
          }

          return [pieces[0], id].join(":");
        }).filter(function(a) { return !!a; }).join(",");

        queue.and(localFolder.save);
      });
      queue.end(next);
    })
    // add all starred with remapped feed id
    .and(function(next) {
      console.log("8. add starred");

      var queue = chain();
      Object.keys(proStarred).forEach(function(postId) {
        var localPost = new Post();
        localPost.copyPropertiesFrom(proStarred[postId]);
        delete localPost.id;

				localPost.published = localPost.published * 1000;

        localPost.feed_id = localFeeds[proStarred[postId].feed_id] && localFeeds[proStarred[postId].feed_id].id;
        if (!localPost.feed_id) {
          return;
        }

        queue.and(localPost.save);
      });
      queue.end(next);
    })
    // add all unread with remapped feed id
    .and(function(next) {
      console.log("8. add unread");

      var queue = chain();
      Object.keys(proUnread).forEach(function(postId) {
        var localPost = new Post();
        localPost.copyPropertiesFrom(proUnread[postId]);
        delete localPost.id;

				localPost.published = localPost.published * 1000;

        localPost.feed_id = localFeeds[proUnread[postId].feed_id] && localFeeds[proUnread[postId].feed_id].id;
        if (!localPost.feed_id) {
					debugger
          return;
        }

        queue.and(localPost.save);
      });
      queue.end(next);
    })
    .andSync(function() {
      this.removeProPreferences();
    }.bind(this))
    .and(app.user.reloadDB)
    .andSync(function() {
      app.user.forEachFeed(function(feed) {
        feed.allReadOnNextCrawl = true;
      });
    })
		.then(app.poller.forceUpdate)
		.andSync(function() {
			delete app.user.proExpired;
		})
    .end(callback);
  }
});
