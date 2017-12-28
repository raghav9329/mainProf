"use strict";

class AARPMarketLocators {
    constructor() {
    	this.state=by.id('State');
    	this.continue= by.id('Image1');
        this.Zipcode = by.name('zip');
        this.NoOFCovered = by.id('noofcovered');

    	this.viewQuote = by.id('btn-view-quote');
    }

}

module.exports =  AARPMarketLocators;