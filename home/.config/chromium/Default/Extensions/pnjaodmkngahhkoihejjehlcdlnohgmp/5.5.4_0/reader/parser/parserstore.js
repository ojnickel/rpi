var ParserStore = Class.extend({
	destroy: function() {
		// Override if needed
	},

	addFeed: function() {
		throw "override ParserStore.addFeed";
	},

	addPosts: function() {
		throw "override ParserStore.addPosts";
	}
});

ParserStore.instances = {};

ParserStore.get = function(name) {
	var stores = {
		rss: LocalStore,
		adder: AdderStore
	};

	if (!this.instances[name]) {
		this.instances[name] = new (stores[name])();
	}

	return this.instances[name];
};

ParserStore.destroy = function(callback) {
	for (var key in this.instances) if (this.instances.hasOwnProperty(key)) {
		this.instances[key].destroy();
	}
	this.instances = {};
	fireCallback(callback);
};