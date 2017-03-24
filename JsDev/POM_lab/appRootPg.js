'use strict';

var appRootPageObj = require('./appRootPageObj.js');
var x;

//describe('Open the browser to the right page & click the getQuote button', function start(){
describe('Open the browser to the right page & click the getQuote button', function (){
	
//	it('should go to proper page and click button',function start(){
	it('should go to proper page and click button',function (){
		appRootPageObj.navigate();
		appRootPageObj.clickQuoteBtn();
	});
	
	it('shojuld sleep some',function(){
		browser.sleep(2000)
	});
});
