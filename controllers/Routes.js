var MainController = require('./MainController');

var UnsplashAPI = require('../apis/UnsplashAPI');

function Routes(app) {

	// main page
  app.get('/', MainController.getHome.bind(MainController));
	app.get('/gallery', MainController.getGallery.bind(MainController));

	// unsplash
	app.get('/unsplash', UnsplashAPI.login.bind(UnsplashAPI));
	app.get('/unsplash/oauth', UnsplashAPI.oauth.bind(UnsplashAPI));
	app.post('/unsplash/verify', UnsplashAPI.verify.bind(UnsplashAPI));
	app.post('/unsplash/save_token', UnsplashAPI.saveToken.bind(UnsplashAPI));
}

module.exports = Routes;
