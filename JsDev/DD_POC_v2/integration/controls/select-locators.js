"use strict";

class SelectLocators {
    constructor() {
        this.options = by.tagName('option');
        this.selectedOption = by.css('option:checked');
    }

    static optionByValue(value){
        return by.css('option[value="' + value + '"]');
    }

    static optionByPartialText(text){
        return by.cssContainingText('option', text);
    }

    static optionByText(text){
        return by.xpath('.//option[normalize-space()="' + text + '"]');
    }

    static optionByIndex(index){
        return by.xpath('.//option[' + index + ']');
    }

}

module.exports = SelectLocators;
