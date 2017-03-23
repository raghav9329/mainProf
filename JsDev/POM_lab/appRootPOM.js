'use strict';

module.exports = {
	
	navigate : function(){
		browser.get(browser.params.baseUrl);
	},
	
	clickQuoteBtn : function (){
		
		element(by.css('.button')).click();
	}
	
	
		
		
}