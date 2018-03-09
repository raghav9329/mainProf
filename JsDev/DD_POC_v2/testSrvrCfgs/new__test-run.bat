@echo off
REM *************************************************************
Rem  New__Test-Run.bat
REm  Incorporates all the new command line reporting
REm  methodologies

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo %DATE% " " %TIME% " Hello World, Here are some B&A Results ">> D:\cx-test-sources\runLog_output.txt
rem echo Hello World, here I am >> D:\cx-test-sources\echo_out.txt
rem  Let use what's in https://ss64.com/nt/syntax-variables.html

c:
cd \cx 
rem call protractor prot_chrome_slave_conf3.js --suite=dhe2e,ahe2e,dpe2e,ape2e,states
rem call protractor acq_mot_conf.js --suite=buy2shop,dhe2e,dpe2e,ahe2e,ape2e
call protractor cmdLineRptGen.conf.js --suite=ahex,apex,dhex,dpex

REM  Copy the results file for saving: Leaving a copy behind for html report creation
echo ok-Here is the results.json file copy call
md5 -n results.json > FileRJMd5.txt
call node getNow.js

copy c:\cx\results.json d:\cx-test-sources\results\%TIMESTAMP%results.json
copy c:\cx\FileNow.txt  d:\cx-test-sources
copy c:\cx\FileRJMd5.txt  d:\cx-test-sources
copy c:\cx\FileCmdLineArgs.txt  d:\cx-test-sources
copy c:\cx\FileHostName.txt   d:\cx-test-sources
copy c:\cx\FileThen.txt  d:\cx-test-sources


d:
cd \cx-test-sources
node -v
dir *.js

rem call node D:\cx-text-sources\devParseLog.js > D:\cx-text-sources\results\cx_test_%TIMESTAMP%.html
call node new__devParseLog.js >  results\cx_test_%TIMESTAMP%.html
rem start testingOutputDevelopment_%TIMESTAMP%.html

taskkill /F /IM chromedriver_2.33.exe