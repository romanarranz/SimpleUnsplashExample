module.exports = {

  production: function(err, req, res, next) {

    console.error(err);

    var json = {
      message: err.message || 'Not Found',
      err: false
    };

    res.status(err.status || 500);
    res.format({
      json: function() {
        res.json(json);
      },
      html: function() {
        res.render('pages/error', json);
      }
    });
  },
  development: function(err, req, res, next) {

    console.error(err);

    var json = {
      message: err.message,
      error: err
    };

    res.status(err.status || 500);
    res.format({
      json: function() {
        res.json(json);
      },
      html: function() {
        res.render('pages/error', json);
      }
    });
  }
};
