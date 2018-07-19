# dd-cx-test Test Automation Framework

Test automation started on the Customer Experience Initiative code base.

This work tracked in the dd-cx-test repository located at Location 
```
"https://rc-lx842.ut.dentegra.lab/DEVPROJECTS/dd-cx-test.git"
```

Automation is based upon Protractor / Jasmine  with Javascript, Selenium Web Driver libraries

The root of this repository contains the configuration files for the automation scripting 

The Integration directory contains the  files that do the work.
#### scenarios: All "End To End"  test automation scripts will live at this level in the directory structions
	* Both projects CXINIT and CXINIT2 ( Provider Directory )  live at this level
	* The names of the files will identify the product being tested and possibly some specific nature of the test script to delineate its difference from other scripts for the same product. 

##### Subdirectorys: 
	* xproduct 
		* ape2e
		* content
		* deps
		* dpe2e
		* e2eAP
		* facs
		* pays
		* pdf
		* pers
		* shop
	* providers
	* providerapi
	* planmgt
#### pageObjects: 
	
Js Object definitions of the page or component of the page under test
all files in this directory are product agnostic.  Functions and features within will be shared across all product lines

#### testData: 

PersonalInfo.json  JSON data to be fed to the testing framework. ( this file is very story specific at this time.  Every file in this directory may be very specific to a Story/Feature

Iterative test work against a single web element can be facilitated by multiple entries against the same web element with different data

#### controls: 

Under the Controls directory we have distinguish control files details of each is listed below:

* TEXTBOX:

For Each textbox all the operations is developed in textbox-control.js under Controls directory
Which has all the operations related to textbox like (setText(), getText(), getValue(), getAttribute(), isPasswordField(), isReadonly(), isMandatory(), getLabelText(), clear() )

* BUTTON:

For Each button all the operations is developed in button-control.js under Controls directory
Which has all the operations related to textbox like (getText(), click() )

* LABEL:

For Each label all the operations is developed in label-control.js under Controls directory
Which has all the operations related to textbox like (getText(), click(), getAttribute(), getCount() )

* SELECT:

For Each select all the operations is developed in select-control.js under Controls directory
Which has all the operations related to textbox like (getSelectedText(), getSelectedValue(), getAllOptions(), getOptionsCount(), selectByValue(), selectByIndex(), selectByText(), selectByPartialText() )


#### utils:  

* element-finder-extensions.js:-

	* This file contains helper methods and extends the Protractor libraries. 
	* waitReady() -  This method is a polling kind of method and it polling continuously for element present and displayed with in the give time span. 
	No need to put conditions in the spec or Page actions whether the element is present or displayed.
		Reference source: https://gist.github.com/elgalu/2939aad2b2e31418c1bb.
    * We consumed following helper methods in element controllers.

	* Implemented helper methods  like clickIt, isPresent, isDisplayed, sendKeys, and SelectOptinos etc.,

##### Protractor Installation and dd-cx-test Test Automation Framework configuration

#### 1.Create project folder in "C" directory

#### 2.Clone dd-cx-test from git
* git config --global http.sslVerify false
* git config --global user.name "Naresh Babu" (Change accordingly )
* git config --global user.email NKanagala@delta.org (Change accordingly )
* git clone https://rc-lx842.ut.dentegra.lab/DEVPROJECTS/dd-cx-test.git
* git init

#### 3.Install protractor and required node-modules

```
open command prompt and navigate project folder (Where package.json file exists)

* npm install ( package.json file configured all dependencies ) 
* npm install protractor@X.X.X (Installing specific version of protractor)
* cd node-modules/.bin
* webdriver-manager update

```
Verify : Selenium standalone server (selenium-server-standalone-X.X.X.jar) and chrome driver will be downloaded in following path
```
	\node_modules\protractor\node_modules\webdriver-manager\selenium\ 
```

#### 4.Set the Protractor path in Environment variables as below

##### User Variables:
```
PROTRACTOR_HOME: C:\git\dd-cx-test\node_modules
PATH:%PROTRACTOR_PATH%\.bin;
```
 Or 
##### System Variables

```
PATH: C:\git\dd-cx-test\node_modules\.bin;
```

#### 5.Verify that Protractor installed properly or not
```
In cmd

Protractor –version

Version 5.3.1 (Protractor installed with version 5.3.1)
```
#### 6.Run the test script
```
Run the following command from command line

npm run buydit -- --suite=xproduct --params.states phase1
npm run buymot -- --suite=xproduct --params.states phase1
```


### Note: Install Protractor Locally 

#### Why we need to install/ make a copy of protractor in locally?

We can install protractor in two ways

### 1.Globally (npm install protractor –g)
* Generally installation of protractor globally recommended when we used basic flavor of protractor 
* If we install protractor globally it will be available to all the users 
* No need to set the path for protractor home
* If we extend protractor API, we have to maintain protractor node module in local node-module folder
### 2.Locally (npm install protractor)
* In NodeJs , If we “require” node-module[ex: require('log4js'); log4js is node-module], the same should be in local.
* In our framework we have customized Protractor node-modules. So, the Installation of protractor locally is recommended 
* If we install protractor locally, we need to set the Protractor home path in Environment variable
* Setting the Protractor home path in Environment variable resolves all configuration issues


#### Documentation links

* [Shopping and Buying PageObjects](./shopping_pageObjects/index.html) - Page Objects Documentation
* [Provider Directory PageObjects](./PD_pageObjects/index.html) - Page Objects Documentation
* [controls](./controls/index.html) - Page Objects Documentation




### Additional info regarding previous work 

##  All previous work in the DD-CX-TEST repository moved into /previousWork.
##  1/30/17 this is a new start on the Customer Experience Test Repository.
##  This work is developed around Node.js, Protractor, Jasmine, gulp etc. ( more to come on that list later )
##  Installation of this work is not currently defined.
##  	Choices are being discussed. Mark Atkinson currently leans toward Confluence but some notes could be put here.
2/8/18  Buy this time 
The previousWork.zip file contains
Integration.Scenarios.Temp   this was Mark's earliest completed work.
previousWork    This was Uday T's massive undertaking that never went anywhere
 --  ADDED To Day --  
 ./microServices   this was the first attempt that was using SOAP.  We stopped this
 when we finally figured out that all testing was against hCentive and not against 
 The REST APIs generated by the microServices written inHouse.