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
app.use('/css', express.static('public'));
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
app.get(['/translate.html', 'translate'], function(req, res) {
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
      var _pid;
      clCloud.createByText('helworld',_customHeaders,function(resp,err){
        	if(resp && resp.ProcessId){
        		console.log('API: create-by-text');
        		console.log('Process has been created: '+resp.ProcessId);
             console.log(util.inspect(resp, false, null))
             _pid=resp.ProcessId;
        	}
     		if(!isNaN(err))
     			console.log('Error: ' + err);
     		});
    })
    clCloud.getProcessResults(_pid,function(resp,err){
	   		console.log(resp);
				if(isNaN(err))
					console.log('Error: ' + err);
				/* Get the raw text the process and the first result, and the comparison report between them. */
				var result = resp[0];
				clCloud.getProcessRawText(_pid,function(resp,err){
					console.log('Process raw text: ' + resp);
					if(!isNaN(err))
						console.log('Error: ' + err);
				});
				clCloud.getResultRawText(result.CachedVersion,function(resp,err){
					console.log('Result raw text: ' + resp);
					if(!isNaN(err))
						console.log('Error: ' + err);
				});
				clCloud.getComparisonReport(result.ComparisonReport,function(resp,err){
					console.log('Comparison report: ' + resp);
					if(!isNaN(err))
						console.log('Error: ' + err);
				});
	   });
  // })
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
