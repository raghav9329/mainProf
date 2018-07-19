var TestData    = require('../../testData/' + testDataEnv + '/dhmo/CXAUTO_101.test.json');
var perInfo     = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo     = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities  = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment     = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt     = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage  = new(require('../../pageObjects/cxinit/enroll-page.js'));
var footer      = new(require('../../pageObjects/cxinit/footer-page.js'));
var shopping    = new(require('../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../pageObjects/cxinit/plan-details-page.js'));
var product     = ['APPOB']; //'AHMO', 'APPOA', 'APPOB'  'DHMO'
dataProvider(TestData.states, function(sData, sdescription) {

    if (states.indexOf(sdescription) != -1) {
        // dataProvider(sData.products, function(tData, pdescription) {
             dataProvider(sData.products, function(ppData, ppdescription) {
              dataProvider(ppData.states, function(tData, pdescription) {

            if (product.indexOf(pdescription) != -1) {
                describe('CXAUTO-101: Content Validation-||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                    });

                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.waitUntilPageLoaded();
                    });

                    if (tData.product == 'DELTA') {
                        it('', function() {
                            //  Utility.openApplication(browser.params.baseUrl + '/shopping/delta/test');
                            //  return element(by.id("eff_date")).getAttribute('value').then(function(cdate) {
                            // shopping.Zipcode.setText(homeObj.ZIPcode);
                            // element(by.name('issuerCode')).clear();
                            // element(by.name('issuerCode')).sendKeys(homeObj.IssuerCode.toLowerCase());
                            // shopping.Submit.click();

                            enrollPage.olddeltaEnroll(tData.enrollData);
                            enrollPage.Go.click();
                        })
                    }

                    if (tData.product == 'AARP') {
                        it('Verify the contract Number in Plan Options Page', function() {
                            enrollPage.aarpEnroll(tData.enrollData);
                            enrollPage.Go.click();
                            //Form Number
                            expect(footer.contractNumber.getText()).toEqual(tData.contractNumber);
                        });
                    }
                    it('Verify the Get a Quote Page title', function() {
                        planOptions.back.click();
                        //Quotes-Information
                        expect(browser.getTitle()).toEqual('Get A Quote');
                        shopping.NoOFCovered_getAQuote.setText(2 + '\t');
                    });
                    it('Verify the Quotes-Information in Get a Quote Page', function() {
                        //Quotes-Information
                        expect(enrollPage.quoteInfoTxt.getText()).toEqual(tData.quoteInfoTxt);
                    });
                    it('Verify the Quotes-Zip code text in Get a Quote Page', function() {
                        //Quotes-Zip Code
                        expect(enrollPage.quoteZipTxt.getText()).toEqual(tData.quoteZipTxt);
                    });
                    it('Verify the enroll birthdate text in Get a Quote Page', function() {
                        //Quotes-Dependents
                        expect(enrollPage.quotesDepTxt.getText()).toEqual(tData.quotesDepTxt);
                    });

                    if (tData.product == 'DELTA') {
                        it('Verify the Quotes-Dependents text in Get a Quote Page', function() {
                            //Quotes-Dependents
                            expect(enrollPage.birtdateText.getText()).toEqual(tData.birthdatetext);
                        });

                        it('Verify the dependent-1 birthdate text in Get a Quote Page', function() {
                            expect(enrollPage.depBirthDayText(1).getText()).toEqual(tData.dep1birthdatetext);
                        });
                        it('Verify the dependent-2 birthdate text in Get a Quote Page', function() {
                            expect(enrollPage.depBirthDayText(2).getText()).toEqual(tData.dep2birthdatetext);
                        });
                    }
                    if (tData.product == 'AARP') {
                        it('Verify the Contract Number in Get a Quote Page', function() {
                            //Form Number
                            expect(footer.contractNumber.getText()).toEqual(tData.contractNumberQuote);
                        });
                    }
                    it('Verify the Copy Right in footer', function() {
                        shopping.NoOFCovered_getAQuote.setText(0 + '\t');
                        expect(shopping.Showplans.getText()).toEqual(sData.showplansText)
                        shopping.Showplans.click();
                        //Footer Text 1
                        expect(footer.copyright.getText()).toEqual(tData.copyright);
                    });
                    it('Verify the Disclaimer in footer', function() {
                        //Footer Text 2
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(tData.disclaimer);
                        }));
                    });
                    it('Verify the plan options results header in plan options page', function() {
                        //Plan Options Result Header
                        expect(planOptions.planSummary.getText()).toContain(tData.planSummary);
                    });

                    if (tData.product == 'AARP') {
                        it('Verify the DeltaDental Highlights title in plan options page', function() {
                            //Plan Options-Highlights Titles
                            expect(planOptions.aDeltaDentalHighlightsHeader.getText()).toEqual(tData.deltaDentalHighlightsHeader);
                        });
                        it('Verify the Delta Care Highlights title in plan options page', function() {
                            expect(planOptions.aDeltaCareHighlightsHeader.getText()).toEqual(tData.deltaCareHighlightsHeader);
                        });

                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdeltaDentalHighlights().then(function(text) {
                                expect(text.replace(/(with)(.+?)(?= network)/, "$1 XXX")).toEqual(tData.deltadentalhighlights);
                            })

                        });
                        it('Verify the Delta Care plan details Highlights', function() {
                            planOptions.getdeltaCareHighlights().then(function(text) {
                                expect(text.replace(/(from)(.+?)(?= primary)/, "$1 XXX")).toEqual(tData.deltacarehighlights);
                            })

                        });
                    };
                    if (tData.product == 'DELTA') {
                        it('Verify the Delta Dental plan details Highlights', function() {
                            //Plan Details Highlights
                            planOptions.getdDeltaDentalHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Network)/, "$1 XXX")).toContain(tData.dDeltadentalhighlights);
                            });
                        });
                        it('Verify the Delta Care plan details Highlights', function() {
                            planOptions.getdDeltaCareHighlights().then(function(text) {
                                expect(text.replace(/()(.+?)(?= Primary)/, "$1 XXX")).toContain(tData.dDeltacarehighlights);
                            });
                        });


                        it('Verify the Plan price ', function() {

                            planOptions.getPlanPriceDetails(tData.plan1).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(tData.plan1Price);
                            });
                            planOptions.getPlanPriceDetails(tData.plan2).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(tData.plan2Price);
                            });
                            planOptions.getPlanPriceDetails(tData.plan3).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(tData.plan3Price);
                            });
                            planOptions.getPlanPriceDetails(tData.plan4).getText().then(function(price) {
                                expect(price.replace(/\r?\n|\r/g, "")).toContain(tData.plan4Price);
                            });

                        })


                        it('Verify the Plan Content ', function() {
                            expect(planOptions.getPlanContent(tData.plan1).getText()).toContain(tData.plan1Info);
                            expect(planOptions.getPlanContent(tData.plan2).getText()).toContain(tData.plan2Info);
                            expect(planOptions.getPlanContent(tData.plan3).getText()).toContain(tData.plan3Info);
                            expect(planOptions.getPlanContent(tData.plan4).getText()).toContain(tData.plan4Info);

                        })
                        it('Verify the plan starts from', function() {
                            expect(planOptions.getPlanStartsFrom(tData.plan1).getText()).toContain(tData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(tData.plan2).getText()).toContain(tData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(tData.plan3).getText()).toContain(tData.startsfrom);
                            expect(planOptions.getPlanStartsFrom(tData.plan4).getText()).toContain(tData.startsfrom);

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
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(tData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(tData.pdfText2);

                        });
                        it('Verify the name of the PDF documents', function() {
                            planDetails.getPDFNameInfoByIndex(1).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.pdfText1Info);
                            });
                            planDetails.getPDFNameInfoByIndex(2).getText().then(function(text) {
                                expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.pdfText2Info);
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

                        it('', function() {

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
                                }
                            })
                        });
                        it('Verify the plan details disclaimer', function() {
                            //You Pay
                            expect(planDetails.shoppingFeatureDisclaimer.getText()).toEqual(tData.shoppingFeatureDisclaimer);

                            if (pdescription == 'AHMO') {
                                //Cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Cleanings').getText()).toEqual(tData.cleanings);
                                //Gum cleanings
                                expect(planDetails.getPlanDetailsDisclaimer('Gum cleanings').getText()).toEqual(tData.gumcleanings);
                            }

                        });
                        it('Verify the tootltip text for Annual Deductible', function() {
                            //Annual Deductible

                            planDetails.tooltip('Annual deductible').click();
                            expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(tData.annualdeductible);
                            planDetails.closeToolTip('Annual deductible').click();

                        });
                        it('Verify the tooltip text for Annual maximum', function() {
                            planDetails.tooltip('Annual maximum').click();
                            expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(tData.annualmaximum);
                            planDetails.closeToolTip('Annual maximum').click();

                        });

                        if (pdescription !== 'AHMO') {
                            it('Verify the tooltip text for Network dentists', function() {
                                planDetails.tooltip('Network dentists').click();
                                expect(planDetails.getTooltipText('Network dentists').getText()).toEqual(tData.networkdentists);
                                planDetails.closeToolTip('Network dentists').click();
                            });
                        }
                        it('Verify the tooltip text for TMJ treatment', function() {
                            planDetails.tooltip('TMJ treatment').click();
                            expect(planDetails.getTooltipText('TMJ treatment').getText()).toEqual(tData.TMJtreatment);
                            planDetails.closeToolTip('TMJ treatment').click();
                        });
                        it('Verify PDF documents Summary', function() {
                            //PDF text
                            expect(planDetails.pdfText.getText()).toEqual(tData.pdfText);
                        });
                        it('Verify the name of the PDF documents', function() {
                            expect(planDetails.getPDFNameByIndex(1).getText()).toEqual(tData.pdfText1);
                            expect(planDetails.getPDFNameByIndex(2).getText()).toEqual(tData.pdfText2);
                            expect(planDetails.getPDFNameByIndex(3).getText()).toEqual(tData.pdfText3);

                        });
                        it('Verify the contract number in plan details page', function() {
                            //Form Number
                            expect(footer.contractNumber.getText()).toEqual(tData.contractNumberOptions);
                        });
                    };

                    it('Verify the Contact help text and contact number', function() {
                        //Contact                                
                        expect(footer.contactText.getText()).toEqual(tData.contactText);
                        expect(footer.helpContact.getText()).toEqual(tData.helpContact);
                        planDetails.buyPlan.click();
                    });


                    it('MailTxt_Cell should equal emailtext', function() {
                        perInfo.phoneNumberemail(TestData);
                        console.log("Compare the Email text content");
                        expect(perInfo.emailText.getText()).toEqual(tData.mailText);

                    });

                    it('footerCopyRight_Cell should equal footerCRtxt', function() {
                        console.log("Compare the Footer CopyRight");
                        expect(perInfo.copyright.getText()).toEqual(tData.copyright);

                    });
                    it('footerdisclaimer_cell should equal footertxt', function() {
                        console.log("Compare the Footer Disclaimer");
                        expect(footer.footer.getText().then(function(discaimer) {
                            expect(discaimer.replace(/\r?\n|\r/g, "")).toEqual(tData.disclaimer);
                        }));
                    });

                    it('buyingContactNumber_cell should equal buyingcontact', function() {
                        console.log("Compare the Buying Contact Ph#");
                        expect(perInfo.helpContact.getText()).toEqual(tData.helpContact);

                    });


                    it('should be able to nav to dependent page', function() {
                        if (pdescription.includes('DHMO') || pdescription.includes('DPPO')) {
                            TestData.MemberId = false;
                            TestData.ssn = "1234560215";
                            TestData.alternateid = "test@test.com";
                        }
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription.includes('DHMO') || pdescription.includes('DPPO')) {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
                    });

                    it('should fill out generic dependent info, and check Dep Disable Text ', function() {
                        depInfo.fillDependent('Dependent1', TestData.child, false);
                        depInfo.next.click();
                        depInfo.isHandicapped('Dependent1').isPresentAndDisplayed().then(function(displayed) {
                            if (displayed) {
                                depInfo.depChildmaxageerror.getText().then(function(depDisableText) {
                                    expect(depDisableText.replace(/\r?\n|\r/g, " ")).toEqual(tData.depDisableText);
                                    depInfo.isHandicapped('Dependent1').check();
                                })
                            }
                        })
                    });

                    it('premiumPopup_cell text should equal premiumPopup dialog text', function() {
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        expect(depInfo.depPremiumChangepopupTxt.getText()).toEqual(tData.premiumPopupDialogtext);
                        depInfo.continue.click();
                    })


                    it('Facility Text Should be equal with the Facility Page of the Application', function() {
                        if (pdescription.includes('DHMO') || pdescription.includes('AHMO')) {
                            expect(facilities.facilitySelectiontext.getText()).toEqual(tData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();

                            expect(facilities.facilitySelectiontext.getText()).toEqual(tData.facilityText);

                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Recurring Payment Agreement text ', function() {
                            expect(payment.paymentagreementTxt.getText()).toContain(tData.recurringPaymentAgreement);
                        });
                    }


                    it('Should compare the Authorization Statement block', function() {
                        payment.paymentAuthorizationTxt.getText().then(function(text) {
                            expect(text.replace(/\r?\n|\r/g, "")).toContain(tData.payDeadline);
                        });
                    });


                    it('Should compare Authorize Consent text', function() {

                        expect(payment.authorizetxt.getText()).toEqual(tData.authorizeContent);
                    });

                    if (pdescription.includes('DHMO')) {
                        it('Should compare Disclosure Form Contract upper button Text with Link to PDF ', function() {

                            expect(payment.disclouserFormOption1.getText()).toEqual(tData.disclosureFormContractUpperButtonText);
                        });


                        it('Should compare Disclosure Form Contract lower button Text ', function() {
                            expect(payment.disclouserFormOption2.getText()).toEqual(tData.disclosureFormContractLowerButtonText);
                        });


                        it('Should compare Billing Summary Enrollment Fee text ', function() {

                            expect(payment.enrollmentfeeTxt.getText()).toEqual(tData.billingSummaryEnrollmentFee);
                        });


                        it('Should compare Billing Summary According Explanation ', function() {

                            expect(payment.discloserTxt.getText()).toEqual(tData.billingSummaryExpenseRatio);
                        });


                        it('This should be one of the last checks since its on the bottom of the page: compare the CC refund Comment  ', function() {

                            expect(payment.refundCCpaymentsTxt.getText()).toEqual(tData.chargesAgreementNote);
                        });

                    }
                    it('Fill out payment details', function() {
                        /*payment.discloser.click();
                        Utility.switchToWindow(1);
                        Utility.switchToWindow(0);*/

                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription.includes('AHMO') || pdescription.includes('APPO')) {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

                    });
                });


            }


})

        })
    }
})