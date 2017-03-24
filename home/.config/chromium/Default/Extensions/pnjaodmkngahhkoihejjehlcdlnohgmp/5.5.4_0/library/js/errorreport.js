function TRYIT(fn, b, extraData) {
	extraData = extraData || {};
	var ret = fn.call(b);
	return ret;
}
