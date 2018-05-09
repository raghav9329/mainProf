"use strict";

class FeedbackLocators {
    constructor() {
        // Feedback page objects
        this.feedback    = by.css('a.feedback-button');
        this.answer1     = by.id('QID1-1-label');
        this.answer2     = by.id('QID2-1-label');
        this.answer3     = by.id('QID3-1-label');
        this.answer4     = by.id('QID4-10-label');
        this.answer5     = by.className('InputText QR-QID5 QWatchTimer');
        this.submit      = by.id('NextButton');
        this.endOfSurvey = by.id("EndOfSurvey");
    }
}

module.exports = FeedbackLocators;
