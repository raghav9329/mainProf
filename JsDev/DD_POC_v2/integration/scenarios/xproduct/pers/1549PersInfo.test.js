var TestData = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1549PersInfo.json');

var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));

var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['NY'];

//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1549- Personal Info Page:' + sdescription + 'Product:' + pdescription + ' ', function() {
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXINIT-1549 PersInfo AddrValidate ---')
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.fillPersonalInfo(tData);
                        perInfo.fillAddress(tData);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    it('Validating Home address fileds with errormessage and green checkmark', function() {
                        var data = sData.Personalinfo.HAddress1;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
                        perInfo.hiddenfieldMailAddr.setText(data.HomeValid + '\t');
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(tData.ariainvalid);

                    });

                    it('Validating Home address fileds with green checkmark', function() {
                        var data = sData.Personalinfo.HAddress1;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.HomeValid + '\t');
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t').then(function() {
                            expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(tData.ariainvalid);
                        });
                    });

                    it('Validating Home address fileds with City Auto Correct', function() {
                        var data = sData.Personalinfo.HAddress2;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.hiddenfieldCity.getAttribute("value")).toEqual(data.City_Auto);
                    });

                    it('Validating Home address fileds with City & State Auto Correct', function() {
                        var data = sData.Personalinfo.HAddress3;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.hiddenfieldCity.getAttribute("value")).not.toEqual(data.City);
                        expect(perInfo.hiddenfieldState.getAttribute("value")).not.toEqual(data.State);
                    });

                    it('Validating Home address fileds with Special Characters', function() {
                        var data = sData.Personalinfo.HAddress4;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
                    });

                    it('Validating Home address fileds with Invalid Data', function() {
                        var data = sData.Personalinfo.HAddress5;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg1);
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg1);
                        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg3);
                        perInfo.servererrMailAddr.click();
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
                    });

                    it('Validating Home address fileds with address Suggestions', function() {
                        var data = sData.Personalinfo.HAddress6;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City + '\t');
                        perInfo.hiddenfieldState.setText(data.State + '\t');
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
                    });

                    it('Validating Home address fileds with correct address as per Zipcode with apt/suite/floor number', function() {
                        var data = sData.Personalinfo.HAddress7;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        perInfo.hiddenfieldMailAddr.setText(data.AppendHome, true);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
                    });

                    it('Validating Home address fileds with correct address as per Zipcode without apt', function() {
                        var data = sData.Personalinfo.HAddress8;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(data.ariainvalid);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(data.ariainvalid);
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(data.ariainvalid);
                    });


                    it('Validating Home address fileds with Incorrect address not as per zipcode', function() {
                        var data = sData.Personalinfo.HAddress9;
                        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.selectHomeAddress(data.SelectHome);
                        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).not.toEqual(data.ZIPcode);
                    });

                });
            }
        });
    }
});
