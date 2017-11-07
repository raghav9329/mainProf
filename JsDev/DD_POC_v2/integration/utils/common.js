 pdf2Text = require('pdf2text');

 var Utility = function() {

     this.switchToFrame = function(name) {
         var self = this;
         name = name || '';
         this.logInfoPromise('switching to frame:' + name);
         if (name) {
             return browser.switchTo().frame(name).then(function() {
                 self.logInfoPromise('switching to frame: ' + name + ' successful');
                 return true;
             });
         } else {
             return browser.switchTo().defaultContent().then(function() {
                 self.logInfoPromise('switching to frame: ' + 'DEFAULT' + ' successful');
                 return true;
             });
         }
     };

     /**
      * Switch to window with index
      * @param index
      * @param message
      * @return {boolean}
      */

     this.switchToWindow = function(index) {
         return browser.getAllWindowHandles().then(function(handles) {
             return browser.switchTo().window(handles[index]).then(function() {
                 browser.sleep(500);
                 logger.info('Switched to window');
                 return true;
             });

         }, function(err) {
             logger.error("Failed to switching window due to " + err.message);
             return false;
         });
     };

     /**
      * Switch to Alert
      * @param {timeout}
      */
     this.switchToAlert = function(timeout) {

         var alertBox = protractor.ExpectedConditions;
         browser.wait(alertBox.alertIsPresent(), timeout);
         return browser.switchTo().alert().then(function() {
             logger.info('Switched to JavaScript Alert box');
             return true;
         }, function(err) {
             logger.info("Failed to Switch JavaScript Alert box due to " + err.message);
             return false;
         })
     };


     this.handleError = function(error) {
         logger.error(error);
         return false;
     };

     this.logInfoPromise = function(message) {
         browser.controlFlow().execute(function() {
             logger.info(message);
         });
     };

     this.logErrorPromise = function(message) {
         browser.controlFlow().execute(function() {
             logger.error(message);
         });
     };

     this.isEmpty = function(value) {
         return (typeof value === 'undefined' || value === null || value.length === 0);
     };

     this.pageUp = function() {
         this.logInfoPromise('Utility PageUp Called');
         browser.actions().sendKeys(protractor.Key.HOME).perform();
     };

     this.addToControlFlow = function(obj) {
         return protractor.promise.controlFlow().execute(function() {
             return obj;
         });
     };

     /**
      * Scrolls the window based on the percentage of width and height provided.
      * Percentage is relative to scrollHeight and scrollWidth of the body tag
      * @param widthPercent
      * @param heightPercent
      * @returns {Promise<R>}
      */
     this.scroll = function(widthPercent, heightPercent) {
         widthPercent = widthPercent || 0;
         heightPercent = heightPercent || 0;
         return browser.driver.manage().window().getSize().then(function(size) {
             var width = size.width;
             var height = size.height;
             return element(by.tagName('body')).getAttribute('scrollHeight').then(function(scrollHeight) {
                 return element(by.tagName('body')).getAttribute('scrollWidth').then(function(scrollWidth) {
                     var scrollCommand = "window.scrollBy(" + (widthPercent * scrollWidth / 100) + "," + (heightPercent * scrollHeight / 100) + ");";
                     logger.info('utility.scroll: widthPercent=' + widthPercent + ' heightPercent=' + heightPercent + ' scrollHeight=' + scrollHeight + ' scrollWidth=' + scrollWidth);
                     logger.info('utility.scroll: scrollCommand=' + scrollCommand);
                     return browser.driver.executeScript(scrollCommand);
                 });
             });
         });
     };

     /**
      * Scrolls to the bottom of the page. x=0, y=scrollHeight
      * @returns {Promise<R>}
      */
     this.scrollToBottom = function() {
         return element(by.tagName('body')).getAttribute('scrollHeight').then(function(scrollHeight) {
             var scrollCommand = "window.scrollTo(" + 0 + "," + scrollHeight + ");";
             logger.info('utility.scroll: scrollCommand=' + scrollCommand);
             return browser.driver.executeScript(scrollCommand);
         });
     };

     /**
      * Scrolls to the top of the page. x=0, y= -scrollHeight
      * @returns {Promise<R>}
      */
     this.scrollToTop = function() {
         return element(by.tagName('body')).getAttribute('scrollHeight').then(function(scrollHeight) {
             var scrollCommand = "window.scrollTo(" + 0 + "," + -scrollHeight + ");";
             logger.info('utility.scroll: scrollCommand=' + scrollCommand);
             return browser.driver.executeScript(scrollCommand);
         });
     };

     /**
      * Scrolls to the Left of the page. x= -scrollWidth, y=0
      * @returns {Promise<R>}
      */
     this.scrollToLeftMost = function() {
         return element(by.tagName('body')).getAttribute('scrollWidth').then(function(scrollWidth) {
             var scrollCommand = "window.scrollTo(" + -scrollWidth + "," + 0 + ");";
             logger.info('utility.scroll: scrollCommand=' + scrollCommand);
             return browser.driver.executeScript(scrollCommand);
         });
     };

     /**
      * Scrolls to the Left of the page. x= scrollWidth, y=0
      * @returns {Promise<R>}
      */
     this.scrollToRightMost = function() {
         return element(by.tagName('body')).getAttribute('scrollWidth').then(function(scrollWidth) {
             var scrollCommand = "window.scrollTo(" + scrollWidth + "," + 0 + ");";
             logger.info('utility.scroll: scrollCommand=' + scrollCommand);
             return browser.driver.executeScript(scrollCommand);
         });
     };


     this.waitUntilClickable = function(element) {
         return browser.wait(function() {
             return element.click().then(function(result) {
                 return true;
             });
         }, PAGELOADTIME);
     }
     this.waitUntilPageLoaded = function() {
         browser.wait(function() {
             return browser.executeScript('return document.readyState==="complete"').then(function(text) {
                 return text === true;
             });
         }, PAGELOADTIME);
     };
     this.waitUntilElementPresent = function(timeout) {
         timeout = typeof timeout !== 'undefined' ? timeout : PAGELOADTIME;
         browser.wait(function() {
             return oElement.isPresent().then(function(present) {
                 if (present.length == 0) {
                     present = false
                 }
                 return present;
             });
         }, timeout);
     };
     this.waitUntilElementNotPresent = function(oElement, timeout) {
         return browser.controlFlow().execute(function() {
             timeout = typeof timeout !== 'undefined' ? timeout : PAGELOADTIME;
             return browser.wait(function() {
                 return oElement.isDisplayed().then(function(isVisible) {
                     browser.sleep(1500);
                     return !isVisible;
                 }, function() {
                     return true;
                 });
             }, timeout);
         });
     };

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
             }, timeout).then(function() {
                 return browser.wait(function() {
                     return oElement.isEnabled().then(function(enabled) {
                         if (enabled.length == 0) {
                             enabled = false;
                         }
                         return enabled;
                     });
                 }, timeout);
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
                 //        return browser.sleep(25).then(function() { // 6/27/17 trying to see how this 
                 return true; // might be slowing everything down
             }) // evaluating execution with 507
     };

     /**
      * Open Application
      * @param - Application URL
      */
     this.openApplication_old = function(uRl, product) {
         return browser.controlFlow().execute(function() {
             if (uRl.length === 0) {
                 var appURL = browser.params.baseUrl;
                 console.log("URL" + appURL);

                 return browser.get(appURL).then(function(flag) {
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

     this.openApplication = function(uRl, product) {
         return browser.controlFlow().execute(function() {
             browser.driver.manage().deleteAllCookies();
             if (uRl.length === 0) {
                 if (!isExecutionFromUI) {
                     return browser.get(browser.params.baseUrl).then(function() {
                         return true;
                     });
                 } else {
                     var appURL = browser.params.baseUrl + '/indEnroll?issuerCode=' + product;
                     console.log("URL" + appURL);
                     return browser.get(appURL).then(function(flag) {
                         console.log("flag" + flag);
                         return true;
                     });
                 }
             } else {
                 return browser.get(uRl).then(function() {

                     return true;
                 });
             }
         });
     }


     this.getapiurl = function(resource,resourceKey,params) {

         switch (resource.toUpperCase()) {
             case 'ABOUT':
                 return (browser.params.apiurl + '/about');
             case 'FACILITIES':
                 return (browser.params.apiurl + '/facilities/' + resourceKey + buildurl(params).slice(0, -1));
             case 'LOCATIONS':
                 return (browser.params.apiurl + '/locations/' + resourceKey + buildurl(params).slice(0, -1));
             case 'SUGGESTIONS':
                 return (browser.params.apiurl + '/suggestions' + buildurl(params).slice(0, -1));
             case 'PROVIDERKEY':
                 return (browser.params.apiurl +'/'+ resourceKey + buildurl(params).slice(0, -1));
             case 'PROVIDERS':
                 return (browser.params.apiurl + buildurl(params).slice(0, -1));
         }

         function buildurl(o) {
             return Object.keys(o).reduce(function(previous, key) {
                 return previous + key + '=' + o[key] + '&';
             }, '?');
         }
         // return (browser.params.apiurl + buildurl(dataObj).slice(0, -1));


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
     };

     /**
      * To generate a random number of given length
      * @param  {String} type (Number or String)
      * @param  {Number} length of the string required
      * @return {Number or String} returns number/string of length provided with random alphabets
      */
     this.randomNo = function(type, length) {
         try {
             var oresult = undefined;
             switch (type.toUpperCase()) {
                 case 'STRING':
                     var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                     for (var i = 0; i < length; i++) {
                         oresult = str.charAt(Math.floor(Math.random() * str.length));
                     }
                     logger.info('random string of length ' + length + ' for is :' + oresult);
                     break;
                 case 'NUMBER':
                     var oresult = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
                     logger.info('random number of length ' + length + ' for is :' + oresult);
                     break;
                 default:
                     oresult = undefined;
                     break;
             }
         } catch (err) {
             logger.info('ERROR', "Failed to retrieving text from alert due to " + err.message);
             return false;
         }
         return oresult;
     };


     this.readPDFFile = function(file) {
         return browser.controlFlow().execute(function() {
             return pdf2Text(file).then(function(pages) {
                 return pages.toString();
             })
         })
     }


 }

 module.exports = Utility;
