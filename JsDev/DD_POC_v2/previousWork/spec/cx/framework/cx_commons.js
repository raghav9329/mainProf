/**
 * CX Automation Framework Libraries - Common functionalities.
 *
 * @author Uday Thombre (UThombre@delta.org)
 */
var Controls = require('./cx_gui.json');
var Configurations = require('./cx_commons.json');
var Structures = require('./cx_structures.js');
var Reporters = require('./cx_reporter.js');
var Framework = require('./cx_environments.json');
var EC = protractor.ExpectedConditions;
var _map_plansummary = {};

var cxFRMWRKCommons = {
	 
	 /**
	 * Get CX formatted date.
	 *
	 * @param {date} Date to format
	 * @param {Structures.DateFormats} Format date to
	 * @return {string} Formatted date in requested format.
	 */
	getDate : function(parameters) {
		var _date = (parameters.Date) ? parameters.Date : new Date();
		var _return = '';
		switch(parameters.Format) {
			case Structures.DateFormats.MonthDDYYYY:
				_return = Structures.DateFormats.RegularMonth[_date.getMonth()] + ' ';
				_return = _return + _date.getDate() + ', ';
				_return = _return + _date.getFullYear();
				break;
				
			case Structures.DateFormats.MMDDYYYY:
				_return = _date.getMonth() + '/';
				_return = _return + _date.getDate() + '/';
				_return = _return + _date.getFullYear();
				break;
			
			default:
				this.getDate({'Format' : Structures.DateFormats.MMDDYYYY})
				break;
		}
		return _return;
	},
	 
	 /**
	 * Read text from CX GUI component.
	 *
	 * @param {string} Message to display in console log also becomes the file name for screensnapshot when taken.
	 * @param {string} Control CX GUI Control idenfication text.
	 * @param {Structures.Locators} ControlType CX GUI identification type, currently supporting for CSS, XPATH, TAG, MODEL, BUTTON_TEXT, PARTIAL_BUTTON_TEXT, CSS_CONTAINING_TEXT, CLASS_NAME, LINK_TEXT, JAVA_SCRIPT, NAME, PARTIAL_LINK_TEXT
	 * @return {string} Read text live from CX GUI.
	 */
	readText : function(parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		var _params = {'Message' :  parameters.Message,
					   'Control' : parameters.Control,
					   'ControlType' : parameters.ControlType,
					   'ReturnedValue' : ''};
		switch(parameters.ControlType) {
			case Structures.Locators.CSS:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;
			
			case Structures.Locators.XPATH:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.xpath(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;
				
			case Structures.Locators.TAG:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.tagName(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.MODEL:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.model(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.BUTTON_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.buttonText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.PARTIAL_BUTTON_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.partialButtonText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.CSS_CONTAINING_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.cssContainingText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.CLASS_NAME:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.className(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.LINK_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.linkText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.JAVA_SCRIPT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.js(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.NAME:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.name(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.PARTIAL_LINK_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.partialLinkText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getText();
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			default:
				this.readText({'Message' : parameters.Message,
								 'Control' : parameters.Control,
								 'ControlType' : Structures.Locators.CSS});
				break;
		}
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
		return _params;
	},
	
	/**
	 * Read attribute value from CX GUI component.
	 *
	 * @param {string} Message to display in console log also becomes the file name for screensnapshot when taken.
	 * @param {string} Control CX GUI Control idenfication text.
	 * @param {Structures.Locators} ControlType CX GUI identification type, currently supporting for CSS, XPATH, TAG, MODEL, BUTTON_TEXT, PARTIAL_BUTTON_TEXT, CSS_CONTAINING_TEXT, CLASS_NAME, LINK_TEXT, JAVA_SCRIPT, NAME, PARTIAL_LINK_TEXT
	 * @param {string} Attribute CX GUI Control's Attribute identification text.
	 * @param {string} ExceptionalWaitTime extra wait time or delay for automation to wait for availability of the CX GUI Control or Attribute for being read.
	 * @return {string} Read attribute value from CX GUI.
	 */
	readAttribute : function(parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		var _params = {'Message' :  parameters.Message,
					   'Control' : parameters.Control,
					   'ControlType' : parameters.ControlType,
					   'Attribute' : parameters.Attribute,
					   'ReturnedValue' : ''};		
		switch(parameters.ControlType) {
			case Structures.Locators.CSS:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;
			
			case Structures.Locators.XPATH:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.xpath(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;
				
			case Structures.Locators.TAG:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.tagName(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.MODEL:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.model(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.BUTTON_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.buttonText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.PARTIAL_BUTTON_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.partialButtonText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.CSS_CONTAINING_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.cssContainingText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.CLASS_NAME:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.className(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.LINK_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.linkText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.JAVA_SCRIPT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.js(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.NAME:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.name(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.Locators.PARTIAL_LINK_TEXT:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.partialLinkText(parameters.Control))
						  .then(function(elem) {
							_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
							console.log(parameters.Message + ' ' + _params.ReturnedValue);
							return true;
						  });
				},	_waitFor);
				break;

			default:
				this.readAttribute({'Message' : parameters.Message,
								    'Control' : parameters.Control,
								    'ControlType' : Structures.Locators.CSS,
								    'Attribute' : parameters.Attribute});
				break;
		}
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
		return _params;
	},
	
	/**
	 * Perform input opperation on CX GUI component.
	 *
	 * @param {string} Message to display in console log also becomes the file name for screensnapshot when taken.
	 * @param {string} Control CX GUI Control idenfication text.
	 * @param {Structures.Locators} ControlType CX GUI identification type, currently supporting for CSS, XPATH, TAG, MODEL, BUTTON_TEXT, PARTIAL_BUTTON_TEXT, CSS_CONTAINING_TEXT, CLASS_NAME, LINK_TEXT, JAVA_SCRIPT, NAME, PARTIAL_LINK_TEXT
	 * @param {string} ExceptionalWaitTime extra wait time or delay for automation to wait for availability of the CX GUI Control or Attribute for being read.
	 * @param {Structures.FrameworkUIActions} Checkbox CX GUI Control specific action to Check or Uncheck.
	 * @param {string} Text value to enter into CX GUI Input Control.
	 * @param {string} ListItem executing Click operation on to specified CX GUI List Control's Item.
	 * @param {string} Button executing Click operation on to specified CX GUI Button Control.
	 * @param {string} TabAway executing Keyboard-TAB operation on to specified CX GUI Control.
	 * @param {string} EnterKey executing Keyboard-ENTER operation on to specified CX GUI Control.
	 * @param {string} Clear executing Keyboard-CTRL+A & Keyboard-BACKSPACE operation on to specified CX GUI Control.
	 * @param {string} ReplaceIdentifier subset of text identifier to be replaced to evaluate on-the-fly actual identifier for CX GUI Control.
	 * @param {string} ReplaceWith value to replace ReplaceIdentifier with in evaluate on-the-fly actual identifier for CX GUI Control. 
	 */
	keyIn :  function(parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		if (parameters.Checkbox) {
			switch (parameters.Checkbox)
			{
				case Structures.FrameworkUIActions.Check :
					var checkbox = $(parameters.Control);
					checkbox.isSelected().then(function(selected){
						if (!selected){
							Reporters.log({'Message' :  parameters.Message + " Checked : " + parameters.Control,
										   'Location' : Structures.ReportLocations.Console,
										   'ScreenShot' : true});
							checkbox.click();
							return true;
						}
					});
					break;

				case Structures.FrameworkUIActions.UnCheck :
					var checkbox = $(parameters.Control);
					checkbox.isSelected().then(function(selected){
						if (selected){
							Reporters.log({'Message' :  parameters.Message + " UnChecked : " + parameters.Control,
										   'Location' : Structures.ReportLocations.Console,
										   'ScreenShot' : true});
							checkbox.click();
							return true;
						}
					});
					break;
				
				default:
					break;
			}	//--- END switch (parameters.Checkbox)
		} else {
			//--- Select item from dropdown list.
			if (parameters.ListItem) {
				if (parameters.ControlType == Structures.Locators.CSS) {
					parameters.Control = parameters.Control + " option[value= '" + parameters.ListItem + "']";
				}
			}

			//--- Select item from array of GUI items.
			if (parameters.ReplaceIdentifier) {
				var _gui = parameters.Control.toString();
				var _control = _gui.replace(parameters.ReplaceIdentifier, parameters.ReplaceWith);
				parameters.Control = (_control != 'NaN') ?  _control : parameters.Control;
			}
			
			switch(parameters.ControlType) {
				case Structures.Locators.CSS:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.css(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;
				
				case Structures.Locators.XPATH:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.xpath(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;
					
				case Structures.Locators.TAG:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.tagName(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.MODEL:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.model(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.CSS_CONTAINING_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.cssContainingText(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.CLASS_NAME:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.className(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.JAVA_SCRIPT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.js(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.NAME:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.name(parameters.Control))
							  .then(function(elem) {
								if(parameters.Clear) { elem.clear(); }
								if(parameters.Text) { elem.sendKeys(parameters.Text); }
								if(parameters.ListItem) { elem.click(); }
								if(parameters.Button) { elem.click(); }
								Reporters.log({'Message' :  parameters.Message,
											   'Location' : Structures.ReportLocations.Console});
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.BrowserActions.Refresh:
					browser.navigate().refresh();
					break;
					
				case Structures.BrowserActions.Back:
					browser.navigate().back();
					break;
				
				case Structures.BrowserActions.Forward:
					browser.navigate().forward();
					break;
				
				default:
					this.readAttribute({'Message' : parameters.Message,
										'Control' : parameters.Control,
										'ControlType' : Structures.Locators.CSS,
										'Attribute' : parameters.Attribute,});
					break;
			}	
		}	//--- END if (parameters.Checkbox) {} else {}
		
		if(parameters.TabAway) {
			/* var _control = $(parameters.Control);
			input.sendKeys(protractor.Key.TAB); */
		}
		if(parameters.EnterKey) {
			/* var _control = $(parameters.Control);
			input.sendKeys(protractor.Key.ENTER); */
		}
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
	},

	//--- Valid parameter names : Item, Message, ExceptionalWaitTime
	evaluatePlanSummary : function(parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		switch(parameters.Item) {
			case Structures.PlanSummary.Type:
				var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Plan.Type.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Plan.Type = _returned.ReturnedValue;
				}
				break;
				
			case Structures.PlanSummary.Name:
				var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Product.Name.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Product.Name = _returned.ReturnedValue;
				}
				break;
				
			case Structures.PlanSummary.Premium:
				var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Plan.Premium.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Plan.Premium = _returned.ReturnedValue;
				}
				break;

			case Structures.PlanSummary.Fee:
				/* var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Plan.Fee.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Plan.Fee = _returned.ReturnedValue;
				} */
				break;

			case Structures.PlanSummary.EnrolleeName:
				/* Structures.MAPPlanSummary.Enrollee.Applicants = [];
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Enrollees.Applicants.list))
						  .then(function(elem) {
							return elem.all(by.css(Controls.cx.page.commons.Summary.Enrollees.Applicants.label)).then(function(items){
								for (var index = 0; index < items.length; index++) {
									Structures.MAPPlanSummary.Enrollee.Applicants.push(items[index]);
								}
								console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Enrollee.Applicants + ')');
								return true;
							});
						  });
				},	_waitFor); */				
				break;

			case Structures.PlanSummary.EnrolleeFacility:
				/* Structures.MAPPlanSummary.Enrollee.Facilities = [];
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Enrollees.Facilities.list))
						  .then(function(elem) {
							return elem.all(by.css(Controls.cx.page.commons.Summary.Enrollees.Facilities.label)).then(function(items){
								for (var index = 0; index < items.length; index++) {
									Structures.MAPPlanSummary.Enrollee.Facilities.push(items[index]);
								}
								console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Enrollee.Facilities + ')');
								return true;
							});
						  });
				},	_waitFor);	 */			
				break;

			case Structures.PlanSummary.Title:
				var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Plan.Title.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Plan.Title = _returned.ReturnedValue;
				}
				break;

			case Structures.PlanSummary.Description:
				var _returned = this.readText({'Message' : parameters.Message,
											   'Control' : Controls.cx.page.commons.Summary.Plan.Description.label,
											   'ControlType' : Structures.Locators.CSS,
											   'ExceptionalWaitTime' : parameters.ExceptionalWaitTime});
				if (_returned) {
					Structures.MAPPlanSummary.Plan.Description = _returned.ReturnedValue;
				}
				break;
				
			case Structures.PlanSummary.All:
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Type});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Name});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Premium});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Fee});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.EnrolleeName});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.EnrolleeFacility});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Title});
				this.evaluatePlanSummary({'Message' : parameters.Message, 'Item' : Structures.PlanSummary.Description});
				break;
				
			default:
				break;
				
		}
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console});
		return Structures.MAPPlanSummary;
	},
	
	//--- Valid parameter names : Item, Message, ExceptionalWaitTime
	evaluatePlanSummary_old : function(parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		switch(parameters.Item) {
			case Structures.PlanSummary.Type:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Plan.Type.label))
						  .then(function(elem) {
							Structures.MAPPlanSummary.Plan.Type = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Plan.Type + ')');
							return true;
						  });
				},	_waitFor);
				break;
				
			case Structures.PlanSummary.Name:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Product.Name.label))
						  .then(function(elem) {
							Structures.MAPPlanSummary.Product.Name = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Product.Name + ')');
							return true;
						  });
				},	_waitFor);
				break;
				
			case Structures.PlanSummary.Premium:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Plan.Premium.label))
						  .then(function() {
							Structures.MAPPlanSummary.Plan.Premium = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Plan.Premium + ')');
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.PlanSummary.Fee:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Plan.Fee.label))
						  .then(function(elem) {
							Structures.MAPPlanSummary.Plan.Fee = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Plan.Fee + ')');
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.PlanSummary.EnrolleeName:
				Structures.MAPPlanSummary.Enrollee.Applicants = [];
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Enrollees.Applicants.list))
						  .then(function(elem) {
							return elem.all(by.css(Controls.cx.page.commons.Summary.Enrollees.Applicants.label)).then(function(items){
								for (var index = 0; index < items.length; index++) {
									Structures.MAPPlanSummary.Enrollee.Applicants.push(items[index]);
								}
								console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Enrollee.Applicants + ')');
								return true;
							});
						  });
				},	_waitFor);				
				break;

			case Structures.PlanSummary.EnrolleeFacility:
				Structures.MAPPlanSummary.Enrollee.Facilities = [];
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Enrollees.Facilities.list))
						  .then(function(elem) {
							return elem.all(by.css(Controls.cx.page.commons.Summary.Enrollees.Facilities.label)).then(function(items){
								for (var index = 0; index < items.length; index++) {
									Structures.MAPPlanSummary.Enrollee.Facilities.push(items[index]);
								}
								console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Enrollee.Facilities + ')');
								return true;
							});
						  });
				},	_waitFor);				
				break;

			case Structures.PlanSummary.Title:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Plan.Title.label))
						  .then(function(elem) {
							Structures.MAPPlanSummary.Plan.Title = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Plan.Title + ')');
							return true;
						  });
				},	_waitFor);
				break;

			case Structures.PlanSummary.Description:
				delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(Controls.cx.page.commons.Summary.Plan.Description.label))
						  .then(function(elem) {
							Structures.MAPPlanSummary.Plan.Description = elem.getText();
							console.log(parameters.Message + ' (' + Structures.MAPPlanSummary.Plan.Description + ')');
							return true;
						  });
				},	_waitFor);
				break;
				
			case Structures.PlanSummary.All:
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Type});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Name});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Premium});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Fee});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.EnrolleeName});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.EnrolleeFacility});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Title});
				this.evaluatePlanSummary({'Item' : Structures.PlanSummary.Description});
				break;
				
			default:
				break;
				
		}
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
		return MAPPlanSummary;
	},

	/**
	 * Navigate to CX Environments or CX Pages.
	 *
	 * @param {Structures.Navigation} Page to navigate to.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {string} ZipCode number in string format representing applicant's home address zip code per quote.
	 * @param {string} Applicants number in string format representing number of applicants per quote.
	 * @param {string} PlanIdentifier number in string format representing the plan number/identifier to select for processing.
	 * @param {json} PlanIdentifiers snippet of json that provides numerous plan numbers/identifier that test can use for navigation.
	 */
	navigateCX : function(parameters) {
		/* var current_url_index = parseInt(Framework.cx.Environments.current);
		var current_enroll_to_plan = Framework.cx.Environments.items[current_url_index];
		browser.baseUrl = current_enroll_to_plan.link; */
		var current_enroll_to_plan = browser.params.cx
		var selected_plan_to_enroll;
		browser.ignoreSynchronization = true;
		switch (parameters.Page)
		{
			case Structures.Navigation.PersonalInformationPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.PersonalInformation.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				//--- browser.driver.get(browser.baseUrl + cx_gui.cx.page.PersonalInformation.URI);
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.BillingInformationPage:
				browser.baseUrl = current_enroll_to_plan.link;
				break;
			case Structures.Navigation.DependentsPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Dependents.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.FacilitiesPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Facilities.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.PaymentReviewPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Purchase.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.DITGetAQuote:
				var _cx = {}
				//--- _cx['Environment'] = Framework.cx.Environments.items[3];
				_cx['Environment'] = browser.params.cx;
				_cx['Environment'].applicants = (parameters.Applicants) ? parameters.Applicants : browser.params.cx.applicants;
				_cx['Environment'].planidentifier = (parameters.PlanIdentifier) ? parameters.PlanIdentifier : browser.params.cx.planidentifier;
				_cx['Environment'].planidentifers = (parameters.PlanIdentifiers) ? parameters.PlanIdentifiers : browser.params.cx.planidentifers;
				_cx['Environment'].zip = (parameters.ZipCode) ? parameters.ZipCode : browser.params.cx.zip;

				_cx['EnrollTo'] = Framework.cx.page.DeltaDentalPlans;

				Reporters.log({'Message' : 'CX : Automation Framework : Current selected plan is ' + _cx['Environment'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : Automation Framework : Enroll to ' + _cx['EnrollTo'],
					   'Location' : Structures.ReportLocations.Console});
				var numberOfApplicants = Framework.cx.page.GetAQuote.NumberOfCovered.input.selector + ' option[value="' + _cx['Environment'].applicants + '"]';
				browser.baseUrl = _cx['Environment'].link;

				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + 'Number of Applicants' + numberOfApplicants,
					   'Location' : Structures.ReportLocations.Console});
				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				//--- Enter ZipCode, Select Number of Individuals to Cover & Get a Quote.
				this.keyIn({'Message' : 'CX Environment DIT-DEV : Enter Zipcode.',
							   'Control' : Framework.cx.page.GetAQuote.ZipCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : _cx['Environment'].zip});
				this.keyIn({'Message' : 'CX Environment DIT-DEV : Select Number of individuals to cover.',
							   'Control' : numberOfApplicants,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				this.keyIn({'Message' : 'CX Environment DIT-DEV : Get a Quote',
							   'Control' : Framework.cx.page.GetAQuote.Actions.Submit.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				//--- Select first plan to Enroll to.
				this._map_plansummary = this.selectDeltaDentalPlan({'EnrollTo' : _cx['EnrollTo'],
																	'Environment' : _cx['Environment']});			
				this.keyIn({'Message' : 'CX Environment DELTA DENTAL PLANS : Enroll to plan',
							   'Control' : _cx['EnrollTo'].plans.details.enroll,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			case Structures.Navigation.MOTGetAQuote:
				var _cx = {}
				//--- _cx['Environment'] = Framework.cx.Environments.items[2];
				_cx['Environment'] = browser.params.cx;
				_cx['Environment'].applicants = (parameters.Applicants) ? parameters.Applicants : browser.params.cx.applicants;
				_cx['Environment'].PlanIdentifier = (parameters.PlanIdentifier) ? parameters.PlanIdentifier : browser.params.cx.planidentifier;
				_cx['Environment'].PlanIdentifiers = (parameters.PlanIdentifiers) ? parameters.PlanIdentifiers : browser.params.cx.planidentifers;
				_cx['Environment'].zip = (parameters.ZipCode) ? parameters.ZipCode : browser.params.cx.zip;
				
				_cx['EnrollTo'] = Framework.cx.page.DeltaDentalPlans;

				Reporters.log({'Message' : 'CX : Automation Framework : Current selected plan is ' + _cx['Environment'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : Automation Framework : Enroll to ' + _cx['EnrollTo'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : parameters.DataCSS.applicants ' + _cx['Environment'].applicants,
					   'Location' : Structures.ReportLocations.Console});
				var numberOfApplicants = Framework.cx.page.GetAQuote.NumberOfCovered.input.selector + ' option[value="' + _cx['Environment'].applicants + '"]';
				browser.baseUrl = _cx['Environment'].link;

				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + 'Number of Applicants' + numberOfApplicants,
					   'Location' : Structures.ReportLocations.Console});
				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				//--- Enter ZipCode, Select Number of Individuals to Cover & Get a Quote.
				this.keyIn({'Message' : 'CX Environment MOT : Enter Zipcode.',
							   'Control' : Framework.cx.page.GetAQuote.ZipCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : _cx['Environment'].zip});
 				this.keyIn({'Message' : 'CX Environment MOT : Get a Quote',
							   'Control' : numberOfApplicants,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true}); 
				this.keyIn({'Message' : 'CX Environment MOT : Get a Quote',
							   'Control' : Framework.cx.page.GetAQuote.Actions.Submit.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				//--- Select first plan to Enroll to.
				this._map_plansummary = this.selectDeltaDentalPlan({'EnrollTo' : _cx['EnrollTo'],
																	'Environment' : _cx['Environment']});			
				this.keyIn({'Message' : 'CX Environment DELTA DENTAL PLANS : Enroll to plan',
							   'Control' : _cx['EnrollTo'].plans.details.enroll,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			default:
				console.log('cx_gui_libraries.navigateToPage - pagetype request is not scripted yet');
				break;
		}
		//--- return browser.ignoreSynchronization = true;
	},
	
	/**
	 * Select plan from Delta Dental Plans page.
	 *
	 * @param {json} Environment snippet of json that provides required information for processing.
	 * @param {json} EnrollTo snippet of json that provides required information for processing.
	 * @return {hashmap} Delta Dental Plan information collected from Delta Dental Plans page.
	 */
	selectDeltaDentalPlan : function(parameters) {
			var hashmap = {};		
			hashmap['Identifier'] = parameters.Environment.planidentifier;
			/* delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.enrollidentifiers))
					  .then(function(elems) {
						hashmap['Identifier'] = elems[0].getAttribute('value');
						console.log('Current select plan is at location ' + 0 + ' & plan name is ' + hashmap['Identifier']);
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page); */
						
			//--- Collect Plan Summary Information.
			var btn_plandetails = parameters.EnrollTo.plans.details.link.toString().replace('PLANID', hashmap['Identifier']);
			this.keyIn({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Collect Plan Summary Information.',
						'Control' : btn_plandetails,
						'ControlType' : Structures.Locators.CSS,
						'Button' : true});	
			
			hashmap['Cost'] = this.readAttribute({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Annual Cost.',
												  'Control' : parameters.EnrollTo.plans.quote,
												  'ControlType' : Structures.Locators.CSS,
												  'Attribute' : 'value'});
												  
			hashmap['StartDate'] = this.readText({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Start Date.',
												  'Control' : parameters.EnrollTo.plans.startdate,
												  'ControlType' : Structures.Locators.CSS});

												  /* hashmap['StartDate'] = '_EMPTY_';
			hashmap['StartDate'] = this.readText({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Start Date.',
												  'Control' : parameters.EnrollTo.plans.startdate,
												  'ControlType' : Structures.Locators.CSS});
			if (hashmap['StartDate'] != '_EMPTY_') {hashmap['StartDate'] = hashmap['StartDate'].ReturnedValue;} */

			hashmap['Name'] = this.readAttribute({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Plan Name.',
												  'Control' : parameters.EnrollTo.plans.name,
												  'ControlType' : Structures.Locators.CSS,
												  'Attribute' : 'value'});

			hashmap['Code'] = this.readAttribute({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Plan Code.',
												  'Control' : parameters.EnrollTo.plans.code,
												  'ControlType' : Structures.Locators.CSS,
												  'Attribute' : 'value'});
			
			hashmap['Issuer'] = this.readText({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Issuer.',
												  'Control' : parameters.EnrollTo.plans.issuer,
												  'ControlType' : Structures.Locators.CSS});
			
			hashmap['CSRFToken'] = this.readText({'Message' : 'CX : Environment : DELTA DENTAL PLANS : CSRFToken.',
												  'Control' : parameters.EnrollTo.plans.CSRFToken,
												  'ControlType' : Structures.Locators.CSS});
						
			Reporters.log({'Message' : 'Cost = ' + hashmap['Cost'],
						   'Location' : Structures.ReportLocations.Console,
						   'ScreenShot' : true});
			Reporters.log({'Message' : 'Start Date = ' + hashmap['StartDate'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Name = ' + hashmap['Name'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Code = ' + hashmap['Code'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Issuer = ' + hashmap['Issuer'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan CSRFToken = ' + hashmap['CSRFToken'],
						   'Location' : Structures.ReportLocations.Console});
			
			//--- Collect all particulars of selected Delta Dental Plan Summary.
			delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.details.summary.columns.particluars))
					  .then(function(elems) {
						hashmap['SummaryItems'] = elems.length;
						for (var index = 0; index < elems.length; index++) {
							hashmap[index] = { 'key' : elems[index], 'value' : '' };
							Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
										   'Location' : Structures.ReportLocations.Console});
						}
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page);
			//--- Collect all particular details of selected Delta Dental Plan Summary.
			delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.details.summary.columns.costs))
					  .then(function(elems) {
						for (var index = 0; index < elems.length; index++) {
							hashmap[index].value = elems[index];
							Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
										   'Location' : Structures.ReportLocations.Console});
						}
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page);
			if (hashmap['SummaryItems']) {
				for (var index = 0; index < hashmap['SummaryItems'].length; index++) {
					//--- console.log(hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value);
					Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
						   'Location' : Structures.ReportLocations.Console});
				}
			}
			
			return hashmap;
	},
	
	/**
	 * Return current selected plan of Delta Dental Plans page.
	 *
	 * @return {hashmap} Delta Dental Plan information collected from Delta Dental Plans page.
	 */
	getDeltaDentalPlanSummary : function() { return this._map_plansummary; },
	
	addTestApplicationId : function(logMessageTitle, forGUIButtonCSS) {
		//--- Click on the button
		delta_cx.wait(function() {
		 return delta_cx.findElement(by.css(forGUIButtonCSS))
				  .then(function(elem) {
					console.log(logMessageTitle);
					//--- <input type="hidden" name="appId" value="5967817">
					var inputElement = ($('<' +Controls.cx.page.dependents.AppIdParam.tag+ '></' +Controls.cx.page.dependents.AppIdParam.tag+ '>')
											.attr('type', Controls.cx.page.dependents.AppIdParam.type)
											.attr('name', Controls.cx.page.dependents.AppIdParam.name)
											.attr('value', Controls.cx.page.dependents.AppIdParam.value));
					elem.appendChild(inputElement);
					return true;
				  });
		},	Structures.LoadingWaitTimesFor.Page);
		return true;
	},
	
	getPlanSummary : function() { 
		this.evaluatePlanSummary({'Message' : 'CX : Framework : this.getPlanSummary',
								  'Item' : Structures.PlanSummary.All,
								  'ExceptionalWaitTime' : true});
		return Structures.MAPPlanSummary; 
	},
	
	/**
	 * Verify & validate results on test cases.
	 *
	 * @param {string} Message to display in console log and to be used to build the screen snapshot file name.
	 * @param {string} Control is the GUI object identifying/locating string.
	 * @param {Structures.Locators} ControlType type of GUI object identifying/locating string.
	 * @param {string} QuestText is text data to verify for.
	 * @param {Structures.FrameworkUIActions} Checkbox to check uncheck checkboxes or radio buttons on the GUI.
	 * @param {string} Attribute is name of the attribute for the GUI control.
	 * @param {string} Value data of the GUI component in case of Attribute & List elements of GUI verifications.
	 * @param {boolean} IsNumeric (true/false) to verify the content is a number.
	 * @param {string} Item the Control like GUI object identifying/locating string.
	 * @param {integer} Indice of the item in the List to verify against.
	 * @param {boolean} IsArray (true/false) to verify the GUI component is an array.
	 * @param {integer} Length to verify & validate for.
	 * @param {boolean} IsNotEmpty to verify & validate items in the List exist.
	 * @param {string} ExceptionalWaitTime extra wait time or delay for automation to wait for availability of the CX GUI Control or Attribute for being read.
	 * @param {integer} Items to verify the count of items/elements in the container provided via Control parameter.
	 * @param {string} ReturnedValue to verify against for inter-nested/callback return value tests.
	 * @return {json} Parameters passed to the function.
	 */
	verify : function (parameters) {
		var _waitFor = (parameters.ExceptionalWaitTime == true) ? Structures.LoadingWaitTimesFor.ExceptionalCondition : Structures.LoadingWaitTimesFor.Control;
		var _params = {'Message' :  parameters.Message,
					   'Control' : parameters.Control,
					   'QuestText' : parameters.QuestText,
					   'ControlType' : parameters.ControlType,
					   'ReturnedValue' : ''};
		if (parameters.Checkbox) {
			switch (parameters.Checkbox)
			{
				case Structures.FrameworkUIActions.Check :
					var checkbox = $(parameters.Control);
					checkbox.isSelected().then(function(selected){
						expect(selected).toEqual(true);
						return true;
					});
					break;

				case Structures.FrameworkUIActions.UnCheck :
					var checkbox = $(parameters.Control);
					checkbox.isSelected().then(function(selected){
						expect(selected).toEqual(false);
						return true;
					});
					break;
				
				default:
					break;
			}	//--- END switch (parameters.Checkbox)
		} else {
			switch(parameters.ControlType) {
				case Structures.Locators.CSS:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.css(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										_params.ReturnedValue = items[parameters.Indice].getText();
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;
				
				case Structures.Locators.XPATH:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.xpath(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;
					
				case Structures.Locators.TAG:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.tagName(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.MODEL:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.model(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.BUTTON_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.buttonText(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.PARTIAL_BUTTON_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.partialButtonText(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.CSS_CONTAINING_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.cssContainingText(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.CLASS_NAME:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.className(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.LINK_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.linkText(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.JAVA_SCRIPT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.js(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.NAME:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.name(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				case Structures.Locators.PARTIAL_LINK_TEXT:
					delta_cx.wait(function() {
					 return delta_cx.findElement(by.partialLinkText(parameters.Control))
							  .then(function(elem) {
								if(parameters.QuestText) {
									expect(elem.getText()).toEqual(parameters.QuestText);
									_params.ReturnedValue = elem.getText();
								}
								if(parameters.Attribute) {
									expect(elem.getAttribute(parameters.Attribute)).toEqual(parameters.Value);
									_params.ReturnedValue = elem.getAttribute(parameters.Attribute);
								}
								if(parameters.IsNumeric) {
									expect(parseInt(elem.getText())).toEqual(-1);
									_params.ReturnedValue = parseInt(elem.getText());
								}								
								if (parameters.Item) {
									elem.all(by.css(parameters.Item)).then(function(items){
										if (parameters.IsNotEmpty) { 
											expect(items[parameters.Indice].getText()).toExist();
										} else if (parameters.Items) {
											expect(items.count()).toEqual(parseInt(parameters.Items));
										} else {
											expect(items[parameters.Indice].getText()).toBe(parameters.Value);
										}
										return true;
									});
								}
								if (parameters.IsNotEmpty) {
									expect(elem.getText()).toExist();
									_params.ReturnedValue = elem.getText();
								}
								if (parameters.Length) {
									expect(elem.getSize()).toEqual(parseInt(parameters.Length));
									_params.ReturnedValue = parseInt(parameters.Length);
								}
								Reporters.log({'Message' : parameters.Message + ' ' + _params.ReturnedValue,
											   'Location' : Structures.ReportLocations.Console});								
								return true;
							  });
					},	_waitFor);
					break;

				default:
					this.verify({'Message' : parameters.Message,
								 'Control' : parameters.Control,
								 'QuestText' : parameters.QuestText,
								 'ControlType' : Structures.Locators.CSS});
					break;
			}
		}	//--- END	if (parameters.Checkbox) {} else {}
		
		Reporters.log({'Message' :  parameters.Message,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
		return _params;
	},

	//--- Valid parameter names : Page, Control, DataCSS
	validatePlanSummary :  function(parameters) {
		var _summary = this.getPlanSummary();
		Reporters.log({'Message' : 'CX : Plan Premium = ' + Structures.MAPPlanSummary.Plan.Premium,
					   'Location' : Structures.ReportLocations.Console});
		switch(parameters.Control) {
			case Structures.PlanSummary.Type:
				//--- Validate Plan Summary - Type
				this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Type:',
							 'Control' : Controls.cx.page.commons.Summary.Plan.Type.label,
							 'QuestText' : parameters.DataCSS.Summary.Type});
				break;
				
			case Structures.PlanSummary.Name:
				//--- Validate Plan Summary - Name
				this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Name:',
							 'Control' : Controls.cx.page.commons.Summary.Product.Name.label,
							 'QuestText' : parameters.DataCSS.Summary.Name});
				break;
				
			case Structures.PlanSummary.Premium:
				//--- Validate Plan Summary - Premium or Price
				var _premium = this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Premium or Price:',
											'Control' : Controls.cx.page.commons.Summary.Plan.Premium.label,
											'QuestText' : parameters.DataCSS.Summary.Premium});
				console.log('SUMMARY (Premium) = ' + _premium);
				break;

			case Structures.PlanSummary.Fee:
				//--- Validate Plan Summary - Fee
				/* this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Fee:',
							 'Control' : Controls.cx.page.commons.Summary.Plan.Fee.label,
							 'QuestText' : parameters.DataCSS.Summary.Fee}); */
				break;

			case Structures.PlanSummary.EnrolleeName: 
				//--- Validate Plan Summary - Enrollee Name at index(#)
				//---- Write code to cover the array factor of DataCSS being a array of dependents!
				/* this.verifyTextInElementArray({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Enrollee Name at index('+parameters.OfIndice+'):', 
											   'ListGUI' : Controls.cx.page.commons.Summary.Enrollees.Applicants.list, 
											   'ItemGUI' : Controls.cx.page.commons.Summary.Enrollees.Applicants.label,
											   'WithData' : parameters.DataCSS.Name.First,
											   'OfIndice' : parameters.DataCSS.Index}); */
				break;

			case Structures.PlanSummary.EnrolleeFacility:
				//--- Validate Plan Summary - Facility Name at index(#)
				/* this.verifyTextInElementArray({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Facility Name at index('+parameters.OfIndice+'):', 
											   'ListGUI' : Controls.cx.page.commons.Summary.Enrollees.Facilities.list, 
											   'ItemGUI' : Controls.cx.page.commons.Summary.Enrollees.Facilities.label,
											   'WithData' : parameters.DataCSS.Name.First,
											   'OfIndice' : parameters.DataCSS.Index}); */
				break;

			case Structures.PlanSummary.Title:
				//--- Validate Plan Summary - Title
				this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Title:',
							 'Control' : Controls.cx.page.commons.Summary.Plan.Title.label,
							 'QuestText' : parameters.DataCSS.Summary.Title});
				break;

			case Structures.PlanSummary.Description:
				//--- Validate Plan Summary - Description
				/* this.verify({'Message' : 'CX Page ('+parameters.Page+') : Validate Plan Summary - Description:',
							 'Control' : Controls.cx.page.commons.Summary.Plan.Description.label,
							 'QuestText' : parameters.DataCSS.Summary.Description}); */
				break;


			case Structures.PlanSummary.ValidateAll:
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Type,
										  'DataCSS' : parameters.DataCSS});
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Name,
										  'DataCSS' : parameters.DataCSS});
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Premium,
										  'DataCSS' : parameters.DataCSS});
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Fee,
										  'DataCSS' : parameters.DataCSS});
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Title,
										  'DataCSS' : parameters.DataCSS});
				/* this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.Description,
										  'DataCSS' : parameters.DataCSS}); */
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.EnrolleeName,
										  'DataCSS' : parameters.DataCSS});
				this.validatePlanSummary({'Page' : parameters.Page,
										  'Control' : Structures.PlanSummary.EnrolleeFacility,
										  'DataCSS' : parameters.DataCSS});
				break;
				
			default:
				break;
		}
	},
	
	/**
	 * Return current selected plan of Delta Dental Plans page.
	 *
	 * @param {string} Control CX GUI Control idenfication text.
	 * @param {string} Title title of the page.
	 */
	 validatePage : function(parameters) {
		 switch(parameters.Control) {
			 case Structures.Pages.PersonalInformation:
				break;
				
			 case Structures.Pages.Dependents:
				//--- Validate page displayed is : Dependents page
				this.verify({'Message' : 'Validate page displayed is : Dependents :',
							 'Control' : Controls.cx.page.Dependents.label,
							 'QuestText' : Controls.cx.page.Dependents.caption});
				break;
				
			 case Structures.Pages.Facilities:
				//--- Validate page displayed is : Facilities page
				this.verify({'Message' : 'Validate page displayed is : Facilities :',
							 'Control' : Controls.cx.page.Facilities.label,
							 'QuestText' : Controls.cx.page.Facilities.caption});
				break;
				
			 case Structures.Pages.PaymentReceipt:
				break;

			 case Structures.Pages.Payment:
				//--- Validate page displayed is : Payments page
				this.verify({'Message' : 'Validate page displayed is : Payments and Review :',
							 'Control' : Controls.cx.page.Purchase.label,
							 'QuestText' : Controls.cx.page.Purchase.caption});
				break;

			 case Structures.Pages.Receipt:
				//--- Validate page displayed is : Receipt page
				this.verify({'Message' : 'Validate page displayed is : Receipt :',
							 'Control' : Controls.cx.page.Receipt.label,
							 'QuestText' : Controls.cx.page.Receipt.caption});
				break;

			 case Structures.Pages.ApplicationReceipt:
				break;

			 case Structures.Pages.GetQuote:
				break;

			 case Structures.Pages.HCentivePlans:
				//--- Validate page displayed is : HCentive Plans (Delta Dental Plans)
				this.verify({'Message' : 'Validate page displayed is : HCentive Plans (Delta Dental Plans):',
							 'Control' : Framework.cx.page.DeltaDentalPlans.pagetitle,
							 'QuestText' : parameters.Title});
				break;

			default:
				break;
		 }
	 }

};
 
module.exports = cxFRMWRKCommons;
