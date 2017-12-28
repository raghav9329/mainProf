@echo off

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo %DATE% " " %TIME% " Hello World, Here are some B&A Results ">> D:\cx-test-sources\runLog_output.txt
rem echo Hello World, here I am >> D:\cx-test-sources\echo_out.txt
rem  Let use what's in https://ss64.com/nt/syntax-variables.html

c:
cd \cx 
rem call protractor prot_chrome_slave_conf3.js --suite=dhe2e,ahe2e,dpe2e,ape2e,states
call protractor acq_mot_conf.js --suite=buy2shop

REM  Copy the results file for saving: Leaving a copy behind for html report creation
echo ok-Here is the results.json file copy call
copy c:\cx\results.json d:\cx-test-sources\results\%TIMESTAMP%results.json

d:
cd \cx-test-sources
node -v
dir *.js

rem call node D:\cx-text-sources\devParseLog.js > D:\cx-text-sources\results\cx_test_%TIMESTAMP%.html
call node devParseLog.js >  results\cx_test_%TIMESTAMP%.html
rem start testingOutputDevelopment_%TIMESTAMP%.html

taskkill /F /IM chromedriver_2.33.exe