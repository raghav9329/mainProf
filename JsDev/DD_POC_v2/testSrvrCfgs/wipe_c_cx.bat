@echo off
REM Extract the latest test code from the zip archive that is updated every 10 minutes from git and copy it to our runtime folders
C:
cd \cx
echo Removing individual files
del  *.txt
del  *.log
del  *.zip
del  *.js
del  *.jjj
del  *.json
del  *.bat
del  *.xlsx
del  *.gitignore
del  *.md


rmdir /s /q c:\cx\integration
rmdir /s /q c:\cx\microServices
rmdir /s /q c:\cx\productOwnerWorkRequests
rmdir /s /q c:\cx\results

rem xcopy dd-cx-test-1.0.0\scripts c:\cx\scripts /E /Y
rem echo.
rem echo Copying specs Master branch
rem xcopy dd-cx-test-1.0.0\spec\cx c:\cx\spec\cx /E /Y
rem echo.
rem echo Cleaning up extract Master branch
rem rmdir /s /q dd-cx-test-1.0.0
rem echo.
rem echo Done