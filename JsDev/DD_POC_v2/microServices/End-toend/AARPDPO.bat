
set root=c:\Program Files\SmartBear\SoapUI-5.2.1\bin\

CD %root%
testrunner.bat -a -fC:\SoapUI\Results\AARPDPO "C:\git\dd-cx-test\microServices\End-toend\AARP-DPO.xml"
