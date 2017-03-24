Screen.Settings = Controller.extend({
	template: 'screen#settings',

	events: {
		'click .done': 'done',
		'click .connected-to-feeder-pro .remove-subscription': 'disconnectFeederPro',
		'click #open-external': 'openExternal',
		'change .tpl-box-switch-theme input[type=radio]': 'switchTheme',
		'change .tpl-box-social-feeder .tpl-follow-button': 'followFeederChanged',
		'click #social-bar a': 'openSocialLink'
	},

	inAppURL: function() {
	  return ["global-settings"];
	},

	start: function() {
		this.template.set('title', _('Global settings'));

		this.ui.updateInterval.min = 1;
		this.ui.updateInterval.max = 60;
		PUI.UpdateInterval.applyForUserAndSlider(app.user, this.ui.updateInterval);

		this.ui.postsDisplay.min = 5;
		this.ui.postsDisplay.max = 80;

		this.containerElement = this.template.element.find('.tpl-box-global-settings');

		this.initFeederProConnect();

		this.ui.followFeeder.set(!!app.store.feedBy("path", app.config.feederBlog));

		this.vc.listener.listen("feeder:connected", this.initFeederProConnect);

		app.user.preferences.allThemes.forEach(this.addTheme);
	},

	destroy: function() {
		this._super();
		this.vc.listener.unlisten("feeder:connected", this.initFeederProConnect);
	},

	addTheme: function(theme) {
		var item = this.template.addItem('themes', theme);
		if (this.isSelected(theme.identifier)) {
			$(item.element).find("input[type=radio]").attr("checked", true);
		}
	},

	initFeederProConnect: function() {
		if (app.user.isPro()) {
			this.template.element.find('.support-us-button').hide();

			this.template.element.find('.connected-to-feeder-pro').css('display', '');
			this.template.element.find('.connect-feeder-pro').hide();

			this.template.set('feeder-pro-email', app.sync.get("feeder").getEmail());
		} else {
			this.template.element.find('.support-us-button').css('display', '');

			this.template.element.find('.connected-to-feeder-pro').hide();
			this.template.element.find('.connect-feeder-pro').css('display', '');
		}
	},

	reloadServices: function() {
		reloadProClasses();
		this.initFeederProConnect();
	},

	isSelected: function(ident) {
		return app.user.preferences.get("activeTheme") == ident;
	},

	onVisible: function() {
		this.monitor({
			'globalNotifications': 'global:notifications',
			'globalSoundNotifications': 'global:soundNotifications',
			'openPostsInNewTab': 'global:openPostsInNewTab',
			'updateInterval': 'global:updateInterval',
			'postsDisplay': 'global:postsDisplay',
			'showUnreadCountInBadge': 'global:showUnreadCountInBadge',
			'disableContentHelper': 'global:disableContentHelper'
		});
	},

	monitor: function(obj) {
		for (var key in obj) if (obj.hasOwnProperty(key))
			this.monitorKey(key, obj[key]);
	},

	monitorKey: function(uiKey, preferenceKey) {
		var setVal = app.user.preferences.get(preferenceKey);

		if (uiKey === "updateInterval") {
			setVal = setVal / 1000 / 60;
		}

		this.ui[uiKey].set(setVal);

		this.ui[uiKey].onChange(function(val) {
			switch (uiKey) {
			case "updateInterval":
				val = val * 60 * 1000;
				break;
			case "globalSoundNotifications":
				this.toggleAllSoundNotifications(val);
				break;
			}

			app.user.preferences.set(preferenceKey, val);
		}.bind(this));
	},

	disconnectFeederPro: function() {
		if (Ext.isOnline()) {
			PUI.confirm('Are you sure you want to log out?')
			.yes(this.yesLogoutFeederPro);
		} else {
			PUI.confirm('Are you sure you wish to disconnect your Feeder Pro account?')
			.yes(this.yesDisconnectFeederPro);
		}
	},

	yesDisconnectFeederPro: function() {
		app.sync.get('feeder').uninstall(this.reloadServices);
	},

	yesLogoutFeederPro: function() {
		window.top.location.href = app.config.feeder.logoutUrl;
	},

	showLoading: function() {
		this.containerElement.addClass('loading');
	},

	hideLoading: function() {
		this.containerElement.removeClass('loading');
	},

	done: function() {
		this.vc.popScreen();
	},

	openExternal: function() {
		this.vc.openSettingsPage();
	},

	switchTheme: function(e) {
		if (! $(e.target).is(":checked")) {
			return;
		}
		app.user.preferences.set('activeTheme', e.item.get("identifier"));
		this.vc.refreshTheme();
	},

	followFeederChanged: function(e) {
		if (this.ui.followFeeder.get()) {
			app.user.followFeed(app.config.feederBlog);
    } else {
			app.user.unfollowFeed(app.config.feederBlog);
    }
	},

	openSocialLink: function(e) {
		e.preventDefault();
		UI.openTab($(e.target).closest('a').attr('href'));
		UI.closePopup();
	},

	pleaseDonate: function() {

	},

	toggleAllSoundNotifications: function(on) {
		app.user.forEachFeed(function(feed) {
			feed.setMeta("soundNotifications", on);
			feed.save();
		});
	},

	id: function() {
		return {id: 'Settings'};
	}
});

Screen.Settings.fromId = function(id) {
	return new Screen.Settings();
};
