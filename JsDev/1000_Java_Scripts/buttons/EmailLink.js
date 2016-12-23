function EmailLink(){
window.location = "mailto:"+"?subject=I thought this link might interest you." + "&body="+document.title+"  "+window.location;
}
document.write('<INPUT class="select" TYPE="button" VALUE="E-mail this link to a friend" onClick="EmailLink()"></FORM>')

