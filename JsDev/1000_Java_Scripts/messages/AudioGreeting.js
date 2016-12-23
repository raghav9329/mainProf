var d = new Date()
var h = d.getHours()

//You can record your own audio greeting and customize the greeting time and message
if (h < 12) document.write('<bgsound SRC="http://javascript.internet.com/img/audio-greetings/Goodmorning.wav" AUTOSTART=true LOOP=1>'+'Good morning!')
else if (h < 17) document.write('<bgsound SRC="http://javascript.internet.com/img/audio-greetings/Goodafternoon.wav" AUTOSTART=true LOOP=1>'+'Good afternoon!')
else if (h < 24) document.write('<bgsound SRC="http://javascript.internet.com/img/audio-greetings/Goodevening.wav" AUTOSTART=true LOOP=1>'+'Good evening!')