@echo off
REM Batch file to update the CX test script and launch the tests

REM Jenkins overrides the environment path so we need to reconfigure it for our stuff to work
REM PATH=%PATH%;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3\;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs\;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;
REM PATH=%PATH%;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3\;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs\;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;
REM PATH=%PATH%;c:\cx\node_modules\.bin;C:\Users\SELENIUM_RUNNER\bin
PATH=C:\Users\SELENIUM_RUNNER\bin;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\local\bin;C:\Program Files\Git\usr\bin;C:\Program Files\Git\usr\bin;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\bin;C:\Users\SELENIUM_RUNNER\bin;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\WINDOWS\System32\WindowsPowerShell\v1.0;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3;D:\Program Files\TortoiseSVN\bin;D:\Program Files\SlikSvn\bin;D:\Program Files (x86)\HP\Unified Functional Testing\bin;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\CX\continuous_integration;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs;C:\cx\node_modules\.bin;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;C:\bin;C:\cx\node_modules\.bin;C:\Program Files\Git\usr\bin\vendor_perl;C:\Program Files\Git\usr\bin\core_perl

REM Set some configurable values and get the current timestamp
set UPDATER=d:\cx-test-sources\fart.exe
set PROTRACTOR_CONF=prot_chrome_slave_conf.js
set PARAMS="--params.baseUrl=https://aw-lx0076.deltadev.ent:3000/enroll"
set GIT_URL=https://rc-github.deltads.ent/DEVPROJECTS/dd-cx-test/archive/master.zip
REM ::
REM set PARAMS="--params.baseUrl=https://mot.deltadentalins.com"
REM set PROTRACTOR_CONF=protractor.conf.js
REM set PROTRACTOR_CONF=protractor-chrome.conf.js

REM Get a Time stamp variable:  better than my verion !
for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

REM Head in to our working directory
D:
cd \cx-test-sources


REM Get the latest test code from GIT
:GetLatestCode
echo Getting latest test code from GIT
wget --user=svc_qtp_testrunner_1 --password=popcorn --auth-no-challenge -O cx-test-sources.zip --no-check-certificate %GIT_URL%


REM Extract the test code from the zip archive and update the file paths
:Extract
echo Extracting test sources
"d:\Program Files (x86)\7-Zip\7z.exe" x cx-test-sources.zip
echo.
echo Copying Master branch
xcopy dd-cx-test-master c:\cx /E /Y
echo.
echo Cleaning up extracted Master branch
rmdir /s /q dd-cx-test-master
echo.
echo Updating paths
c:
cd \cx

Rem 5/3/17 testing prot_chrome_slave_conf.js file
Rem No UPDATER reconfig necessary
Rem 
REM    %UPDATER% %PROTRACTOR_CONF% CA60212 SELENIUM_RUNNER
REM    %UPDATER% %PROTRACTOR_CONF% selenium-server-standalone-2.53.1.jar selenium-server-standalone-3.0.1.jar
REM    %UPDATER% %PROTRACTOR_CONF% chromedriver_2.26 chromedriver_2.27
REM    %UPDATER% %PROTRACTOR_CONF% geckodriver-v0.12.0 geckodriver-v0.14.0
echo .

:StartRun
rem exit
Rem pause
echo Starting test run
REM call protractor --resultJsonOutputFile=result.json %PROTRACTOR_CONF%
REM call protractor %PROTRACTOR_CONF% --params.baseUrl=https://mot.deltadentalins.com/

REM call protractor %PROTRACTOR_CONF% %PARAMS%
call protractor %PROTRACTOR_CONF%

echo Exit Code from Protractor was %ERRORLEVEL%
echo Parsing results
d:
cd \cx-test-sources
node parse_log.js > results\cx_test_%TIMESTAMP%.html

:End
