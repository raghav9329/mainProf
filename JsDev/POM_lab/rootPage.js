'use strict';

module.exports = {
	
	toDo: {
		getQuote: element(by.css('.button')),
	},
		
	go: function() {
		browser.get('http://dit3.deltadentalins.com/'); // overides baseURL in the spec config
	},
	
	action: function(){
		var todo = this.toDo;
		
		todo.getQuote.click();
	}

};  // end module.exports