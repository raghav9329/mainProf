"use strict";

var ControlBase = require('./base-control');


/**
 * Provides access to the various functions of a Label object
 */
class LabelControl extends ControlBase {

    /**
     * Initializes Label control with its locator
     * @param controlLocator
     */
    constructor(controlLocator) {
        super(controlLocator, 'LABEL');
        if (!controlLocator) throw Error('Locator for LabelControl is not set.');
    }

    /**
     * Returns visible text from the label
     * @returns {webdriver.promise.Promise<string>|webdriver.promise.Promise<string[]>|!webdriver.promise.Promise.<string>}
     */
    getText() {
        var self = this;
        return element(this.locator).waitReady().then(function(result) {
            if (!result) return false;
            return element(self.locator).getTextEx();
        });
    }

    /**
     * Clicks the Label
     * @returns {!webdriver.promise.Promise.<void>|webdriver.promise.Promise<void>}
     */
    click() {
            return element(this.locator).clickIt();
        }
    /**
    * Gets the value attribute of the Label
    * @returns {string|webdriver.promise.Promise<string>|!webdriver.promise.Promise.<?string>|*}
    */
    getAttribute(attribute) {
        return element(this.locator).getAttribute(attribute);
    }

    /**
     * Gets the count of labels available
     * @returns {*}
     */
    getCount() {
        return element.all(this.locator).count();
    }

    getElements(){
        return element.all(this.locator)

    }
}

/**
 * @memberof module:LabelControl
 * @type {LabelControl}
 */
module.exports = LabelControl;
