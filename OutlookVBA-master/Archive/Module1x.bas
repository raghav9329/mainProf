Attribute VB_Name = "Module1"
'**********************************************************************
'* 2/9/12  Adding a procedure to move to folder "Discussions..."
'* 2/15/12 Adding a procedure to move to folder "JIRA Confluence Msgs"
'**********************************************************************
'* Beginning of find on 2/1/12
'* from http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail
'* Google < "facility to record macro in outlook"
'*  Provided http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html
'*  Where I got this at #msoutlook_movemail
Sub MoveSelMsgsToFolder_JBMT()

On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder
    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem
    Set objNS = Application.GetNamespace("MAPI")
    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

   ' MUST CHANGE THE OUTPUT FOLDER
   ' Assume this is a mail folder
   'rem 2/1/12
    'Set objFolder = GetFolder("10_Offline\_00_to_do")
    ' In case you would like to move to a subfolder in the inbox
    'Set objFolder = objInbox.Folders.Item("Done")
    '===================================================================
    '* 2/1/12
    '* IMplement the following deprecate the original above
    ' In case you would like to move to a subfolder in the inbox
    Set objFolder = objInbox.Folders.Item("JIRA Bug Msg traffic")

    If objFolder Is Nothing Then
        MsgBox "This folder doesn't exist!", vbOKOnly + vbExclamation, "INVALID FOLDER"
    End If

    If Application.ActiveExplorer.Selection.Count = 0 Then
        'Require that this procedure be called only when a message is selected
        Exit Sub
    End If
 
    For Each objItem In Application.ActiveExplorer.Selection
        If objFolder.DefaultItemType = olMailItem Then
            If objItem.Class = olMail Then
                objItem.Move objFolder
            End If
        End If
    Next

    Set objItem = Nothing
    Set objFolder = Nothing
    Set objInbox = Nothing
    Set objNS = Nothing

End Sub
'************************************************************************
'* 2/9/12 A duplicate function as above, MvSelMsgsToJBMT()except,
'*        This one is handling movement into "Discussions..."
'* .
'************************************************************************
Sub MvSelMsgToDiscussions()
On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder
    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem
    Set objNS = Application.GetNamespace("MAPI")
    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

    Set objFolder = objInbox.Folders.Item("Discussions...")

    If objFolder Is Nothing Then
        MsgBox "This folder doesn't exist!", vbOKOnly + vbExclamation, "INVALID FOLDER"
    End If

    If Application.ActiveExplorer.Selection.Count = 0 Then
        'Require that this procedure be called only when a message is selected
        Exit Sub
    End If
 
    For Each objItem In Application.ActiveExplorer.Selection
        If objFolder.DefaultItemType = olMailItem Then
            If objItem.Class = olMail Then
                objItem.Move objFolder
            End If
        End If
    Next

    Set objItem = Nothing
    Set objFolder = Nothing
    Set objInbox = Nothing
    Set objNS = Nothing
End Sub
'**********************************************************************************************
'* 2/9/15 A duplicate function as above, MvSelMsgsToJBMT() & MvSelMsgToDiscussions() except,
'*        This one is handling movement into "Jira Confluence msgs"
'* .
'**********************************************************************************************
Sub MvSelMsgToJiraConfluenceMsgs()
On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder
    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem
    Set objNS = Application.GetNamespace("MAPI")
    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

    Set objFolder = objInbox.Folders.Item("JIRA Confluence Msgs")

    If objFolder Is Nothing Then
        MsgBox "This folder doesn't exist!", vbOKOnly + vbExclamation, "INVALID FOLDER"
    End If

    If Application.ActiveExplorer.Selection.Count = 0 Then
        'Require that this procedure be called only when a message is selected
        Exit Sub
    End If
 
    For Each objItem In Application.ActiveExplorer.Selection
        If objFolder.DefaultItemType = olMailItem Then
            If objItem.Class = olMail Then
                objItem.Move objFolder
            End If
        End If
    Next

    Set objItem = Nothing
    Set objFolder = Nothing
    Set objInbox = Nothing
    Set objNS = Nothing
End Sub


Sub MoveSelectedMessagesToFolder()
'***********************************
'* Additionally from
'* find on 2/1/12
'* from http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail
On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder

    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem

    Set objNS = Application.GetNamespace("MAPI")

    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

   ' MUST CHANGE THE OUTPUT FOLDER
   ' Assume this is a mail folder
    Set objFolder = GetFolder("2009\Q4")
    


    If objFolder Is Nothing Then
        MsgBox "This folder doesn't exist!", vbOKOnly + vbExclamation, "INVALID FOLDER"
    End If

    If Application.ActiveExplorer.Selection.Count = 0 Then
         MsgBox "Nothing selected", vbOKOnly + vbExclamation, "No message selected"
        Exit Sub
    End If

 
    For Each objItem In Application.ActiveExplorer.Selection
        If objFolder.DefaultItemType = olMailItem Then
            If objItem.Class = olMail Then
                objItem.Move objFolder
            End If
        End If
    Next

    Set objItem = Nothing
    Set objFolder = Nothing
    Set objInbox = Nothing
    Set objNS = Nothing

End Sub


Public Function GetFolder(strFolderPath As String) As MAPIFolder
'***********************************
'* Additionally from
'* find on 2/1/12
'* from http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail

  ' folder path needs to be something like
  '   "Public Folders\All Public Folders\Company\Sales"
  Dim objApp As Outlook.Application
  Dim objNS As Outlook.NameSpace
  Dim colFolders As Outlook.Folders
  Dim objFolder As Outlook.MAPIFolder
  Dim arrFolders() As String
  Dim I As Long
  On Error Resume Next

  strFolderPath = Replace(strFolderPath, "/", "\")
  arrFolders() = Split(strFolderPath, "\")
  Set objApp = CreateObject("Outlook.Application")
  Set objNS = objApp.GetNamespace("MAPI")
  Set objFolder = objNS.Folders.Item(arrFolders(0))
  If Not objFolder Is Nothing Then
    For I = 1 To UBound(arrFolders)
      Set colFolders = objFolder.Folders
      Set objFolder = Nothing
      Set objFolder = colFolders.Item(arrFolders(I))
      If objFolder Is Nothing Then
        Exit For
      End If
    Next
  End If

  Set GetFolder = objFolder
  Set colFolders = Nothing
  Set objNS = Nothing
  Set objApp = Nothing
End Function
'* end of 2/1/12 find from
'* http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail
'******************************************************




'****************************************************************
'* 2/9/12 This Subroutine is not part of the ultimate solution
'*        It is part of things found during my investigtaion
'****************************************************************
Public Sub Move_moremails()
'**************************************************
'* 2/1/12
'* This section of code from the following URLs
'* http://www.outlookcode.com/code.aspx : Section Code Essentials 50PerPage
'* Select item : wrong timestamp when mails moved in MSO'look 2003
'* http://www.outlookcode.com/codedetail.aspx?id=1975
'*
'Dim Values
    Dim ns As NameSpace
    Dim MyFolder As MAPIFolder
    Dim DestFolder As MAPIFolder
    Dim Item As Object
    Dim I As Long
     
'Set Printed Items Folder
    Set myNameSpace = GetNamespace("MAPI")
    'Set MyFolder = myNameSpace.GetDefaultFolder(olFolderSentMail)
    Set MyFolder = ActiveExplorer.CurrentFolder
'subfolder under Sent folder
    Set myDestFolder = MyFolder.Folders("spm")
         
I = 0
'Check if there are any items to move in the printed items folder
 
If MyFolder.Items.Count = 0 Then MsgBox "There are no messages to move ", vbInformation, "Nothing Found"
If MyFolder.Items.Count = 0 Then Exit Sub
'Exit Sub
'End If
 
'Move Items
 
Set objItems = MyFolder.Items
intCount = objItems.Count
MsgBox "I found" & intCount & " files,Have a nice day!", vbInformation
For I = intCount To 1 Step -1
     Set Item = objItems(I)
    Item.Move myDestFolder
Next
 
'Results Summary
If I > 0 Then
'If intCount > 0 Then
    MsgBox "I found" & I & " files and have moved them to" & myDestFolder & vbCrLf & vbCrLf & "Have a nice day!", vbInformation, "Finished!"
Else
    MsgBox "I didn't find any files to move", vbInformation, "Finished!"
End If
   Set myNameSpace = Nothing
   Set MyFolder = Nothing
   Set myDestFolder = Nothing
   Set objItems = Nothing
   Set Item = Nothing
End Sub
'****************************************************************
'* 2/9/12 This Subroutine is not part of the ultimate solution
'*        It is part of things found during my investigtaion
'****************************************************************
Sub Review_ItemNum()
 Dim emlSecond As MailItem
 Dim nsMyNameSpace As NameSpace
 Dim fdrInbox As MAPIFolder

 Set nsMyNameSpace = Application.GetNamespace("MAPI")
 Set fdrInbox = nsMyNameSpace.GetDefaultFolder(olFolderInbox)
 Set emlSecond = fdrInbox.Items.Item(433)
 MsgBox "Second e-mail : " & vbCrLf & vbCrLf & _
        emlSecond.Subject & vbCrLf & emlSecond.Body

End Sub

'****************************************************************
'* 2/9/12 This Subroutine is not part of the ultimate solution
'*        It is part of things found during my investigtaion
'****************************************************************
Sub MoveItem()

 Set ns = GetNamespace("MAPI")
 Set Inbox = ns.GetDefaultFolder(olFolderInbox)

 'If Not (Inbox.Items.Count = 0) Then
  '  MsgBox "There are xxxx messages in the Inbox.", vbInformation, _
    '       "Who Hooo...."
  '  Exit Sub
 'End If

 Dim DestFolder As MAPIFolder
 Set DestFolder = Inbox.Folders("JIRA Studio Bug Msg traffic")




End Sub

'****************************************************************
'* 2/9/12 This Subroutine is not part of the ultimate solution
'*        It is part of things found during my investigtaion
'****************************************************************

Sub SaveMessageToWord()
'Created by Helen Feddema 3-25-2002
'Last modified 3-25-2002

'On Error GoTo ErrorHandler

 Set ns = GetNamespace("MAPI")
 Set Inbox = ns.GetDefaultFolder(olFolderInbox)
 Dim DestFolder As MAPIFolder
 Set DestFolder = Inbox.Folders("JIRA Bug Msg traffic")

 ' Dim appWord As Word.Application
   Dim ins As Outlook.Inspector
   Dim msg As Outlook.MailItem
   Dim strMessage As String
   'Dim docs As Word.Documents
   Dim prps As Object
   Dim strDocument As String
   Dim strTemplateDir As String
   
   'Create a new document from the Word template
   'Set appWord = GetObject(, "Word.Application")
   'strTemplateDir = appWord.Options.DefaultFilePath(wdUserTemplatesPath)
   Debug.Print "Office templates directory: " & strTemplateDir
   strDocument = strTemplateDir & "\Outlook Mail.dot"
   Debug.Print "Document: " & strDocument
   
   'Set docs = appWord.Documents
  ' docs.Add strDocument
   
  ' Set prps = appWord.ActiveDocument.CustomDocumentProperties
   
   'Determine whether an Outlook item is open in an Inspector
   Set ins = Application.ActiveInspector
   If ins Is Nothing Then
      strMessage = "No Outlook item is open; can't import mail"
      MsgBox strMessage
      appWord.ActiveDocument.Close (False)
      GoTo ErrorHandlerExit
   Else
      Debug.Print "Current item class: " & ins.CurrentItem.Class
   End If
   
   'Determine class of currently open Outlook item
   If ins.CurrentItem.Class <> olMail Then
      'Current item is not a mail item
      strMessage = "No mail item is open; exiting"
      MsgBox strMessage
      appWord.ActiveDocument.Close (False)
      GoTo ErrorHandlerExit
   ElseIf ins.CurrentItem.Class = olMail Then
      'Current item is a mail item; save data to doc properties
      Set msg = ins.CurrentItem
      
     ' msg.Move (DestFolder)
      ins.MailItem.Move
      
      'prps.Item("MailSubject") = msg.Subject
      'If Len(msg.Body) <= 127 Then
      '   prps.Item("Body") = msg.Body
      'Else
      '   appWord.Selection.GoTo what:=wdGoToBookmark, Name:="Body"
      '   appWord.Selection.TypeText Text:=msg.Body
      'End If
      'prps.Item("CC") = msg.CC
      'prps.Item("BCC") = msg.BCC
      'prps.Item("Sent") = msg.SentOn
      'prps.Item("From") = msg.SenderName
      'prps.Item("Categories") = msg.Categories
      'appWord.Selection.WholeStory
      'appWord.Selection.Fields.Update
      'appWord.Selection.EndKey Unit:=wdStory
   End If

ErrorHandlerExit:
   Exit Sub

ErrorHandler:
   If Err.Number = 91 Then
      strMessage = "No mail message is open; can't import mail"
      MsgBox strMessage
      appWord.ActiveDocument.Close (False)
      GoTo ErrorHandlerExit
   Else
      MsgBox "Error No: " & Err.Number & "; Description: " & Err.Description
   End If
   Resume ErrorHandlerExit

End Sub




