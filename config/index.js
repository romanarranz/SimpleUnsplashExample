var env = require('./env_dev');
if (process.env.NODE_ENV === 'production') {
	env = require('./env_prod');
}

env.port = process.env.PORT || 3000;

module.exports = env;
