PUI.SpeechBubble = PUI.Modal.extend({
	initialize: function(text, pointX, pointY) {
		throw "This does not work!";
	}
});

PUI.speechBubble = function(text, x, y) {
	var win = new PUI.SpeechBubble(text, x, y);
	win.show();
	return win;
};
