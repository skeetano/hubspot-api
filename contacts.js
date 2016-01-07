var path = require('path');
var request = require('sync-request');
var hsToken = require('./getToken.js');



exports.getByEmail = function (email){
  var url = "https://api.hubapi.com/contacts/v1/contact/email/" + email + "/profile?access_token="+ hsToken.token;
  var result = request('get', url);
  return result;
}


exports.getByUtk = function (utk){
  var url = "https://api.hubapi.com/contacts/v1/contact/utk/" + utk + "/profile?access_token="+ hsToken.token;
  var result = request('get', url);
  return result;
}


exports.batch = function (payload){
  var url = "https://api.hubapi.com/contacts/v1/contact/batch?access_token="+ hsToken.token;
// var url = 'http://requestb.in/1hapoh51';
  var result = request('post', url, {
    		json: payload,
    		headers: {
    		  'content-type':'application/json'
    		}
		});
  return result;
}


exports.createTextProperty = function (name,label,group){
    
    var payload = {
      "name": name,
      "label": label,
      "description": "",
      "groupName": group,
      "type": "string",
      "fieldType": "text",
      "options": [],
      "displayOrder": 0,
      "formField": false
    }
    
  var url = "https://api.hubapi.com/contacts/v2/properties?access_token="+ hsToken.token;
  var result = request('post', url, {
    		json: payload,
    		headers: {
    		    'content-type':'application/json'
    		}
		});
  return result;
}


exports.getProperty = function (name){
  var url = "https://api.hubapi.com/contacts/v2/properties/named/" + name + "?access_token="+ hsToken.token;
  var result = request('get', url);
  return result;
}
