@echo off
:dhe2e
:dpe2e
:ahe2e
:ape2e
:states

rem call protractor acq_DitAws_conf.js --suite=dhe2e 
rem call mkit.bat

rem call protractor acq_DitAws_conf.js --suite=dpe2e
rem call mkit.bat

rem call protractor acq_DitAws_conf.js --suite=ahe2e
rem call mkit.bat

rem call protractor acq_DitAws_conf.js --suite=ape2e
rem call mkit.bat

rem call protractor acq_DitAws_conf.js --suite=states
rem call mkit.bat


call protractor acq_DitAws_conf.js --suite=dhe2e,dpe2e,ahe2e,ape2e,states
call mkit.bat
