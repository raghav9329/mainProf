 "use strict";

 var ControlBase = require('./base-control');

 /**
  * Provides access to the various functions of a textbox object
  */
 class TextBoxControl extends ControlBase {

     /**
      * Initializes the TextBox control with its locator and label locator
      * @param controlLocator
      * @param labelLocator
      */
     constructor(controlLocator, labelLocator) {
         super(controlLocator, 'TEXTBOX');
         if (!controlLocator) throw Error('Locator for TextBoxControl is not set.');
         this.labelLocator = labelLocator;
     }

     /**
      * Sets the provided value in the control. Clears the existing text before setting new text
      * @param fieldValue
      * @returns {webdriver.promise.Promise<void>|!webdriver.promise.Promise.<void>}
      */
     setText(fieldValue, isAppend) {
         var self = this;
         return element(this.locator).waitReady().then(function(result) {
             if (!result) return false;
             return element(self.locator).setText(fieldValue, isAppend);
         });
     }

     /**
      * Gets the provided value from the control
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
      * Gets the provided value from the control
      * @returns {webdriver.promise.Promise<string>|webdriver.promise.Promise<string[]>|!webdriver.promise.Promise.<string>}
      */
     getValue() {
         return element(this.locator).getAttribute('value');
     }

     /**
      * Gets the value attribute of the Label
      * @returns {string|webdriver.promise.Promise<string>|!webdriver.promise.Promise.<?string>|*}
      */
     getAttribute(attribute) {
             return element(this.locator).getAttribute(attribute);
         }
         /**
          * Checks if a field is a password field based on the attribute "" and returns the result
          * @returns {!webdriver.promise.Promise.<?string>|webdriver.promise.Promise<string[]>|webdriver.promise.Promise<string>}
          */
     isPasswordField() {
         return element(this.locator).getAttribute("password").then(function(text) {
             return text === 'password';
         });
     }

     /**
      * Checks if the field is read only and returns the result
      * @returns {!webdriver.promise.Promise.<?string>|webdriver.promise.Promise<string[]>|webdriver.promise.Promise<string>}
      */
     isReadOnly() {
         return element(this.locator).getAttribute("");
     }

     /**
      * Checks if the field is mandatory by checking the existence of a '*' in its label
      * @returns {Promise<R>}
      */
     isMandatory() {
         return element(this.locator).element(this.labelLocator).getAttribute('class').then(function(cl) {
             return cl.indexOf('required') > -1;
         });
     }

     /**
      * Gets label text for the textbox
      * @returns {webdriver.promise.Promise<string>}
      */
     getLabelText() {
         return element(this.locator).element(this.labelLocator).getText();
     }

     /**
      * Clears text in the textbox
      * @returns {webdriver.promise.Promise<string>}
      */
     clear() {
         return element(this.locator).clear();
     }
 }

 /**
  * @memberof module:BaseControls
  * @type {TextBoxControl}
  */
 module.exports = TextBoxControl;
