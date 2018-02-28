var Server = require('./controllers/Server');

let srv = new Server(require('./config').port);
srv.start();
