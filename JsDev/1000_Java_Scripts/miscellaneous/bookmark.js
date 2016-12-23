// <script language="JavaScript">

// <!-- Begin

// ** bookmark functions

var sepchar   = "@";	// unique separator character
var BMtotal   = 6;	// max number of bookmarks permitted
var ShowCount = 0;
var expDays   = 30;	// cookie variables - expiry # days

var exp       = new Date(); 
exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

function ListBookmarks()
{
	var NumBookmarks = GetCookie('PT_NumBookmarks');
	var i;
	var Bookmark;

	// alert("ListBookMarks started");

	if (NumBookmarks == null) 
	{
		NumBookmarks = 0;
	}
	ShowCount = 0; SwapColour = 0;
 
	for (i=1; i <= NumBookmarks ; i++)
	{
		Bookmark = GetCookie('PT_Bookmark'+i);
		if (Bookmark != null)
		{
			PrintBookmark(Bookmark, i);
		}
	}
}

function DeleteBookmark(Count)
{
	DeleteCookie('PT_Bookmark'+Count);
	window.location = window.location;
}

function PrintBookmark (Bookmark, Count)
{

	var color = "";
	//alert("hello 6");
	var pairs = Bookmark.split(sepchar);
	pairs[0]= unescape(pairs[0]);
	pairs[1]= unescape(pairs[1]);
	// alert(Bookmark+" "+sepchar);
	var BMtitle = pairs[0];
	var BMaddress = pairs[1];
	//alert(BMaddress);

	// SwapColour = 1 - SwapColour;
	// if (SwapColour==1) {color = "bgcolor='#c0c0c0'"} ;	

	ShowCount++;
	document.write("<tr " + color + ">");
	//document.write("<td width=10% align=center valign=top><small><small><b>"+ShowCount);
	document.write("<td width=85% align=left><!img src='Images/aro_blue.gif'><a href='"+BMaddress+"'><font color='#0066FF'><small><small>"+BMtitle+"</small></small></a>");
	//alert("hmmm");
	// document.write("<td width=15% align=center><small>"+"<a href='javascript:EditItem(" + ShowCount + "," + Count + ")'>Edit</a>");
	document.write("<td width=15% align=center><small><small>"+"<!img src='!Images/aro_blue.gif'>"+"<a href='javascript:DeleteBookmark(" + Count + ")'>Delete</a>");
}

function AddBookmark(BMtitle, BMaddress)
{

	var NumBookmarks = GetCookie('PT_NumBookmarks');
	var i;
	var ToDoItem;
	var Bookmark;
	var OldestBookmark = 0;
	var CountBookmarks = 0;

	if (NumBookmarks == null) 
	{	NumBookmarks = 0;	}
	
	// check if already exists, and count bookmarks 
	for (i=1; i <= NumBookmarks ; i++)
	{
		Bookmark = GetCookie('PT_Bookmark'+i);
		if (Bookmark != null) 
		{	CountBookmarks++;			
			if (OldestBookmark == 0)
			{	OldestBookmark = i;	}	
		}
	
		if (Bookmark == BMtitle+sepchar+BMaddress)
		{	alert("Bookmark added for "+BMtitle);
			return;			}
	}

	// check if limit reached
	if (CountBookmarks > BMtotal)
	{	DeleteBookmark(OldestBookmark);
	}

	// now add it
	NumBookmarks++;
	//alert('PT_Bookmark'+NumBookmarks);
	SetCookie('PT_Bookmark'+NumBookmarks, BMtitle+sepchar+BMaddress, exp);
	SetCookie('PT_NumBookmarks',NumBookmarks, exp);
	alert("Bookmark added for "+BMtitle);
	//window.location = window.location;
}

// cookie functions

function getCookieVal (offset) {  

	var endstr = document.cookie.indexOf (";", offset);  

	if (endstr == -1)    
		endstr = document.cookie.length;  
	return unescape(document.cookie.substring(offset, endstr));

}

function GetCookie (name) {  

	var arg = name + "=";  
	var alen = arg.length;  
	var clen = document.cookie.length;  
	var i = 0;  

	while (i < clen) {    
		var j = i + alen;    
		if (document.cookie.substring(i, j) == arg)      
			return getCookieVal (j);    
		i = document.cookie.indexOf(" ", i) + 1;    
		if (i == 0) break;   
	}  
	return null;
}

function SetCookie (name, value) {  

	var argv = SetCookie.arguments;  
	var argc = SetCookie.arguments.length;  
	var expires = (argc > 2) ? argv[2] : null;  
	var path = (argc > 3) ? argv[3] : null;  
	var domain = (argc > 4) ? argv[4] : null;  
	var secure = (argc > 5) ? argv[5] : false;  

	document.cookie = name + "=" + escape (value) + 
			((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
			((path == null) ? "" : ("; path=" + path)) +  
			((domain == null) ? "" : ("; domain=" + domain)) +    
			((secure == true) ? "; secure" : "");

}

function DeleteCookie (name) {  

	var exp = new Date();  

	exp.setTime (exp.getTime() - 1);  
	var cval = GetCookie (name);  
	document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

	//  End -->

// </script>