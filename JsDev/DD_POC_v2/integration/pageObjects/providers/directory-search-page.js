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
        this.pageObjects = new DirectorySearchLocators();
        this.headerText = new Label(this.pageObjects.headerText);
        this.headerTextError = new Label(this.pageObjects.headerTextError);
        this.location = new TextBox(this.pageObjects.location);
        this.deltaDentalPPO = new CheckBox(this.pageObjects.deltaDentalPPO);
        this.deltaDentalPremier = new CheckBox(this.pageObjects.deltaDentalPremier);
        this.deltaCareUSA = new CheckBox(this.pageObjects.deltaCareUSA);
        this.keywordSearch = new TextBox(this.pageObjects.keywordSearch);
        this.findDentist = new Button(this.pageObjects.findDentist);
        this.refineSearch = new Label(this.pageObjects.refineSearch);
        this.homeAddressfromGoogleApi = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.distanceSelect = new Select(this.pageObjects.distanceSelect);
        this.insurenceNetworks = new Label(this.pageObjects.insurenceNetworks);
        this.iNDeltaDentalPPO = new CheckBox(this.pageObjects.iNDeltaDentalPPO);
        this.iNDeltaDentalPremier = new CheckBox(this.pageObjects.iNDeltaDentalPremier);
        this.iNDeltaCareUSA = new CheckBox(this.pageObjects.iNDeltaCareUSA);
        this.Specialty = new Label(this.pageObjects.Specialty);
        this.generalDentist = new CheckBox(this.pageObjects.generalDentist);
        this.endodontist = new CheckBox(this.pageObjects.endodontist);
        this.oralSurgeon = new CheckBox(this.pageObjects.oralSurgeon);
        this.orthodontist = new CheckBox(this.pageObjects.orthodontist);
        this.pediatricDentist = new CheckBox(this.pageObjects.pediatricDentist);
        this.periodontist = new CheckBox(this.pageObjects.periodontist);
        this.prosthodontist = new CheckBox(this.pageObjects.prosthodontist);
        this.publicHealthDentist = new CheckBox(this.pageObjects.publicHealthDentist);
        this.fullTimeFaculty = new CheckBox(this.pageObjects.fullTimeFaculty);
        this.hygienist = new CheckBox(this.pageObjects.hygienist);
        this.XRLaboratory = new CheckBox(this.pageObjects.XRLaboratory);
        this.oralPathology = new CheckBox(this.pageObjects.oralPathology);
        this.languages = new Label(this.pageObjects.languages);
        this.languageFilter = new Select(this.pageObjects.languageFilter);
        this.apply = new Button(this.pageObjects.apply);
        this.providersListing = new Label(this.pageObjects.providersListing);
    }
    selectHomeAddress(homeaddress) {
        var self = this;
        return browser.controlFlow().execute(function() {
            browser.sleep(2000);
            return self.homeAddressfromGoogleApi.getElements().filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    console.log("text=========" + text);
                    console.log("homeaddress==" + homeaddress);
                    return text === homeaddress;
                });
            }).first().clickIt();
        });
    };

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

    openView(providerName) {
        element(this.pageObjects.view(providerName)).clickIt();
    };

    
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
        };
    };

};

/**
 *
 * @type {DirectorySearchPage}
 */
module.exports = DirectorySearchPage;
