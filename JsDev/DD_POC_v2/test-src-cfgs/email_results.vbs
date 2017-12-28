Option Explicit

Const SMTP_SRVR = "sacmsghub102.deltads.ent"
Const CDO_SEND_USING_METHOD = "http://schemas.microsoft.com/cdo/configuration/sendusing"
Const CDO_SEND_USING_PORT = 2
Const CDO_SMTP_SERVER = "http://schemas.microsoft.com/cdo/configuration/smtpserver"
Const FOR_READING = 1

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

Function SendEmail (emailTo, subject, body)
	Dim message
	Dim i

	Err = 0
	'On Error Resume Next
	Set message = CreateObject("CDO.Message")
	'If Err > 0 Then
	'	On Error GoTo 0
	'	SendEmail = false
	'	Exit Function
	'End If
	message.Configuration.Fields.Item(CDO_SEND_USING_METHOD) = CDO_SEND_USING_PORT
	message.Configuration.Fields.Item(CDO_SMTP_SERVER) = SMTP_SRVR
	message.Configuration.Fields.Update

	message.Subject = subject
	message.From = "#TestAutomation@delta.org"
	message.To = emailTo
	message.HTMLBody = body

	message.Send
	'On Error GoTo 0

	'If Err > 0 Then
	'	SendEmail = false
	'Else
	'	SendEmail = true
	'End If

	Set message = Nothing
End Function

Dim body
Dim source

Set source = fso.OpenTextFile("result.html", FOR_READING)
body = source.ReadAll
SendEmail "cullman@delta.org", "Automated CX Test Results", body
