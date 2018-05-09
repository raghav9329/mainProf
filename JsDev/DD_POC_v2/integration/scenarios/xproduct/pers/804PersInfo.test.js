//CXINIT-804 : [Personal Info Page] Default Zip Code Pop Up

/*As a product owner I want to warn the user of change in zip code 
since a change in zip code may impact product availability and product price.*/

"use strict"
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.804PersInfo.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));

//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('804: Zip Code Popup validation ' + sdescription + 'Product:' + pdescription + ' ', function() {
                    //State and zipcode are pre-filled.State-CA & Zipcode-94560
                    beforeAll(function() {
                        console.log('cxinit 804');
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });
                    //Validated the Zip code Pop up when the Zipcode is update to new value in the Home address value
                    //Verify the Zip code Pop Options available with the New Quote and GoBack
                    it('Verify the functionality of Go Back link in Zip code pop Up while Updating Home address', function() {
                        perInfo.fieldHomeAddr.setText(sData.HAddress_ZIP.PartialAddress);
                        perInfo.selectHomeAddress(sData.HAddress_ZIP.FullAddress);
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopUp.getText()).toContain(tData.Ziperror);
                        perInfo.zipPopBack.click();
                        expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual('');
                        expect(perInfo.fieldState.getAttribute("value")).toEqual(sData.Address_Valid.State);
                        expect(perInfo.fieldCity.getAttribute("value")).toEqual('');
                        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(sData.ZipCode);
                    });

                    //Validate the Change Zip code Pop up is displayed when the zipcode value is changed

                    /* CXINIT-1450 is the defect for the Error Page displayed after the New Quote Button is clicked */

                    it('Verify the functionality of New Quote button in Zip code pop Up while Updating Home address', function() {
                        perInfo.fieldHomeAddr.setText(sData.HAddress_ZIP.PartialAddress);
                        perInfo.selectHomeAddress(sData.HAddress_ZIP.FullAddress);
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopUp.getText()).toContain(sData.Ziperror);
                        perInfo.zipPopNewQuote.click();
                        expect(browser.getTitle()).toContain(sData.Title);
                    });

                    //Update the home Address and Zipcode 
                    //Navigate back to the

                    it('Verify the functionality of Go Back link in Zip code pop Up while changing zip code', function() {
                        perInfo.fieldHomeAddr.setText(sData.Address_Valid.HomeAddress);
                        perInfo.fieldState.setText(sData.Address_Valid.State);
                        perInfo.fieldCity.setText(sData.Address_Valid.City);
                        perInfo.fieldZipCode.setText(sData.ZipCode2);
                        perInfo.fieldPhoneNumber.setText('');
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopUp.getText()).toContain(sData.Ziperror);
                        perInfo.fieldPhoneNumber.setText('');
                        perInfo.zipPopBack.click();
                        // expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual(TestData.Address_Valid.HomeAddress);
                        // expect(perInfo.fieldState.getAttribute("value")).toEqual(TestData.Address_Valid.State);
                        // expect(perInfo.fieldCity.getAttribute("value")).toEqual(TestData.Address_Valid.City);
                        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(sData.ZipCode);
                    });

                    //Verify and Validate the New Quote button in the Change zipcode Pop up

                    /* CXINIT-1450 is the defect for the Error Page displayed after the New Quote Button is clicked */

                    it('Verify the functionality of New Quote button in Zip code pop Up while changing zip code', function() {
                        perInfo.fieldHomeAddr.setText(sData.Address_Valid.HomeAddress);
                        perInfo.fieldState.setText(sData.Address_Valid.City);
                        perInfo.fieldCity.setText(sData.Address_Valid.State);
                        perInfo.fieldZipCode.setText(sData.ZipCode2);
                        perInfo.fieldPhoneNumber.setText('');
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.zipPopNewQuote.click();
                        expect(browser.getTitle()).toContain(sData.Title);
                    });

                });
            }
        });
    }
});
