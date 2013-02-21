
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.legacy = function(req, res){
  res.sendfile('views/legacy.html');
};