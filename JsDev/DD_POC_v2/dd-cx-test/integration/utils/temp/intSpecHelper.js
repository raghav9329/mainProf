"use strict";

var _ = require("lodash");

var envConfig = require("../testData/environments")[browser.params.env];
var EC = protractor.ExpectedConditions;
//var logger = require('./log4js')(__filename);

// Override baseUrl and loginUrl with passed in params
envConfig.baseUrl = browser.params.baseUrl || envConfig.baseUrl;

// commented out by mark 2/10/17
//envConfig.loginUrl = browser.params.loginUrl || envConfig.loginUrl;

function getConfig() {
	return envConfig;
}

/**
 * Configures protractor to handle the login pages, which is not an angular app
 */
function preLogin () {
	//ignoreSynchronization tells protractor that it shouldn't attempt to find angular on the page and use it to track
	//async operations
	browser.ignoreSynchronization = true;

	//The implicitWait value determines how long protractor will wait when told to execute a webdriver command on an
	//element that is not present. Setting this to 20s lets us attempt the login steps one after the other without
	//setting waits between each.
	browser.manage().timeouts().implicitlyWait(20000);
	logger.debug('trying to login');
}

/**
 * Reset protractor config options after login to optimize for angular pages.
 */
function postLogin () {
	//We're going back to angular after login, tell protractor to synchronize with angular again.
	browser.ignoreSynchronization = false;

	//While synchronized, there should be no need to implicitly wait. We should have a guarantee that all
	//async ops have resolved after every webdriver command
	browser.manage().timeouts().implicitlyWait(0);

	// Allow time for econnect to load entitlement
	browser.sleep(6000);
	logger.debug('logged in');
}

function login(userName) {
	preLogin();
	browser.get(envConfig.loginUrl);
	browser.refresh();

	logger.debug('logging in as ', userName);
	$("#userId").sendKeys(userName);
	$("#userPassword").sendKeys("newpas1*");
	$("#loginButton").click();

	var challengeQuestion = $("label.svb-modal-confirm-identity-label-container");
	logger.debug("Checking challengeQuestion isPresent()");

	return challengeQuestion.isPresent().then(function (found) {
		// Did it failed because page timed out or because we disabled challenge question?
		if (found) {
			return challengeQuestion.getText().then(function (question) {
				var response;

				logger.debug('Lets try to answer question: ', question);

				//We may not get a question object if the previous promise didn't find the security dialog.
				if (question) {
					if ("Where is your favorite restaurant located?" === question) {
						response = "restaurant";
					} else if ("What was your favorite childhood hiding place?" === question) {
						response = "childhood";
					} else if ("Who is your favorite actor or musician?" === question) {
						response = "actor";
					}

					$("#enteredChallengePhraseResponse").sendKeys(response);

					return $(".svb-continue-button").click().then(function() {

						logger.debug("clicked continue button");
						return $(".svb-radio-btn").isPresent().then(function (found) {
							if (found) {
								logger.debug("found svb-radio");
								return $(".svb-continue-button").click();
							}
							else {
								logger.debug("Did not find radio button");
							}
						});
					});
				}
				else {
					logger.debug('Login, skip confirm identity');
					throw "skip confirm identity";
				}
			})
		}
		else {
			// Did server timeout or skip challenge question?
		}
	}).then(function ($continueButton) {
		if ($continueButton) {
			logger.debug('Found continue button');
			return $continueButton.click().then(function (data) {
				logger.debug('After continueButton click');
				return data;
			});
		}
	}).thenFinally(postLogin);
}

function getFormattedDate() {

	return browser.executeScript(function () {
		filter = angular.injector(['ng']).get('dateFilter');
		var today = filter(new Date(), 'dd/MM/yyyy');
		return today;
	});
}

/**
 * Method to determine if an element is on the dom. Used for cases where ng-if is used
 * @param element - protractor element
 * @returns true if element is displayed; otherwise false
 */
function isElementDisplayed(element) {
	var isDisplayedPromise = browser.wait(EC.visibilityOf(element), 100);
	return isDisplayedPromise.then(function () {
		return true;
	}, function (err) {
		return false;
	});
}

function elementHasClass(webDriverElement, className) {
	return webDriverElement.getWebElement().then(function (elem) {
		return elem.getAttribute("class");
	}).then(function (classesStr) {
		var classes = classesStr.split(" ");
		return _.includes(classes, className);
	});
}

function elementDoesNotHaveClass(webDriverElement, className) {
	return elementHasClass(webDriverElement, className).then(function (hasClass) {
		return !hasClass;
	});
}

module.exports = {
	getConfig: getConfig,
	login: login,
	getFormattedDate: getFormattedDate,
	elementHasClass: elementHasClass,
	elementDoesNotHaveClass: elementDoesNotHaveClass,
	isElementDisplayed: isElementDisplayed
};
