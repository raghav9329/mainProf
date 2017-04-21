/**
 * source: https://gist.github.com/elgalu/2939aad2b2e31418c1bb
 * Usage:
 * Add 'require('./element-finder-extensions.js');' in your onPrepare block or file.
 *
 * @example
 * expect($('.some-html-class').waitReady()).toBeTruthy();
 */

/**
 * Current workaround until https://github.com/angular/protractor/issues/1102
 * @type {Function}
 */
var ElementFinder = require('protractor').ElementFinder;
var ElementArrayFinder = require('protractor').ElementArrayFinder;

var getBrowser = function() {
    return global.browser;
};

ElementFinder.prototype.waitReady = function(timeoutMs, disabledClassName, withRefresh) {
    "use strict";
    var self = this;
    var driverWaitIterations = 0;
    var lastWebdriverError = '';
    timeoutMs = timeoutMs || 5000;

    function _log(result) {
        logger.info("waitReady: '" + self.locator().toString() +
            "' returns:" + result +
            ", After " + driverWaitIterations + " driverWaitIterations. " +
            "Additional Info: " + lastWebdriverError);
    }

    function _isPresentError(err) {
        lastWebdriverError = (err !== null) ? err.toString() : err;
        return false;
    }

    return getBrowser().driver.wait(function() {
        driverWaitIterations++;
        if (withRefresh === true) {
            // Refresh page after more than some retries
            if (driverWaitIterations > 7) {
                _refreshPage();
            }
        }
        return self.isPresent().then(function(present) {
            lastWebdriverError = 'present:' + present;
            if (present) {
                return self.isDisplayed().then(function(visible) {
                    lastWebdriverError += ', visible:' + visible;
                    if (visible) {
                        return self.isEnabled().then(function(isEnabled) {
                            lastWebdriverError += ', isEnabled:' + isEnabled;
                            if (isEnabled) {
                                return self.getAttribute('class').then(function(classNames) {
                                    lastWebdriverError += ', class:' + classNames;
                                    return classNames.indexOf(disabledClassName) < 0;
                                });
                            } else {
                                return isEnabled;
                            }
                        }, _isPresentError);
                    } else {
                        return false;
                    }
                }, _isPresentError);
            } else {
                return false;
            }
        }, _isPresentError);
    }, timeoutMs).then(function(waitResult) {
        _log(!!waitResult);
        return !!waitResult;
    }, function(err) {
        _isPresentError(err);
        _log(false);
        return false;
    });
};

ElementFinder.prototype.setText = function(text) {
    var self = this;
    self.moveMouse();
    return self.clear().then(function() {
        logger.trace("setText: cleared and now sending keys '" + text + "' to:" + self.locator().toString());
        return self.sendKeys(text);
    });
};

ElementFinder.prototype.selectOptionByIndex = function(selectIndex) {
    var self = this;
    return self.element(by.xpath("./option[" + (selectIndex + 1) + "]")).clickIt().then(function(result) {
        if (!result) return false;
        logger.trace("selectOption: index '" + selectIndex + "' for:" + self.locator().toString());
        return true;
    }, function(error) {
        logger.trace("selectOption: index '" + selectIndex + "' for:" + self.locator().toString() + '\r\nError:\r\n' + error);
        throw "option index '" + selectIndex + "' not found for the element:" + self.locator().toString();
    });
};

ElementFinder.prototype.selectOption = function(text) {
    var self = this;
    return self.element(by.xpath("./option[normalize-space(text())='" + text + "']")).clickIt().then(function(result) {
        if (!result) return false;
        logger.trace("selectOption: '" + text + "' for:" + self.locator().toString());
        return true;
    }, function(error) {
        logger.trace("selectOption: '" + text + "' for:" + self.locator().toString() + '\r\nError:\r\n' + error);
        throw "option '" + text + "' not found for the element:" + self.locator().toString();
    });
};

ElementFinder.prototype.getTextEx = function() {
    var self = this;
    return self.getText().then(function(text) {
        logger.trace("getTextEx: Found '" + text + "' at " + self.locator().toString());
        return text;
    });
};
ElementFinder.prototype.getTextboxText = function() {
    var self = this;
    return self.getAttribute('value').then(function(text) {
        logger.trace("getTextBoxTextEx: Found '" + text + "' at " + self.locator().toString());
        return text;
    });
};

/**
 * Clicks the element.
 * Returns true if successful,
 * if there is any error and handleError set to true it will return false else it will throw error.
 *
 * @example
 * expect(anElement.clickIt()).toBe(true);
 * expect(anElement.clickIt(true)).toBe(false);
 *
 * @param {boolean} [handleError=false] - if set to true handles error instead of throwing and returns false
 */
ElementFinder.prototype.clickIt = function(handleError) {
    handleError = handleError || false;
    var self = this;
    return self.waitReady().then(function(result) {
        if (!result) return false;
        self.moveMouse();
        return self.click().then(function() {
            logger.trace('clickIt:' + self.locator().toString());
            return true;
        }, function(error) {
            logger.error('clickIt: Error clicking element:' + self.locator().toString() + ', Error:' + error);
            if (handleError === true) {
                return false;
            } else {
                throw error;
            }
        });
    });

};

ElementArrayFinder.prototype.selectDropdownValue = function(value) {

    return this.filter(function(element, index) {
        return element.getText().then(function(text) {
            return (text.trim().toLowerCase() === value.trim().toLowerCase());
        });
    }).first().clickIt(true);
};

ElementArrayFinder.prototype.returnListOfValues = function() {
    return this.map(function(element, index) {
        return element.getText().then(function(text) {
            return text;
        });
    }).then(function(lst) {
        return lst.toString();
    });
};
ElementArrayFinder.prototype.getElementFromListAndPerformAction = function(index, action) {

    switch (action) {
        case 'click':
            return this.get(index).clickIt(true).then(function() {
                return true;
            });
        case 'getText':
            return this.get(index).getTextEx().then(function(text) {
                return text;
            });
    }


};

ElementFinder.prototype.moveMouse = function() {
    logger.debug('ElementFinder.prototype.moveMouse called');
    return getBrowser().actions().mouseMove(this).perform();
};


ElementFinder.prototype.clickSafe = function(waitTime) {
    var timeToWait = waitTime || 120000;
    var EC = protractor.ExpectedConditions;
    var self = this;
    var d = new Date();
    logger.debug('Current datetime is: ' + d.toString());
    getBrowser().wait(EC.elementToBeClickable(this), timeToWait); //wait for an element to become clickable
    d = new Date();
    logger.debug('Current datetime is: ' + d.toString() + ' timetowait was ' + timeToWait.toString());
    return this.click().then(function() {
        return true;
    }, function(error) {
        logger.debug('ElementFinder.prototype.clickSafe: Unable to click: ' + self.getId().toString() + ' with error: ' + error);
        return false;
    });
};

ElementFinder.prototype.isPresentAndDisplayed = function() {
    var self = this;
    return this.isPresent().then(function(present) {
        if (present) {
            return self.isDisplayed().then(function(visible) {
                return visible;
            });
        }
        return false;
    });
};



// Refresh the page
function _refreshPage() {
    getBrowser().navigate().refresh().then(function() {}, function(e) {});
}
