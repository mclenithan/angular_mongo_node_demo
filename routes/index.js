


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.peoplelist = function(req, res){
  res.render('partials/peoplelist');
};

exports.data = function(req, res){
	res.writeHead(200, {'content-type':'text/json'});
	res.write(JSON.stringify([
		{"name": "Patrick", "desc": "author", "age": 27},
		{"name": "Christine", "desc": "fiancee", "age": 24},
		{"name": "Isaiah", "desc": "brother-in-law", "age": 27},
		{"name": "Sammy", "desc": "homeless guy on Venutra", "age": 60}
	]));
	res.end();
};