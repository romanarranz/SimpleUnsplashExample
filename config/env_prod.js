var unsplash = require('./unsplash');
unsplash.UNSPLASH_APPID = process.env.UNSPLASH_APPID;
unsplash.UNSPLASH_SECRETKEY = process.env.UNSPLASH_SECRETKEY;
unsplash.admin = process.env.UNSPLASH_USER;
unsplash.password = process.env.UNSPLASH_PWD;

module.exports = {
  unsplash
};
