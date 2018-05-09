"use strict";
var FeedbackLocators = require('./feedback-locators');
var ControlBase      = require('../../controls/base-control');
var Button           = require('../../controls/button-control');
var TextBox          = require('../../controls/textbox-control');
var Label            = require('../../controls/label-control');
var Select           = require('../../controls/select-control');
var CheckBox         = require('../../controls/checkbox-control');
var RadioButton      = require('../../controls/radiobutton-control');
var LinkText         = require('../../controls/link-control');

/**
 * Provides access to the functionality of Feedback Frame
 * @constructor
 */
class FeedbackPage extends ControlBase {
    constructor() {
        super(null, 'FeedbackPage');
        this.pageObjects   = new FeedbackLocators();
        this.feedback      = new Button(this.pageObjects.feedback);
        this.feedbackTitle = new Label(this.pageObjects.feedbackTitle);
        this.questionTitle = new Label(this.pageObjects.questionTitle);
        this.answer        = new TextBox(this.pageObjects.answer);
        this.submit        = new Button(this.pageObjects.submit);
        this.thankyouMsg   = new Label(this.pageObjects.thankyouMsg);
    };
    /**
     * Returns webElement for feedback iFrame
     * @returns {WebElement}
     */
    feedbackFrame() {
        return browser.driver.findElement(protractor.By.css('div.feedback.expanded iframe'))
    }

    /**
     * Performs click operation on feedback button 
     */
    verifyFeedback() {
        this.feedback.click();
    }
};

/**
 *
 * @type {FeedbackPage}
 */
module.exports = FeedbackPage;