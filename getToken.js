var request = require('sync-request');
var fs = require('fs');
var path = require('path');
var util = require('util');

var tokenGetter = (function() {
  var tokenFilePath = path.resolve(__dirname, 'tmp/token.json');
    

    function get() {
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
        var result = request('GET', "https://script.googleusercontent.com/macros/echo?user_content_key=r6PQYm2I-fpNGMv_x7kcTm0Rn7yJMb7jj1pCgxDYtJLGFua3Yv8JNGMU__Wym1M63idhHz4Kx8d1Dmd0NaVYEx6P5FESz1f1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMEVOQjS1gN3xjCbA5kwf_qUiWili_QkYB4ggXK47JmS5KoL8us4WAIlcqImc5FeraV-rV9yhQ38&lib=MJPpkwD1QGijyWX8ojtZFktnfWGfgtIUb");
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

