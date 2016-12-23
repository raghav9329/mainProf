	var NoOffFirstLineMenus=6;			// Number of first level items
	var LowBgColor='white';			// Background color when mouse is not over
	var LowSubBgColor='white';			// Background color when mouse is not over on subs
	var HighBgColor='#D71A01';			// Background color when mouse is over
	var HighSubBgColor='#D71A01';			// Background color when mouse is over on subs
	var FontLowColor='black';			// Font color when mouse is not over
	var FontSubLowColor='black';			// Font color subs when mouse is not over
	var FontHighColor='#FFFFC6';			// Font color when mouse is over
	var FontSubHighColor='#FFFFC6';			// Font color subs when mouse is over
	var BorderColor='black';			// Border color
	var BorderSubColor='black';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			// Border between elements 1 or 0
	var FontFamily="verdana,arial,times"	// Font family menu items
	var FontSize=9;				// Font size menu items
	var FontBold=1;				// Bold menu items 1 or 0
	var FontItalic=0;				// Italic menu items 1 or 0
	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuCentered='left';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=.2;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=.2;			// vertical overlap child/ parent
	var StartTop=1;				// Menu offset x coordinate
	var StartLeft=1;				// Menu offset y coordinate
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
	var LeftPaddng=3;				// Left padding
	var TopPaddng=2;				// Top padding
	var FirstLineHorizontal=1;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=1;			// Frames in cols or rows 1 or 0
	var DissapearDelay=1000;			// delay before menu folds in
	var TakeOverBgColor=1;			// Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				// span id for relative positioning
	var HideTop=0;				// Hide first level when loading new document 1 or 0
	var MenuWrap=1;				// enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
	var ShowArrow=1;				// Uses arrow gifs when 1
	var KeepHilite=1;				// Keep selected path highlighted
	var Arrws=['tri.gif',5,10,'tridown.gif',10,5,'trileft.gif',5,10];	// Arrow source, width and height

function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}


// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("Home","index.html","",0,20,120);

Menu2=new Array("What is NWR?","","",4);
	Menu2_1=new Array("Questions","../tutorials/default.htm","",0,20,120);	
	Menu2_2=new Array("Home","../../Upper1/default.htm","",0);
	Menu2_3=new Array("internet","http://www.internet.com","",0);
	Menu2_4=new Array("Master List","../../default.htm","",2);
		Menu2_4_1=new Array("New","../new/default.htm","",0,20,120);
		Menu2_4_2=new Array("New","../new/default.htm","",0);

Menu3=new Array("Members","","",5);
	Menu3_1=new Array("Find a Group","../../Upper1/default.htm","",8,20,120);
		Menu3_1_1=new Array("Scotland","../../Upper1/default.htm","",0,20,110);
		Menu3_1_2=new Array("Northeast","../../Upper1/default.htm","",0);
		Menu3_1_3=new Array("Northwest","../../Upper1/default.htm","",0);
		Menu3_1_4=new Array("East","../../Upper1/default.htm","",0);
		Menu3_1_5=new Array("Midlands","../../Upper1/default.htm","",0);
		Menu3_1_6=new Array("Southwest","../../Upper1/default.htm","",0);
		Menu3_1_7=new Array("Central","../../Upper1/default.htm","",0);
		Menu3_1_8=new Array("Southeast","../../Upper1/default.htm","",0);
	Menu3_2=new Array("Overseas","../../Upper1/default.htm","",0);
	Menu3_3=new Array("Interest Groups","../../Upper1/default.htm","",0);
	Menu3_4=new Array("Members\' Area","../../Upper1/default.htm","",0);
	Menu3_5=new Array("Media","","",3);
		Menu3_5_1=new Array("Magazine","../../Upper1/default.htm","",0,20,120);
		Menu3_5_2=new Array("Newsletter","../../Upper1/default.htm","",0);
		Menu3_5_3=new Array("Annual Report","../../Upper1/default.htm","",0);

Menu4=new Array("Events","","",3);
	Menu4_1=new Array("Timetable","../../Upper1/default.htm","",0,20,140);
	Menu4_2=new Array("Conferences","../../Upper1/default.htm","",3);
		Menu4_2_1=new Array("York","../../Upper1/default.htm","",0,20,110);
		Menu4_2_2=new Array("Guildford","../../Upper1/default.htm","",0);
		Menu4_2_3=new Array("Nottingham","../../Upper1/default.htm","",0);
	Menu4_3=new Array("Treasure Trail","../../Upper1/default.htm","",0);	

Menu5=new Array("Resources","","",5);
	Menu5_1=new Array("Forms","../../Upper1/default.htm","",0,20,140);
	Menu5_2=new Array("Programme Research","../../Upper1/default.htm","",0,30,140);
	Menu5_3=new Array("Research Bank","../../Upper1/default.htm","",0,20,140);
	Menu5_4=new Array("Members\' Area","../../Upper1/default.htm","",5);
		Menu5_4_1=new Array("Chat","../../Upper1/default.htm","",0,20,120);
		Menu5_4_2=new Array("Links","../../Upper1/default.htm","",0);
		Menu5_4_3=new Array("Web Research", "../../Upper1/default.htm","",0);
		Menu5_4_4=new Array("Group Sites","../../Upper1/default.htm","",0);
		Menu5_4_5=new Array("NWR Webspace","../../Upper1/default.htm","",0);
	Menu5_5=new Array("NWR logos","logos.htm","",0);
	
Menu6=new Array("Contact Us","","",3);
	Menu6_1=new Array("Guestbook","http://www.theguestbook.com","",0,20,120);
	Menu6_2=new Array("Forums","http://forums.webdeveloper.com/forumdisplay.php?s=&forumid=3","",0);
	Menu6_3=new Array("Webmaster","../../Upper1/default.htm","",0);
	