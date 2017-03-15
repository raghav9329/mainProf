@echo off
REM Batch file to update the CX test script and launch the tests

REM Jenkins overrides the environment path so we need to reconfigure it for our stuff to work
PATH=C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3\;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs\;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;

REM Set some configurable values and get the current timestamp
set UPDATER=d:\cx-test-sources\fart.exe
set PROTRACTOR_CONF=protractor-chrome.conf.js
set GIT_URL=https://rc-github.deltads.ent/DEVPROJECTS/dd-cx-test/archive/master.zip

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
%UPDATER% %PROTRACTOR_CONF% CA60212 SELENIUM_RUNNER
%UPDATER% %PROTRACTOR_CONF% selenium-server-standalone-2.53.1.jar selenium-server-standalone-3.0.1.jar
%UPDATER% %PROTRACTOR_CONF% chromedriver_2.26 chromedriver_2.27
%UPDATER% %PROTRACTOR_CONF% geckodriver-v0.12.0 geckodriver-v0.14.0
echo .

:StartRun
echo Starting test run
call protractor --resultJsonOutputFile=result.json %PROTRACTOR_CONF%
echo Exit Code from Protractor was %ERRORLEVEL%
echo Parsing results
d:
cd \cx-test-sources
node parse_log.js > results\cx_test_%TIMESTAMP%.html
