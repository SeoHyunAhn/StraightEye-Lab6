var functions = require('firebase-functions');
var firebase = require("firebase");

var admin = require("firebase-admin");

var serviceAccount = require("./Cs252-lab6-c5b32dddc601.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cs252-lab6-58dac.firebaseio.com"
});
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
const util = require('util');
const cors = require('cors');
var path = require("path");
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
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
//let path = '/bing/v7.0/spellcheck';

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
app.use(cors({ origin: true }));
//인증모듈 객체 가져오기
var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
var name; //유저 이름
var loginUserKey; //로그인한 유저의 부모 key
var userInfo; //로그인한 유저의 정보 object type

app.set('views', './views');
app.set('view engine', 'jade');
app.get('/upload-enc', function(req, res) {
  res.render('upload-enc');
});
app.post('/upload-enc', upload.single('userfile'), function(req, res) {
  res.send('Uploaded : ' + req.file.filename);
});
app.get('/buttons', function(req, res) {
  res.sendFile(path.join(__dirname + '/buttons.html'));
});
app.get(['/translator.html', 'translator'], function(req, res) {
  res.sendFile(path.join(__dirname + '/translator.html'));
})
app.get('/spell', function(req, res) {
  res.sendFile(path.join(__dirname + '/spell.html'));
})
app.get('/ocr.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/ocr.html'));
})

app.get('/EncDec/encoder.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/EncDec/encoder.html'));
})
app.get('/EncDec/decoder.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/EncDec/decoder.html'));
})

app.get('/diff/functions/diffchecker.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/diff/functions/diffchecker.html'));
})
app.get('/diff/functions/findMatch.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/diff/functions/findMatch.html'));
})
app.get('/plagiarism', function(req, res) {
  res.sendFile(path.join(__dirname + '/plagiarism.html'));
})
app.get(['/sorting', "/sorting.html"], function(req, res) {
  res.sendFile(path.join(__dirname + '/sorting.html'));

})
app.get(['/wordFreq.html', 'wordFreq'], function(req, res) {
  res.sendFile(path.join(__dirname + '/wordFreq.html'));
})
app.get('spellCheck.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/spellCheck.html'));
})
app.get('help.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/help.html'));
})

app.get(['/index.html', 'index'], function(req, res){
  userSessionCheck();
})
app.post('/search_word', function(req, res) {
  var data = req.body.entireWord;
  var wordsArray = splitByWords(data);
  var wordsMap = createWordMap(wordsArray);
  var finalWordsArray = sortByCount(wordsMap);

  console.log(finalWordsArray);
  console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
    finalWordsArray[0].total + ' times');
  res.send([finalWordsArray]);
})

app.post('/sorting', function(req, res) {
  res.sendFile(path.join(__dirname + '/plagiarism.html'));
  var initalString = req.body.sortingText;
  var splitedString = initalString.split(" ");
  console.log(splitedString);

  console.log("=======================");
  splitedString.sort();
  var temp="";
  for (var i = 0; i < splitedString.length; i++) {
    temp+=splitedString[i] + "\r\n";
    console.log(splitedString[i]);
  }
  res.send([splitedString]);
})
app.post('/plagiarism', function(req, res) {
      clCloud.login(email, apikey, config.E_PRODUCT.Businesses, callback);
      res.send("Success");
});
function callback(resp, err) {
  clCloud.getCreditBalance(function(resp, err) {
      var _customHeaders = {};
      _customHeaders[config.SANDBOX_MODE_HEADER] = true;
      _customHeaders[config.HTTP_CALLBACK] = 'https://cs252-lab6-58dac.firebaseapp.com/plagiarism'
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
      response.write(n[s+2]);
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


app.post('/EncDec/encoder.html', function(req, res) {
  fs.readFile('/EncDec/qrcode.html', function(err, html){
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {
        'Content-Type': 'text/json;charset=utf-8'});
        res.write(html);
        res.end();
      // res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  })
})
app.post('/EncDec/decoder.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/EncDec/qrcode-decoder.html'));
  fs.readFile('/EncDec/decoder.html', function(err, html){
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {
        'Content-Type': 'text/json;charset=utf-8'});
        res.write(html);
        res.end();
      // res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  })
})

app.get('/join.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/join.html'));
})
var users = [
  {
    username : 'user1', password: 'asdasdas', displayName: 'users1'
  }
];

app.post('/join.html', function(req, res) {
  hasher({password:req.body.password}, function(err, pass, hash){
      var user = {
        username:req.body.username,
        password:hash,
        displayName:req.body.displayName
      };
      users.push(user);
      req.session.displayName = req.body.displayName;
      req.session.save(function(){
        res.redirect('/welcome');
      });
    });
})
app.get('/login.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/join.html'));
})
var users = [
  {
    username : 'user1', password: 'asdasdas', displayName: 'users1'
  }
];

app.post('/login.html', function(req, res) {
  var uname = req.body.username;
  var pwd = req.body.password;
  for(var i=0; i<users.length; i++){
    var user = users[i];
    if(uname === user.username) {
      return hasher({password:pwd}, function(err, pass, hash){
        if(hash === user.password){
          req.session.displayName = user.displayName;
          req.session.save(function(){
            res.redirect('/welcome');
          })
        } else {
          res.send('Who are you? <a href="/auth/login">login</a>');
        }
      });
    }
  }
  res.send('Who are you? 2<a href="/auth/login">login</a>');
})

//=============================functions
function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/\s+/);
  return wordsArray;
}
function createWordMap (wordsArray) {
  var wordsMap = {};
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
}

function sortByCount (wordsMap) {
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.total - a.total;
  });
  return finalWordsArray;
}
