var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path    = require("path");

var upload = multer({ dest: 'uploads/' })
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var client_id = 'r8JE23ZC9yVS7inEevOk';
var client_secret = 'k236n9DBjZ';
var upload = multer({ storage: _storage })
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/upload-enc', function(req, res){
  res.render('upload-enc');
});
app.post('/upload-enc', upload.single('userfile'), function(req, res){
  res.send('Uploaded : '+req.file.filename);
});
app.get('/buttons', function(req, res){
  // fs.readdir('data', function(err, files){
  //   if(err){
  //     console.log(err);
  //     res.status(500).se nd('Internal Server Error');
  //   }
    res.sendFile(path.join(__dirname+'/buttons.html'));
  // });
});
app.get('/translate', function(req, res){
  res.sendFile(path.join(__dirname+'/translate.html'));

})
app.post('/translate_text', function(req, res){
  var api_url = 'https://openapi.naver.com/v1/language/translate';
  var request = require('request');
  var query = req.body.searchTxt;
  var options = {
      url: api_url,
      form: {'source':'en', 'target':'ko', 'text':query},
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
   };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      // res.send(body);
      // var temp = response.result;
      var temp = body;
      console.log(JSON.stringify(temp['message']);
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
})
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
