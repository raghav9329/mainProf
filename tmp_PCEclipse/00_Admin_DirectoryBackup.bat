@ECHO OFF
echo %date% %time% START BACKUP ** **  >> BackupTimes.txt

if exist d:\2013LaptopBackupAnchor.txt echo %date% %time% found d:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist e:\2013LaptopBackupAnchor.txt echo %date% %time% found e:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist f:\2013LaptopBackupAnchor.txt echo %date% %time% found f:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist g:\2013LaptopBackupAnchor.txt echo %date% %time% found g:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist h:\2013LaptopBackupAnchor.txt echo %date% %time% found h:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist i:\2013LaptopBackupAnchor.txt echo %date% %time% found i:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist j:\2013LaptopBackupAnchor.txt echo %date% %time% found j:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist k:\2013LaptopBackupAnchor.txt echo %date% %time% found k:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist l:\2013LaptopBackupAnchor.txt echo %date% %time% found l:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist m:\2013LaptopBackupAnchor.txt echo %date% %time% found m:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist n:\2013LaptopBackupAnchor.txt echo %date% %time% found n:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist o:\2013LaptopBackupAnchor.txt echo %date% %time% found o:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt
if exist p:\2013LaptopBackupAnchor.txt echo %date% %time% found p:\2013LaptopBackupAnchor.txt >> Admin_DirectoryBackupLog.txt

if exist d:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat d mark_EclipseWorkSpace
if exist e:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat e mark_EclipseWorkSpace
if exist f:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat f mark_EclipseWorkSpace
if exist g:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat g mark_EclipseWorkSpace
if exist h:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat h mark_EclipseWorkSpace
if exist i:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat i mark_EclipseWorkSpace
if exist j:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat j mark_EclipseWorkSpace
if exist k:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat k mark_EclipseWorkSpace
if exist l:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat l mark_EclipseWorkSpace
if exist m:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat m mark_EclipseWorkSpace
if exist n:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat n mark_EclipseWorkSpace
if exist o:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat o mark_EclipseWorkSpace
if exist p:\2013LaptopBackupAnchor.txt call C:\mark_EclipseWorkSpace\localDirectoryBackupVer1.bat p mark_EclipseWorkSpace

echo %date% %time% *** *** END BACKUP >> BackupTimes.txt
echo .                                           .   >> BackupTimes.txt


