var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
const util = require('util');
var path = require("path");
var CopyleaksCloud = require('plagiarism-checker');
var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();

var upload = multer({
  dest: 'uploads/'
})
var _storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

'use strict';

let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck';

/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
let key = 'ce04e96fbe3c474cac2cd0d62de82fab';

// These values are used for optional headers (see below).
// let CLIENT_ID = "<Client ID from Previous Response Goes Here>";
// let CLIENT_IP = "999.999.999.999";
// let CLIENT_LOCATION = "+90.0000000000000;long: 00.0000000000000;re:100.000000000000";

let mkt = "en-US";
let mode = "proof";
let text = "Hollo, wrld!";
let query_string = "?mkt=" + mkt + "&mode=" + mode;

let request_params = {
    method : 'POST',
    hostname : host,
    path : path + query_string,
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : text.length + 5,
        'Ocp-Apim-Subscription-Key' : key,
//        'X-Search-Location' : CLIENT_LOCATION,
//        'X-MSEdge-ClientID' : CLIENT_ID,
//        'X-MSEdge-ClientIP' : CLIENT_ID,
    }
};

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        console.log (body);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let req = https.request (request_params, response_handler);
req.write ("text=" + text);
req.end ();








//Papago translate keys
var client_id = 'r8JE23ZC9yVS7inEevOk';
var client_secret = 'k236n9DBjZ';
//plagiarism keys
var email = 'ahn00378@branksome.asia';
var apikey = '8F48B397-2FEC-4E0F-BDBC-5DBEBA4C4AFE';

var upload = multer({
  storage: _storage
})
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/upload-enc', function(req, res) {
  res.render('upload-enc');
});
app.post('/upload-enc', upload.single('userfile'), function(req, res) {
  res.send('Uploaded : ' + req.file.filename);
});
app.get('/buttons', function(req, res) {
  // fs.readdir('data', function(err, files){
  //   if(err){
  //     console.log(err);
  //     res.status(500).se nd('Internal Server Error');
  //   }
  res.sendFile(path.join(__dirname + '/buttons.html'));
  // });
});
app.get('/translate', function(req, res) {
  res.sendFile(path.join(__dirname + '/translate.html'));

})
app.get('/spell', function(req, res) {
  res.sendFile(path.join(__dirname + '/spell.html'));

})
app.get('/plagiarism', function(req, res) {
  res.sendFile(path.join(__dirname + '/plagiarism.html'));

})
app.post('/plagiarism', function(req, res) {
      clCloud.login(email, apikey, config.E_PRODUCT.Businesses, callback);
      res.send("Success");
});
function callback(resp, err) {
  clCloud.getCreditBalance(function(resp, err) {
      var _customHeaders = {};
      _customHeaders[config.SANDBOX_MODE_HEADER] = true;
      _customHeaders[config.HTTP_CALLBACK] = 'http://your.website.com/callbacks/'
      var url = 'https://copyleaks.com'; // URL to scan
      clCloud.createByText('helworld',_customHeaders,function(resp,err){
          if(resp && resp.ProcessId){
            console.log('API: create-by-text');
            console.log('Process has been created: '+resp.ProcessId);
             console.log(util.inspect(resp, false, null))
          }
        if(!isNaN(err))
          console.log('Error: ' + err);
        });
    })
  }


app.post('/translate_text', function(req, res) {
  var api_url = 'https://openapi.naver.com/v1/language/translate';
  var request = require('request');
  var query = req.body.searchTxt;
  var options = {
    url: api_url,
    form: {
      'source': 'en',
      'target': 'ko',
      'text': query
    },
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  };

  request.post(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {
        'Content-Type': 'text/json;charset=utf-8'
      });
      // res.send(body);
      // var temp = response.result;
      var temp = body;
      var string = "";
      for (var i = 0; i < temp.length; i++) {
        string += temp[i];
      }
      var n = string.split("\"");
      var s;
      for (s = 0; s < n.length; s++) {
        if (n[s] == "translatedText") {
          break;
        }
      }
      console.log(n[s + 2]);
      res.end(n[s + 2]);
      // res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});
 app.listen(3000, function() {
  console.log('Connected, 3000 port!');
})
