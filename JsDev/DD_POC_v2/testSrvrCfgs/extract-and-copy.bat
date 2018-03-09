@echo off
REM Extract the latest test code from the zip archive that is updated every 10 minutes
REM from git into the runtime folder and then make any necessary updates to file paths

set UPDATER=d:\cx-test-sources\fart.exe
set UPDATE_TARGET=c:\cx\protractor-chrome.conf.js

D:
cd \cx-test-sources
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
%UPDATER% %UPDATE_TARGET% CA60212 SELENIUM_RUNNER
%UPDATER% %UPDATE_TARGET% selenium-server-standalone-2.53.1.jar selenium-server-standalone-3.0.1.jar
%UPDATER% %UPDATE_TARGET% chromedriver_2.26 chromedriver_2.27
%UPDATER% %UPDATE_TARGET% geckodriver-v0.12.0 geckodriver-v0.14.0
echo Done
