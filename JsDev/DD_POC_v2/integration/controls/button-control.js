
"use strict";

var ControlBase = require('./base-control');


/**
 * Provides access to the various functions of a button object
 */
class ButtonControl extends ControlBase {

  /**
   * Initializes Button control with its locator
   * @param controlLocator
   */
  constructor(controlLocator) {
    super(controlLocator, 'BUTTON');
    if (!controlLocator) throw Error('Locator for ButtonControl is not set.');
  }

  /**
   * Returns visible text from the button
   * @returns {webdriver.promise.Promise<string>|webdriver.promise.Promise<string[]>|!webdriver.promise.Promise.<string>}
   */
  getText() {
    var self = this;
    return element(this.locator).waitReady().then(function (result) {
      if(!result)return false;
      return element(self.locator).getTextEx();
    });
  }

  /**
   * Clicks the button
   * @returns {!webdriver.promise.Promise.<void>|webdriver.promise.Promise<void>}
   */
  click() {
    return element(this.locator).clickIt();
  }
}

/**
 * @memberof module:BaseControl
 * @type {ButtonControl}
 */
module.exports = ButtonControl;
