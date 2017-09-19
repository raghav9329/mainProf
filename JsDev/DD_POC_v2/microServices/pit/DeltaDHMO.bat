
set root=c:\Program Files\SmartBear\SoapUI-5.2.1\bin\

CD %root%
testrunner.bat -a -fC:\SoapUI\Results\DeltaDHMO "C:\git\dd-cx-test\microServices\e2eflows\Delta-DHMO.xml"
