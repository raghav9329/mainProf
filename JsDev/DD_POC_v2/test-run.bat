@echo off
REM Batch file to update the CX test script and launch the tests

REM Jenkins overrides the environment path so we need to reconfigure it for our stuff to work
rem PATH=C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3\;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs\;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;

REM Set some configurable values and get the current timestamp
rem set UPDATER=d:\cx-test-sources\fart.exe
rem set GIT_URL=https://rc-github.deltads.ent/DEVPROJECTS/dd-cx-test/archive/master.zip
set PROTRACTOR_CONF=protractor-chrome.conf.js

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

REM Head in to our working directory    
rem D:
rem cd \cx-test-sources

REM Get the latest test code from GIT   
:GetLatestCode
rem echo Getting latest test code from GIT
rem wget --user=svc_qtp_testrunner_1 --password=popcorn --auth-no-challenge -O cx-test-sources.zip --no-check-certificate %GIT_URL%

REM Extract the test code from the zip archive and update the file paths
:Extract
rem echo Extracting test sources
rem "d:\Program Files (x86)\7-Zip\7z.exe" x cx-test-sources.zip
rem echo.
rem echo Copying Master branch
rem xcopy dd-cx-test-master c:\cx /E /Y
rem echo.
rem echo Cleaning up extracted Master branch
rem rmdir /s /q dd-cx-test-master
rem echo.
rem echo Updating paths
rem c:
rem cd \cx
rem %UPDATER% %PROTRACTOR_CONF% CA60212 SELENIUM_RUNNER
rem %UPDATER% %PROTRACTOR_CONF% selenium-server-standalone-2.53.1.jar selenium-server-standalone-3.0.1.jar
rem %UPDATER% %PROTRACTOR_CONF% chromedriver_2.26 chromedriver_2.27
rem %UPDATER% %PROTRACTOR_CONF% geckodriver-v0.12.0 geckodriver-v0.14.0
rem echo .

:StartRun
echo Starting test run
call protractor --resultJsonOutputFile=results.json %PROTRACTOR_CONF%
echo Exit Code from Protractor was %ERRORLEVEL%
echo Parsing results
rem d:
rem cd \cx-test-sources
rem node parse_log.js > results\cx_test_%TIMESTAMP%.html
node devParseLog.js > testOutput_%TIMESTAMP%.html
