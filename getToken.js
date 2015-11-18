var request = require('sync-request');
var fs = require('fs');



var tokenFile = fs.readFileSync(__dirname + '/tmp/token.json','utf8');
if(tokenFile){
	tokenFile = JSON.parse(tokenFile);
}

  var expireDate = tokenFile.expires;
  var dateNow = Date.now();

  // console.log("now: " + dateNow);
  // console.log("exp: " + expireDate);
    
  
  // getNewToken(); 
  // getOldToken();
  
  if(dateNow > expireDate){
    return getNewToken();
  } else {
    return getOldToken();
  }

  
  function getNewToken(){
    // console.log("getting new token");
    var result =  request('GET', "https://script.googleusercontent.com/macros/echo?user_content_key=r6PQYm2I-fpNGMv_x7kcTm0Rn7yJMb7jj1pCgxDYtJLGFua3Yv8JNGMU__Wym1M63idhHz4Kx8d1Dmd0NaVYEx6P5FESz1f1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMEVOQjS1gN3xjCbA5kwf_qUiWili_QkYB4ggXK47JmS5KoL8us4WAIlcqImc5FeraV-rV9yhQ38&lib=MJPpkwD1QGijyWX8ojtZFktnfWGfgtIUb");
    if(result.statusCode == 200){ 
      
	fs.writeFile("./tmp/token.json", result.body, function(err){
						if(err){
							return console.log(err);
						}
					});

	result = JSON.parse(result.body);
	return exports.token = result.token;

    } else {
      return console.log("error");
    }
  }

  
  function getOldToken(){
    // console.log("getting old token");
    return exports.token = tokenFile.token;
  }