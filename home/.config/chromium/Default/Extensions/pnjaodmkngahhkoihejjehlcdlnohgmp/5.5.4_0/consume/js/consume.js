var Consume = Class.extend({
	events: {
		'click .next': 'nextPost',
		'click .prev': 'prevPost',
		'click .star-post': 'starPost',
		'click .settings-page': 'showSettings',
		'click .back-to-feeds': 'hideSettings',
		'click .go-back': 'iframeBack',
		'click .go-forward': 'iframeForward',
		'click .share': 'shareClick',
		'click .readability.standard-button': 'toggleReadability',
		'click .check-free-trial': 'payForPro'
	},

	shareURL: {
		facebook: "https://www.facebook.com/sharer/sharer.php?s=100&p%5Burl%5D=$URL&p%5Btitle%5D=$TITLE",
		twitter: "http://twitter.com/share?url=$URL&text=$TITLE",
		email: "mailto:?body=$BODY&subject=$TITLE"
	},

	initialize: function() {
		this.template = new PUI.Template('screen#consume');
		this.template.prepareVariables(this);

		this.event = new PUI.Events(document.body, this);
		this.event.add(this.events || {});

		this.container = $("#container");
		this.container.append(this.template.container);

		this.listener = new EventListener(this.container[0]);

		this.controllers = this.template.getControllers();
		this.ui = this.template.getComponents();

		this.countUnreadTitle();
		app.events.subscribe("feeds:recount", this.setUnreadTitle);

		window.onHeightChange = this.refreshHeight;
		window.onGotoPost = this.gotoPost;
		window.onScreenChange = this.onScreenChange;

		window.addEventListener('resize', this.windowResize, false);

		this.setReadability(app.user.preferences.get('global:useReadability'));

		this.shareMenu = new PUI.ContextMenu({
			'Facebook': this.shareFacebook,
			'Twitter': this.shareTwitter,
			'E-mail': this.shareEmail
		}, $('<div class="theme-dark"></div>').appendTo(document.body)[0], 0, 0, {
			destroyOnHide: false,
			elementPosition: this.template.el('.standard-button.share'),
			marginLeft: 10,
			marginTop: 10
		});
	},

	start: function() {
		$.makeArray(this.template.element.find('x-iframe')).forEach(prepareIframe);
		this.consumeFrame = this.template.element.find('#consume iframe');

		this.popupIframe = this.template.el('.popup-iframe');
		this.popupIframe.attr("id", "popup-content-frame")

		this.popup = Screen.currentVC = new Popup(this.container.find(".popup-content"));
		this.popup.isActuallyPopup = true;
		this.popup.start();

		if (document.location.search.indexOf("pro_trial=") !== -1) {
			this.showGetStartedOverlay();
		}
	},

	onPopupLoad: function() {
		this.popup = this.popupIframe[0].contentWindow.popup;
	},

	refreshHeight: function() {
		var minHeight = $('#consume').height();
		this.template.element.find('.tpl-popup').css('height', minHeight);
	},

	gotoPost: function(post) {
		if ( ! post ) {
			this.iframeNoPost();
			return;
		}
		this.consumeFrame.attr('src', this.getPostLink(post));
		this.setPost(post);
	},

	getPostLink: function(post) {
		var feed = app.user.feed(post.feed_id);
		var noIframingAllowed = feed && feed.getQuirk('no_iframing_allowed') == true;

		if (app.user.preferences.get('global:useReadability')) {
			return post.getConsumePath();
		} else {
			if (noIframingAllowed) {
				return post.getConsumePath();
				//UI.openTab(post.getLink());
				//return "../consume/no_iframing.html";
			}
			return post.getLink();
		}
	},

	setPost: function(post) {
		this.currentPost = post;
		this.iframeHasPost();

		this.template.el('.current-post-header .text').text(post.title);
		this.template.el('.current-post-header .link').text(post.link);
		this.template.el('.current-post-header .text').attr("href", post.link);
		this.template.el('.current-post-header .link').attr("href", post.link);

		if (post.is_starred) {
			this.template.el('.star-post').addClass("on");
		} else {
			this.template.el('.star-post').removeClass("on");
		}

		if (this.popup && this.popup.currentScreen) {
			this.popup.currentScreen.setCurrentNavFromItem(this.currentPost);
		}
	},

	reloadPost: function() {
		if (!this.currentPost) {
			return;
		}
		this.consumeFrame.attr('src', this.getPostLink(this.currentPost));
	},

	onScreenChange: function(page) {
	},

	countUnreadTitle: function() {
		app.user.unreads.count(this.setUnreadTitle);
	},

	setUnreadTitle: function(unread) {
		unread = unread.total || unread;
		document.title = unread > 0 ? "(" + unread + ") feeder" : "feeder";
	},

	nextPost: function(e) {
		e.preventDefault();
		this.popup.historyNext();
	},

	prevPost: function(e) {
		e.preventDefault();
		this.popup.historyPrevious();
	},

	starPost: function(e) {
		e.preventDefault();
		this.currentPost.toggleStar(this.setPost.withArguments(this.currentPost));
	},

	showSettings: function(e) {
		if (e) {
			e.preventDefault();
		}

		this.iframeNoPost();
		$(document.body).addClass("in-settings");
		this.consumeFrame.attr('src', Ext.path('options.html'));
	},

	hideSettings: function(e) {
		e.preventDefault();
		this.gotoPost(this.currentPost);
		setTimeout(function() {
			$(document.body).removeClass("in-settings");
		}, 100);
	},

	iframeBack: function(e) {
		e.preventDefault();
		this.consumeFrame[0].contentWindow.history.back();
	},

	iframeForward: function(e) {
		e.preventDefault();
		this.consumeFrame[0].contentWindow.history.forward();
	},

	iframeHasPost: function() {
		$(document.body).addClass("with-post");
	},

	iframeNoPost: function() {
		$(document.body).removeClass("with-post");
	},

	popupScreenHasMorePosts: function() {
		$(document.body).addClass("with-more");
	},

	popupScreenHasNothingToNavigate: function() {
		$(document.body).removeClass("with-more");
	},

	windowResize: function() {
		this.refreshHeight();
	},

	toggleReadability: function(e) {
		var isOn = !!$(e.currentTarget).data('readability');
		this.setReadability(isOn);
	},

	setReadability: function(isOn) {
		var container = this.template.el('.readability');
		container.find('.on').removeClass('on');

		if (!isOn) {
			container.find('.full').addClass('on');
		} else {
			container.find('.simple').addClass('on');
		}

		app.user.preferences.set('global:useReadability', isOn);
		this.reloadPost();
	},

	shareClick: function(e) {
		e.preventDefault();
		this.share();
	},

	share: function() {
		this.shareMenu.show();
	},

	shareEmail: function() {
		$('<a target="_blank"></a>').attr("href", this.sharePrep(this.shareURL.email))[0].click();
	},

	shareTwitter: function() {
		window.open(this.sharePrep(this.shareURL.twitter), 'sharePopup', 'width=600,height=400');
	},

	shareFacebook: function() {
		window.open(this.sharePrep(this.shareURL.facebook), 'sharePopup', 'width=600,height=500');
	},

	showGetStartedOverlay: function() {
		this.getStartedModal = new PUI.ScreenModal(Screen.GetStarted);
		this.getStartedModal.autoWidth = true;
		this.getStartedModal.translucent = true;
		this.getStartedModal.show();
	},

	sharePrep: function(url) {
		url = url.replace(/\$URL/, this.currentPost.link);
		url = url.replace(/\$TITLE/, this.currentPost.title);
		url = url.replace(/\$BODY/, 'Check this out: ' + this.currentPost.link);
		return url;
	},

	payForPro: function(e) {
		e.preventDefault();
		UI.openTab(app.config.feeder.payURL);
	}
});

main = new Consume();
main.start();
