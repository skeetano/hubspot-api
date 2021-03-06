var path = require('path');
var request = require('sync-request');
var hsToken = require('./getToken.js');



exports.update = function(id, content){
	if (id == null){
	return console.log('no-id');
	}
	var content = content || "";
	if (typeof content != "string"){content = content.toString()}
	
	var url = "http://api.hubapi.com/content/api/v2/templates/" 
				+ id 
				+ "?access_token=" 
				+ hsToken.get();
	
	var result = request('put', url, {
		json: {
			source: content
		}
	});

// 	console.log(result.statusCode);
	return result;
	
}


exports.get = function(id){
	var url = "http://api.hubapi.com/content/api/v2/templates/" 
				+ id 
				+ "?access_token=" 
				+ hsToken.get();
	
	var result = request('get', url);

// 	console.log(result.statusCode);
	return result;
}
