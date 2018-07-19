# Page Objects 


This folder contains .JS Class files (which are Locators and Page level reusable functions) created two files for each application page.
* One page for objects
 
```
Ex:
*perInfo-locators.js*  - this file contains page locators
"use strict";
class PersonalInfoPageLocators {
    constructor() {
    this.fieldFirstName = by.id('firstName');
    this.errMsgFirstName = by.id('firstName-error');
}
}
module.exports = PersonalInfoPageLocators;
```

* second one is for page actions.

```
Ex: 
*perInfo-page.js* – In this file we are assigning locator to respective element control
var ControlBase = require('../controls/base-control');
var HomePageLocators = require('./home-locators');
var Button = require('../controls/button-control');
var TextBox = require('../controls/textbox-control');
class PersonalInfoPage extends ControlBase {
    constructor() {
        super(null, 'PersonalInfoPage');
        this.pageObjects = new PersInfoLocators();
        this.fieldFirstName = new TextBox(this.pageObjects.fieldFirstName);
        this.errMsgFirstName = new Label(this.pageObjects.errMsgFirstName);
isAt() {
        return this.firstName.isPresentAndDisplayed();
    }
}
module.exports = PersonalInfoPage;
```

* [Shopping and Buying PageObjects](../shopping_pageObjects/index.html) - Page Objects Documentation
* [Provider Directory PageObjects](../PD_pageObjects/index.html) - Provider Directory Page Objects Documentation
* [controls](../controls/index.html) - Page Objects Documentation
* [HOME](../index.html) - dd-cx-test home page
