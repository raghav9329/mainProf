
set root=c:\Program Files\SmartBear\SoapUI-5.2.1\bin\  

CD %root%
testrunner.bat -a -fC:\SoapUI\Results\AARPDHMO "C:\git\dd-cx-test\microServices\End-toend\AARP-DHMO.xml"
