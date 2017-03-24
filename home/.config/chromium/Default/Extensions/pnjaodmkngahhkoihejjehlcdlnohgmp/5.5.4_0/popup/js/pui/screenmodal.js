PUI.ScreenModal = PUI.Modal.extend({
  initialize: function(screenClass) {
    this._super();

    this.canClose = true;
    this.autoWidth = false;
    this.translucent = false;
    this.screenClass = screenClass;
  },

  show: function() {
    this._super();

    this.instance = new this.screenClass();
    this.instance.modal = this;
    this.container.append(this.instance.template.container);

    if (this.autoWidth) {
      this.container.addClass("auto-width");
    }
    if (this.translucent) {
      this.container.addClass("translucent");
    }
  },

  onContainerClick: function() {
    if (this.canClose) {
      this.destroy();
    }
  }
});
