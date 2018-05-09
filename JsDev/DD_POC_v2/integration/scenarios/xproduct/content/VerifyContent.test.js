var TestData    = require('../../../testData/' + testDataEnv + '/dhmo/CXAUTO_101.test.json');
var perInfo     = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo     = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities  = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment     = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt     = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage  = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var footer      = new(require('../../../pageObjects/cxinit/footer-page.js'));
var shopping    = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var cData       = '';

var product     = ['APPOA', 'APPOB'];

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
                            expect(footer.copyright.getText()).toEqual(cData.copyright);
                        });

                        it('Verify Universal Footer text when we land on Get-a-Quote Page for the first time (no State is selected at this point)', function() {
                            //Footer Text 2
                            if (tData.product == 'DELTA') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.aarp_disclaimer);
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
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(sData.disclaimer);
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
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_delta_disclaimer);
                                }));
                            }
                            if (tData.product == 'AARP') {
                                expect(footer.footer.getText().then(function(discaimer) {
                                    expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(sData.disclaimer);
                                }));
                            }
                            Utility.openApplication('', tData.product);
                        })


                        if (tData.product == 'DELTA') {
                            it('Navigate to Plan Options Page', function() {
                                enrollPage.deltaEnroll(tData.enrollData);
                                shopping.Showplans.click();
                                expect(planOptions.isAt()).toBe(true);
                            })
                        }

                        if (tData.product == 'AARP') {
                            it('Verify the contract Number in Plan Options Page', function() {
                                enrollPage.aarpEnroll(tData.enrollData);
                                shopping.Showplans.click();
                                //Form Number
                                expect(footer.contractNumber.getText()).toEqual(tData.contractNumber);
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
                        expect(browser.getTitle()).toEqual('Get A Quote');
                        shopping.NoOFCovered_getAQuote.setText(2 + '\t');
                    });
                    it('Verify the Quotes-Information text in Get-a-Quote Page', function() {
                        //Quotes-Information
                        expect(enrollPage.quoteInfoTxt.getText()).toEqual(cData.quoteInfoTxt);
                    });
                    it('Verify the Zip code text in Get-a-Quote Page', function() {
                        //Quotes-Zip Code
                        expect(enrollPage.quoteZipTxt.getText()).toEqual(cData.quoteZipTxt);
                    });
                    it('Verify the DOB text in Get-a-Quote Page', function() {
                        //Quotes-Dependents
                        expect(enrollPage.quotesDepTxt.getText()).toEqual(cData.quotesDepTxt);
                    });

                    if (tData.product == 'DELTA') {
                        it('Verify the Dependents DOB text in Get-a-Quote Page', function() {
                            //Quotes-Dependents
                            expect(enrollPage.birtdateText.getText()).toEqual(cData.birthdatetext);
                        });

                        it('Verify the dependent-1 DOB text in Get-a-Quote Page', function() {
                            expect(enrollPage.depBirthDayText(1).getText()).toEqual(cData.dep1birthdatetext);
                        });
                        it('Verify the dependent-2 DOB text in Get-a-Quote Page', function() {
                            expect(enrollPage.depBirthDayText(2).getText()).toEqual(cData.dep2birthdatetext);
                        });
                    }
                    if (tData.product == 'AARP') {
                        it('Verify the Contract Number in Get-a-Quote Page', function() {
                            //Form Number on Get-a-Quote Page
                            expect(footer.contractNumber.getText()).toEqual(cData.contractNumberQuote);
                        });
                    }

                    it('Verify the Copy Right text in footer on Get-a-Quote Page (after a State is selected)', function() {
                        //Footer Text 1
                        expect(footer.copyright.getText()).toEqual(cData.copyright);
                    });
                    it('Verify Universal Footer text on Get-a-Quote Page (after a State is selected)', function() {
                        //Footer Text 2
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer);
                        }));
                    });

                    it('Verify the Copy Right in footer on Plan Options Page', function() {
                        shopping.NoOFCovered_getAQuote.setText(0 + '\t');
                        expect(shopping.Showplans.getText()).toEqual(sData.showplansText)
                        shopping.Showplans.click();
                        //Footer Text 1
                        expect(footer.copyright.getText()).toEqual(cData.copyright);
                    });
                    it('Verify the Universal Footer on Plan Options Page', function() {
                        //Footer Text 2
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer);
                        }));
                    });
                    it('Verify the plan options results header in plan options page', function() {
                        //Plan Options Result Header
                        expect(planOptions.planSummary.getText()).toContain(cData.planSummary);
                    });

                    if (tData.product == 'AARP') {
                        it('Verify the Plan Content by Plan ', function() {
                            expect(planOptions.getPlanContent(cData.plan1).getText()).toContain(cData.plan1Info);
                            expect(planOptions.getPlanContent(cData.plan2).getText()).toContain(cData.plan2Info);
                            if (['CA', 'TX', 'PA', 'FL', 'NY'].indexOf(sdescription) !== -1) expect(planOptions.getPlanContent(cData.plan3).getText()).toContain(cData.plan3Info);

                        })
                        it('Verify the DeltaDental Highlights title in plan options page', function() {
                            //Plan Options-Highlights Titles
                            expect(planOptions.aDeltaDentalHighlightsHeader.getText()).toEqual(cData.deltaDentalHighlightsHeader);
                        });
                        if (pdescription == 'AHMO') {
                            it('Verify the Delta Care Highlights title in plan options page', function() {
                                expect(planOptions.aDeltaCareHighlightsHeader.getText()).toEqual(cData.deltaCareHighlightsHeader);
                            });
                        }

                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdeltaDentalHighlights().then(function(text) {
                                if (text.includes('network')) {
                                    expect(text.replace(/(with)(.+?)(?= network)/, "$1 XXX")).toEqual(cData.deltadentalhighlights);

                                } else {
                                    expect(text.replace(/(with)(.+?)(?= network)/, "$1 XXX")).toEqual(cData.deltadentalhighlights.replace(/(Save)(.+?)(?=Implants)/, ""));

                                }
                            })

                        });
                        if (pdescription == 'AHMO') {
                            it('Verify the Delta Care plan details Highlights', function() {
                                planOptions.getdeltaCareHighlights().then(function(text) {
                                    expect(text.replace(/(from)(.+?)(?= primary)/, "$1 XXX")).toEqual(cData.deltacarehighlights);
                                })
                            });

                        }
                    };
                    if (tData.product == 'DELTA') {
                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdDeltaDentalHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Network)/, "$1 XXX")).toContain(cData.dDeltadentalhighlights);
                            });
                        });
                        it('Verify the Delta Care plan details Highlights', function() {
                            planOptions.getdDeltaCareHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Primary)/, "$1 XXX")).toContain(cData.dDeltacarehighlights);
                            });
                        });


                        it('Verify the Plan price by plan ', function() {

                            planOptions.getPlanPriceDetails(cData.plan1).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan1Price);
                            });
                            planOptions.getPlanPriceDetails(cData.plan2).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan2Price);
                            });
                            planOptions.getPlanPriceDetails(cData.plan3).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan3Price);
                            });
                            if (sdescription == 'CA') {
                                planOptions.getPlanPriceDetails(cData.plan4).getText().then(function(price) {
                                    expect(price.replace(/\r?\n|\r/g, "")).toContain(cData.plan4Price);
                                });
                            }

                        });


                        it('Verify the Plan Content by plan ', function() {
                            expect(planOptions.getPlanContent(cData.plan1).getText()).toContain(cData.plan1Info);
                            expect(planOptions.getPlanContent(cData.plan2).getText()).toContain(cData.plan2Info);
                            expect(planOptions.getPlanContent(cData.plan3).getText()).toContain(cData.plan3Info);
                            if (sdescription == 'CA') expect(planOptions.getPlanContent(cData.plan4).getText()).toContain(cData.plan4Info);

                        })
                        it('Verify the plan starts from by plan', function() {
                            expect(planOptions.getPlanStartsFrom(cData.plan1).getText()).toContain(cData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(cData.plan2).getText()).toContain(cData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(cData.plan3).getText()).toContain(cData.startsfrom);
                            if (sdescription == 'CA') expect(planOptions.getPlanStartsFrom(cData.plan4).getText()).toContain(cData.startsfrom);

                        })
                    }



                    it('Verify the Plan Options-Tag Line', function() {
                        //Plan Options-Tag Line
                        planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                    });
                    it('Verify Plan details Summary in plan details page', function() {

                        //Plan Details Highlight
                        expect(planDetails.shoppingDetailsSummary.getText()).toContain(tData.shoppingDetailsSummary);
                    });
                    it('Verify the plan details disclaimer', function() {
                        //You Pay
                        expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer);

                    });
                    if (tData.product == 'DELTA') {
                        it('Verify the name of the PDF documents', function() {
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(cData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(cData.pdfText2);

                        });

                        it('Verify the PDF names', function() {
                            planDetails.getPDFNameByIndex(1).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName1);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(2).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName2);
                            browser.close();
                            Utility.switchToWindow(0);
                        });
                        it('Verify the details of PDF documents', function() {
                            planDetails.getPDFNameInfoByIndex(1).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.pdfText1Info);
                            });
                            planDetails.getPDFNameInfoByIndex(2).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.pdfText2Info);
                            });

                        });
                        it('Verify the plan details disclaimer', function() {
                            //You Pay
                            expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer);

                            if (pdescription.includes('DHMO')) {
                                //Cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Cleanings').getText()).toEqual(tData.cleaningss);
                            }

                        });

                        it('Verify the Plan details ', function() {

                            expect(planDetails.getPlanDetailsByKey('Office visits').getText()).toEqual(tData.officevisits);
                            expect(planDetails.getPlanDetailsByKey('Exams').getText()).toEqual(tData.exams);
                            expect(planDetails.getPlanDetailsByKey('Cleanings').getText()).toEqual(tData.cleanings);
                            expect(planDetails.getPlanDetailsByKey('X-rays').getText()).toEqual(tData.xray);
                            expect(planDetails.getPlanDetailsByKey('Fillings').getText()).toEqual(tData.fillings);

                            if (pdescription == 'DPPOA' || pdescription == 'DPPOB') {

                                expect(planDetails.getPlanDetailsByKey('Tooth removal, simple').getText()).toEqual(tData.toothremovalsimple);
                            }
                            if (pdescription == 'DPPOA') expect(planDetails.getPlanDetailsByKey('Tooth removal, surgical').getText()).toEqual(tData.toothremovalsurgical);


                            if (pdescription == 'DHMOB' || pdescription == 'DHMOA') {
                                expect(planDetails.getPlanDetailsByKey('Tooth removal').getText()).toEqual(tData.toothremoval);
                            }
                            if (pdescription !== 'DPPOB') {
                                expect(planDetails.getPlanDetailsByKey('Root canals').getText()).toEqual(tData.rootcanals);
                                expect(planDetails.getPlanDetailsByKey('Gum cleanings').getText()).toEqual(tData.gumcleanings);
                                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(tData.gumtreatments);
                                expect(planDetails.getPlanDetailsByKey('Denture repair').getText()).toEqual(tData.denturerepair);
                                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(tData.completedentures);
                                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(tData.implants);
                                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(tData.crowns);
                            }
                            if (pdescription == 'DPPOA') expect(planDetails.getPlanDetailsByKey('Orthodontics, child and adult').getText()).toEqual(tData.orthonticschild);
                            if (pdescription == 'DHMOB' || pdescription == 'DHMOA') {
                                planDetails.getPlanDetailsByKey('Orthodontics').getText().then(function(value) {
                                    expect(value.replace(/\r?\n|\r/g, "")).toEqual(tData.orthontics);
                                })

                            }
                        })
                    }

                    if (tData.product == 'AARP') {

                        it('Verify the plan Benifits Summary title in plan details page', function() {
                            //Benefits Summary title
                            expect(planDetails.benifitsSummary.getText()).toEqual(tData.benifitsSummary);
                        });
                        it('Verify the plan benifits Summary Frequency in plan details page', function() {
                            //Plan Frequency
                            expect(planDetails.benifitsSummaryFrequency.getText()).toEqual(tData.benifitsSummaryFrequency);
                        });
                        it('Verify the Accident Coverage if applicable', function() {
                            // Accident Coverage
                            planDetails.accidentCoverage.isPresentAndDisplayed().then(function(displayed) {
                                if (displayed) {
                                    expect(planDetails.accidentCoverage.getText()).toEqual(tData.accidentCoverage);
                                    expect(planDetails.accidentCoverageText.getText()).toEqual(sData.accidentCoverageText);
                                }
                            })
                        });
                        it('Verify the plan details disclaimer', function() {
                            //You Pay
                            expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer);

                            if (pdescription == 'AHMO') {
                                expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(tData.annualdeductibleAmount);
                                expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(tData.annualmaximumAmount);

                                //Cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Cleanings').getText()).toEqual(cData.cleanings);
                                //Gum cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Gum cleanings').getText()).toEqual(cData.gumcleanings);
                            }

                        });
                        it('Verify the Annual Deductible and its tootltip text', function() {
                            //Annual Deductible
                            planDetails.tooltip('Annual deductible').click();
                            expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(tData.annualdeductible);
                            expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(tData.annualdeductibleAmount);
                            planDetails.closeToolTip('Annual deductible').click();

                        });
                        it('Verify the Annual maximum and its tooltip text', function() {
                            planDetails.tooltip('Annual maximum').click();
                            expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(tData.annualmaximum);
                            expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(tData.annualmaximumAmount);
                            planDetails.closeToolTip('Annual maximum').click();

                        });

                        if (pdescription !== 'AHMO') {
                            it('Verify the tooltip text for Network dentists', function() {
                                planDetails.tooltip('Network dentists').isPresentAndDisplayed().then(function(displayed) {
                                    if (displayed) {
                                        planDetails.tooltip('Network dentists').click();
                                        expect(planDetails.getTooltipText('Network dentists').getText()).toEqual(tData.networkdentists);
                                        planDetails.closeToolTip('Network dentists').click();
                                    }
                                });
                            });
                        }
                        it('Verify the tooltip text for TMJ treatment', function() {
                            planDetails.tooltip('TMJ treatment').click();
                            expect(planDetails.getTooltipText('TMJ treatment').getText()).toEqual(tData.TMJtreatment);
                            planDetails.closeToolTip('TMJ treatment').click();
                        });
                        it('Verify PDF documents Summary', function() {
                            //PDF text
                            expect(planDetails.pdfText.getText()).toEqual(cData.pdfText);
                        });
                        it('Verify the name of the PDF documents', function() {
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(tData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(tData.pdfText2);
                            expect(planDetails.getPDFNameByIndex(3).getText()).toEqual(tData.pdfText3);

                        });
                        it('Verify the PDF names', function() {
                            planDetails.getPDFNameByIndex(1).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName1);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(2).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName2);
                            browser.close();
                            Utility.switchToWindow(0);
                            planDetails.getPDFNameByIndex(3).click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.pdfName3);
                            browser.close();
                            Utility.switchToWindow(0);
                        });
                        it('Verify the contract number in plan details page', function() {
                            //Form Number
                            expect(footer.contractNumber.getText()).toEqual(tData.contractNumberOptions);
                        });
                    };

                    it('Verify the Contact help text and contact number', function() {
                        //Contact                                
                        expect(footer.contactText.getText()).toEqual(cData.contactText);
                        expect(footer.helpContact.getText()).toEqual(cData.helpContact);
                        planDetails.buyPlan.click();
                    });


                    it('Verify the email text', function() {
                        perInfo.phoneNumberemail(TestData);
                        console.log("Compare the Email text content");
                        perInfo.emailText.getText().then(function(mailtext) {
                            expect(mailtext.replace(/\r?\n|\r/g, "")).toEqual(cData.mailText);
                        });

                    });

                    it('Verify that Copy Right in footer', function() {
                        console.log("Compare the Footer CopyRight");
                        expect(perInfo.copyright.getText()).toEqual(cData.copyright);

                    });
                    it('Verify that footer disclaimer in footer', function() {
                        console.log("Compare the Footer Disclaimer");
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(cData.disclaimer);
                        }));
                    });

                    it('Verify that buying Contact Number', function() {
                        console.log("Compare the Buying Contact Ph#");
                        expect(perInfo.helpContact.getText()).toEqual(cData.helpContact);

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
                            expect(perInfo.coverageStartDate.getAllOptionsText()).toEqual(startDateFrom)
                        }
                        perInfo.fillAddress(sData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription.includes('DHMO') || pdescription.includes('DPPO')) {
                            expect(perInfo.brokerLabel.getText()).toEqual(sData.brokerLabel)
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            expect(perInfo.referralSourceText.getText()).toEqual(cData.referralSourceText);
                            expect(perInfo.referralSource.getAllOptionsText()).toEqual(cData.referralSources)
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
                    });

                    it('should fill out generic dependent info, and check Dep Disable Text ', function() {
                        depInfo.fillDependent('Dependent1', TestData.child, false);
                        expect(depInfo.relationship('Dependent1').getAllOptionsText()).toEqual(sData.relationship)
                        depInfo.next.click();
                        if (sdescription !== 'NY') {
                            depInfo.isHandicapped('Dependent1').isPresentAndDisplayed().then(function(displayed) {
                                if (displayed) {
                                    depInfo.depChildmaxageerror.getText().then(function(depDisableText) {

                                        if (sdescription == 'TX' && pdescription.includes('DHMO')) {

                                            expect(depDisableText.replace(/\r?\n|\r/g, " ")).toContain(tData.depDisableText);
                                        } else {
                                            expect(depDisableText.replace(/\r?\n|\r/g, " ")).toEqual(cData.depDisableText);
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
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        expect(depInfo.depPremiumChangepopupTxt.getText()).toEqual(cData.premiumPopupDialogtext);
                        depInfo.continue.click();

                    })


                    it('Facility Text Should be equal with the Facility Page of the Application', function() {
                        if (pdescription.includes('DHMO') || pdescription.includes('AHMO')) {
                            expect(facilities.facilitySelectiontext.getText()).toEqual(cData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();

                            expect(facilities.facilitySelectiontext.getText()).toEqual(cData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Recurring Payment Agreement text ', function() {
                            payment.paymentagreementTxt.getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(cData.recurringPaymentAgreement);
                            })

                        });
                    }


                    it('Should compare the Authorization Statement block', function() {
                        payment.paymentAuthorizationTxt.getText().then(function(text) {
                            // Shounak, 04/03/2018: This verification should always be toEqual and NOT toContain
                            // payDeadline consists of 2 Content pieces from Excel file: Authorization Fraud Statement & Authorization Statement
                            // Both should be present on Payments Page, so toEqual is the correct check
                            // toContain will pass the test even if only one of the above 2 is present on the page
                            expect(text.replace(/\r?\n|\r/g, "")).toEqual(tData.payDeadline);
                        });
                    });


                    it('Should compare Authorize Consent text', function() {

                        expect(payment.authorizetxt.getText()).toEqual(cData.authorizeContent);
                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Disclosure Form Contract upper button Text with Link to PDF ', function() {

                            expect(payment.disclouserFormOption1.getText()).toEqual(cData.disclosureFormContractUpperButtonText);
                        });


                        it('Should compare Disclosure Form Contract lower button Text ', function() {
                            expect(payment.disclouserFormOption2.getText()).toEqual(cData.disclosureFormContractLowerButtonText);
                        });


                        it('Should compare Billing Summary Enrollment Fee text ', function() {

                            expect(payment.enrollmentfeeTxt.getText()).toEqual(cData.billingSummaryEnrollmentFee);
                        });


                        it('Should compare Billing Summary According Explanation ', function() {

                            if (sdescription == 'CA') expect(payment.discloserTxt.getText()).toEqual(cData.billingSummaryExpenseRatio);
                        });


                        it('This should be one of the last checks since its on the bottom of the page: compare the CC refund Comment  ', function() {

                            expect(payment.refundCCpaymentsTxt.getText()).toEqual(cData.chargesAgreementNote);
                        });

                    }
                    it('Verify the Payment Options in payment page', function() {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            payment.frequencyAnnualy.select();
                            expect(payment.billingFreqmonthlyTxt.getText()).toContain(cData.billingFreqmonthlyTxt)
                            expect(payment.billingFreqmonthlyTxt.getText()).toContain('Monthly');
                            expect(payment.billingFreqAnnuallyTxt.getText()).toContain('Annually');

                            if (pdescription.includes('APPO')) {
                                expect(payment.billingFreqQuarterlyTxt.getText()).toContain('Quarterly');
                                expect(payment.billingFreqSemiAnnuallyTxt.getText()).toContain('Semi-annually');
                            }

                        }


                    });

                    it('Verify the purchase Charges Agreement', function() {
                        expect(payment.purchaseNowText.getText()).toContain(sData.purchaseNowText)
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

                    });
                    it('Verify footer in session timeout page', function() {
                        browser.navigate().back();
                        expect(footer.footer_ses_timeout.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(TestData.sessiontimeout_disclaimer);
                        }));
                    })
                });


            }
        })
    }
})