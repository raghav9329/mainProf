//Preload Kiss Images
IrishKiss=new Image(132,70)
IrishKiss.src="IrishKiss.gif"
IrishKissAnim=new Image(132,70)
IrishKissAnim.src="IrishKissAnim.gif"

document.write('<a href="index.html" onMouseOver="document.Irish.src=IrishKissAnim.src" onMouseOut="document.Irish.src=IrishKiss.src"><img src="IrishKiss.gif" name="Irish" width=125 height=125 border=0 alt="Your Irish Kiss"></a>')