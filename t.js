var request = require('request');
var fs = require('fs');

var tokenUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=r6PQYm2I-fpNGMv_x7kcTm0Rn7yJMb7jj1pCgxDYtJLGFua3Yv8JNGMU__Wym1M63idhHz4Kx8d1Dmd0NaVYEx6P5FESz1f1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMEVOQjS1gN3xjCbA5kwf_qUiWili_QkYB4ggXK47JmS5KoL8us4WAIlcqImc5FeraV-rV9yhQ38&lib=MJPpkwD1QGijyWX8ojtZFktnfWGfgtIUb';
       
request(tokenUrl, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(JSON.parse(body).token) // Show the HTML for the Google homepage. 
    		console.log(body);

    		fs.writeFile("./tmp/token.json", body, function(err){
				if(err){
					return console.log(err);
				}
			});
  		}
});



