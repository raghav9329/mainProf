Rem ***************************************
Rem Originally titled testBackupHere_v2.bat 
rem 11/4/13
rem changed to PhoneBackup_v2.bat
rem  evening now v3. v2 in C:\mark\Backup Functional Development\Archive
rem
rem ***************************************


Rem ******************************
Rem * Set envar
Rem ******************************

if [%1]==[] (
   echo usage: DriveLetter of directory to backup and specific Directory to start in recursively
   echo usage: %0  'H c_Mark'
   goto end
   )

if [%2]==[] (
   echo usage: %0% %1% Source drive Letter and backup destination eg: 'SomeDirectoryName in the destination'
   goto end
   )

echo %0%
echo %1%
echo %2%


Rem **************************************************
rem The following %1%:\  identifies the source of  
rem data we are backing up. %1% represents the letter
rem we pass in as the drive letter: H most of the time
rem 
rem Original vars frm phone bat.  
rem dont know how they apply here (yet)
rem set backupSource=%1%:\
rem echo %backupSource%

Rem  Maybe I could do this as set backupSource=%CD% ???
Rem  echo echoing percent_CD_percent %CD%
Rem  echo what was it? c:\mark ?

set backupSource=%CD%

set logDate=%date:~4,2%_%date:~7,2%_%date:~10,4%
set  h=%TIME:~0,2%
set  m=%TIME:~3,2%
set  s=%TIME:~6,2%
set us=%TIME:~9,2%

if /I "%h%"==" 0" (
 set h=00
)

if /I "%h%"==" 1" (
 set h=01
)

if /I "%h%"==" 2" (
 set h=02
 )

if /I "%h%"==" 3" (
 set h=03
 )
      
if /I "%h%"==" 4" ( 
 set h=04
 )

if /I "%h%"==" 5" (
 set h=05
 )

if /I "%h%"==" 6" ( 
 set h=06
 ) 
  
if /I "%h%"==" 7" ( 
 set h=07
 )

if /I "%h%"==" 8" ( 
 set h=08
 )

if /I "%h%"==" 9" ( 
 set h=09
 ) 

set logTime=%h%_%m%_%s%_%us%

set logDest=%backupSource%\adminThisDir
echo %logDest%

set logFile=%logDest%\Backup_Log_%logDate%_%logTime%.txt
echo %logFile%
echo ******************************* > %logFile%

echo %date% %time% BACKUP LOG FILE on drive %drvletter% Starting... > %logFile%



rem I want the following because this faile
rem should be the same for all directories on this machine
rem 
rem set backupRootLoc=2013LaptopBackup

rem set backupDriveLetter=%1%


rem set backupDestDirectory=%2%



rem set backupDest=%1%:\%backupRootLoc%\%2%
set backupDest=%1%:\%2%
echo backupDest

rem set excludeFiles=/XF *.oab *.obi *.avi *.mp3
rem set excludeDirs=/XD .svn phoneData\Music phoneData\Music_new phoneData\VideoSelections1 phoneData\VideoSelections2

echo %backupSource%

echo %logFile%


robocopy %backupSource%  %backupDest% /FFT /XO /XX /E /COPY:DAT /TS /FP /NP %excludeDirs% /LOG+:%logFile%

rem Need to add Exclude files *.avi from phone backup so I don't get all the movies that are backed up elsewhere.
rem need to add Exclude phone backup music dir for all the new music

rem 1/3/14 the proper approach seems like it should be XD on phone backup directories to avoice the mp3 and avi files.
rem cuz I might want them from other non phone backup directories

:end


