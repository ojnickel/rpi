/*
	Class:
		Importer

	Takes care of importing old folder structure to FeedReader 4.0.
	Also takes care of migrations between DB versions.
*/

var Importer = Class.extend({
	initialize: function() {
		this.migrationMapper = Mapper.get("migration");
	},

	install: function(callback) {
		if (Database.current.isApi)
			return callback();
		this.migrationMapper.install(callback);
	},

	migrateDB: function(callback) {
		if (Database.current.isApi)
			return callback();
		this.migrationMapper.migrate(callback);
	}
});
