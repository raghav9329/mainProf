Attribute VB_Name = "Module1"

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' Special Section of testing
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

Sub Button_for_Folder_JBMT()
  moveToFolderWithName ("JIRA Bug Msg traffic")
End Sub

Sub Button_for_Folder_Discussions()
  moveToFolderWithName ("Discussions...")
End Sub

Sub Button_for_Folder_Confluence()
  moveToFolderWithName ("JIRA Confluence Msgs")
End Sub

Sub moveToFolderWithName(FolderName As String)
    On Error Resume Next
    Dim objFolder As Outlook.MAPIFolder, objInbox As Outlook.MAPIFolder
    Dim objNS As Outlook.NameSpace, objItem As Outlook.MailItem
    Set objNS = Application.GetNamespace("MAPI")
    Set objInbox = objNS.GetDefaultFolder(olFolderInbox)

    Set objFolder = objInbox.Folders.Item(FolderName)

    If objFolder Is Nothing Then
        MsgBox "This folder doesn't exist!", vbOKOnly + vbExclamation, "INVALID FOLDER"
    End If

    If Application.ActiveExplorer.Selection.Count = 0 Then ' Handle Error Condition: Nothing selected
        MsgBox ("A message actually needs to be selected for the Macro move button to be effective")
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




