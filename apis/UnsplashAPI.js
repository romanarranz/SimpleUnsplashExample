const config = require('../config'),
			renderize = require('../utils/RenderHelper');

const fs = require('fs'),
			path = require('path');

require('isomorphic-fetch');

const Unsplash = require('unsplash-js').default,
			toJson = require('unsplash-js').toJson;

// https://unsplash.com/documentation
function UnsplashAPI() {

	this.token = '';

	this.config = {
		applicationId: config.unsplash.UNSPLASH_APPID,
		secret: config.unsplash.UNSPLASH_SECRETKEY,
		callbackUrl: config.unsplash.UNSPLASH_REDIRECT_URI
	};

	if (config.unsplash.UNSPLASH_BEARER_TOKEN !== '') {
		this.config.bearerToken = config.unsplash.UNSPLASH_BEARER_TOKEN;
		this.token = config.unsplash.UNSPLASH_BEARER_TOKEN;
	}

	this.unsplash = new Unsplash(this.config);

	this.sections = [ "public" ];
	this.auth_url = this.unsplash.auth.getAuthenticationUrl(this.sections);
}

// OAuth workflow
UnsplashAPI.prototype.login = function(req, res) {
	let content = { title: 'Unsplash Login'	};
	renderize(res, 'pages/unsplash_login', '/', content);
};
UnsplashAPI.prototype.verify = function(req, res) {
	if (this.token !== '') {
    return res.redirect('/');
  }

	let admin = req.body.unsplash_admin,
			password = req.body.unsplash_password;

  if (config.unsplash.admin != admin || config.unsplash.password != password) {
    return res.send('credentials doesnt match');
  }

  this.verification = true;
  res.redirect(this.auth_url);
};
UnsplashAPI.prototype.oauth = function(req, res) {
	if (this.token !== '') {
    return res.redirect('/');
  }

	let content ={ title: 'Unsplash OAuth' };
	renderize(res, 'pages/unsplash_oauth', '/', content);
};
UnsplashAPI.prototype.saveToken = function(req, res) {
	let self = this;

	if (self.token !== '') {
  	return res.redirect('/');
  }

  let oauthToken = req.body.unsplash_bearer_token;
  if (oauthToken == '' && oauthToken.length < 51) {
    return res.send({ error_type: 'ValidationError', error_message: 'Invalid token'});
  }

	self.unsplash.auth.userAuthentication(oauthToken)
  .then(toJson)
  .then(function(json) {
    self.token = json.access_token;
		console.log(self.token);

		let configFile = path.join(__dirname, '..', 'config', 'unsplash.json');
	  let unsplashConfigJson = {};

		try {
			unsplashConfigJson = JSON.parse(fs.readFileSync(configFile).toString());
		} catch(err) {
			console.error(err);
			return res.send('Ha ocurrido un error guardando el token');
		}

	  unsplashConfigJson.UNSPLASH_BEARER_TOKEN = self.token;
		self.unsplash.auth.setBearerToken(self.token);

		fs.writeFile(configFile, JSON.stringify(unsplashConfigJson, null, 2), 'utf8', function (err) {
			if (err) {
				console.error(err);
				return res.send({ error_type: 'WriteError', error_message: 'Cannot write the instagram config file' });
			}

			res.send('Unsplash token saved, please restart the app or wait '+1+' minutes');
		});
  });
};

// Data!
UnsplashAPI.prototype.search = function(str, quantity) {
	console.log(this.token);
	return this.unsplash.search.photos(str, quantity).then(toJson);
};

module.exports = new UnsplashAPI();
