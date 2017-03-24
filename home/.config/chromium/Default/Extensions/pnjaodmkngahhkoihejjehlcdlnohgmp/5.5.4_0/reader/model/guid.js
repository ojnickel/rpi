var Guid = Model.extend({
	mapper: "guid",

	schema: {
		hash: {type: "text"}
	},

	setFromDB: function(hash) {
		this.hash = hash;
	},

	getCacheId: function() {
		return false;
	}
});