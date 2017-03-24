var GENERIC_ERROR_ARRAY = ["An error ocurred.\nPlease try again later"];

Screen.Signup = Controller.extend({
  template: 'screen#signup',

  events: {
    'submit .signup-form': 'signup',
    'submit .login-form': 'login',
    'click .i-dont-want-pro': 'noPro',
    'click .already-account': 'toggleLogin',
    'click .signup-please': 'toggleSignup',
    'click .terms-and-conditions': 'clickedTermsAndConditions'
  },

  inAppURL: function() {
    return ["signup"];
  },

  start: function() {
    this.showSignup();
  },

  signup: function(e) {
    e.preventDefault();

    analytics.trackEvent("Signup", "clicked", "signup");

    var data = {};
    this.template.el('.signup-form').serializeArray().forEach(function(a) {
      data[a.name] = a.value;
    });

    this.template.el(".signup-form").addClass("loading");
    this.template.el('.signup-form input').blur();

    chain(app.user.signupToPro, data)
    .then(function(success, errors) {
      this.template.el(".signup-form").removeClass("loading")

      if (success) {
        analytics.trackEvent("Signup", "signup", "success");

        popup.onPopupCloseListeners.push(function() {
          UI.openTab(app.config.feeder.welcomeUrl);
        });
        this.succeeded();
      } else {
        analytics.trackEvent("Signup", "signup", "error");

        var errorMessages = ((errors && errors.messages && errors.messages[0]) || GENERIC_ERROR_ARRAY).join("\n");
        PUI.alert(errorMessages, function() {
          this.template.el(".signup-form [name=email]")[0].focus();
        }.bind(this));
      }
    }.bind(this));
  },

  login: function(e) {
    e.preventDefault();

    analytics.trackEvent("Signup", "clicked", "login");

    var data = {};
    this.template.el('.login-form').serializeArray().forEach(function(a) {
      data[a.name] = a.value;
    });

    this.template.el(".login-form").addClass("loading");
    this.template.el('.login-form input').blur();

    chain(app.user.loginToPro, data)
    .then(function(success, errors) {
      this.template.el(".login-form").removeClass("loading")

      if (success) {
        analytics.trackEvent("Signup", "signup", "success");
        this.succeeded();
      } else {
        analytics.trackEvent("Signup", "login", "error");
        PUI.alert((errors || GENERIC_ERROR_ARRAY).join("\n"), function() {
          this.template.el(".login-form [name=email]")[0].focus();
        }.bind(this));
      }
    }.bind(this));
  },

  noPro: function(e) {
    e.preventDefault();
    analytics.trackEvent("Signup", "clicked", "no-pro");
    app.user.setDidChooseToUseBasic(true);
    this.hide();
  },

  hide: function() {
    this.template.element.addClass('byebye');
  },

  showSignup: function() {
    this.template.el(".signup-container").addClass("signup").removeClass("login");
    this.template.el(".pill-buttons a").removeClass("active").filter(".signup-please").addClass("active");
  },

  showLogin: function() {
    this.template.el(".signup-container").addClass("login").removeClass("signup");
    this.template.el(".pill-buttons a").removeClass("active").filter(".already-account").addClass("active");
  },

  toggleLogin: function(e) {
    e.preventDefault();
    analytics.trackEvent("Signup", "tab-switch", "login");
    this.showLogin();
  },

  toggleSignup: function(e) {
    e.preventDefault();
    analytics.trackEvent("Signup", "tab-switch", "signup");
    this.showSignup();
  },

  succeeded: function() {
    this.hide();
    fireCallback(this.onSuccess);
  },

  clickedTermsAndConditions: function(e) {
    e.preventDefault();

		var page = new Screen.Iframe(app.config.feeder.termsUrl, "Terms & Conditions");
		this.vc.slideUpScreen(page);

    analytics.trackEvent("Signup", "terms-and-conditions", "read");
  }
});
