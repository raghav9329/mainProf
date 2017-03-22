'use strict';

var startQuotePage = require('./rootPage.js');
var x;
describe('Open the browser to the right page & click the getQuote button', function(){

	it('should nave to the starting page', function(){
		startQuotePage.go();
	});
	
	it('should click the getQuote button',function() {
		startQuotePage.action();
		
		browser.sleep(1800)
		startQuotePage.setZip_Qty('94949');
//		startQuotePage.setQty();
		startQuotePage.commit();
		browser.sleep(1200)
	});
	
	
	

	
});
