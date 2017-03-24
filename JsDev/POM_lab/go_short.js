'use strict';


//var ddStartTest = require('./appRootPg.js');
var appRootPg = require('./appRootPg.js');

describe('start the test sequence',function(){
	
	it('begin',function(){

		console.log('baseUrl: ', browser.params.baseUrl);
		
		appRootPg;
		
	});
});