var Popup = ViewController.extend({
  initialize: function(container) {
    this._super(container);

    this.onPopupCloseListeners = [];

    this.refreshTheme();
    this.setCurrentFilter(app.user.preferences.get('popup:filter') || "all");

    // Add head
    this.head = new PUI.Template('popup#head');
    $(this.head.container).insertBefore(this.container);

    this.queue = new PUI.LinkQueue(this.head.element.find('#link-queue'));
    this.queue.setListener(this.queueChanged)

    window.addEventListener('unload', this.onUnload, false);
    if (Ext.isSafari()) {
      window.addEventListener('blur', this.onPopupHide, true);
    }

    // Fix outgoing links in safari
    if (Ext.isSafari()) {
      $(document.body).on("click", ".safari-link", function(e) {
        e.preventDefault();
        UI.openTab(e.target.href);
        UI.closePopup();
      });
    }

    Platform.env.onPopoverVisible(this.onPopupVisible);

    // Listen for feeder:connect changes to set/unset "is-pro" class
    this.listener.listen("feeder:connected", this.feederConnectChanged);
    this.listener.listen("feeder:expiredChanged", this.feederExpiredChanged);

    if (this.isPopup()) {
      $(Ext.isSafari() ? '#main-scroll' : document).on('scroll', this.onScroll);
    }
    window.addEventListener('keydown', this.onKeyDown, false);

    this.toggleNotification();

    // History actions is a list of posts, feeds or folders that should be navigate:able with keyboard navigation
    this.history = new ActionHistory();

    setTimeout(function() {
      $(document.body).css("height", document.body.scrollHeight);
      setTimeout(function() {
        $(document.body).css("height", "");
      }, 10);
    }, 100);

    if (queryStringGet("path")) {
      setTimeout(this.addFeedDialog.andArguments(queryStringGet("path")), 500);
    }

    this.feederExpiredChanged();
  },

  addFeedDialog: function(path) {
    this.showAddScreen(path);
  },

  start: function() {
    if (!this.hasStoredScreenChain() || !this.rememberScreenChain()) {
      this.setCurrentScreen(new Screen.Main());
    }
  },

  onUnload: function() {
    this.queue.pump();
    this.queue.queue = [];

    this.listener.unlisten("feeder:connect", this.feederConnectChanged);

    $(Ext.isSafari() ? '#main-scroll' : document).off('scroll', this.onScroll);
    this.queue.removeListener(this.queueChanged);

    this.onPopupCloseListeners.forEach(function(callback) {
      callback.call(this);
    }, this);

    this.onPopupCloseListeners = [];

    Platform.env.removePopoverVisible(this.onPopupVisible);
  },

  onPopupVisible: function() {
    setTimeout(function() { window.focus(); }, 1000);
    this.currentScreen.onPopupVisible();
  },

  onPopupHide: function() {
    this.queue.pump();
    this.queue.queue = [];

    if (this.currentScreen && typeof this.currentScreen.onPopupHide === "function") {
      this.currentScreen.onPopupHide();
    }

    this.onPopupCloseListeners.forEach(function(callback) {
      callback.call(this);
    }, this);

    this.onPopupCloseListeners = [];
  },

  feederConnectChanged: function() {
    $(document.body).toggleClass("is-pro", app.user.isPro());
    Init.activateIntercom();
    this.toggleNotification();
    if (typeof this.currentScreen.onFeedConnectChanged === "function") {
      this.currentScreen.onFeedConnectChanged();
    }
  },

  feederExpiredChanged: function() {
    $(document.body).toggleClass("is-expired", app.user.proHasExpired());

    if (app.user.isTrial()) {
      $(".trial-days-left").show();
      $(".trial-days-left-text").text(app.user.proTrialDaysLeft());
    } else {
      $(".trial-days-left").hide();
    }

    if (app.user.proHasExpired()) {
      if (!this.currentExpiredScreen) {
        this.showExpired();
      }
    } else {
      if (this.currentExpiredScreen) {
        this.currentExpiredScreen.destroy();
      }
    }
  },

  refreshTheme: function() {
    var theme = queryStringGet('theme') || app.user.preferences.get('activeTheme');
    app.user.preferences.allThemes.forEach(function(t) {
      $(document.body).removeClass(t.identifier);
    });
    $(document.body).addClass(theme);
  },

  // screenChain related

  storeScreenChain: function() {
    var stack = this.screenStack.map(function(page) {
      var id = typeof page.id !== "function" ? false : page.id();
      if ( ! id )
        return page;
      return page.id();
    });
    localStorage.screenChain = JSON.stringify(stack);
  },

  forgetScreenChain: function() {
    localStorage.removeItem("screenChain");
  },

  rememberScreenChain: function() {
    var stack = JSON.parse(localStorage.screenChain);
    this.forgetScreenChain();

    for (var i = 0, page; page = stack[i]; i++ ) {
      var klass = Screen[page.id];
      var page = klass.fromId(page);
      if ( ! page )
        return false;
      this.screenStack.push(page);
    }
    this.setCurrentScreen(this.screenStack.pop());
    return true;
  },

  hasStoredScreenChain: function() {
    try {
      JSON.parse(localStorage.screenChain);
      return true;
    } catch (e) {}
    return false;
  },

  setCurrentFilter: function(name, func, postFilter) {
    this.currentFilter = name;
    app.user.preferences.set('popup:filter', name);
  },

  onScroll: function() {
    if (this.queue.isEmpty() || this.inAnimation) {
      return;
    }

    this.setBarTop();
  },

  setBarTop: function() {
    var maxY = 33;
    var minY = 2;

    var scrollY = Ext.isSafari() ? document.getElementById('main-scroll').scrollTop : window.scrollY;
    var top = Math.min(Math.max(minY, maxY-scrollY), maxY);

    $('.bar.bottom, .bar.top').css('top', top + 'px !important');
  },

  onScreenChange: function() {
    this.disableTopBar();
  },

  disableTopBar: function() {
    $('.bar.bottom, .bar.top').css('top', '');
    $(document.body).addClass("at-top");
  },

  queueChanged: function() {
    if ( this.queue.isEmpty() ) {
      this.disableTopBar();
    }
  },

  onKeyDown: function(e) {
    if (PUI.currentModal) {
      if (e.keyCode === 13) {// enter
        PUI.currentModal.destroy();
      }
    } else {
      onKeyDownEvent(e, this);
    }
  },

  toggleNotification: function() {
    this.notification = $('#notifications');
    this.notification.on('click', this.noteClicked);

    if (app.notifications.current && ! app.user.isPro()) {
      this.showNotification();
    } else {
      this.hideNotification();
    }
  },

  showNotification: function() {
    this.notification.find('div').html(app.notifications.current);
    $(document.body).addClass("with-notifications");
  },

  hideNotification: function() {
    $(document.body).removeClass("with-notifications");
  },

  noteClicked: function(e) {
    e.preventDefault();
    if ($(e.target).closest('.close').length) {
      $(document.body).removeClass("with-notifications");
      app.notifications.hideCurrent();
      return;
    }
    UI.openTab(this.notification.find('a').attr('href'));
  },

  historyNext: function() {
    var action = this.history.next();
    this.currentScreen.navigateTo(action);
  },

  historyPrevious: function() {
    var action = this.history.previous();
    this.currentScreen.navigateTo(action);
  },

  navForward: function() {
    this.currentScreen.navForward(this.history.current());
  },

  navBack: function() {
    this.currentScreen.back();
  }
});

// Chrome 30 has a bug where the popup height can be weird because the content is loaded dynamically
function initPopup() {
  popup = Screen.currentVC = new Popup($('#popup-main .popup-content'));
  popup.start();

  $(document.body).removeClass("popup-loading");
}

if (document.getElementById('is-popup')) {
  if (Ext.isChrome()) {
    $(window).on("load", function() {setTimeout(initPopup, 100);});
  } else {
    initPopup();
  }
}
