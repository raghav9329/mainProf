'use strict';

var startQuotePage = require('./rootPage.js');

describe('Open the browser to the right page & click the getQuote button', function(){
	it('should nave to the starting page', function(){
		startQuotePage.go();
	});
	
	it('should click the getQuote button',function() {
	
		startQuotePage.action();
		
		browser.sleep(1800)
	});
	
	
	it('should nave to the starting page again', function(){
		startQuotePage.go();
		browser.sleep(8800)
	});
});