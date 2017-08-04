"use strict";
var ControlBase = require('../../controls/base-control');
var ProviderDetailsLocators = require('./provider-details-locators');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');
/**
 * Provides access to the functionality of Provider Details page
 * @constructor
 */
class ProviderDetailsPage extends ControlBase {
    constructor() {
        super(null, 'ProviderDetailsPage');
        this.pageObjects = new ProviderDetailsLocators();
        this.backToSearchResults = new Label(this.pageObjects.backToSearchResults);
        this.providerDistance = new Label(this.pageObjects.providerDistance);
        this.providerName = new Label(this.pageObjects.providerName);
        this.providerSpecialty = new Label(this.pageObjects.providerSpecialty);
        this.providerNetwork = new Label(this.pageObjects.providerNetwork);
        this.providerAvailability = new Label(this.pageObjects.providerAvailability);
        this.providerMap = new Label(this.pageObjects.providerMap);
        this.providerPlace = new Label(this.pageObjects.providerPlace);
        this.providerPlaceName = new Label(this.pageObjects.providerPlaceName);
        this.providerFacility = new Label(this.pageObjects.providerFacility);
        this.providerAddress = new Label(this.pageObjects.providerAddress);
        this.providerAddressStreet = new Label(this.pageObjects.providerAddressStreet);
        this.providerAddressCity = new Label(this.pageObjects.providerAddressCity);
        this.providerAddressState = new Label(this.pageObjects.providerAddressState);
        this.providerAddressZip = new Label(this.pageObjects.providerAddressZip);
        this.providerAddressPhone = new Label(this.pageObjects.providerAddressPhone);
        // Office Hours
        this.providerHours = new Label(this.pageObjects.providerHours);
        // Office access
        this.providerAccess = new Label(this.pageObjects.providerAccess);
        this.providerLanguage = new Label(this.pageObjects.providerLanguage);
        this.providerData = new Label(this.pageObjects.providerData);
        this.letUsKnow = new Label(this.pageObjects.letUsKnow);
    };

    getOfficeHoursByDay(day) {
        return element(this.pageObjects.officeHoursByDay(day)).getTextEx().then(function(dayinfo) {
            return (((dayinfo.split(':'))[1]).trim());
        })
    };
    getProviderAccessByfacility(facility) {
        return element(this.pageObjects.providerAccessByfacility(facility)).getTextEx();
    };
    getProviderDataByField(fieldName) {
        return element(this.pageObjects.providerDataByField(fieldName)).getTextEx();
    };

    openView(providerName) {
        element(this.pageObjects.view(providerName)).clickIt();
    };

    // Still in Unit Testing Phase . Will Move Locators to -locators.js file
    // var pData = {
    //     "SPECIALITY": "General Dentist",
    //     "STATE": "NY",
    //     "CITY": "New York",
    //     "ZIPCODE": "10010"
    // }
    verifyProviderLanguage(language, iterations) {
        var self = this;
        browser.controlFlow().execute(function() {
            var count = 0;
            browser.wait(function() {
                return element(by.linkText("Next")).isDisplayed().then(function(displayed) {
                    var providersList = element.all(by.css('li.provider-listing'));
                    providersList.reduce(function(prev, ele, index) {
                        var viewno = Number(index) + 1;
                        if (iterations > count) {
                            element(by.xpath('(//a[normalize-space(text()) = "View"])[' + viewno + ']')).click().then(function() {
                                count = count + 1;
                                expect(self.providerLanguage.getText()).toContain(language);
                                self.backToSearchResults.click();
                                browser.sleep(3000);
                            })
                        }
                    });
                    if (displayed) {
                        if (iterations > count) {
                            return element(by.linkText("Next")).click().then(function() {
                                if (iterations > count) {
                                    return !displayed;
                                } else {
                                    return displayed;
                                }
                            })
                        } else {
                            return true;
                        }

                    } else {
                        return !displayed;
                    }

                });
            }, 9999999999);
        });
    };


    verifyProviderDetails(pData, iterations) {
        var self = this;
        browser.controlFlow().execute(function() {
            var count = 0;
            browser.wait(function() {
                return element(by.linkText("Next")).isDisplayed().then(function(displayed) {
                    var providersList = element.all(by.css('li.provider-listing'));
                    providersList.reduce(function(prev, ele, index) {
                        if (iterations > count) {
                            count = count + 1;
                            console.log("count============" + count);
                            if (pData.SPECIALITY) {
                                ele.element(by.css('p.provider__specialty')).getText().then(function(specialty) {
                                    console.log("specialty========="+specialty);
                                    console.log("pData.SPECIALITY===="+pData.SPECIALITY);
                                    var specialtyindex = pData.SPECIALITY.indexOf(specialty);
                                    expect(specialtyindex).toBeGreaterThan(-1);
                                })
                            }
                            if (pData.NETWORK) {
                                ele.element(by.css('div.state-indicator.provider__network span.state-indicator__text')).getText().then(function(network) {
                                    console.log("network========="+network);
                                    console.log("pData.NETWORK"+pData.NETWORK)
                                    var networkindex = pData.NETWORK.indexOf(network);
                                    expect(networkindex).toBeGreaterThan(-1);
                                })
                            }
                        }

                    });


                    if (displayed) {
                        if (iterations > count) {
                            return element(by.linkText("Next")).click().then(function() {
                                if (iterations > count) {
                                    return !displayed;
                                } else {
                                    return displayed;
                                }
                            })
                        } else {
                            return true;
                        }

                    } else {
                        return !displayed;
                    }


                });
            }, 9999999999);
        });
    };

};

/**
 *
 * @type {ProviderDetailsPage}
 */
module.exports = ProviderDetailsPage;
