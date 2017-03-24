Screen.Expired = Controller.extend({
  template: 'screen#expired',

  events: {
    "click .add-payment": "addPayment",
    "click .get-feeder-lite": "getFeederLite",
    "click .get-feeder-pro": "getFeederPro",
    "click .downgrade-button": "downgradeToLite"
  },

  inAppURL: function() {
    return ["expired"]
  },

  start: function() {
    var container = $(this.template.container);

    if (Ext.isOnline()) {
      container.find(".is-online").show();
      container.find(".is-not-online").hide();
    } else {
      container.find(".is-online").hide();
      container.find(".is-not-online").show();
    }

    if (this.modal) {
      this.modal.didResize();
    }

    // Wait for content script to load
    setTimeout(function() {
      if ($("#feeder-is-installed-flag.feeder-is-installed").length) {
        container.find(".is-extension-installed").show();
        container.find(".is-extension-not-installed").hide();
      } else {
        container.find(".is-extension-installed").hide();
        container.find(".is-extension-not-installed").show();
      }

      if (this.modal) {
        this.modal.didResize();
      }
    }.bind(this), 500);
  },

  addPayment: function(e) {
    e.preventDefault();
    if (Ext.isOnline()) {
      document.location.href = app.config.feeder.payURL;
    } else {
      UI.openTab(app.config.feeder.payURL);
      UI.closePopup();
    }
  },

  getFeederLite: function(e) {
    e.preventDefault();
    $(this.template.container).addClass("show-feeder-lite");
    if (this.modal) {
      this.modal.didResize();
    }
  },

  getFeederPro: function(e) {
    e.preventDefault();
    $(this.template.container).removeClass("show-feeder-lite");
    if (this.modal) {
      this.modal.didResize();
    }
  },

  downgradeToLite: function(e) {
    e.preventDefault();
    var loader = PUI.alertLoader("Downgrading...");
    app.user.downgradeToLite(function() {
      loader.destroy();
      if (this.modal) {
        this.modal.destroy();
      } else {
        this.vc.popScreen();
      }
    }.bind(this));
  }
});
