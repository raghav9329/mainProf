var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1548PersInfo.json');
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var states     = ['CA', 'TX', 'PA', 'FL', 'NY', 'DC', 'LA', 'MD', 'PR', 'TN', 'VI', 'AK', 'AL','DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV', 'CT', 'IL', 'OH', 'WA', 'KY', 'MN', 'NH', 'NM', 'OK', 'KS', 'ME', 'RI', 'VT'];
//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1548-Personal Info Page: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {

                    beforeAll(function() {
                         jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    beforeEach(function() {
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });

                    it('Validating Home address fileds with errormessage and green checkmark', function() {
                        var data = sData.Personalinfo.HAddress1;
                        perInfo.fieldHomeAddr.setText(data.Home + '\t');
                        perInfo.fieldCity.setText(data.City + '\t');
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg,'Verifies that "Error Message" should be '+data.ErrorMsg);
                        perInfo.fieldHomeAddr.setText(data.HomeValid + '\t');
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Home Address Filed" should be '+data.ariainvalid);

                    });

                    it('Validating Home address fileds with green checkmark', function() {
                        var data = sData.Personalinfo.HAddress1;
                        perInfo.fieldHomeAddr.setText(data.HomeValid + '\t');
                        perInfo.fieldCity.setText(data.City + '\t').then(function() {
                            Utility.delay(PAGELOADTIME);
                            expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Home Address Filed" should be '+data.ariainvalid);
                        });
                    });

                    it('Validating Home address fileds with City Auto Correct', function() {
                        var data = sData.Personalinfo.HAddress2;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldCity.setText(data.City + '\t');
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.fieldCity.getAttribute("value")).toEqual(data.City_Auto,'Verifies that "City Filed" should be '+data.City_Auto);
                    });

                    it('Validating Home address fileds with City & State Auto Correct', function() {
                        var data = sData.Personalinfo.HAddress3;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldCity.setText(data.City);
                        perInfo.fieldState.setText(data.State + '\t');
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.fieldCity.getAttribute("value")).not.toEqual(data.City,'Verifies that "City Filed" should be '+data.City);
                        expect(perInfo.fieldState.getAttribute("value")).not.toEqual(data.State,'Verifies that "State Filed" should be '+data.State);
                    });

                    it('Validating Home address fileds with Special Characters', function() {
                        var data = sData.Personalinfo.HAddress4;
                        perInfo.fieldHomeAddr.setText(data.Home + '\t');
                        perInfo.fieldCity.setText(data.City + '\t');
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg,'Verifies that "Home Address Filed Error Message" should be '+data.ErrorMsg);
                    });

                    it('Validating Home address fileds with Invalid Data', function() {
                        var data = sData.Personalinfo.HAddress5;
                        perInfo.fieldHomeAddr.setText(data.Home + '\t');
                        perInfo.fieldCity.setText(data.City + '\t');
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg1,'Verifies that "Home Address Filed Error Message" should be '+data.ErrorMsg1);
                        perInfo.fieldState.setText(data.State + '\t');
                        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg0,'Verifies that "Home Address Filed Error Message" should be '+data.ErrorMsg0);
                        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg3,'Verifies that "ZIP Code Filed Error Message" should be '+data.ErrorMsg3);
                        Utility.delay(PAGELOADTIME);
                        perInfo.errMsgHomeAddr.click();
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Home Address Filed" should be '+data.ariainvalid);
                    });

                    it('Validating Home address fileds with address Suggestions', function() {
                        var data = sData.Personalinfo.HAddress6;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldCity.setText(data.City + '\t');
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg0,'Verifies that "Home Address Filed Error Message" should be '+data.ErrorMsg0);
                    });

                    it('Validating Home address fileds with correct address as per Zipcode with apt/suite/floor number', function() {
                        var data = sData.Personalinfo.HAddress7;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        perInfo.fieldHomeAddr.setText(data.AppendHome, true);
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Home Address Filed" should be '+data.ariainvalid);
                    });

                    it('Validating Home address fileds with correct address as per Zipcode without apt', function() {
                        var data = sData.Personalinfo.HAddress8;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Home Address Filed" should be '+data.ariainvalid);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "City Filed" should be '+data.ariainvalid);
                        expect(perInfo.fieldState.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "State Filed" should be '+data.ariainvalid);
                        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(data.ariainvalid,'Verifies that "Zip Code Filed" should be '+data.ariainvalid);
                    });


                    it('Validating Home address fileds with Incorrect address not as per zipcode', function() {
                        var data = sData.Personalinfo.HAddress9;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        Utility.delay(PAGELOADTIME);
                        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(data.ZIPcode,'Verifies that "Zip Code Filed" should be '+data.ZIPcode);
                    });

                });
            }
        });
    }
});
