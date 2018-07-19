"use strict";

class FeedbackLocators {
    constructor() {
        // Feedback page objects
		this.feedback      = by.css('a.feedback-button');
		this.feedbackTitle = by.css('h1.sg-title span');
		this.questionTitle = by.css('div.sg-question-title label');
		this.answer        = by.css('div.sg-question-options textarea');
		this.submit        = by.id('sg_SubmitButton');
		this.thankyouMsg   = by.css('div.sg-instructions');
    }
}

module.exports     = FeedbackLocators;
