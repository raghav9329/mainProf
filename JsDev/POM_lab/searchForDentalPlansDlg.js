'use strict';

module.exports = {
	
	toDo: {
		getQuote: element(by.css('.button')),
	},
		
	go: function() {
		//browser.get('http://dit3.deltadentalins.com/'); // overides baseURL in the spec config
		//browser.get('http://www.deltadentalins.com/'); // overides baseURL in the spec config
		browser.get(browser.params.baseUrl); // overides baseURL in the spec config
	},

	setZip_Qty: function (zCode){
		var EC = protractor.ExpectedConditions;
		var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));
		var howMany = element(by.id('coverage_type'));	
		zipField.sendKeys(zCode);
		browser.wait(EC.elementToBeClickable(howMany),100)
		howMany.$('[value="Self One"]').click();
		
	},

	commit: function(){
		var commitButton = element(by.id('btn_saveBig'));
		commitButton.click();
	},
	
	action: function(){
		var todo = this.toDo;
		todo.getQuote.click();
	},
	

	

};  // end module.exports
