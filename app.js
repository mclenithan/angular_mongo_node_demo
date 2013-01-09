//Dependencies
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');
  , app = express();
//Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
//Set up MongoDB
mongoose.connect('mongodb://localhost/todo');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , todoList = new Schema({
      done: Boolean,
      name: String,
      desc: String
    })
  , entry = mongoose.model('entry', todoList);
//'entry' is now the name to use for intercation

//test to see if database is successfully connected
/*var id = new entry({
  id : 1,
  name: "work", 
  desc: "get it done"
}).save(function(err){
  if (err) {
    console.log(err);
  }
});*/


//server is deveolpment
app.configure('development', function(){
  app.use(express.errorHandler());
});


//routes explicitally stated
//initial layout + index
app.get('/', routes.index);

//partial
app.get('/list', function (req,res) {
  res.render('partials/list');
})

//initial get data
app.get('/data', function (req, res){
  entry.find({}, function (err, data){
    res.writeHead(200, {'content-type': 'text/json'});
    res.write(JSON.stringify(data));
    res.end();
  });
})

//add data
app.post('/data', function (req,res){
  var Entry = new entry({
    done: false,
    name: req.body.name,
    desc: req.body.desc
  }).save(function (err){
    if (err) {
      console.log(err);
    }
    if (!err) {
      res.writeHead(200);
      res.end();
    }
  });
});

//delete data
app.del('/data/:taskname', function (req,res){
  var taskname = req.params.taskname;
  entry.find({name: taskname}, function (err, data) {
    if (err) {
      console.log(err);
    }
    if (!err) {
      res.writeHead(200);
      res.end();
    }
  }).remove();
})

//create server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
