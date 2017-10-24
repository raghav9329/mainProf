"use strict";
var FeedbackLocators = require('./feedback-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of Feedback page
 * @constructor
 */
class FeedbackPage extends ControlBase {
    constructor() {
        super(null, 'FeedbackPage');
        this.pageObjects = new FeedbackLocators();
        this.feedback = new Button(this.pageObjects.feedback);
        this.answer1 = new Label(this.pageObjects.answer1);
        this.answer2 = new Label(this.pageObjects.answer2);
        this.answer3 = new Label(this.pageObjects.answer3);
        this.answer4 = new Label(this.pageObjects.answer4);
        this.answer5 = new TextBox(this.pageObjects.answer5);
        this.submit = new Button(this.pageObjects.submit);
        this.endOfSurvey = new Label(this.pageObjects.endOfSurvey);  

       
    };
    feedbackFrame() {
        return browser.driver.findElement(protractor.By.css('div.feedback.expanded iframe'))
    }

    verifyFeedback(){
        this.feedback.click();
        
    }
};

/**
 *
 * @type {FeedbackPage}
 */
module.exports = FeedbackPage;
