"use strict";
var ControlBase = require('../../controls/base-control');
var DirectorySearchLocators = require('./directory-search-locators');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of Directory Search page
 * @constructor
 */
class DirectorySearchPage extends ControlBase {

    constructor() {
        super(null, 'DirectorySearchPage');
        this.pageObjects                 = new DirectorySearchLocators();
        this.headerText                  = new Label(this.pageObjects.headerText);
        this.headerTextError             = new Label(this.pageObjects.headerTextError);
        this.location                    = new TextBox(this.pageObjects.location);
        this.deltaDentalPPO              = new CheckBox(this.pageObjects.deltaDentalPPO);
        this.deltaDentalPremier          = new CheckBox(this.pageObjects.deltaDentalPremier);
        this.deltaCareUSA                = new CheckBox(this.pageObjects.deltaCareUSA);
        this.keywordSearch               = new TextBox(this.pageObjects.keywordSearch);
        this.autoSearch                  = new Button(this.pageObjects.autoSearch);
        this.findDentist                 = new Button(this.pageObjects.findDentist);
        this.resultFreeText              = new Label(this.pageObjects.resultFreeText);
        this.refineSearch                = new Label(this.pageObjects.refineSearch);
        this.homeAddressfromGoogleApi    = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.distanceSelect              = new Select(this.pageObjects.distanceSelect);
        this.providerYelp                = new LinkText(this.pageObjects.providerYelp);
        this.yelpReviewCount             = new Label(this.pageObjects.yelpReviewCount);
        this.yelpRating                  = new Label(this.pageObjects.yelpRating);
        // this.insurenceNetworks        = new Label(this.pageObjects.insurenceNetworks);
        this.iNDeltaDentalPPO            = new CheckBox(this.pageObjects.iNDeltaDentalPPO);
        this.iNDeltaDentalPremier        = new CheckBox(this.pageObjects.iNDeltaDentalPremier);
        this.iNDeltaCareUSA              = new CheckBox(this.pageObjects.iNDeltaCareUSA);
        this.Specialty                   = new Label(this.pageObjects.Specialty);
        this.generalDentist              = new CheckBox(this.pageObjects.generalDentist);
        this.endodontist                 = new CheckBox(this.pageObjects.endodontist);
        this.oralSurgeon                 = new CheckBox(this.pageObjects.oralSurgeon);
        this.orthodontist                = new CheckBox(this.pageObjects.orthodontist);
        this.pediatricDentist            = new CheckBox(this.pageObjects.pediatricDentist);
        this.periodontist                = new CheckBox(this.pageObjects.periodontist);
        this.prosthodontist              = new CheckBox(this.pageObjects.prosthodontist);
        this.publicHealthDentist         = new CheckBox(this.pageObjects.publicHealthDentist);
        this.fullTimeFaculty             = new CheckBox(this.pageObjects.fullTimeFaculty);
        this.hygienist                   = new CheckBox(this.pageObjects.hygienist);
        this.XRLaboratory                = new CheckBox(this.pageObjects.XRLaboratory);
        this.oralPathology               = new CheckBox(this.pageObjects.oralPathology);
        this.languages                   = new Label(this.pageObjects.languages);
        this.languageFilter              = new Select(this.pageObjects.languageFilter);
        this.apply                       = new Button(this.pageObjects.apply);
        this.providersListing            = new Label(this.pageObjects.providersListing);
        this.countOfProviders            = new Label(this.pageObjects.countOfProviders);
        this.headerTextProviderListError = new Label(this.pageObjects.headerTextProviderListError);
        this.backtosearch                = new Label(this.pageObjects.backtosearch);
        this.filterReset                 = new Button(this.pageObjects.filterReset);
        this.goBackToOldSite             = new Button(this.pageObjects.goBackToOldSite);
        this.checkItOutNewSite           = new Button(this.pageObjects.checkItOutNewSite);
        this.oldLocation                 = new TextBox(this.pageObjects.oldLocation);
        this.oldDeltaDentalPPO           = new CheckBox(this.pageObjects.oldDeltaDentalPPO);
        this.oldDeltaDentalPremier       = new CheckBox(this.pageObjects.oldDeltaDentalPremier);
        this.oldDeltaDentalUSA           = new CheckBox(this.pageObjects.oldDeltaDentalUSA);
        this.oldSearch                   = new Button(this.pageObjects.oldSearch);
        this.oldKeyword                  = new TextBox(this.pageObjects.oldKeyword);
        this.spanish_finddentist         = new Button(this.pageObjects.spanish_finddentist);
    }
    /**
     * Select Address from the dropdown
     * @param {homeaddress} homeaddress
     */
    selectHomeAddress(homeaddress) {
        var self = this;
        return browser.controlFlow().execute(function() {
            browser.sleep(2000);
            return self.homeAddressfromGoogleApi.getElements().filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    return text === homeaddress;
                });
            }).first().clickIt();
        });
    };
    /**
     * Selects all sections from specialties
     */

    speciltyCheck() {
        this.filterMenuItem('Specialties').click();
        this.endodontist.check();
        this.oralSurgeon.check();
        this.orthodontist.check();
        this.pediatricDentist.check();
        this.periodontist.check();
        this.prosthodontist.check();
        this.publicHealthDentist.check();
        this.fullTimeFaculty.check();
        this.hygienist.check();
        this.XRLaboratory.check();
        this.oralPathology.check();
    };

    /**
     * Returns Provider Count
     * @returns {Promise<Number>} providercount
     */
    getProvidersCount() {
        var self = this;
        return browser.controlFlow().execute(function() {
            return self.countOfProviders.getText().then(function(count) {
                if (!count.length == 0) {
                    var pCount = count.split(' ');
                    var pcount = pCount[2].split(',');
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    return (pcount.reduce(reducer));
                } else {
                    return 0;
                }
            }, function() {
                return 0;
            });
        });
    };

    /**
     * Verifies address from auto suggestions dropdown and returns address array
     * @param {homeaddress} homeaddress
     * @returns {Promise<String>} addressArray
     */
    getandVerifyallAddressSuggestions(ptext) {
        var dataarray = [];
        var self = this;
        return browser.controlFlow().execute(function() {
            return self.homeAddressfromGoogleApi.getElements().each(function(element, index) {
                return element.getText().then(function(text) {
                    expect(text).toContain(ptext);
                    return dataarray.push(text);
                });

            }).then(function(data) {
                return dataarray;
            })

        });
    };
    /**
     * Performs Click operation on view link
     */
    openView(providerName) {
        element(this.pageObjects.view(providerName)).clickIt();
    };
    /**
     * Returns webelement of menu item
     * @param {String} menuname 
     * @returns {WebElement}
     */
    filterMenuItem(filterMenuName) {
        return new Label(this.pageObjects.filterMenuItem(filterMenuName));
    };
    /**
     * Returns webelement of Specialty check box
     * @param {String} SpecialityName 
     * @returns {WebElement}
     */
    checkSpecialty(SpecialityName) {

        return new CheckBox(this.pageObjects.checkSpecialty(SpecialityName));
    };
    /**
     * Clears search results
     */
    clearSearch() {
        element.all(by.xpath('//div[@class="specialty-menu"]//label/input')).each(function(ele, index) {
            ele.isSelected().then(function(status) {
                if (status) {
                    ele.click();
                }
            })
        })
    }
    /**
     * Selects specialties
     * @param {Array} specialities 
     */
    selectSpecialities(specialities) {
        var self = this;
        return browser.controlFlow().execute(function() {
            self.getSpecialities().then(function(spl) {
                self.clearSearch();
                specialities.forEach(function(sp, index) {
                    var sindex = spl.indexOf(sp.toUpperCase()) + 1;
                    var chkbox = element(by.xpath('//div[@class="specialty-menu"]//label[' + sindex + ']'));
                    chkbox.isSelected().then(function(status) {
                        if (!status) {
                            browser.sleep(1000)
                            chkbox.click();
                        }
                    })
                })
            })
        })
    }
    /**
     * Returns specialties
     * @returns {Promise<Array>} specialities 
     */
    getSpecialities() {
        var spl = [];
        return browser.controlFlow().execute(function() {
            element.all(by.xpath('//div[@class="specialty-menu"]//label')).each(function(ele, index) {
                ele.getText().then(function(elem) {
                    spl.push(elem.toUpperCase());
                });
            });
            return spl;
        });
    }

    /**
     * Returns webelement of Network check box
     * @param {String} networkname 
     * @returns {WebElement}
     */
    checkNetwork(NetworkName) {

        return new CheckBox(this.pageObjects.checkNetwork(NetworkName));
    };

    /**
     * Selects networks
     * @param {Array} networks 
     */

    selectNetwork(network) {
        var net = ["DELTA DENTAL PPO", "DELTA DENTAL PREMIER", "DELTACARE USA"];
        network.forEach(function(nt, index) {

            var nindex = net.indexOf(nt.toUpperCase()) + 1;
            var chkbox = element(by.xpath('//div[@class="network-menu"]//label[' + nindex + ']'));
            chkbox.isSelected().then(function(status) {
                if (!status) {
                    browser.sleep(1000)
                    chkbox.click();
                }
            })
        })
    }
    /**
     * Returns provider details based on given provider name 
     * @param {String} providerName 
     * @param {String} providerAttribute 
     * @returns {Promise<String>} providerdetails
     */

    getProviderdetails(providerName, providerAttribute) {
        switch (providerAttribute.toUpperCase()) {
            case 'PROVIDER':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerName).getText();;
                break;
            case 'SPECIALTY':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.specialty).getText();;
                break;
            case 'PLACENAME':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerPlaceName).getText();;
                break;
            case 'ADDRESS':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerAddress).getText();;
                break;
            case 'NETWORK':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerNetwork).getText();;
                break;
            case 'MILAGE':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerDistance).getText();;
                break;
            case 'YELP':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.providerYelp).getText();;
                break;
            case 'YelpReviewCount':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.yelpReviewCount).getText();;
                break;
            case 'YelpRating':
                return element(this.pageObjects.provider(providerName)).element(this.pageObjects.yelpRating).getText();;
                break;
        };
    };

};

/**
 *
 * @type {DirectorySearchPage}
 */
module.exports = DirectorySearchPage;