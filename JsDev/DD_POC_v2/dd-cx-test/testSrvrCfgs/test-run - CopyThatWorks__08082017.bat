@echo off


for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo %TIME% >> D:\cx-test-sources\echo_out.txt
echo Hello World, here I am >> D:\cx-test-sources\echo_out.txt

c:
cd \cx 
call protractor prot_chrome_slave_conf3.js --suite=hclfocus
rem   
rem echo Exit Code from Protractor was %ERRORLEVEL%
rem echo Parsing results

rem dir
rem echo
echo ok-Here is the results.json file copy call
copy c:\cx\results.json d:\cx-test-sources\results\%TIMESTAMP%results.json

d:
cd \cx-test-sources
node -v
dir *.js

rem call node D:\cx-text-sources\devParseLog.js > D:\cx-text-sources\results\cx_test_%TIMESTAMP%.html
call node devParseLog.js >  results\cx_test_%TIMESTAMP%.html
rem start testingOutputDevelopment_%TIMESTAMP%.html

