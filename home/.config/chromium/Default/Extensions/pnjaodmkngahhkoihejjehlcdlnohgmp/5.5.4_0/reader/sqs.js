// SQS like queue to post serialized messages

var SQS = Class.extend({
	destroy: function(callback) {
		fireCallback(callback);
	},

	post: function(name) {
		console.log(">>%s", name);

		var args = [].slice.call(arguments, 1);
		var listener = SQS.listeners[name];

		if (listener) {
			listener.run.apply(listener, args);
		} else {
			throw "no sqs listener for: " + name;
		}
	}
});

SQS.consume = function(name, classVars) {
	if (!this.listeners) {
		this.listeners = {};
	}
	this.listeners[name] = new (Class.extend(classVars));
};