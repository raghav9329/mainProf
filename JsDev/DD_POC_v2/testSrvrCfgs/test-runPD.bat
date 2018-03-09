@echo off

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo %DATE% " " %TIME% " Hello World, Here are some PD Results ">> D:\cx-test-sources\runLog_output.txt
rem echo Hello World, here I am >> D:\cx-test-sources\echo_out.txt
rem  Let use what's in https://ss64.com/nt/syntax-variables.html

c:
cd \cx 
rem call protractor provdir_mot.conf.js --suite=allEnd
call protractor provdir_mot.conf.js --suite=pd11462

REM  Copy the results file for saving: Leaving a copy behind for html report creation
echo ok-Here is the pdMot_results.json file copy call
copy c:\cx\pdMot_results.json d:\cx-test-sources\pd_results\%TIMESTAMP%pdMot_results.json

d:
cd \cx-test-sources
node -v
dir *.js

rem call node D:\cx-text-sources\devParseLog.js > D:\cx-text-sources\results\cx_test_%TIMESTAMP%.html
call node devParsePDLog.js >  pd_results\pdMot_test_%TIMESTAMP%.html
rem start testingOutputDevelopment_%TIMESTAMP%.html

taskkill /F /IM chromedriver_2.33.exe