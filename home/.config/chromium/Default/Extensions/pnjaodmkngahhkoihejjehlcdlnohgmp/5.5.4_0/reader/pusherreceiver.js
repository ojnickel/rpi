var PUSHER_MISSING_TIME = 5 * 60 * 1000;
var PUSHER_RECONNECT_TIME = 30 * 1000;

var PusherReceiver = Class.extend({
  initialize: function(app) {
    this.app = app;
    this.app.events.subscribe("online:socketToken", this.didGetSocketToken);
    this.app.events.subscribe("feeds:recount", this.feedsDidRecount);

    // Wait 2.5 seconds before calling force update
    this.debouncedWaitUpdate = debounce(this.triggerNewPostFetch, 2500);

    // This is called whenever the socket re-connects, to get a fresh count of unreads and make sure our reference frame is correct
    this.longDebouncedWaitUpdate = debounce(this.debouncedWaitUpdate, PUSHER_RECONNECT_TIME);

    // Poll every 5 minutes if we miss something
    this.fallbackPollingTimer = setInterval(this.debouncedWaitUpdate, PUSHER_MISSING_TIME);
  },

  destroy: function(callback) {
    this.app.events.unsubscribe("online:socketToken", this.didGetSocketToken);
    this.clearInterval(this.fallbackPollingTimer);
    fireCallback(callback);
  },

  didGetSocketToken: function(message) {
    if (this.currentToken === message.token || !message.token) {
      return;
    }

    this.currentToken = message.token;
    this.connect();
  },

  connect: function() {
    if (!this.currentToken) {
      console.error("PusherReceiver.connect called before currentToken set");
      return;
    }

    if (this.socket) {
      this.socket.destroy();
    }

    this.socket = io(Config.feeder.pusherURL, {
      query: {
        token: this.currentToken
      }
    });
    this.socket.on("connect", this.didConnect);
    this.socket.on("disconnect", this.didDisconnect);
    this.socket.on("feedupdated", this.newMessageReceived);
    this.socket.on("feeds:recount", this.feedsRecountReceived);
  },

  newMessageReceived: function(message) {
    console.log("[pusher] got message", message);
    this.debouncedWaitUpdate();
  },

  didConnect: function() {
    app.socketIsConnected = true;
    console.log("[pusher]: did connect");
    this.longDebouncedWaitUpdate();
  },

  didDisconnect: function() {
    app.socketIsConnected = false;
    console.log("[pusher]: did disconnect");
  },

  triggerNewPostFetch: function() {
    if (app.user.isPro()) {
      this.app.poller.forceUpdate();
    }
  },

  feedsDidRecount: function(msg) {
    if (!this.app.socketIsConnected) {
      return;
    }

    if (!msg.manual) {
      return;
    }

    if (msg.total == this.lastBroadcastedUnreads) {
      return;
    }

    this.lastBroadcastedUnreads = msg.total;
    this.lastBroadcastTime = Date.now();

    console.log("[pusher] Unreads updated");

    this.socket.emit("feeds:recount", {
      counts: app.user.unreads.unreadCounts,
      broadCastId: this.lastBroadcastTime
    });
  },

  feedsRecountReceived: function(msg) {
    if (msg.broadCastId == this.lastBroadcastTime) {
      console.log("(got message but ignored)")
      return;
    }

    console.log("[pusher] Update counts", msg.counts);

    app.user.unreads.unreadCounts = msg.counts;
    app.events.send("feeds:recount", {
      total: app.user.unreads.countStored(),
      manual: false
    });
  }
});
