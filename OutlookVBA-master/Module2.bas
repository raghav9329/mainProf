Attribute VB_Name = "Module2"






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
   ' rem 2/1/12
   ' Set objFolder = GetFolder("10_Offline\_00_to_do")
   ' In case you would like to move to a subfolder in the inbox
   ' Set objFolder = objInbox.Folders.Item("Done")
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
Sub MoveSelMsgsToFolder_Discussions()
On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder
    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem
    Set objNS = Application.GetNamespace("MAPI")
    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

    Set objFolder = objInbox.Folders.Item("Discussions...") ' Must be Exact Folder name under Inbox
                                                            ' Looking into sub folder management
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
Sub MoveSelMsgsToFolder_Confluence()
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

'***********************************
'* Additionally from
'* find on 2/1/12
'* from http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail
'Public Function GetFolder(strFolderPath As String) As MAPIFolder
'  Dim objApp As Outlook.Application
'  Dim objNS As Outlook.NameSpace
'  Dim colFolders As Outlook.Folders
'  Dim objFolder As Outlook.MAPIFolder
'  Dim arrFolders() As String
'  Dim I As Long
'  On Error Resume Next''
'
'  strFolderPath = Replace(strFolderPath, "/", "\")
'  arrFolders() = Split(strFolderPath, "\")
'  Set objApp = CreateObject("Outlook.Application")
'  Set objNS = objApp.GetNamespace("MAPI")
'  Set objFolder = objNS.Folders.Item(arrFolders(0))
'  If Not objFolder Is Nothing Then
'    For I = 1 To UBound(arrFolders)
'      Set colFolders = objFolder.Folders
'      Set objFolder = Nothing
'      Set objFolder = colFolders.Item(arrFolders(I))
'      If objFolder Is Nothing Then
'        Exit For
'      End If
'    Next
'  End If
'
'  Set GetFolder = objFolder
'  Set colFolders = Nothing
'  Set objNS = Nothing
'  Set objApp = Nothing
'End Function
'* end of 2/1/12 find from
'* http://www.vogella.de/articles/MicrosoftOutlookMacros/article.html#msoutlook_movemail
'******************************************************
