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
    };

    getOfficeHoursByDay(day) {
        return element(this.pageObjects.officeHoursByDay(day)).getTextEx().then(function(dayinfo){
        	return (((dayinfo.split(':'))[1]).trim());
        })
    };
    getProviderAccessByfacility(facility) {
        return element(this.pageObjects.providerAccessByfacility(facility)).getTextEx().then(function(accessinfo){
        	return (((accessinfo.split(':'))[1]));
        })
    };
    getProviderDataByField(fieldName) {
        return element(this.pageObjects.providerDataByField(fieldName)).getTextEx();
    };
};

/**
 *
 * @type {ProviderDetailsPage}
 */
module.exports = ProviderDetailsPage;
