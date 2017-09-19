
set root=c:\Program Files (x86)\SmartBear\SoapUI-5.3.0\bin\.  

CD %root%
testrunner.bat -a -fC:\cx\SoapUIResults\AARPDPPO "C:\cx\microServices\mot\AARP-DPPO.xml"
