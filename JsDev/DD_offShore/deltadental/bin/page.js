var LoginObjects = require('./object');

var LoginPage = function(loginDataParams) {
	this.loginData = loginDataParams;
	this.loginObjects = new LoginObjects();	
};

/**
 * Opens login page
 * @example
 * <page> - object for current
 * page.goToLoginPage();
 * @returns {boolean}
 */
LoginPage.prototype.clickCustomerLogin = function() {
	var self = this;
	return element(self.loginObjects.CustomerLogin).click();	
};


 LoginPage.prototype.selectDropdownbyIndex = function ( optionNum ) {
	  var self = this;
	    var options = element(self.loginObjects.DropdownYourName).all(by.tagName('option'))   
	      .then(function(options){
	        options[optionNum].click();
	      });
	  
	};

	LoginPage.prototype.Login = function() {
		var self = this;
		return element(self.loginObjects.Login).click();	
	};



module.exports = LoginPage;