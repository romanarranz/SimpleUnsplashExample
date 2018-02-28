var renderize = require('../utils/RenderHelper');

var UnsplashAPI = require('../apis/UnsplashAPI');

function MainController() {}

MainController.prototype.getHome = function(req, res) {
	var content = {
		title: 'Inicio'
	};

	renderize(res, 'pages/index', '/', content);
};
MainController.prototype.getGallery = function(req, res) {
	var content = {
		title: 'Galeria',
		photos: []
	};

	UnsplashAPI.search('dogs', 10).then(function(photoList) {
		for (let i = 0; i<photoList.results.length; i++) {
			content.photos.push(photoList.results[i].urls.regular);
		}

		renderize(res, 'pages/gallery', '/', content);
	});
};

module.exports = new MainController();
