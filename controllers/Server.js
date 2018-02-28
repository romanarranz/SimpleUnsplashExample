const config = require('../config');

var bodyParser = require('body-parser'),
    express = require('express'),
    http = require('http'),
    path = require('path');

var morgan = require('morgan');

var Routes = require('./Routes'),
		Log = require('../utils/Log');

function Server(port) {
  this.port = port;

	this.app = express();
  this.app.use(bodyParser.urlencoded({ extended: true }));

  // middlewares
	if (process.env.NODE_ENV == 'development') {
		this.app.use(morgan('dev'));
	}

  new Routes(this.app);

  this.httpServer = http.Server(this.app);

  // view engine
  this.app.set('views', path.join(__dirname, '..', 'public', 'templates'));
  this.app.set('view engine', 'pug');

  // servir los recursos estáticos hasta que no se haga con nginx
  if (process.env.NODE_ENV == 'development') {
    this.app.use('/static', express.static(path.join(__dirname, '..', 'public', 'static')));
    this.app.use('/components', express.static(path.join(__dirname, '..', 'public', 'static', 'components')));
  }
}

// private methods
function initErrorHandlers(myself) {
	var self = myself;
	self.app.use(function(req, res, next) {
		res.status(404).send('Error 404. Recurso no encontrado');
	});

  if (process.env.NODE_ENV === 'production') {
  	self.app.use(require('../middleware/Error').production);
  } else {
    self.app.use(require('../middleware/Error').development);
  }
}

// public methods
Server.prototype.start = function(){

	var self = this;
	initErrorHandlers(self);

	self.httpServer.listen(self.port, function(){
		console.info('HTTP Server listening on *:'+self.port);
	});
};

module.exports = Server;
