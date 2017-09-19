
set root=c:\Program Files\SmartBear\SoapUI-5.2.1\bin\

CD %root%
testrunner.bat -a -fC:\SoapUI\Results\DeltaPPO "C:\git\dd-cx-test\microServices\dit\Delta-PPO.xml"
