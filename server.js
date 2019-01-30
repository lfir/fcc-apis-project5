'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }).single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// API endpoints
// User stories 1, 2 & 3
app.post('/api/fileanalyse', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    }
    res.json({ name: req.file.originalname, size: req.file.size }); 
  });
});
//

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
