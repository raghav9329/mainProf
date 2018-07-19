"use strict";

/**
 * Base class for the controls. Provides common functions for all controls
 */
class BaseControl {

    /**
     * Initializes the base control with its locator
     * @param controlLocator
     * @param controlType
     */
    constructor(controlLocator, controlType) {
        if (!controlType) throw Error('Control type has not been set');
        this.locator = controlLocator;
        this.controlType = controlType;
    }

    /**
     * Checks if the control is present
     * @returns {webdriver.promise.Promise<boolean>}
     */
    isPresent() {
        if (!this.locator) return false;
        return element(this.locator).isPresent();
    }

    /**
     * Checks if the control is displayed. Would throw an error if the control is not present
     * @returns {webdriver.promise.Promise<boolean[]>|!webdriver.promise.Promise.<boolean>|webdriver.promise.Promise<boolean>}
     */
    isDisplayed() {
        if (!this.locator) return false;
        return element(this.locator).isDisplayed();
    }

    /**
     * Checks if the control is present and displayed. Does not throw an error if the control is not present
     * @returns {webdriver.promise.Promise<boolean[]>|!webdriver.promise.Promise.<boolean>|webdriver.promise.Promise<boolean>}
     */
    isPresentAndDisplayed() {
        var self = this;
        return this.waitReady().then(function(result) {
            if (!self.locator) return false;
            return element(self.locator).isPresentAndDisplayed();
        }, function(err) {
            return false;
        });
    }



    /**
     * Checks if the button is enabled and returns the result
     * @returns {webdriver.promise.Promise<boolean>|!webdriver.promise.Promise.<boolean>|webdriver.promise.Promise<boolean[]>}
     */
    isEnabled() {
        if (!this.locator) return null;
        return element(this.locator).isEnabled();
    }
    /**
     * Waits until element is displayed, enabled and returns the result
     * @returns {webdriver.promise.Promise}
     */
    waitReady() {
        return element(this.locator).waitReady();
    }
}

/**
 * @module BaseControls
 * @type {BaseControl}
 */
module.exports = BaseControl;