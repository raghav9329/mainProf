@echo off
::: 
:::
:::
:::
:::
ReM 6/11/18 I copied Daily_Evening_Where_Was_I.bat and renamed the necessary

REM  Wrapper to run unix2dos on Daily Evening Where_Was_I.txt
REM  unix2dos acquired from http://www.efgh.com/software/unix2dos.htm
REM  after searching https://www.google.com/search?q=win7+unix2dos&rlz=1C1CHBD_enUS756US756&oq=win7+unix&aqs=chrome.2.69i57j0l5.8733j0j7&sourceid=chrome&ie=UTF-8
REM  There is also unix2dos at https://sourceforge.net/projects/dos2unix/?source=typ_redirect  

c:\bin\unix2dos C:\Mark\CurrentWork_Delta\Selenium_Test_Runner.txt
start Notepad.exe C:\Mark\CurrentWork_Delta\Selenium_Test_Runner.txt