"use strict";

var ControlBase = require('./base-control');
var Locators = require('./select-locators');

/**
 * Provides access to the various functions of a Select control that is a combination of Select tag with Options within
 */
class SelectControl extends ControlBase {

  /**
   * Initializes SelectControl with its locator
   * @param controlLocator
   * @param labelLocator
   */
  constructor(controlLocator) {
    super(controlLocator, 'SelectControl');
    if (!controlLocator) throw Error('Locator for SelectControl is not set.');
 //   this.labelLocator = labelLocator;
    this.locators = new Locators();
  }

  /**
   * Gets the text of the option selected
   * @returns {*}
     */
  getSelectedText() {
    return element(this.locator).element(this.locators.selectedOption).getText().then(function (text) {
      return text.trim();
    });
  }

  /**
   * Gets the value attribute of the option selected
   * @returns {string|webdriver.promise.Promise<string>|!webdriver.promise.Promise.<?string>|*}
     */
  getSelectedValue() {
    return element(this.locator).element(this.locators.selectedOption).getAttribute('value');
  }

  /**
   * Gets an array of all options available with their value and text
   * @returns {*}
     */
  getAllOptions() {
    return element(this.locator).all(this.locators.options).map(function (o) {
      return {
        text: o.getText(),
        value: o.getAttribute('value')
      };
    });
  }

  /**
   * Gets the count of options available
   * @returns {*}
     */
  getOptionsCount() {
    return element(this.locator).all(this.locators.options).count();
  }

  /**
   * Selects the first option found based on the value passed
   * @param value
   * @returns {*}
     */
  selectByValue(value){
    var self = this;
    return element(this.locator).element(Locators.optionByValue(value)).waitReady().then(function (result) {
      return element(this.locator).element(Locators.optionByValue(value))
          .clickIt();
    });
  }

  /**
   * Selects the option found based on the index
   * @param index
     */
  selectByIndex(index){
    return element(this.locator).element(Locators.optionByIndex(index)).clickIt();
  }

  /**
   * Selects the first option found based on the text
   * @param text
     */
  selectByText(text){
    return element(this.locator).all(Locators.optionByText(text)).then(function (els) {
      console.log("length"+els.length);
      return els[0].clickIt();
    });
  }
  

  /**
   * Selects the first option found based on the partialText sent
   * @param partialText
     */
  selectByPartialText(partialText){
    return element(this.locator).all(Locators.optionByPartialText(partialText)).then(function (els) {
      return els[0].clickIt();
    });
  }

}

/**
 * @memberof module:BaseControls
 * @type {SelectControl}
 */
module.exports = SelectControl;
