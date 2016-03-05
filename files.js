var path = require('path');
var request = require('sync-request');
var hsToken = require('./getToken.js');


exports.upload = function (files){
  var url = "https://api.hubapi.com/filemanager/api/v2/files?access_token="+ hsToken.get();
  url = 'http://requestb.in/1n0z9ri1';
  var result = request('post', url, {
    		body: files
		});
  return result;
}

