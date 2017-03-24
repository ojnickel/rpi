var Mapper = Class.extend({
	table: false,
	model: false,

	initialize: function(db) {
		this.db = db;
		this.dbStack = [];
		this.modelName = this.model;
		this.model = window[this.model].prototype;
		this.pk = this.model.primaryKey;
	},

	install: function(callback) {
		this.db.makeTable(this.table, this.pk, this.model.schema, callback || function() {});
	},

	pushDatabase: function(dbClass, transaction) {
		this.dbStack.push(this.db);
		this.db = new dbClass;

		transaction(this);

		this.db = this.dbStack.pop();
	},

	// Add a field using data from model schema
	addField: function(member, callback) {
		var memberData = this.model.schema[member];
		this.db.addField(this.table, member, memberData, callback || function() {});
	},

	addIndex: function(column, callback) {
		this.db.addIndex(this.table, column, callback || function() {});
	},

	find: function(where, how, callback) {
		// how is optional, so make sure it's an object, and if not, check if is callback
		if ( typeof how == 'function' && ! callback ) {
			callback = how;
			how = {};
		}
		var objectForRow = this.objectForRow;

		this.db.find(this.table, this.pk, where, how, function(res, meta) {
			// Process rows into Model objects
			var rows = [];
			if ( res ) {
				res.forEach(function(row) {
					rows.push(app.store.addObject(objectForRow(row)));
				});
			}

			// Fire callback with processed objects
			callback(rows, meta);
		});
	},

	massDelete: function(where, callback) {
		this.db.del(this.table, this.pk, where, function() {
			fireCallback(callback);
		});
	},

	massUpdate: function(what, where, callback) {
		this.db.update(this.table, this.pk, what, where, function() {
			fireCallback(callback);
		});
	},

	save: function(model, callback) {
		if ( model[this.pk] ) {
			this.update(model, callback);
		} else {
			this.insert(model, callback);
		}
	},

	insert: function(model, callback) {
		this.db.insert(this.table, this.pk, model, this.onSaveOrUpdate.andArguments(model, callback));
	},

	update: function(model, callback) {
		if ( ! model.isDirty() )
			return fireCallback(callback);

		var where = {};
		where[this.pk] = model[this.pk];

		this.db.update(this.table, this.pk, model.getDirty(), where, this.onSaveOrUpdate.andArguments(model, callback));
	},

	onSaveOrUpdate: function(res, meta, models, callback) {
		if (models.constructor !== Array)
			models = [models];

		for (var i = 0, j = models.length; i < j; i++) {
			var model = models[i];
			// Todo: This is wrong with the array approach
			if ( meta.insertId )
				model[this.pk] = meta.insertId;

			model.fromDB = model.getValues();
			app.store.addObject(model);
		}

		fireCallback(callback, res, meta);
	},

	remove: function(model, callback) {
		if ( ! model[this.pk] )
			throw "Remove object must have " + this.pk;

		var where = {};
		where[this.pk] = model[this.pk];

		this.db.del(this.table, this.pk, where, callback);
	},

	count: function(where, how, callback) {
		// how is optional, so make sure it's an object, and if not, check if is callback
		if ( typeof how == 'function' && ! callback ) {
			callback = how;
			how = {};
		}

		this.db.count(this.table, this.pk, where, how, function(res, meta) {
			var ret = 0;
			if (res[0] && Object.keys(res[0]).length == 2) {
				ret = {};
				for (var i = 0, r; r = res[i]; i++) {
					var idKey = Object.keys(r).filter(function(field) { return field.contains("id"); })[0];
					ret[r[idKey]] = r.total;
				}
			} else if (res[0]) {
				ret = res[0].total;
			}
			fireCallback(callback, ret);
		});
	},

	objectForRow: function(row) {
		var obj = new window[this.modelName]();
		obj.setFromDB(row);
		return obj;
	}
});

Mapper.instances = {};

Mapper.get = function(name) {
	if ( ! Mapper.instances[name] ) {
		var className = name.replace(/^\w/, function(a) { return a.toUpperCase();}) + 'Mapper';
		Mapper.instances[name] = new window[className](Database.current);
	}
	return Mapper.instances[name];
};

Mapper.switchDatabase = function(db) {
	for ( var key in Mapper.instances ) if (Mapper.instances.hasOwnProperty(key)) {
		Mapper.instances[key].db = db;
	}
}