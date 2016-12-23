//Customize Dynamic Audio Link
function DynamicAudioLink(){
open("http://happysmart.net")
}

//Customize Dynamic Audio Mouse Over Color
function AudioOver() {
document.Audio.button.style.background="navy"
document.Audio.button.style.color="white"
}

//Customize Dynamic Audio Mouse Down Color
function AudioDown() {
document.Audio.button.style.color="cyan"
}

//Customize Dynamic Audio Mouse Off Color
function AudioOut() {
document.Audio.button.style.background="yellow"
document.Audio.button.style.color="red"
}

//Customize Dynamic Audio sound
function playHome() 
{
if (document.all)
 {
  document.all.sound.src = "Bleep.wav";
 }
}

document.write('<EMBED SRC="Bleep.wav" autostart="false" hidden="true">')
document.write('<bgsound id="sound">')

//Customize Button Style
document.write('<style type="text/css">'+'<!--')
document.write('.select{background:yellow;border-color:"red";color:"red";font-family:Arial,Helvetica,Verdana;font-size:10pt;font-weight: bold;}'+'-->'+'</STYLE>')

document.write('<center><form name=Audio><input class="select" name=button type="button" value="Dynamic Audio" onclick="DynamicAudioLink()" onMouseOver="AudioOver();playHome()" onMouseDown="AudioDown()" onMouseOut="AudioOut()"></form></center>')
