PUI.Modal = Class.extend({
	initialize: function() {
		this.parent = $(document.body);
		this.makeContainer();
	},

	destroy: function() {
		if (this.isDestroyed) {
			return;
		}

		$(document.body).css("height", "");

		this.isDestroyed = true;
		this.outerContainer.remove();

		fireCallback(this.onDestroy);
	},

	makeContainer: function() {
		this.outerContainer = $('<div></div>')
			.addClass('pui-modal-outer')
			.appendTo(this.parent);

		this.container = $('<div></div>')
			.addClass('pui-modal')
			.appendTo(this.outerContainer);


		this.outerContainer.on('click', function(e) {
			if (e.target === this.outerContainer[0]) {
				e.preventDefault();

				if (typeof this.onContainerClick === "function") {
					this.onContainerClick();
				}
			}
		}.bind(this));

		this.outerContainer.on("click", ".side-close", function(e) {
			e.preventDefault();
			this.onContainerClick();
		}.bind(this));
	},

	show: function() {
		this.outerContainer.show();
		this.didResize();
	},

	setText: function(text) {
		this.container.find('.pui-alert-text').html(text.replace(/\n/g, '<br>')).on('click', 'a', function(e) {
			if (!Ext.isOnline()) {
				e.preventDefault();
				UI.openTab(this.href);
			}
		});
	},

	didResize: function() {
		var height = this.container.prop("scrollHeight");
		var windowHeight = $(document.body).height();

		$(document.body).height(Math.max(height, windowHeight));
	}
});
