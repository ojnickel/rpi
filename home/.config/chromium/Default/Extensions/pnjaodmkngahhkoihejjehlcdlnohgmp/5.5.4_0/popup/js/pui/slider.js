// This class is officially shit

PUI.Slider = PUI.Draggable.extend({
	initialize: function(el) {
		this.el = $(el).find('.slider');
		this.handle = this.el.find('.handle');
		this.bar = this.el.find('.current');

		this.sliderValuesContainer = this.el.closest('.tpl-slider').next('.slider-values');
		this.sliderValues = this.sliderValuesContainer.find('li');

		this.minimumValueText = this.el.closest('.tpl-slider').find('.slider-minimum-value');
		this.minimumValueText.insertAfter(this.sliderValuesContainer);
		this.minimum = 0;

		this._super();
		this.highlightActive(0);
	},

	set: function(value) {
		this.setActive(value);
		fireCallback(this.onChangeCallback, this.value);
	},

	setMinimum: function(minValue) {
		this.minimum = minValue;

		this.sliderValues
		.removeClass("disabled")
		.filter(function(i, el) {
			return parseInt($(el).text(), 10) < minValue;
		})
		.addClass("disabled");
	},

	setMinimumText: function(minimumText) {
		this.minimumValueText.html(minimumText);
	},

	onChange: function(callback) {
		this.onChangeCallback = callback;
	},

	onDragStart: function(e) {
		this.startWidth = parseInt(this.bar.css("width"), 10);
	},

	onDrag: function(delta) {
		var width = this.startWidth + delta.x;
		var position = Math.min(Math.max(width, 0), this.maxWidth());
		this.bar.css('width', position);

		var active = this.highlightActive(position);
		this.setActive(active.text());
	},

	highlightActive: function(position) {
		var sliderValues = $.makeArray(this.sliderValues);

		var refOffset = this.el.rect();
		var percent = position/this.maxWidth();

		var order = sliderValues
		.filter(function(el, i) {
			return parseInt($(el).text(), 10) >= this.minimum;
		}.bind(this))
		.map(function(el, i) {
			var offset = $(el).rect();
			return {
				p: percent - ((offset.left + offset.width/2 - refOffset.left) / refOffset.width),
				el: el
			};
		}).sort(function(a, b) {
			if (Math.abs(a.p) == Math.abs(b.p)) {
				return 0;
			}
			if (Math.abs(a.p) > Math.abs(b.p)) {
				return 1;
			}
			return -1;
		});

		var active = order.shift().el;
		$(active).addClass('highlighted');
		order.forEach(function(p) {
			$(p.el).removeClass('highlighted');
		});

		return $(active);
	},

	setActive: function(val) {
		this.sliderValues.removeClass('highlighted');

		var smallest = {
			diff: 1000000,
			el: false
		};

		for (var i = 0, el; el = this.sliderValues[i]; i++) {
			el = $(el);
			var diff = Math.abs(val - el.text());
			if (diff < smallest.diff) {
				smallest.diff = diff;
				smallest.el = el;
			}
		}

		var w = Math.min(this.maxWidth(), Math.max(0, Math.round(smallest.el[0].offsetLeft - smallest.el.width()/2-7, 10))) + 'px';
		var w = smallest.el[0].offsetLeft;

		smallest.el.addClass('highlighted');
		this.bar.css('width', w + 'px');

		this.value = parseInt(smallest.el.text(), 10);
		fireCallback(this.onChangeCallback, this.value);
	},

	getActive: function() {
		return parseInt(this.sliderValues.filter('.highlighted'), 10);
	},

	maxWidth: function() {
		return this.el.width();
	}
});
