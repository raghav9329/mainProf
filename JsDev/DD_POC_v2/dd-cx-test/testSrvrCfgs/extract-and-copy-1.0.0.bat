@echo off
REM Extract the latest test code from the zip archive that is updated every 10 minutes from git and copy it to our runtime folders
D:
cd \cx-test-sources
echo Copying scripts Master branch
xcopy dd-cx-test-1.0.0\scripts c:\cx\scripts /E /Y
echo.
echo Copying specs Master branch
xcopy dd-cx-test-1.0.0\spec\cx c:\cx\spec\cx /E /Y
echo.
echo Cleaning up extract Master branch
rmdir /s /q dd-cx-test-1.0.0
echo.
echo Done