@echo off
:dhe2e
:dpe2e
:ahe2e
:ape2e
:states

call protractor acq_DitAws_conf.js --suite=dhe2e 
call mkit.bat

call protractor acq_DitAws_conf.js --suite=dpe2e
call mkit.bat

call protractor acq_DitAws_conf.js --suite=ahe2e
call mkit.bat

call protractor acq_DitAws_conf.js --suite=ape2e
call mkit.bat

call protractor acq_DitAws_conf.js --suite=states
call mkit.bat


