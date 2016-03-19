var request = require('sync-request');
var fs = require('fs');
var path = require('path');
var util = require('util');
var dotenv = require('dotenv');
dotenv.load();


var tokenGetter = (function() {
  
  var tokenFilePath = path.resolve(__dirname, 'tmp/token.json');


    function get() {
    try {
      fs.statSync('./tmp');
    } catch(e) {
      fs.mkdirSync('./tmp');
    }
    
    try {
      fs.statSync('./tmp/token.json');
    } catch(e) {
      fs.writeFileSync('./tmp/token.json', '{"token":"0","expires":0}', 'utf8');
    }
    
    
      var tokenFile = readTokenFile(tokenFilePath);

      if (tokenFile && !checkIfExpired(tokenFile)){
        return tokenFile.token;
      } else {
        var newToken = _getNewToken();
        if (newToken != "error"){
          return newToken;
        }

      }
        

    }

    function readTokenFile(path){
      var tokenFile = fs.readFileSync(tokenFilePath, 'utf8');
      if (tokenFile.toString().length) {
            return JSON.parse(tokenFile);
        } else {
            return false;
        }
    }


    function checkIfExpired(tokenFile) {
        var dateNow = Date.now();
        if (dateNow > tokenFile.expires) {
            return true;
        } else {
            return false;
        }
    }

    function _getNewToken() {
      console.log('getToken');
        var result = request('GET', process.env.HUBSPOT_TOKEN_URL);
        if (result.statusCode == 200) {
            fs.writeFile(tokenFilePath, result.body, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log('new token saved');
            });

            result = JSON.parse(result.body);
            return result.token;

        } else {
          console.log("error getting new token");
            return  "error";
        }
    }

    return {
        get: get
    }

})();




exports.token = tokenGetter.get();
exports.get = tokenGetter.get;

