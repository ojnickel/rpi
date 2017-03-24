Screen.Welcome = Controller.extend({
	template: "screen#welcome",

	events: {
		"click .start-using-feeder": "start using RSS Feed Reader huzzah!"
	},

	inAppURL: function() {
	  return ["welcome"];
	},

	start: function() {},

	"start using RSS Feed Reader huzzah!": function() {
		this.template.element.addClass("byebye");
	}
});
