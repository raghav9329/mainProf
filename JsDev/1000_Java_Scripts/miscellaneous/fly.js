/*
	Original:	Stefano Occhetti
	E-mail:		starnuto_di_topo@hotmil.com
	Web Site:	http://www.geocities.com/starnuto_di_topo_2001

*/


var ns = (document.layers)?1:0;

/*
Button:
	this code is to show a "button" to switch
	the fly ON/OFF.
	It is always shown on the frame's
	bottom-right corner.
------------------------------------------------
*/
var imgwidth=40;	// Image width
var imgheight=40;	// Image height

var button = Array();	// to pre-cache images
button[0]=new Image();
button[0].src="/img/fly/Mosca_OFF.gif";
button[1]=new Image();
button[1].src="/img/fly/Mosca_ON.gif";

var text="<table width=10 bgcolor=#ffffff><td><a href='javascript:showhideAnimation()'><center><img name='Button' src='"+button[0].src+"' width='"+imgwidth+"' height='"+imgheight+"' border='0'></center></a></font></td></table>"	// A bit of HTML code to display the button


//Initialize some variables to make the button always to appear on the frame's bottom-right corner
if (ns) {
	document.write("<LAYER NAME='FlyOnOff' LEFT=0 TOP=0>"+text+"</LAYER>");
	horz=".left";
	vert=".top";
	docStyle="document.";
	styleDoc="";
	innerW="window.innerWidth";
	innerH="window.innerHeight";
	offsetX="window.pageXOffset";
	offsetY="window.pageYOffset";
}else {
	document.write("<div id='FlyOnOff' style='position:absolute; visibility:show; left:235px; top:-50px; z-index:2'>"+text+"</div>");
	horz=".pixelLeft";
	vert=".pixelTop";
	docStyle="";
	styleDoc=".style";
	innerW="document.body.clientWidth";
	innerH="document.body.clientHeight";
	offsetX="document.body.scrollLeft";
	offsetY="document.body.scrollTop";
}


// Moves the button in the right position
function checkLocation() {
	objectXY="FlyOnOff";
	var availableX=eval(innerW);
	var availableY=eval(innerH);
	var currentX=eval(offsetX);
	var currentY=eval(offsetY);
	x=availableX-(imgwidth+30)+currentX;
	y=availableY-(imgheight+20)+currentY;
	eval(docStyle + objectXY + styleDoc + horz + "=" + x);
	eval(docStyle + objectXY + styleDoc + vert + "=" + y);
}

setInterval('checkLocation()', 10);

/*
end of Button management
------------------------------------------------
*/




/*
Fly:
	this code provides some facilities
	to show a fly moving on the screen.

	The fly does not actually follow the
	mouse, but a "Dot" (not shown!).
------------------------------------------------
*/


(document.layers)?window.captureEvents(Event.MOUSEMOVE):0;
(document.layers)?window.onMouseMove=getMousePosition:document.onmousemove=getMousePosition;


var Dot_Ro=60;	//Dot's distance from the mouse pointer
var Dot_Theta=0;	//Dot's initial angle
var Dot_Speed;	//Dot's absolute Angular speed
var Dot_Direction=1; //Dot's direction (1=clockwise)
var Dot_x=0;	//Dot's original position
var Dot_y=0;

var alpha;	//Angle from the fly to the mouse
var mult;	//Ausiliary variable to define the angle

var picX = 20;	//Fly's coords.
var picY = 100;
var mouseX = 0;	//Mouse coords.
var mouseY = 0;
var step = 10;	//Pixels
var speed = 100;//u-seconds


// Dir specifies the right picture;
// img pre-caches images.
var dir = Array();
dir[-4]="Mosca_3.gif";
dir[-1]="Mosca_6.gif";
dir[-2]="Mosca_5.gif";
dir[-3]="Mosca_4.gif";
dir[3]="Mosca_8.gif";
dir[4]="Mosca_7.gif";
dir[1]="Mosca_2.gif";
dir[2]="Mosca_1.gif";
dir[0]="";

var img = Array();
for (var i=-4; i<5; i++){
	img[i]=new Image();
	img[i].src="/img/fly/"+dir[i];
}

// Some HTML code to show the fly.
if (ns) {
	document.write("<LAYER NAME='FlyDiv' LEFT=0 TOP=0><img src="+img[1].src+" name='pic'></LAYER>");
}else {
	document.write("<div id='FlyDiv' style='position:absolute'>");
	document.write("<img name='pic' src=" + img[1].src + "></div>");
}

// Shows the proper image for the fly.
function display(direction) { //direction must be from -4 to 4, but not 0.
	if (ns) {
		document.pic.src = img[direction].src;
	}else{
		pic.src = img[direction].src;
	}
}


function getMousePosition(e) {
	mouseY=(ns)?e.pageY:window.event.y + document.body.scrollTop;
	mouseX=(ns)?e.pageX:window.event.x + document.body.scrollLeft;
}

//Calculate new position
function calcNewPos() {
	/*
		All this calculations make the Dot
		to come near the mouse-pointer,
		and the fly to follow the dot.
	*/
	var dist=Math.sqrt(Math.pow(mouseY-picY,2) + Math.pow(mouseX-picX,2));
	Dot_Speed=Math.PI/15;
	Dot_Theta+=Dot_Direction*Dot_Speed;
	Dot_x=mouseX+Dot_Ro*Math.cos(Dot_Theta);
	Dot_y=mouseY+Dot_Ro*Math.sin(Dot_Theta);
	var arg = (Dot_y-picY) / (Dot_x-picX);
	mult = (Dot_x - picX < 0)? mult = -1:1;
	alpha = Math.atan(arg);
	var dx = mult * step * Math.cos(alpha);
	var dy = mult * step * Math.sin(alpha);
	picX += dx;
	picY += dy;
}

//Shows or hides the fly when the "button" is pressed
function showhideAnimation() {
	if (ns) {
		document.layers['FlyDiv'].visibility=document.layers['FlyDiv'].visibility=="hide"?"show":"hide";
		document.Button.src = document.layers['FlyDiv'].visibility=="hide"?button[1].src:button[0].src;
	}else {
		FlyDiv.style.visibility=="hidden"?FlyDiv.style.visibility = "visible":FlyDiv.style.visibility = "hidden";
		Button.src = FlyDiv.style.visibility=="hidden"?button[1].src:button[0].src;
	}
}


// Moves the fly around the screen
function moveFly() {
	// moves the fly in a new position...
	calcNewPos();
	if (ns) {
		document.layers['FlyDiv'].left = picX;
		document.layers['FlyDiv'].top = picY;
	}else{
		FlyDiv.style.left = picX - pic.width / 2;
		FlyDiv.style.top = picY - pic.height / 2;
	}

	// ... and changes the image.
	alpha=-180*alpha/Math.PI;
	alpha+=22.5;
	var OK=0;
	for(var i=0; (i<4)&& !OK; i++){
		if (alpha<-Math.PI+45*i){
			display(mult*(i+1));
			OK=1;
		}
	}
}

// Changes Dot's turning direction
function ChangeDotDirection() {
	Dot_Direction=-Dot_Direction;
	Dot_Theta+=Math.PI;
}

//Go!
setInterval('moveFly()', speed);
setInterval('ChangeDotDirection()', speed*50);

/*
The end.
------------------------------------------------
*/
