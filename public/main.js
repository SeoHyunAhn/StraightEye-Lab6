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
var CopyleaksCloud = require('plagiarism-checker');
var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();
// Automatically allow cross-origin requests

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
app.get(['/sorting', "/sorting.html"], function(req, res) {
  res.sendFile(path.join(__dirname + '/sorting.html'));

})
app.get(['/search_word.html', 'search_word'], function(req, res) {
  res.sendFile(path.join(__dirname + '/search_word.html'));
})
app.get(['/index.html', 'index'], function(req, res){

  //세션 체크 함수
  userSessionCheck();
})

function userSessionCheck() {



//로그인이 되어있으면 - 유저가 있으면, user를 인자값으로 넘겨준다.
firebaseEmailAuth.onAuthStateChanged(function (user) {

if (user) {
//조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어 있는 user의 pk key 값을 이용해서 가져오기
firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {

//자바스크립트 dom 선택자를 통해서 네비게이션 메뉴의 엘리먼트 변경해주기
document.getElementById("loginmenu").textContent = "Logout";
document.getElementById("loginmenu").href = "/logout.html";
document.getElementById("joinmenu").textContent = "Hello! " + snapshot.val().name;
document.getElementById("joinmenu").href = "#";


document.getElementById("startWork").textContent = "Start Work!";
document.getElementById("startWork").href = "/buttons.html";



name = snapshot.val().name;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
loginUserKey = snapshot.key;  //로그인한 유저의 key도 계속 쓸 것이기 때문에 전역변수로 할당
userInfo = snapshot.val(); //snapshot.val()에 user 테이블에 있는 해당 개체 정보가 넘어온다. userInfo에 대입!

//alert(userInfo.userid);  //uid는 db에서 user 테이블의 각 개체들의 pk 인데, 이 값은 인증에서 생성된 아이디의 pk 값과 같다. *중요!
return true
});
} else {
     $('#comment').val("Login is required to leave review/question here.");
        $(document).ready(function () {

            //메인화면 감사일기 쓰기버튼 눌렀을 때
            $(document).on('click', '.write', function () {

            //네비게이션 메뉴의 text값 가져오기 - 자바스크립트 dom 방식으로 가져왔다.
            var seseionCheck = document.getElementById("loginmenu").textContent;

            //내가 쓴글 가져오기 - jquery방식으로 가져왔다.
            comment = $('#comment').val();
            if (seseionCheck == "Logout") {
            //저장하기
            saveThanks();
            } else {
            alert("Login is required.")
            }
            });
        });

    return false
  }
})
};
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
  console.log(req);

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
