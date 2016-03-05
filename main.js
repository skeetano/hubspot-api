var path = require('path');
var request = require('sync-request');
var token = require('./getToken.js');
var contacts = require('./contacts.js');
var files = require('./files.js');

//change on c9

exports.token = token.token;
exports.getToken = token.get;

exports.contacts = contacts;
exports.files = files;

exports.updateTemplate = function(id, content){
	if (id == null){
	return console.log('no-id');
	}
	var content = content || "";
	if (typeof content != "string"){content = content.toString()}
	
	var url = "http://api.hubapi.com/content/api/v2/templates/" 
				+ id 
				+ "?access_token=" 
				+ token.token;
	
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
	if (typeof content != "string"){content = content.toString()}
	

	var url = "https://api.hubapi.com/content/api/v4/custom-widgets/" 
				+ id 
				+ "?access_token=" 
				+ token.token;
	


	var result = request('put', url, {
		json: {
			source: content
		}
	});

	console.log(result.statusCode);
	return result.statusCode;
	
}



exports.updateTopic = function(id, name, description){
	if (id == null){
	return console.log('no-id');
	}

	
	var url = "https://api.hubapi.com/blogs/v3/topics/" 
				+ id 
				+ "?access_token=" 
				+ token.token;
	


	var result = request('put', url, {
		json: {
			"name": name,
			"description":description
		}
	});

	console.log(result.statusCode);
	return result.statusCode;
	
};