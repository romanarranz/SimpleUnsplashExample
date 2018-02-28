require('./Log');

module.exports = function(res, template, redirection, content) {

	res.render(template, content || {}, function(err, html){
		if(err) {
			console.error(err);
			res.redirect(redirection);
		} else {
			res.send(html);
		}
	});
};
