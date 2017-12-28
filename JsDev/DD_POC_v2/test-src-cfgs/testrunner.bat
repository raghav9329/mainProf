@echo off
REM Batch file to run the CX test scripts identified by the conf file passed in on the command line
echo Checking the command line
if %1.==. (
	echo ERROR: You must specify the config file you want to run on the command line
	goto End
)

REM Make sure that now matter how this file is being called, the path is set correctly
PATH=C:\Users\SELENIUM_RUNNER\bin;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\local\bin;C:\Program Files\Git\usr\bin;C:\Program Files\Git\usr\bin;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\bin;C:\Users\SELENIUM_RUNNER\bin;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0;C:\WINDOWS\idmu\common;C:\WINDOWS\CCM;C:\WINDOWS\System32\WindowsPowerShell\v1.0;C:\WINDOWS\CCM;C:\Program Files\Microsoft Network Monitor 3;D:\Program Files\TortoiseSVN\bin;D:\Program Files\SlikSvn\bin;D:\Program Files (x86)\HP\Unified Functional Testing\bin;C:\Program Files\Git\cmd;C:\Program Files\Java\jdk1.8.0_102\bin;C:\CX\continuous_integration;C:\Program Files\Java\jdk1.8.0_102\bin;C:\Program Files\nodejs;C:\cx\node_modules\.bin;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;C:\Users\SELENIUM_RUNNER\AppData\Roaming\npm;C:\bin;C:\cx\node_modules\.bin;C:\Program Files\Git\usr\bin\vendor_perl;C:\Program Files\Git\usr\bin\core_perl

REM Set some configurable values and get the current timestamp
set PARAMS="--params.baseUrl=https://aw-lx0076.deltadev.ent:3000/enroll"
rem set GIT_URL=https://rc-github.deltads.ent/DEVPROJECTS/dd-cx-test/archive/master.zip
set GIT_URL=https://rc-github.deltads.ent/DEVPROJECTS/dd-cx-test/archive/dev.zip

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

REM Extract the test code from the zip archive
:Extract
echo Extracting test sources  --- Pausing 
pause
"d:\Program Files (x86)\7-Zip\7z.exe" x cx-test-sources.zip
echo.
echo Copying Master branch  --- pausing 
pause
Rem  xcopy dd-cx-test-master c:\cx /E /Y
xcopy dd-cx-test-dev c:\cx /E /Y
echo.
echo Cleaning up extracted Master branch  --- pausing last time 
pause
rmdir /s /q dd-cx-test-master
echo.

REM Verify the config file we specified actually exists
echo Verifying config file
if NOT exist c:\cx\%1 (
	echo ERROR: The config file specified on the command line, %1, does not exist in c:\cx
	goto End
)

:StartRun
echo Starting test run
c:
cd \cx
call protractor %1

echo Exit Code from Protractor was %ERRORLEVEL%
echo Parsing results
d:
cd \cx-test-sources
node parse_log.js > results\cx_test_%TIMESTAMP%.html

:End
