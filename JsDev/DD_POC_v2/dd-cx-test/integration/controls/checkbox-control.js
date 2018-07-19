"use strict";

var ControlBase = require('./base-control');

/**
 * Provides access to the various functions of a checkbox object
 */
class CheckboxControl extends ControlBase {

    /**
     * Initializes Checkbox control with its locator
     * @param controlLocator
     */
    constructor(controlLocator) {
        super(controlLocator, 'Checkbox');
        if (!controlLocator) throw Error('Locator for CheckboxControl is not set.');

    }

    /**
     * Gets the isSelected property of a checkbox
     * @returns {webdriver.promise.Promise<string>}
     */
    isSelected() {
        return element(this.locator).isSelected();
    }
    /**
     * Checks the checkbox if checkbox not checked
     * @returns {webdriver.promise.Promise<string>}
     */
    check() {
        var self = this;
        return this.isSelected().then(function(val) {
            if (!val) return element(self.locator).clickIt();
            return true;
        });
    }
    /**
     * Unchecks the checkbox if checkbox  checked
     * @returns {webdriver.promise.Promise<string>}
     */
    unCheck() {
        var self = this;
        return this.isSelected().then(function(val) {
            console.log("Is check box checked  ========= " + val);
            if (val) return element(self.locator).clickIt();
            return true;
        });

    }
}

/**
 * @memberof module:BaseControls
 * @type {CheckboxControl}
 */
module.exports = CheckboxControl;