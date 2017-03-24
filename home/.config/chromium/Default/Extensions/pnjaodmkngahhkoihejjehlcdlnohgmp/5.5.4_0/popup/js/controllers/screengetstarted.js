Screen.GetStarted = Controller.extend({
	template: 'screen#get-started',

	events: {
		"click [data-to]": "goToClicked"
	},

	inAppURL: function() {
    return ["get-started"];
  },

	start: function() {
		this._super();
  },

	goToClicked: function(e) {
		e.preventDefault();
		this.goTo($(e.currentTarget).data("to"));
	},

	goTo: function(to) {
		switch (to) {
		case "payment":
			UI.openTab(Config.feeder.payURL);
			break;
		case "app":
			UI.openTab(Config.feeder.iosURL);
			break;
		case "add-feed":
			this.vc.showAddScreen();
			if (this.modal) {
				this.modal.destroy();
			}
			break;
		default:
			throw "Bad go to" + to;
		}
	}
});
