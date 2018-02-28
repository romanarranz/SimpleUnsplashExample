module.exports = {
	now: function() {
		return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	}
};
