require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));


app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');//'/app'
});
app.get('/app', function (req, res) {
    return res.redirect('/workers');//'/app'
});

//......................................................old server

var mongojs = require('mongojs');
var db = mongojs('workers', ['workers']);
var bodyParser = require('body-parser');

app.get('/workers', function (req, res) {
  console.log('All right');

  db.workers.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/workers', function (req, res) {
  console.log(req.body);
  db.workers.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/workers/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.workers.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/workers/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.workers.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
//-------------------------------------------------------------------
app.get('/fname/', function (req, res) {
  var fname1 = req.query.fname[0];
  console.log(req.query.fname[0]);
  db.workers.find({fname: fname1}, function(err,doc){
        if (err) throw err;
        console.log(doc);
		res.json(doc);
    })
});
app.get('/lname/', function (req, res) {
  var lname1 = req.query.lname[0];
  console.log(req.query);
  db.workers.find({lname: lname1}, function(err,doc){
        if (err) throw err;
        console.log(doc);
		res.json(doc);
    })
});
app.get('/position/', function (req, res) {
  var position1 = req.query.position[0];
  console.log(position1); 
  db.workers.find({position: position1}, function(err,doc){
        if (err) throw err;
        console.log(doc);
		res.json(doc);
    })
});
//-------------------------------------------------------------------

app.put('/workers/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.workers.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {fname: req.body.fname, lname: req.body.lname, position: req.body.position}},//change avtomatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
//..............old server cotinue

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});