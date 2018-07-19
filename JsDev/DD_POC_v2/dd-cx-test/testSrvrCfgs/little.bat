
for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

node -v


rem call node D:\cx-text-sources\devParseLog.js > D:\cx-text-sources\results\cx_test_%TIMESTAMP%.html
rem call node devParsePDLog.js > pdMot_test_%TIMESTAMP%.html
call node devParsePDLog.js >  pd_results\pdMot_test_%TIMESTAMP%.html