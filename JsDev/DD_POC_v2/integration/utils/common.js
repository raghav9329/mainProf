var Utility = function() {
    /**
     * Switch to Alert
     * @param {timeout}
     */
    this.switchAlert = function(timeout) {
        try {
            message = message || 'Switching to JavaScript Alert box';
            var alertBox = protractor.ExpectedConditions;
            browser.wait(alertBox.alertIsPresent(), timeout);
            return browser.switchTo().alert().then(function() {
                Logger.Status('PASS', 'Switched to JavaScript Alert box');
                return true;
            })
        } catch (err) {
            Logger.Status('ERROR', "Failed to Switch JavaScript Alert box due to  " + err.message);
            return false;
        }
    };

    this.waitUntilClickable = function(element) {
        return browser.wait(function() {
            return element.click().then(function(result) {
                return true;
            });
        }, PAGELOADTIME).thenCatch(function(err) {
            return false;
        });
    }
    this.waitUntilPageLoaded = function() {
        browser.wait(function() {
            return browser.executeScript('return document.readyState==="complete"').then(function(text) {
                return text === true;
            });
        }, PAGELOADTIME);
    };
    this.waitUntilElementPresent = function() {
        browser.wait(function() {
            return oElement.isPresent().then(function(present) {
                if (present.length == 0) {
                    present = false
                }
                return present;
            });
        }, timeout).thenCatch(function(err) {

        });
    };
    this.waitUntilElementNotPresent = function(oElement, timeout) {
        return browser.controlFlow().execute(function() {
            timeout = typeof timeout !== 'undefined' ? timeout : PAGELOADTIME;
            return browser.wait(function() {
                return oElement.isDisplayed().then(function(isVisible) {
                    if (isVisible.length == 0) {
                        isVisible = false
                    }
                    return !isVisible;
                });
            }, timeout).thenCatch(function(err) {

            })

        });
    }

    /**
     * wait for Element present,displayed and enabled
     * @param {oElement}
     * @param {timeout} maxtimeout
     */
    this.waitAndFindElement = function(oElement, timeout) {

        return browser.controlFlow().execute(function() {
            timeout = typeof timeout !== 'undefined' ? timeout : PAGELOADTIME;
            return browser.wait(function() {
                return oElement.isDisplayed().then(function(displayed) {
                    if (displayed.length == 0) {
                        displayed = false
                    }
                    return displayed;
                });
            }, timeout).thenCatch(function(err) {}).then(function() {
                return browser.wait(function() {
                    return oElement.isEnabled().then(function(enabled) {
                        if (enabled.length == 0) {
                            enabled = false;
                        }
                        return enabled;
                    });
                }, timeout).thenCatch(function(err) {

                });
            })

        });
    };



    /**
     * delay for the specified time(in ms). The method will print a progress indicator(# )
     * for every 5% of the duration complete
     * @param  {number} timeInMs Duration to sleep in millseconds
     */
    this.delay = function(timeInMs) {
        return browser.sleep(timeInMs).then(function() {
            return true;
        })
    };

    /**
     * Open Application
     * @param - Application URL
     */
    this.openApplication = function(uRl) {
        return browser.controlFlow().execute(function() {

            if (uRl.length === 0) {
                console.log("URL" + browser.params.baseUrl);

                return browser.get(browser.params.baseUrl).then(function(flag) {
                    console.log("flag" + flag);
                    return true;
                });

            } else {
                return browser.get(uRl).then(function() {
                    return true;
                });
            }
        });
    }




    /**
     * get the part from given date
     * @param - Date
     * @param - part of the date
     * @returns  value of the date part
     */

    this.getDatePart = function(tDate, datePart) {
        if (tDate) {
            cDate = tDate;
        } else {
            cDate = new Date();
        }

        var d = new Date(cDate);
        switch (datePart.toUpperCase()) {
            case 'DATE':
                return ("0" + (d.getDate())).slice(-2);
                break;
            case 'MONTH':
                return ("0" + (d.getMonth() + 1)).slice(-2);
                break;
            case 'YEAR':
                return d.getFullYear();
                break;
            case 'DAY':
                return d.getDay() + 1;
                break;
            case 'HOURS':
                return d.getHours();
                break;
            case 'MINUTES':
                return d.getMinutes();
                break;
        };
    };

    this.getfullDate = function(datepart, traverse, no, tDate) {
        if (tDate) {
            cDate = tDate;
        } else {
            cDate = new Date();
        }
        var d = new Date(cDate);
        switch (datepart.toUpperCase()) {
            case 'DATE':
                //console.log("traverse.toUpperCase() "+ traverse.toUpperCase() )
                if (traverse.toUpperCase() === 'ADD') {
                    return new Date(d.setDate(d.getDate() + no));
                    break;

                } else {
                    return new Date(d.setDate(d.getDate() - no));
                    break;

                }

            case 'MONTH':
                if (traverse.toUpperCase() == 'ADD') {
                    return new Date(d.setMonth(d.getMonth() + no));
                    break;

                } else {
                    return new Date(d.setMonth(d.getMonth() - no));
                    break;
                }

            case 'YEAR':
                if (traverse.toUpperCase() == 'ADD') {
                    return new Date(d.setFullYear(d.getFullYear() + no));
                    break;

                } else {
                    return new Date(d.setFullYear(d.getFullYear() - no));
                    break;
                }

        }
    }
    

}

module.exports = Utility;
