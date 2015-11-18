var hsToken = require(__dirname + '/getToken.js');
var request = require('sync-request');

exports.token = hsToken.token;


exports.updateTemplate = function(id, content){
	if (id == null){
	return console.log('no-id');
	}

	var content = content || "";
	if (typeof content != "string"){content = new String(content);}
	

	var url = "http://api.hubapi.com/content/api/v2/templates/" 
				+ id 
				+ "?access_token=" 
				+ hsToken.token;
	


	var result = request('put', url, {
		json: {
			source: content
		}
	});

	console.log(result.statusCode);
	return result.statusCode;
	
}


exports.updateCustomModule = function(id, content){
	if (id == null){
	return console.log('no-id');
	}

	var content = content || "";
	if (typeof content != "string"){content = new String(content);}
	

	var url = "https://api.hubapi.com/content/api/v4/custom-widgets/" 
				+ id 
				+ "?access_token=" 
				+ hsToken.token;
	


	var result = request('put', url, {
		json: {
			source: content
		}
	});

	console.log(result.statusCode);
	return result.statusCode;
	
}