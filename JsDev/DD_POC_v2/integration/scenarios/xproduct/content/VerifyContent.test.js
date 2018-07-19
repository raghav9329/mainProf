var TestData = require('../../../testData/' + testDataEnv + '/dhmo/CXAUTO_101.test.json');
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var footer = new(require('../../../pageObjects/cxinit/footer-page.js'));
var shopping = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var cData = '';

var product = ['DHMOA', 'DPPOA', 'DPPOB'];

// var product = ['DHMOA', 'DHMOB', 'DPPOA', 'DPPOB', 'AHMO', 'APPOA', 'APPOB'];


//'DHMOA', 'DHMOB', 'DPPOA', 'DPPOB', 'AHMO', 'APPOA', 'APPOB'
dataProvider(TestData.states, function(sData, sdescription) {

    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('CXAUTO-101: Content Validation-||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                        if (tData.product == 'DELTA') {
                            cData = sData.delta;
                        }
                        if (tData.product == 'AARP') {
                            cData = sData.aarp;
                        }
                    });

                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.waitUntilPageLoaded();
                    });

                    if (isExecutionFromUI) {
                        it('Verify the Copy Right text in footer when we land on Get-a-Quote Page for the first time (no State is selected at this point)', function() {
                            //Footer Text 1
                            expect(footer.copyright.getText()).toEqual(cData.copyright,'Verifies that "Copyright" Should be '+cData.copyright);
                        });

                        it('Verify Universal Footer text when we land on Get-a-Quote Page for the first time (no State is selected at this point)', function() {
                            //Footer Text 2
                            if (tData.product == 'DELTA') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer,'Verifies that "Discaimer" Should be '+TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.aarp_disclaimer,'Verifies that "Discaimer" Should be '+TestData.aarp_disclaimer);
                                }));
                            }

                        });

                        it('Verify the footer disclaimer in session/server time out page', function() {
                            if (tData.product == 'DELTA') {
                                enrollPage.deltaEnroll(tData.enrollData);
                            }

                            if (tData.product == 'AARP') {
                                enrollPage.aarpEnroll(tData.enrollData);
                            }
                            shopping.Showplans.click();
                            planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                            browser.executeScript('window.sessionStorage.clear();');
                            browser.executeScript('window.localStorage.clear();');
                            browser.manage().deleteAllCookies();
                            browser.navigate().refresh();
                            planDetails.buyPlan.click();
                            if (tData.product == 'DELTA') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer,'Verifies that "Discaimer" Should be '+TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(sData.disclaimer,'Verifies that "Discaimer" Should be '+sData.disclaimer);
                                }));
                            }
                            Utility.openApplication('', tData.product);

                        })
                        it('Verify the footer disclaimer in technical issue page', function() {
                            if (tData.product == 'DELTA') {
                                enrollPage.deltaEnroll(tData.enrollData);
                            }

                            if (tData.product == 'AARP') {
                                enrollPage.aarpEnroll(tData.enrollData);
                            }
                            shopping.Showplans.click();
                            planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                            planDetails.buyPlan.click();
                            browser.getCurrentUrl().then(function(url) {
                                browser.navigate().to(url.replace('personal-info', 'receipt'))
                            })

                            if (tData.product == 'DELTA') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer,'Verifies that "Discaimer" Should be '+TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(sData.disclaimer,'Verifies that "Discaimer" Should be '+sData.disclaimer);
                                }));
                            }
                            Utility.openApplication('', tData.product);
                        })


                        if (tData.product == 'DELTA') {
                            it('Navigate to Plan Options Page', function() {
                                enrollPage.deltaEnroll(tData.enrollData);
                                shopping.Showplans.click();
                                expect(planOptions.isAt()).toBe(true,'Verifies that user should be in Plan Options Page');
                            })
                        }

                        if (tData.product == 'AARP') {
                            it('Verify the contract Number in Plan Options Page', function() {
                                enrollPage.aarpEnroll(tData.enrollData);
                                shopping.Showplans.click();
                                //Form Number
                                expect(footer.contractNumber.getText()).toEqual(tData.contractNumber,'Verifies that "Contract Number" Should be '+tData.contractNumber);
                            });
                        }

                    } else {
                        it('Navigate to Plan Options Page', function() {
                            Utility.openApplication(browser.params.baseUrl + '/shopping/delta/test');
                            shopping.Zipcode.setText(tData.enrollData.ZIPcode);
                            element(by.name('issuerCode')).clear();
                            element(by.name('issuerCode')).sendKeys(tData.enrollData.IssuerCode.toLowerCase());
                            shopping.Submit.click();

                        })
                    }

                    it('Verify the Get-a-Quote Page title', function() {
                        planOptions.edit.click();
                        //Quotes-Information
                        expect(browser.getTitle()).toEqual('Get A Quote','Verifies that Page Title should be "Get A Quote"');
                        shopping.NoOFCovered_getAQuote.setText(3 + '\t');
                    });
                    it('Verify the Quotes-Information text in Get-a-Quote Page', function() {
                        //Quotes-Information
                        expect(enrollPage.quoteInfoTxt.getText()).toEqual(cData.quoteInfoTxt,'Verifies that "Quote Info Text" should be '+cData.quoteInfoTxt);
                    });
                    it('Verify the Zip code text in Get-a-Quote Page', function() {
                        //Quotes-Zip Code
                        expect(enrollPage.quoteZipTxt.getText()).toEqual(cData.quoteZipTxt,'Verifies that "Quote ZIP Text" should be '+cData.quoteZipTxt);
                    });
                    it('Verify the DOB text in Get-a-Quote Page', function() {
                        //Quotes-Dependents
                        expect(enrollPage.quotesDepTxt.getText()).toEqual(cData.quotesDepTxt,'Verifies that "Quote Dependents Text" should be '+cData.quotesDepTxt);
                    });

                    if (tData.product == 'DELTA') {
                        it('Verify the Dependents DOB text in Get-a-Quote Page', function() {
                            shopping.addDependent.click();
                            shopping.addDependent.click();
                            //Quotes-Dependents
                            expect(enrollPage.birtdateText.getText()).toEqual(cData.birthdatetext,'Verifies that "Birth Date Text" should be '+cData.birthdatetext);
                        });

                        it('Verify the dependent-1 DOB text in Get-a-Quote Page', function() {
                            expect(enrollPage.depBirthDayText(1).getText()).toEqual(cData.dep1birthdatetext,'Verifies that "Dep1 Birth Date Text" should be '+cData.dep1birthdatetext);
                        });
                        it('Verify the dependent-2 DOB text in Get-a-Quote Page', function() {
                            expect(enrollPage.depBirthDayText(2).getText()).toEqual(cData.dep2birthdatetext,'Verifies that "Dep2 Birth Date Text" should be '+cData.dep2birthdatetext);
                            shopping.removeDependent.click();
                            shopping.removeDependent.click();
                        });
                    }
                    if (tData.product == 'AARP') {
                        it('Verify the Contract Number in Get-a-Quote Page', function() {
                            //Form Number on Get-a-Quote Page
                            expect(footer.contractNumber.getText()).toEqual(cData.contractNumberQuote,'Verifies that "Contract Number Quote" should be '+cData.contractNumberQuote);
                        });
                    }

                    it('Verify the Copy Right text in footer on Get-a-Quote Page (after a State is selected)', function() {
                        //Footer Text 1
                        expect(footer.copyright.getText()).toEqual(cData.copyright,'Verifies that "Footer Copy Right" should be '+cData.copyright);
                    });
                    it('Verify Universal Footer text on Get-a-Quote Page (after a State is selected)', function() {
                        //Footer Text 2
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer,'Verifies that "Disclaimer"Should be '+cData.disclaimer);
                        }));
                    });

                    it('Verify the Copy Right in footer on Plan Options Page', function() {
                        shopping.NoOFCovered_getAQuote.setText(1 + '\t');
                        expect(shopping.Showplans.getText()).toEqual(sData.showplansText,'Verifies that "Showplans Text" Should be '+sData.showplansText);
                        shopping.Showplans.click();
                        //Footer Text 1
                        expect(footer.copyright.getText()).toEqual(cData.copyright,'Verifies that "Copy Right" Should be '+cData.copyright);
                    });
                    it('Verify the Universal Footer on Plan Options Page', function() {
                        //Footer Text 2
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer,'Verifies that "Disclaimer" should be '+cData.disclaimer);
                        }));
                    });
                    it('Verify the plan options results header in plan options page', function() {
                        //Plan Options Result Header
                        expect(planOptions.planSummary.getText()).toContain(cData.planSummary,'Verifies that " Plan Summary" should be '+cData.planSummary);
                    });

                    if (tData.product == 'AARP') {
                        it('Verify the Plan Content by Plan ', function() {
                            expect(planOptions.getPlanContent(cData.plan1).getText()).toContain(cData.plan1Info,'Verifies that "Plan Info" should be '+cData.plan1Info);
                            expect(planOptions.getPlanContent(cData.plan2).getText()).toContain(cData.plan2Info,'Verifies that "Plan Info" should be '+cData.plan2Info);
                            if (['CA', 'TX', 'PA', 'FL', 'NY'].indexOf(sdescription) !== -1) expect(planOptions.getPlanContent(cData.plan3).getText()).toContain(cData.plan3Info,'Verifies that "Plan Info" should be '+cData.plan3Info);

                        })
                        it('Verify the DeltaDental Highlights title in plan options page', function() {
                            //Plan Options-Highlights Titles
                            expect(planOptions.aDeltaDentalHighlightsHeader.getText()).toEqual(cData.deltaDentalHighlightsHeader,'Verifies that "Header" should be '+cData.deltaDentalHighlightsHeader);
                        });
                        if (pdescription == 'AHMO') {
                            it('Verify the Delta Care Highlights title in plan options page', function() {
                                expect(planOptions.aDeltaCareHighlightsHeader.getText()).toEqual(cData.deltaCareHighlightsHeader,'Verifies that "Header" should be '+cData.deltaCareHighlightsHeader);
                            });
                        }

                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdeltaDentalHighlights().then(function(text) {
                                if (text.includes('network')) {
                                    expect(text.replace(/(with)(.+?)(?= network)/, "$1 XXX").replace(/\r?\n|\r/g, "")).toEqual(cData.deltadentalhighlights,'Verifies that "Highlights" should be '+cData.deltadentalhighlights);

                                } else {
                                    expect(text.replace(/(with)(.+?)(?= network)/, "$1 XXX").replace(/\r?\n|\r/g, "")).toEqual(cData.deltadentalhighlights.replace(/(Save)(.+?)(?=Implants)/, ""),'Verifies that "Highlights" should be '+cData.deltadentalhighlights.replace(/(Save)(.+?)(?=Implants)/, ""));

                                }
                            })

                        });
                        if (pdescription == 'AHMO') {
                            it('Verify the Delta Care plan details Highlights', function() {
                                planOptions.getdeltaCareHighlights().then(function(text) {
                                    expect(text.replace(/(from)(.+?)(?= primary)/, "$1 XXX").replace(/\r?\n|\r/g, "")).toEqual(cData.deltacarehighlights,'Verifies that "Highlights" should be '+cData.deltacarehighlights);
                                })
                            });

                        }
                    };
                    if (tData.product == 'DELTA') {
                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdDeltaDentalHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Network)/, "$1 XXX").replace(/\r?\n|\r/g, "")).toContain(cData.dDeltadentalhighlights,'Verifies that "Highlights" should be '+cData.dDeltadentalhighlights);
                            });
                        });
                        if(cData.dDeltacarehighlights){
                        it('Verify the Delta Care plan details Highlights', function() {
                            planOptions.getdDeltaCareHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Primary)/, "$1 XXX").replace(/\r?\n|\r/g, "")).toContain(cData.dDeltacarehighlights,'Verifies that "Highlights" should be '+cData.dDeltacarehighlights);
                            });
                        });
                        }


                        it('Verify the Plan price by plan ', function() {

                            planOptions.getPlanPriceDetails(cData.plan1).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan1Price,'Verifies that "Price" should be '+cData.plan1Price);
                            });
                            planOptions.getPlanPriceDetails(cData.plan2).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan2Price,'Verifies that "Price" should be '+cData.plan2Price);
                            });
                            if (cData.plan3) {

                                planOptions.getPlanPriceDetails(cData.plan3).getText().then(function(price) {
                                    expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan3Price,'Verifies that "Price" should be '+cData.plan3Price);
                                });
                            }
                            if (cData.plan4) {
                                planOptions.getPlanPriceDetails(cData.plan4).getText().then(function(price) {
                                    expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan4Price,'Verifies that "Price" should be '+cData.plan4Price);
                                });
                            }

                        });


                        it('Verify the Plan Content by plan ', function() {
                            expect(planOptions.getPlanContent(cData.plan1).getText()).toContain(cData.plan1Info,'Verifies that Plan Info should be '+cData.plan1Info);
                            expect(planOptions.getPlanContent(cData.plan2).getText()).toContain(cData.plan2Info,'Verifies that Plan Info should be '+cData.plan2Info);
                            if (cData.plan3) expect(planOptions.getPlanContent(cData.plan3).getText()).toContain(cData.plan3Info,'Verifies that Plan Info should be '+cData.plan3Info);
                            if (cData.plan4) expect(planOptions.getPlanContent(cData.plan4).getText()).toContain(cData.plan4Info,'Verifies that Plan Info should be '+cData.plan4Info);

                        })
                        it('Verify the plan starts from by plan', function() {
                            expect(planOptions.getPlanStartsFrom(cData.plan1).getText()).toContain(cData.startsfrom,'Verifies that "Plan Starts from" should be '+cData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(cData.plan2).getText()).toContain(cData.startsfrom,'Verifies that "Plan Starts from" should be '+cData.startsfrom);
                            if (cData.plan3) expect(planOptions.getPlanStartsFrom(cData.plan3).getText()).toContain(cData.startsfrom,'Verifies that "Plan Starts from" should be '+cData.startsfrom);
                            if (cData.plan4) expect(planOptions.getPlanStartsFrom(cData.plan4).getText()).toContain(cData.startsfrom,'Verifies that "Plan Starts from" should be '+cData.startsfrom);

                        })
                    }



                    it('Verify the Plan Options-Tag Line', function() {
                        //Plan Options-Tag Line
                        planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                    });
                    it('Verify Plan details Summary in plan details page', function() {

                        //Plan Details Highlight
                        expect(planDetails.shoppingDetailsSummary.getText()).toContain(tData.shoppingDetailsSummary,'Verifies that "Shopping Details Summary" Should be '+tData.shoppingDetailsSummary);
                        planDetails.findLink.getText().then(function(text) {
                            expect(text.replace(/(\r\n\t|\n|\r\t)/gm, "")).toEqual(tData.shoppingFindLink,'Verifies that "Shopping Find Link" Should be '+tData.shoppingFindLink);
                        })



                    });
                    it('Verify the plan details disclaimer', function() {
                        //You Pay
                        expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer,'Verifies that "Shopping Feature Disclaimer" should be '+tData.shoppingFeatureDisclaimer);

                    });
                    if (tData.product == 'DELTA') {

                        it('Verify the Headers in the Plan Summary of the of the Delta Product', function() {

                            planDetails.shopping_details_highlightsByIndex(1).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.shoppingHeaderCost,'Verifies that "Shopping Heade Cost" should be '+tData.shoppingHeaderCost);
                            });
                            planDetails.shopping_details_highlightsByIndex(2).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.shoppingHeaderAnnualDed,'Verifies that "Shopping Header Annualed" should be '+tData.shoppingHeaderAnnualDed);
                            });
                            planDetails.shopping_details_highlightsByIndex(3).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.shoppingHeaderAnnualMax,'Verifies that "Shopping Header Annual Max" should be '+tData.shoppingHeaderAnnualMax);
                            });
                            planDetails.shopping_details_highlightsByIndex(4).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.shoppingHeaderNwkDentist,'Verifies that "Shopping Header Network Dentist" should be '+tData.shoppingHeaderNwkDentist);
                            });
                            /*expect(planDetails.shopping_details_highlightsByIndex(1).getText()).toContain(tData.shoppingHeaderCost);
                            expect(planDetails.shopping_details_highlightsByIndex(2).getText()).toContain(tData.shoppingHeaderAnnualDed);
                            expect(planDetails.shopping_details_highlightsByIndex(3).getText()).toContain(tData.shoppingHeaderAnnualMax);
                            expect(planDetails.shopping_details_highlightsByIndex(4).getText()).toContain(tData.shoppingHeaderNwkDentist);*/
                            expect(planDetails.shopping_details_highlightsInfoBYIndex(1).getText()).toContain(tData.shoppingInfo1,'Verifies that "Shopping Info" should be '+tData.shoppingInfo1);
                            expect(planDetails.shopping_details_highlightsInfoBYIndex(2).getText()).toContain(tData.shoppingInfo2,'Verifies that "Shopping Info" should be '+tData.shoppingInfo2);
                            expect(planDetails.shopping_details_highlightsInfoBYIndex(3).getText()).toContain(tData.shoppingInfo3,'Verifies that "Shopping Info" should be '+tData.shoppingInfo3);
                            planDetails.shopping_details_highlightsInfoBYIndex(4).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.shoppingInfo4,'Verifies that "Shopping Info" should be '+tData.shoppingInfo4);
                            })
                        })

                        it('Verify the name of the PDF documents', function() {
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(cData.pdfText1,'Verifies taht "PDF document" name should be '+cData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(cData.pdfText2,'Verifies taht "PDF document" name should be '+cData.pdfText2);

                        });

                        it('Verify the PDF names', function() {
                            planDetails.getPDFNameByIndex(1).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName1,'Verifies that "PDF Name" Should be '+tData.pdfName1);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(2).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName2,'Verifies that "PDF Name" Should be '+tData.pdfName2);
                            browser.close();
                            Utility.switchToWindow(0);
                        });
                        it('Verify the details of PDF documents', function() {
                            planDetails.getPDFNameInfoByIndex(1).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.pdfText1Info,'Verifies that "PDF Text" Should be '+cData.pdfText1Info);
                            });
                            planDetails.getPDFNameInfoByIndex(2).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.pdfText2Info,'Verifies that "PDF Text" Should be '+cData.pdfText2Info);
                            });

                        });
                        it('Verify the plan details disclaimer', function() {
                            //You Pay
                            expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer,'Verifies that Shopping Feature Disclaimer should be '+tData.shoppingFeatureDisclaimer);

                            if (pdescription.includes('DHMO')) {
                                //Cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Cleanings').getText()).toEqual(tData.cleaningss,'Verifies that "Cleanings" should be '+tData.cleaningss);
                            }

                        });

                        it('Verify the Plan details ', function() {

                            expect(planDetails.getPlanDetailsByKey('Office visits').getText()).toEqual(tData.officevisits,'Verifies that "officevisits" should be '+tData.officevisits);
                            expect(planDetails.getPlanDetailsByKey('Exams').getText()).toEqual(tData.exams,'Verifies that "exams" should be '+tData.exams);
                            expect(planDetails.getPlanDetailsByKey('Cleanings').getText()).toEqual(tData.cleanings,'Verifies that "cleanings" should be '+tData.cleanings);
                            expect(planDetails.getPlanDetailsByKey('X-rays').getText()).toEqual(tData.xray,'Verifies that "xray" should be '+tData.xray);
                            expect(planDetails.getPlanDetailsByKey('Fillings').getText()).toEqual(tData.fillings,'Verifies that "fillings" should be '+tData.fillings);

                            if (pdescription == 'DPPOA' || pdescription == 'DPPOB') {

                                expect(planDetails.getPlanDetailsByKey('Tooth removal, simple').getText()).toEqual(tData.toothremovalsimple);
                            }
                            if (pdescription == 'DPPOA') expect(planDetails.getPlanDetailsByKey('Tooth removal, surgical').getText()).toEqual(tData.toothremovalsurgical,'Verifies that "Tooth Removal Surgical" should be '+tData.toothremovalsurgical);


                            if (pdescription == 'DHMOB' || pdescription == 'DHMOA') {
                                expect(planDetails.getPlanDetailsByKey('Tooth removal').getText()).toEqual(tData.toothremoval,'Verifies that "Tooth Removal" should be '+tData.toothremoval);
                            }
                            if (pdescription !== 'DPPOB') {
                                expect(planDetails.getPlanDetailsByKey('Root canals').getText()).toEqual(tData.rootcanals,'Verifies that "rootcanals" should be '+tData.rootcanals);
                                expect(planDetails.getPlanDetailsByKey('Gum cleanings').getText()).toEqual(tData.gumcleanings,'Verifies that "gumcleanings" should be '+tData.gumcleanings);
                                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(tData.gumtreatments,'Verifies that "gumtreatments" should be '+tData.gumtreatments);
                                expect(planDetails.getPlanDetailsByKey('Denture repair').getText()).toEqual(tData.denturerepair,'Verifies that "denturerepair" should be '+tData.denturerepair);
                                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(tData.completedentures,'Verifies that "completedentures" should be '+tData.completedentures);
                                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(tData.implants,'Verifies that "implants" should be '+tData.implants);
                                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(tData.crowns,'Verifies that "crowns" should be '+tData.crowns);
                            }
                            if (pdescription == 'DPPOA') expect(planDetails.getPlanDetailsByKey('Orthodontics, child and adult').getText()).toEqual(tData.orthonticschild);
                            if (pdescription == 'DHMOB' || pdescription == 'DHMOA') {
                                planDetails.getPlanDetailsByKey('Orthodontics').getText().then(function(value) {
                                    expect(value.replace(/\r?\n|\r/g, "")).toEqual(tData.orthontics,'Verifies that "orthontics" should be '+tData.orthontics);
                                })

                            }
                        })
                    }

                    if (tData.product == 'AARP') {

                        it('Verify the plan Benifits Summary title in plan details page', function() {
                            //Benefits Summary title
                            expect(planDetails.benifitsSummary.getText()).toEqual(tData.benifitsSummary,'Verifies that "BenifitsSummary" should be '+tData.benifitsSummary);
                        });
                        it('Verify the plan benifits Summary Frequency in plan details page', function() {
                            //Plan Frequency
                            expect(planDetails.benifitsSummaryFrequency.getText()).toEqual(tData.benifitsSummaryFrequency,'Verifies that "benifitsSummaryFrequency" should be '+tData.benifitsSummaryFrequency);
                        });
                        it('Verify the Accident Coverage if applicable', function() {
                            // Accident Coverage
                            planDetails.accidentCoverage.isPresentAndDisplayed().then(function(displayed) {
                                if (displayed) {
                                    expect(planDetails.accidentCoverage.getText()).toEqual(tData.accidentCoverage,'Verifies that "accidentCoverage" should be '+tData.accidentCoverage);
                                    expect(planDetails.accidentCoverageText.getText()).toEqual(sData.accidentCoverageText,'Verifies that "accidentCoverageText" should be '+sData.accidentCoverageText);
                                }
                            })
                        });
                        it('Verify the plan details disclaimer', function() {
                            //You Pay
                            expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer,'Verifies that "shoppingFeatureDisclaimer" should be '+tData.shoppingFeatureDisclaimer);

                            if (pdescription == 'AHMO') {
                                expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(tData.annualdeductibleAmount,'Verifies that "annualdeductibleAmount" should be '+tData.annualdeductibleAmount);
                                expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(tData.annualmaximumAmount,'Verifies that "annualmaximumAmount" should be '+tData.annualmaximumAmount);

                                //Cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Cleanings').getText()).toEqual(cData.cleanings,'Verifies that "cleanings" should be '+cData.cleanings);
                                //Gum cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Gum cleanings').getText()).toEqual(cData.gumcleanings,'Verifies that "gumcleanings" should be '+cData.gumcleanings);
                            }

                        });
                        it('Verify the Annual Deductible and its tootltip text', function() {
                            //Annual Deductible
                            planDetails.tooltip('Annual deductible').click();
                            expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(tData.annualdeductible,'Verifies that "annualdeductible" should be '+tData.annualdeductible);
                            expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(tData.annualdeductibleAmount,'Verifies that "annualdeductibleAmount" should be '+tData.annualdeductibleAmount);
                            planDetails.closeToolTip('Annual deductible').click();

                        });
                        it('Verify the Annual maximum and its tooltip text', function() {
                            planDetails.tooltip('Annual maximum').click();
                            expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(tData.annualmaximum,'Verifies that "annualmaximum" should be '+tData.annualmaximum);
                            expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(tData.annualmaximumAmount,'Verifies that "annualmaximumAmount" should be '+tData.annualmaximumAmount);
                            planDetails.closeToolTip('Annual maximum').click();

                        });

                        if (pdescription !== 'AHMO') {
                            it('Verify the tooltip text for Network dentists', function() {
                                planDetails.tooltip('Network dentists').isPresentAndDisplayed().then(function(displayed) {
                                    if (displayed) {
                                        planDetails.tooltip('Network dentists').click();
                                        expect(planDetails.getTooltipText('Network dentists').getText()).toEqual(tData.networkdentists,'Verifies that "networkdentists" should be '+tData.networkdentists);
                                        planDetails.closeToolTip('Network dentists').click();
                                    }
                                });
                            });
                        }
                        it('Verify the tooltip text for TMJ treatment', function() {
                            planDetails.tooltip('TMJ treatment').click();
                            expect(planDetails.getTooltipText('TMJ treatment').getText()).toEqual(tData.TMJtreatment,'Verifies that "TMJtreatment" should be '+tData.TMJtreatment);
                            planDetails.closeToolTip('TMJ treatment').click();
                        });
                        it('Verify PDF documents Summary', function() {
                            //PDF text
                            expect(planDetails.pdfText.getText()).toEqual(cData.pdfText);
                        });
                        it('Verify the name of the PDF documents', function() {
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(tData.pdfText1,'Verifies that "pdfText" should be '+tData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(tData.pdfText2,'Verifies that "pdfText" should be '+tData.pdfText2);
                            expect(planDetails.getPDFNameByIndex(3).getText()).toEqual(tData.pdfText3,'Verifies that "pdfText" should be '+tData.pdfText3);

                        });
                        it('Verify the PDF names', function() {
                            planDetails.getPDFNameByIndex(1).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName1,'Verifies that "PDF Name" Should be '+tData.pdfName1);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(2).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName2,'Verifies that "PDF Name" Should be '+tData.pdfName2);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(3).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName3,'Verifies that "PDF Name" Should be '+tData.pdfName3);
                            browser.close();
                            Utility.switchToWindow(0);
                        });
                        it('Verify the contract number in plan details page', function() {
                            //Form Number
                            expect(footer.contractNumber.getText()).toEqual(tData.contractNumberOptions,'Verifies that "contractNumberOptions" should be '+tData.contractNumberOptions);
                        });
                    };

                    it('Verify the Contact help text and contact number', function() {
                        //Contact                                
                        expect(footer.contactText.getText()).toEqual(cData.contactText,'Verifies that "contactText" should be '+cData.contactText);
                        expect(footer.helpContact.getText()).toEqual(cData.helpContact,'Verifies that "helpContact" should be '+cData.helpContact);
                        planDetails.buyPlan.click();
                    });


                    it('Verify the email text', function() {
                        perInfo.phoneNumberemail(TestData);
                        console.log("Compare the Email text content");
                        perInfo.emailText.getText().then(function(mailtext) {
                            expect(mailtext.replace(/\r?\n|\r/g, "")).toEqual(cData.mailText,'Verifies that "mailText" should be '+cData.mailText);
                        });

                    });

                    it('Verify that Copy Right in footer', function() {
                        console.log("Compare the Footer CopyRight");
                        expect(perInfo.copyright.getText()).toEqual(cData.copyright,'Verifies that "copyright" should be '+cData.copyright);

                    });
                    it('Verify that footer disclaimer in footer', function() {
                        console.log("Compare the Footer Disclaimer");
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer,'Verifies that "disclaimer" should be '+cData.disclaimer);
                        }));
                    });

                    it('Verify that buying Contact Number', function() {
                        console.log("Compare the Buying Contact Ph#");
                        expect(perInfo.helpContact.getText()).toEqual(cData.helpContact,'Verifies that "helpContact" should be '+cData.helpContact);

                    });


                    it('should be able to nav to dependent page', function() {
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription.includes('DHMO') || pdescription.includes('DPPO')) {
                            TestData.MemberId = false;
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();
                            TestData.alternateid = "test@test.com";
                        }
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            var date = new Date();
                            var month = date.getMonth() + 1;
                            var d = new Date(month + '/01/2018');
                            var startDateFrom = moment(d).add(1, 'month').format('MMM DD, YYYY') + ' ' + moment(d).add(2, 'month').format('MMM DD, YYYY') + ' ' + moment(d).add(3, 'month').format('MMM DD, YYYY') + ' ';
                            expect(perInfo.coverageStartDate.getAllOptionsText()).toEqual(startDateFrom,'Verifies that "startDateFrom" should be '+startDateFrom);
                        }
                        perInfo.fillAddress(sData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription.includes('DHMO') || pdescription.includes('DPPO')) {
                            expect(perInfo.brokerLabel.getText()).toEqual(sData.brokerLabel,'Verifies that "brokerLabel" should be '+sData.brokerLabel)
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            expect(perInfo.referralSourceText.getText()).toEqual(cData.referralSourceText,'Verifies that "referralSourceText" should be '+cData.referralSourceText);
                            expect(perInfo.referralSource.getAllOptionsText()).toEqual(cData.referralSources,'Verifies that "referralSources" should be '+cData.referralSources)
                            perInfo.referralSource.selectByText(TestData.referralSource,'Verifies that "referralSources" should be '+TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle,'Verifies that "Dependent Page Title" should be '+TestData.DependentTitle);
                    });

                    it('should fill out generic dependent info, and check Dep Disable Text ', function() {
                        depInfo.fillDependent('Dependent1', TestData.child, false);
                        browser.sleep(5000)
                        expect(depInfo.relationship('Dependent1').getAllOptionsText()).toEqual(cData.relationship,'Verifies that "relationship" should be '+cData.relationship)
                        depInfo.next.click();
                        if (sdescription !== 'NY') {
                            depInfo.isHandicapped('Dependent1').isPresentAndDisplayed().then(function(displayed) {
                                if (displayed) {
                                    depInfo.depChildmaxageerror.getText().then(function(depDisableText) {

                                        if (sdescription == 'TX' && pdescription.includes('DHMO')) {

                                            expect(depDisableText.replace(/\r?\n|\r/g, " ")).toContain(tData.depDisableText,'Verifies that "depDisableText" should be '+tData.depDisableText);
                                        } else {
                                            expect(depDisableText.replace(/\r?\n|\r/g, " ")).toEqual(cData.depDisableText,'Verifies that "depDisableText" should be '+cData.depDisableText);
                                        }
                                        depInfo.isHandicapped('Dependent1').check();
                                    })
                                }
                            })
                        }

                    });

                    it('premiumPopup_cell text should equal premiumPopup dialog text', function() {
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent1').setText(Utility.getDatePart(moment().subtract(13, 'years').format('MM-DD-YYYY'), 'YEAR'))
                            depInfo.next.click();
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verifies that premium change Popup is displayed');
                        expect(depInfo.depPremiumChangepopupTxt.getText()).toEqual(cData.premiumPopupDialogtext,'Verifies that "premiumPopupDialogtext" should be '+cData.premiumPopupDialogtext);
                        depInfo.continue.click();

                    })


                    it('Facility Text Should be equal with the Facility Page of the Application', function() {
                        if (pdescription.includes('DHMO') || pdescription.includes('AHMO')) {
                            expect(facilities.facilitySelectiontext.getText()).toEqual(cData.facilityText,'Verifies that "facilityText" should be '+cData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();

                            expect(facilities.facilitySelectiontext.getText()).toEqual(cData.facilityText,'Verifies that "facilityText" should be '+cData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verifies that "Payment Page Title" Should be '+TestData.paymentPageTitle);

                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Recurring Payment Agreement text ', function() {
                            payment.paymentagreementTxt.getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.recurringPaymentAgreement,'Verifies that "recurringPaymentAgreement" Should be '+cData.recurringPaymentAgreement);
                            })

                        });
                    }


                    it('Should compare the Authorization Statement block', function() {
                        payment.paymentAuthorizationTxt.getText().then(function(text) {
                            // Shounak, 04/03/2018: This verification should always be toEqual and NOT toContain
                            // payDeadline consists of 2 Content pieces from Excel file: Authorization Fraud Statement & Authorization Statement
                            // Both should be present on Payments Page, so toEqual is the correct check
                            // toContain will pass the test even if only one of the above 2 is present on the page
                            expect(text.replace(/\r?\n|\r/g, "")).toEqual(tData.payDeadline,'Verifies that "payDeadline" Should be '+tData.payDeadline);
                        });
                    });


                    it('Should compare Authorize Consent text', function() {

                        expect(payment.authorizetxt.getText()).toEqual(cData.authorizeContent,'Verifies that "authorizeContent" Should be '+cData.authorizeContent);
                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Disclosure Form Contract upper button Text with Link to PDF ', function() {

                            expect(payment.disclouserFormOption1.getText()).toEqual(cData.disclosureFormContractUpperButtonText,'Verifies that "disclosureFormContractUpperButtonText" Should be '+cData.disclosureFormContractUpperButtonText);
                        });


                        it('Should compare Disclosure Form Contract lower button Text ', function() {
                            expect(payment.disclouserFormOption2.getText()).toEqual(cData.disclosureFormContractLowerButtonText,'Verifies that "disclosureFormContractLowerButtonText" Should be '+cData.disclosureFormContractLowerButtonText);
                        });


                        it('Should compare Billing Summary Enrollment Fee text ', function() {

                            expect(payment.enrollmentfeeTxt.getText()).toEqual(cData.billingSummaryEnrollmentFee,'Verifies that "billingSummaryEnrollmentFee" Should be '+cData.billingSummaryEnrollmentFee);
                        });


                        it('Should compare Billing Summary According Explanation ', function() {

                            if (sdescription == 'CA') expect(payment.discloserTxt.getText()).toEqual(cData.billingSummaryExpenseRatio,'Verifies that "billingSummaryExpenseRatio" Should be '+cData.billingSummaryExpenseRatio);
                        });


                        it('This should be one of the last checks since its on the bottom of the page: compare the CC refund Comment  ', function() {

                            expect(payment.refundCCpaymentsTxt.getText()).toEqual(cData.chargesAgreementNote,'Verifies that "chargesAgreementNote" Should be '+cData.chargesAgreementNote);
                        });

                    }
                    it('Verify the Payment Options in payment page', function() {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            payment.frequencyAnnualy.select();
                            expect(payment.billingFreqmonthlyTxt.getText()).toContain(cData.billingFreqmonthlyTxt,'Verifies that "billingFreqmonthlyTxt" Should be '+cData.billingFreqmonthlyTxt);
                            expect(payment.billingFreqmonthlyTxt.getText()).toContain('Monthly','Verifies that "billingFreqmonthlyTxt" should be Monthly');
                            expect(payment.billingFreqAnnuallyTxt.getText()).toContain('Annually','Verifies that "billingFreqmonthlyTxt" should be Annually');

                            if (pdescription.includes('APPO')) {
                                expect(payment.billingFreqQuarterlyTxt.getText()).toContain('Quarterly','Verifies that "billingFreqQuarterlyTxt" should be Quarterly');
                                expect(payment.billingFreqSemiAnnuallyTxt.getText()).toContain('Semi-annually','Verifies that "billingFreqSemiAnnuallyTxt" should be Semi-annually');
                            }

                        }


                    });

                    it('Verify the purchase Charges Agreement', function() {
                        expect(payment.purchaseNowText.getText()).toContain(sData.purchaseNowText,'Verifies that "purchaseNowText" should be '+sData.purchaseNowText)
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle,'Verifies that "receiptPageTitle" should be '+TestData.receiptPageTitle);

                    });
                    it('Verify footer in session timeout page', function() {
                        browser.navigate().back();
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer,'Verifies that "Discaimer" Should be '+TestData.sessiontimeout_delta_disclaimer);
                        }));
                    })
                });
            }
        })
    }
})