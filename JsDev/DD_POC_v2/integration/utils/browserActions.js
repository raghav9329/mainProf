var BrowserActions = function() {

};

/** 
* Click on given web element
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.click = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
        var message = msg || "Clicked on " + cElement.toString();
        return cElement.click().then(function() {
            logger.debug(message);
            return true;
        });
    });
};
/** 
* Get text on given web element
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<text>}
*/
BrowserActions.prototype.getText = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
      
        return cElement.getText().then(function(txt) {
              var message = msg + txt || "Text on element " + cElement.toString()+" is"+txt;
            logger.debug(message);
            return txt;
        });
    });
};

/** 
* Verify given web element is Enabled
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.isEnabled = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
        return cElement.isEnabled().then(function(enabled) {
            var message = msg || cElement.toString() + " is enabled: " + enabled;
            logger.debug(message);
            return true;
        });
    });
};
/** 
* Verify given web element is Displayed
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.isDisplayed = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
        return cElement.isDisplayed().then(function(displayed) {
            var message = msg || cElement.toString() + " is displayed: " + displayed;
            logger.debug(message);
            return true;
        });
    });
};
/** 
* Verify given web element is Selected
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.isSelected = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
        return cElement.isSelected().then(function(selected) {
            var message = msg || cElement.toString() + " is selected: " + selected;
            logger.debug(message);
            return true;
        });
    });
};
/** 
* Verify given web element is Present
*<cElement> - Locator
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.isPresent = function(cElement, msg) {
    return browser.controlFlow().execute(function() {
        return cElement.isPresent().then(function(present) {
            var message = msg || cElement.toString() + " is present: " + enabled;
            logger.debug(message);
            return true;
        });
    });
};
/** 
* Enter text in given web element
*<cElement> - Locator
*<testdata> - Data to enter in text box field
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.enterText = function(cElement, testdata, msg) {
    var self = this;
    return browser.controlFlow().execute(function() {
        var message = msg || "Entered data " + testdata + "at" + cElement.toString();
        console.log("locator"+cElement);
        return cElement.clear().then(function() {
            return cElement.sendKeys(testdata).then(function() {
                logger.debug(message);
                return true;
            });
        });
    });
};

/** 
* Select drop down based on given Index
*<cElement> - Locator
*<index> - Index of the item in dropdown
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.selectDropdownbyIndex = function(cElement, index, msg) {
    var self = this;
    var options = cElement.all(by.tagName('option'))
        .then(function(options) {
            options[index].click();
        });
};
/** 
* Select drop down based on given Text
*<cElement> - Locator
*<text> - Visible text from the dropdown
*<msg> - Optional/Message for Log report
*@retruns  {Promise.<boolean>}
*/
BrowserActions.prototype.selectDropdownbyText = function(cElement, text, msg) {
    var self = this;
    return cElement.all(by.xpath('option[.="' + text + '"]')).click();
};

module.exports = BrowserActions;
