
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' , page: req.params.num});
};

exports.legacy = function(req, res){
  res.sendfile('views/legacy.html');
};