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
        this.headerText = new Label(this.pageObjects.headerText);
        this.keywordSearch = new TextBox(this.pageObjects.keywordSearch);
        this.findIcon = new Button(this.pageObjects.findIcon);
        this.pageNation = new Label(this.pageObjects.pageNation);
        this.page = new LinkText(this.pageObjects.page);
        this.viewLink = new Label(this.pageObjects.viewLink);
        this.backToSearchResults = new Label(this.pageObjects.backToSearchResults);
        this.bestMatch = new RadioButton(this.pageObjects.bestMatch);
        this.sortDistance = new RadioButton(this.pageObjects.sortDistance);
        this.asceDist = new Label(this.pageObjects.asceDist);
        this.providerDistance = new Label(this.pageObjects.providerDistance);
        this.providerName = new Label(this.pageObjects.providerName);
        this.providerSpecialty = new Label(this.pageObjects.providerSpecialty);
        this.providerNetwork = new Label(this.pageObjects.providerNetwork);
        this.providerFacility  = new Label(this.pageObjects.providerFacility);
        this.bjNetwork = new Label(this.pageObjects.bjNetwork);
        this.bjDeltaCare = new Label(this.pageObjects.bjDeltaCare);
        this.providerAvailability = new Label(this.pageObjects.providerAvailability);
        this.providerMap = new Label(this.pageObjects.providerMap);
        this.providerPlace = new Label(this.pageObjects.providerPlace);
        this.providerPlaceName = new Label(this.pageObjects.providerPlaceName);
        this.providerPName = new LinkText(this.pageObjects.providerPName);
        this.providerFName = new LinkText(this.pageObjects.providerFName);
        this.yelpReviewCount = new Label(this.pageObjects.yelpReviewCount);
        this.yelpRating = new Label(this.pageObjects.yelpRating);
        this.providerYelp = new LinkText(this.pageObjects.providerYelp);
        this.providerYelpName = new Label(this.pageObjects.providerYelpName);
        this.providerYelpFind = new TextBox(this.pageObjects.providerYelpFind);
        this.providerYelpNear = new TextBox(this.pageObjects.providerYelpNear);
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
        this.providersList = new Label(this.pageObjects.providersList);
        this.view = function(providerName) {
            return new Label(this.pageObjects.view(providerName));
        };
        this.placeNameByProvider = function(providerName) {
            return new Label(this.pageObjects.placeNameByProvider(providerName));
        };
        this.facilityByProvider = function(providerName) {
            return new Label(this.pageObjects.facilityByProvider(providerName));
        };
        this.Office_providerSearch = function(officeName) {
            return new Label(this.pageObjects.Office_providerSearch(officeName));
        };
        this.workatOffice = function(officeName) {
            return new Label(this.pageObjects.workatOffice(officeName));
        };

        this.workatOffice_links = function(links) {
            return new LinkText(this.pageObjects.workatOffice_links(links));
        };
        this.feedback_inaccuracy = new TextBox(this.pageObjects.feedback_inaccuracy);
        this.dontworkSubmit_inaccuracy = new Button(this.pageObjects.dontworkSubmit_inaccuracy);
        this.location = new TextBox(this.pageObjects.location);
        this.menuButton = new Button(this.pageObjects.menuButton);
        this.spanishOption = new LinkText(this.pageObjects.spanishOption);
    };

    getOfficeHoursByDay(day) {
        TextBox
        return element(this.pageObjects.officeHoursByDay(day)).getTextEx().then(function(dayinfo) {
            return (((dayinfo.split(': '))[1]).trim());
        })
    };
    getProviderAccessByfacility(facility) {
        return element(this.pageObjects.providerAccessByfacility(facility)).getTextEx();
    };
    getProviderDataByField(fieldName) {
        return element(this.pageObjects.providerDataByField(fieldName)).getTextEx();
    };

    getOfficeHours(hours) {
        if (hours == null) {
            return 'contact office for hours';
        } else {
            return hours;
        }
    }

    getandVerifyProvidersName(ptext, count) {
        var self = this;
        return browser.controlFlow().execute(function() {
            return self.providerName.getElements().each(function(element, index) {
                if(index <= count){
                return element.getText().then(function(text) {
                    expect(text).toContain(ptext);
                });
            }

            }).then(function(data) {
            })

        });
    };


    openView(providerName, option) {
        var self = this;
        browser.controlFlow().execute(function() {
            browser.wait(function() {
                return element(self.pageObjects.view(providerName)).isDisplayed().then(function(displayed) {
                    if (!displayed) element(by.linkText("Next")).clickIt();
                    return displayed;
                }, function() {
                    element(by.linkText("Next")).clickIt();
                    return false;
                });
            }, 9999999999);

            if (option) {
                console.log('View==================' + option);
                if (option.toUpperCase() == 'VIEW') self.view(providerName).click();
                if (option.toUpperCase() == 'PLACE') self.placeNameByProvider(providerName).click();
                if (option.toUpperCase() == 'FACILITY') self.facilityByProvider(providerName).click();
                if (option.toUpperCase() == 'OFFICE') self.Office_providerSearch(providerName).click();
            } else {
                self.view(providerName).click();

            }
        });
    };

    openViewControl(providerName, option, pageIterations) {
        var self = this;
        browser.controlFlow().execute(function() {
            var pageNumber = 0;
            var breakflow;
            browser.wait(function() {
                return element(self.pageObjects.view(providerName)).isDisplayed().then(function(displayed) {
                    return true;
                }, function() {
                    // console.log("===================Displayed else block =============")
                    // element(by.linkText("Next")).clickIt();
                    return element(by.linkText("Next")).clickIt().then(function() {
                        pageNumber = pageNumber + 1;
                        // console.log("=================pageNumber===========" + pageNumber);
                        // console.log("=================pageIterations===========" + pageIterations);
                        if (pageIterations >= pageNumber) {
                            // console.log("========if block ========");
                            breakflow = true;
                            return false;
                        } else {
                            breakflow = false;
                            // console.log("========else block ========")
                            return true;
                        }
                    }, function() {
                        // console.log("=======Next else=================")
                        return true;
                    })
                    return breakflow;
                });


            }, 9999999999);

            return element(self.pageObjects.view(providerName)).isDisplayed().then(function(displayed) {
                console.log("===== open view if results===")
                if (option) {
                    // console.log('View==================' + option);
                    if (option.toUpperCase() == 'VIEW') self.view(providerName).click();
                    if (option.toUpperCase() == 'PLACE') self.placeNameByProvider(providerName).click();
                    if (option.toUpperCase() == 'FACILITY') self.facilityByProvider(providerName).click();
                    if (option.toUpperCase() == 'OFFICE') self.Office_providerSearch(providerName).click();
                } else {
                    self.view(providerName).click();

                }
            }, function() {
                // console.log("=====open view else block  results===" )
                if (option.toUpperCase() == 'VIEW') self.viewLink.click();
                if (option.toUpperCase() == 'PLACE') self.providerPlaceName.click();
                if (option.toUpperCase() == 'FACILITY') self.providerFacility.click();
                if (option.toUpperCase() == 'OFFICE') self.providerPlaceName.click();
                if (option.toUpperCase() == 'OFFICE') self.providerPlaceName.click();

            })
        });
    };




    getProviderInfo() {
        var self = this;
        var providerDetails = {};
        return browser.controlFlow().execute(function() {
            self.providerName.getText().then((pname) => {
                providerDetails.providerName = pname;
            });
            self.providerSpecialty.getText().then((pspecial) => {
                providerDetails.providerSpecialty = pspecial;
            });
            self.providerNetwork.getText().then((pnetwork) => {
                providerDetails.providerNetwork = pnetwork;
            });
            self.providerAvailability.getText().then((pavail) => {
                providerDetails.providerAvailability = pavail;
            });
            self.providerPlaceName.getText().then((pplace) => {
                providerDetails.providerPlaceName = pplace;
            });
            // self.providerFacility.getText().then((pfacil) => {
            //     providerDetails.providerFacility = pfacil;
            // });
            self.providerAddressStreet.getText().then((paddst) => {
                providerDetails.providerAddressStreet = paddst;
            });
            self.providerAddressCity.getText().then((paddct) => {
                providerDetails.providerAddressCity = paddct;
            });
            self.providerAddressState.getText().then((paddstate) => {
                providerDetails.providerAddressState = paddstate;
            });
            self.providerAddressZip.getText().then((paddzip) => {
                providerDetails.providerAddressZip = paddzip;
            });
            self.providerAddressPhone.getText().then((pphone) => {
                providerDetails.providerAddressPhone = pphone;
            })
            return providerDetails;
        });
    }

    // Still in Unit Testing Phase . Will Move Locators to -locators.js file
    // var pData = {
    //     "SPECIALITY": "General Dentist",
    //     "STATE": "NY",
    //     "CITY": "New York",
    //     "ZIPCODE": "10010"
    // }
    verifyProviderLanguage(language, iterations) {
        var self = this;
        var count = 0,
            count1;
        browser.controlFlow().execute(function() {
            browser.wait(function() {
                return element(by.css('a[arialabel="Next"]')).isDisplayed().then(function(displayed) {
                    var providersList = element.all(by.css('li.provider-listing'));
                    providersList.reduce(function(prev, ele, index) {


                        var viewno = Number(index) + 1;
                        if (iterations > count) {
                            element(by.xpath('(//a[normalize-space(text()) = "View"])[' + viewno + ']')).click().then(function() {
                                count = count + 1;
                                count1 = count;
                                self.providerLanguage.getText().then(function(lang) {
                                    // console.log('Language Verified -> ' + lang);
                                })
                                expect(self.providerLanguage.getText()).toContain(language);
                                //  Debug console out in the next line.  Un comment to see the missing language problem cxinint2-1689
                                // console.log('Language Verified -> ' + language);
                                self.backToSearchResults.click();
                                browser.sleep(3000);
                            })
                        }
                    });

                    if (displayed) {
                        if (iterations > count1) {
                            return element(by.linkText("Next")).click().then(function() {
                                if (iterations > count1) {
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

                }, function(err) {
                    return true;
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
                            if (pData.SPECIALITY) {
                                ele.element(by.css('p.provider__specialty')).getText().then(function(specialty) {
                                    var specialtyindex = pData.SPECIALITY.indexOf(specialty);
                                    expect(specialtyindex).toBeGreaterThan(-1);
                                })
                            }
                            if (pData.NETWORK) {
                                ele.element(by.css('div.state-indicator.provider__network span.state-indicator__text')).getText().then(function(network) {
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
