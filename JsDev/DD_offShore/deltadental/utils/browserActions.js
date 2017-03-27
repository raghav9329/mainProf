var BrowserActions = function() {

};


BrowserActions.prototype.click = function(locator, msg) {	
	return browser.controlFlow().execute(function() {
		var message = msg || "Clicked on " + locator;
		return element(locator).click().then(function(){

			console.log(message);
			return true;
		});	
	});	
};

BrowserActions.prototype.type = function( locator, testdata, msg) {
	var self = this;
	return browser.controlFlow().execute(function() {
		var message = msg || "Entered data " + testdata + "at" + locator;
		return element(locator).clear().then(function(){
			return element(locator).sendKeys(testdata).then(function(){
				console.log(message);
				return true;
			});		
		});	
	});	
};

BrowserActions.prototype.selectDropdownbyIndex = function ( locator, index ) {
	var self = this;
	var options = element(locator).all(by.tagName('option'))   
	.then(function(options){
		options[index].click();
	});
};

BrowserActions.prototype.selectDropdownbyText = function ( locator, text ) {
	var self = this;

	return element(locator).all(by.xpath('option[.="' + text + '"]')).click(); 
	// webElement.all(by.cssContainingText('option', text)).click(); 

};
module.exports = BrowserActions;