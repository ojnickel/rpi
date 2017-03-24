Screen.Iframe = Controller.extend({
	template: 'screen#iframe',

	events: {
	},

	start: function(src, title) {
		if (this.vc.hideNotification) {
			this.vc.hideNotification();
		}
    this.template.set("count", false);
    this.template.set("title", title);
    this.src = src;
    $.makeArray(this.template.element.find('x-iframe')).forEach(this.fixIframe);
	},

	destroy: function() {
		this._super();
		this.vc.toggleNotification();
	},

  fixIframe: function(element) {
    $(element).replaceWith($("<iframe></iframe>").attr("src", this.src));
  }
});
