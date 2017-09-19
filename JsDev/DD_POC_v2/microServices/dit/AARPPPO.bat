
set root=c:\Program Files\SmartBear\SoapUI-5.2.1\bin\

CD %root%
testrunner.bat -a -fC:\SoapUI\Results\AARPPPO "C:\git\dd-cx-test\microServices\dit\AARP-PPO.xml"
