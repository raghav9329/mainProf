"use strict";

var ControlBase = require('./base-control');

/**
 * Provides access to the various functions of a checkbox object
 */
class RadioControl extends ControlBase {

    /**
     * Initializes RadioButton control with its locator
     * @param controlLocator    
     */
    constructor(controlLocator) {
        super(controlLocator, 'RadioButton');
        if (!controlLocator) throw Error('Locator for RadioButton  is not set.');
    }

    /**
     * Gets the isSelected property of a radio button
     * @returns {webdriver.promise.Promise<string>}
     */
    isSelected() {
        return element(this.locator).isSelected();
    }
    /**
     * Selects the radio button
     * @returns {webdriver.promise.Promise<string>}
     */
    select() {
        var self = this;
        return this.isSelected().then(function(val) {
            if (!val) return element(self.locator).clickIt();
            return true;
        });
    }

}


/**
 * @memberof module:BaseControls
 * @type {RadioControl}
 */
module.exports = RadioControl;