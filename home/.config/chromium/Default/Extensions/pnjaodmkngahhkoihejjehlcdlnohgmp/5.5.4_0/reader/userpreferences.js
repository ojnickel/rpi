var UserPreferences = Class.extend({
	defaults: {
		'global:updateInterval': Config.defaultUpdateInterval,
		'global:postsDisplay': Config.defaultNumPosts,
		'global:openPostsInNewTab': true,
		'global:notifications': false,
		'global:soundNotifications': false,
		'global:hasAskedForLargeTabs': false,
		'global:disableContentHelper': false,
		'global:hasAskedToShowContentHelper': false,
		'global:tr': true,
		'popup:filter': 'all',
		'options:theme': 'normal',
		'activeTheme': 'theme-light',
		'global:useReadability': false,
		'global:showUnreadCountInBadge': true,
		'didChooseToUseBasic': false
	},

	allThemes: [
		{name: "Light", identifier: "theme-light", image: Ext.path("popup/css/gfx/theme-light.png")},
		{name: "Dark", identifier: "theme-dark", image: Ext.path("popup/css/gfx/theme-dark.png")}
	],

	initialize: function() {
		if ( this.get('activeTheme') == "theme-mint" )
			this.set('activeTheme', 'theme-light');
	},

	get: function(key) {
		var item = localStorage.getItem(key);
		try {
			item = JSON.parse(item);
		} catch (e) {
			if ( item )
				return item;
		}
		if ( item === null && typeof this.defaults[key] !== "undefined" )
			return this.defaults[key];
		return item;
	},

	set: function(key, value, quiet) {
		var oldValue = localStorage.getItem(key);
		var newValue = JSON.stringify(value);

		if ( oldValue === newValue )
			return;

		localStorage.setItem(key, newValue);

		if ( window.app && window.app.events && ! quiet )
			app.events.send("preferences:changed", {key: key});
	},

	setQuiet: function(key, value) {
		this.set(key, value, true);
	},

	remove: function(key) {
		localStorage.removeItem(key);
	},

	getAll: function() {
		var ret = {};
		for ( var key in this.defaults ) if ( this.defaults.hasOwnProperty(key) )
			ret[key] = this.get(key);
		return ret;
	}
});
