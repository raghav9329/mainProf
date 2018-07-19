"use strict";

var ControlBase = require('./base-control');

/**
 * Provides access to the various functions of a link object
 */
class LinkControl extends ControlBase {

    /**
     * Initializes link control with its locator
     * @param controlLocator
     */
    constructor(controlLocator) {
        super(controlLocator, 'Link');
        if (!controlLocator) throw Error('Locator for LinkControl is not set.');
    }

    /**
     * Gets the isDisplayed property of a link
     * @returns {webdriver.promise.Promise<string>}
     */
    getUrl() {
        return element(this.locator).getAttribute('href');
    }

    /**
     * Gets the text of the link
     */
    getText() {
        return element(this.locator).getText();
    }

    /**
     * Clicks on the link
     * @returns {webdriver.promise.Promise<string>}
     */
    click() {
        return element(this.locator).clickIt();
    }

}

/**
 * @memberof module:BaseControls
 * @type {LinkControl}
 */
module.exports = LinkControl;
