'use strict';

var ddRootPage = require('./appRootPOM.js');
var x;

//describe('Open the browser to the right page & click the getQuote button', function start(){
describe('Open the browser to the right page & click the getQuote button', function (){
	
//	it('should go to proper page and click button',function start(){
	it('should go to proper page and click button',function (){
		ddRootPage.navigate();
		ddRootPage.clickQuoteBtn();
	});
	
	it('shojuld sleep some',function(){
		browser.sleep(2000)
	});
});
