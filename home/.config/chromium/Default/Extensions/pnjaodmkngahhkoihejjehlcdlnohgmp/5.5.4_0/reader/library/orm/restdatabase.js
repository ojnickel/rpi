var RESTDatabase = Database.extend({
	initialize: function() {
		this._super.apply(this, arguments);
		this.isRest = true;
	},

	connect: function(name) {},

	executeQuery: function(queryObject, callback) {
		queryObject.addFeederAuthorization = true;
		queryObject.contentType = 'json';
		queryObject.onComplete = function(status, text) {
			var result = tryToParseJSON(text);
			if (! result || result.error || status != 200) {
				this.onError(queryObject, result ? result.error : result, callback);
				return;
			}
			this.querySuccess.apply(this, [queryObject, callback].concat(result));
		}.bind(this);

		var request = new Request(queryObject);
		request.send(queryObject.sendParams);
	},

	querySuccess: function(queryObject, callback, res) {
		var resultBase = res[queryObject.table] || res[queryObject.table.replace(/s$/, '')];

		var insertId = false;
		var rows = [];
		if (resultBase) {
			if (resultBase.constructor === Array) {
				rows = resultBase;

				// Copy properties from response into our models
				if (queryObject.model && queryObject.model.constructor === Array) {
					queryObject.model.forEach(function(model, index) {
						if (resultBase[index].error) {
							model.error = true;
							return;
						}
						model.copyPropertiesFrom(resultBase[index]);
					});
				}
			} else {
				rows = [resultBase];
				insertId = resultBase.id;

				// Copy properties from response into our models
				if (queryObject.model && queryObject.model.copyPropertiesFrom)
					queryObject.model.copyPropertiesFrom(resultBase);
			}
		}

		// Get some information about the query

		var meta = {
			insertId: insertId,
			error: false
		};

		callback(rows, meta);
	},

	makeTable: function(name, primaryKey, schema, callback) {
		// NoOp...
		callback();
	},

	addIndex: function(table, column, callback) {
		// NoOp...
		callback();
	},

	addField: function(table, fieldName, fieldData, callback) {
		// NoOp...
		callback();
	},

	dropTable: function(name, callback) {
		// NoOp...
		callback();
	},

	tableExists: function(name, callback) {
		callback(true);
	},

	buildFind: function(table, primaryKey, where, how) {
		var idInUrl = false;
		if ( where == "all" || where == "*" )
			idInUrl = false;
		else if ( where[primaryKey] ) {
			idInUrl = where[primaryKey];
			delete where[primaryKey];
		}

		return {
			method: 'GET',
			url: this.urlFor(table, idInUrl),
			table: table,
			sendParams: {
				get: mergeObjects(where, how)
			}
		};
	},

	buildCount: function(table, primaryKey, where, how) {
		throw "Not possible with REST database";
	},

	buildUpdate: function(table, primaryKey, what, where) {
		if (!how[primaryKey]) {
			throw "Need primary key to update REST model";
		}

		return {
			method: 'PUT',
			url: this.urlFor(table, how[primaryKey]),
			table: table,
			sendParams: {
				post: this.makePostParams(table, what),
				get: how
			},
			model: what
		};
	},

	buildInsert: function(table, primaryKey, object) {
		return {
			method: 'POST',
			url: this.urlFor(table),
			table: table,
			sendParams: {
				post: this.makePostParams(table, object)
			},
			model: object
		};
	},

	buildDelete: function(table, primaryKey, where) {
		if (!how[primaryKey]) {
			throw "Need primary key to delete REST model";
		}

		return {
			method: 'DELETE',
			url: this.urlFor(table, where[primaryKey]),
			table: table
		};
	},

	urlFor: function(table, idInUrl) {
		return Config.feeder.adder + "/" + table + (idInUrl ? "/" + idInUrl : "");
	},

	makePostParams: function(table, params) {
		if (params.constructor === Array) {
			params = params.map(convertObject);
		} else {
			params = convertObject(params);
		}

		function convertObject(object) {
			if (object.getRESTValues)
				object = object.getRESTValues();
			else if (object.getValues)
				object = object.getValues();
			return object;
		}

		var ret = {};
		ret[table] = params;
		return ret;
	}
});
