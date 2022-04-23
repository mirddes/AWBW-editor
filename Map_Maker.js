//enjoy
//Feel free to use this code for whatever
//-- Headphone
var rfixer_on=true
var selected = "plain";
var theMap = [];
var mapStarted = false;
var lastX, lastY;
var cursorDown = false;
var loadedthing
	var cities = 0;
	var labs = 0;
	var comtowers =0;
	var bases = 0;
	var airports = 0;
	var ports = 0;
function createDiv(xAxis, yAxis) {
		
	var tile = document.createElement('div');
	tile.id = "x"+xAxis+"y"+yAxis;
	tile.style.position='absolute';
	tile.style.top = 700+'px';
	
	document.body.appendChild(tile);
}

function createMap(width, height){
	
	if (width > 50 || 50 < height){
	alert("you can't make a map greater than 50x50");
	}
	else if (document.getElementById('our').value.toLowerCase() == 'our' && document.getElementById('house').value.toLowerCase() == 'house'){
		document.getElementById('video').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/k55FYtqtXXU" frameborder="0" allowfullscreen></iframe>'
		document.bgColor = 'black';
		document.title = 'OUR HOUSE'
		document.getElementById("hot").style.color = "white";
	}
	else {
		
		var theX, theY;
		theMap = [];
		
		if (mapStarted){
		clearMap(lastX,lastY);
		}
		for(theY = 0; theY <= height; theY++){
			
			var yLocation = -16*theY+640;
				
			for(theX = 0; theX <= width; theX++){
				
				var xLocation = 16*theX+250;
			
				createDiv(theX, theY);
			
				document.getElementById('x'+theX+'y'+theY).innerHTML += "<img id='imgx"+theX+'y'+theY+"'src='./images/"+selected+".gif' style='position:absolute; bottom:"+yLocation+"px; left:"+xLocation+"px;' onmousedown='editTile("+theX+','+theY+")' onmouseover='editTileOver("+theX+','+theY+")' onmouseup='cursorUp()'>";
				
				if(theMap.length==width+1){
					theMap[theX][theY] = convert(selected);
				}
				else{
					theMap.push([]);
					theMap[theX][theY] = convert(selected);
				}
				
			}
		}
	mapStarted=true;
	lastX = width;
	lastY = height;
	}
	
	var x,y
	for(y = 0; y <= height; y++){
		for(x = 0; x <= width; x++){
			propertyCounter(x,y)
		}
	}
}

function clearMap(w,h){
		var x, y, wat;
		var lol = document.getElementById("hot");
		
	cities = 0;
	labs = 0;
	comtowers =0;
	bases = 0;
	airports = 0;
	ports = 0;
		
		for(y=0; y<=h; y++){
			for(x=0;x<=w;x++){
			wat = document.getElementById('x'+x+'y'+y);
			lol.removeChild(wat);
			}
		}	
}

function editTile(x,y){//started the bucket tool
	var symtype = document.getElementById('sym').value
	if(document.getElementById('brush').checked){
		changeTile(x,y);
		changeTile(x+1,y);
		changeTile(x,y+1);
		changeTile(x-1,y);
		changeTile(x,y-1);
		
		if(symtype==1){
			changeTile(y, lastX-x);
			changeTile(y+1, lastX-x);
			changeTile(y, lastX-x+1);
			changeTile(y-1, lastX-x);
			changeTile(y, lastX-x-1);
			changeTile(lastY-y, x);
			changeTile(lastY-y+1, x);
			changeTile(lastY-y, x+1);
			changeTile(lastY-y-1, x);
			changeTile(lastY-y, x-1);
			changeTile(lastX-x, lastY-y);
			changeTile(lastX-x+1, lastY-y);
			changeTile(lastX-x, lastY-y+1);
			changeTile(lastX-x-1, lastY-y);
			changeTile(lastX-x, lastY-y-1);
		}
		
		else if(symtype==2){
		changeTile(lastX-x,y);
		changeTile(lastX-x+1,y);
		changeTile(lastX-x,y+1);
		changeTile(lastX-x-1,y);
		changeTile(lastX-x,y-1);
		}
		
		else if(symtype==3 || symtype==5){
		changeTile(lastX-x,lastY-y);
		changeTile(lastX-x+1,lastY-y);
		changeTile(lastX-x,lastY-y+1);
		changeTile(lastX-x-1,lastY-y);
		changeTile(lastX-x,lastY-y-1);
		}
		
		else if(symtype==4){
		changeTile(x,lastY-y);
		changeTile(x+1,lastY-y);
		changeTile(x,lastY-y+1);
		changeTile(x-1,lastY-y);
		changeTile(x,lastY-y-1);
		}
		
		else if(symtype==6 && lastY==lastX){
			changeTile(lastY-y, lastX-x);
			changeTile(lastY-y+1, lastX-x);
			changeTile(lastY-y, lastX-x+1);
			changeTile(lastY-y-1, lastX-x);
			changeTile(lastY-y, lastX-x-1);
		}
		
		else if(symtype==7 && lastY==lastX){
			changeTile(y, x);
			changeTile(y+1, x);
			changeTile(y, x+1);
			changeTile(y-1, x);
			changeTile(y, x-1);
		}
		
		cursorDown=true;
		//symmetry();
	}
	else if(document.getElementById('spray').checked){
		var mex = [];
		var tex = [];
		var i;
		var diameter = document.getElementById('dia').value;
		var density = document.getElementById('den').value*5;
			mex.push(x);
			tex.push(y);
			for(i=1;i<diameter;i++){
				mex.push(x);
				tex.push(y+i);
				mex.push(x);
				tex.push(y-i);
				mex.push(x+i);
				tex.push(y);
				mex.push(x-i);
				tex.push(y);
			}
			for(i=1;i<diameter-1;i++){
				mex.push(x+i);
				tex.push(y+i);
				mex.push(x-i);
				tex.push(y-i);
				mex.push(x+i);
				tex.push(y-i);
				mex.push(x-i);
				tex.push(y+i);
			}
		
				for(j=0;j<mex.length;j++){
					if(Math.floor(Math.random()*100) <= density){
						changeTile(mex[j],tex[j]);
					}
				}
		cursorDown=true
		symmetry()
	}
	
	/*else if(document.getElementById('bucket').checked){
		var oldtile = theMap[x][y]
		for(y=0;y<=lastY;y++){
			for(x=0;x<=lastX;x++){
				
			}
		}
	}*/
	
	else {
		changeTile(x,y);
		cursorDown=true;
		
		if(symtype==1){
			changeTile(y, lastX-x);
			changeTile(lastY-y, x);
			changeTile(lastX-x, lastY-y);
		}
		
		else if(symtype==2){
			changeTile(lastX-x, y);
		}
		
		else if(symtype==3 || symtype==5){
			changeTile(lastX-x, lastY-y);
		}
		
		else if(symtype==4){
			changeTile(x, lastY-y);
		}
		
		else if(symtype==6 && lastY==lastX){
			changeTile(lastY-y, lastX-x);
		}
		
		else if(symtype==7 && lastY==lastX){
			changeTile(y, x);
		}
		
		//symmetry()
	}
}

function changeTile(x,y){
		
	if(x>=0 && y>=0 && x<=lastX && y<=lastY){
	unCounter(x,y);
	document.getElementById('imgx'+x+'y'+y).src = './images/'+selected+'.gif';
	theMap[x][y] = convert(selected);
	propertyCounter(x,y);
	//participants();
	}
		//pipeFixer(x,y)
		//pipeFixer(x+1,y)
		//pipeFixer(x,y+1)
		//pipeFixer(x-1,y)
		//pipeFixer(x,y-1)
		roadFixer(x,y);
		roadFixer(x+1,y);
		roadFixer(x-1,y);
		roadFixer(x,y+1);
		roadFixer(x,y-1);
}

function changeSelected(a){
	selected = a;
	document.getElementById('imgchosen').src = './images/'+a+'.gif';
}

function editTileOver(x,y){
	if (cursorDown){
	editTile(x,y);
	cursorDown=true;
	}
}

function cursorUp(){
	cursorDown=false;
}

function saveMap(){
	var x,y;
	var map = "";
	document.getElementById('map').value = "";
	for(y=0;y<=lastY;y++){
		for(x=0;x<=lastX;x++){
			map += theMap[x][y] ;
			if(x<lastX){map += ','}
	}
	map += '\n';
	}
	document.getElementById('map').value = map;
	
	setCookie('mapmapmap',map,365);
	setCookie('lastselect',selected,365);	
	
	//autoSave()
}

function loadMap(){
	var textMap=document.getElementById('map').value;
	var x = 0;
	var y = 0;
	theMap = [];
	newMap = [];
	cities = 0;
	labs = 0;
	comtowers =0;
	bases = 0;
	airports = 0;
	ports = 0;
	
	if(mapStarted){
		clearMap(lastX,lastY);
	}
		
	var placehold = textMap.split('\n');
	var buffer = placehold
	for(i=0;i<buffer.length;i++){
		if(placehold[i]==''){}
		else{
		newMap[i] = placehold[i].split(',')
		}
	}
	var loopLimit = newMap.length
	var loopLimit2 = newMap[0].length
	for(i=0;i<loopLimit2;i++){	
		theMap.push([]);
	}
	for(x=0;x<loopLimit2;x++){
		for(y=0;y<loopLimit;y++){
		if(newMap[x]==undefined){newMap.push([])}
		var tile = reverseConvert(newMap[y][x])
		var xLocation = 16*x+250;
		var yLocation = -16*y+640;
		createDiv(x, y);
		if(newMap[x][y]==undefined){}
		else{
		theMap[x][y]=newMap[y][x];
		document.getElementById('x'+x+'y'+y).innerHTML = "<img id='imgx"+x+'y'+y+"'src='./images/"+tile+".gif' style='position:absolute; bottom:"+yLocation+"px; left:"+xLocation+"px;' onmousedown='editTile("+x+','+y+")' onmouseover='editTileOver("+x+','+y+")' onmouseup='cursorUp()'>";
		lastX=x;
		lastY=y;
		}
		}
	}
	for(y=0;y<lastY;y++){
		for(x=0;x<lastX;x++){
			//propertyCounter(x,y)
		}
	}
	mapStarted = true;
	
}

function autoSave(){//autoload too!
		var x;
		for(x=1;x<300;x++){
			var hope = function(){if(document.getElementById('asave').checked){saveMap();}}
			setTimeout(hope,300000*x);
		}
		var a = getCookie('mapmapmap')
		var b = getCookie('lastselect')
		if (a!=null && a!=""){
		document.getElementById('map').value = a
		loadMap();
		}
		if (b!=null && b!=''){
			changeSelected(b);
		}
		
}

function palletSelect(){
	var pal = document.getElementById('pal').value
	for(i=0;i<22;i++){
	if(pal == i){
	document.getElementById(i).style.visibility = 'visible'
	}
	else{
	document.getElementById(i).style.visibility = 'hidden'
	}
	}
}

function roadFixer(x,y){
	if(rfixer_on){
	var tile = '0'
	if(x>=0 && y>=0 && x<=lastX && y<=lastY){
	tile = reverseConvert(theMap[x][y])
	}
	var above = '0' 
	var below = '0'
	var left = '0'
	var right = '0'
	if(x>=0 && x<=lastX && y-1>=0 && y-1<=lastY){
	above = reverseConvert(theMap[x][y-1])
	}
	if(x>=0 && x<=lastX && y+1>=0 && y+1<=lastY){
	below = reverseConvert(theMap[x][y+1])
	}
	if(x-1>=0 && x-1<=lastX && y>=0 && y<=lastY){
	left = reverseConvert(theMap[x-1][y])
	}
	if(x+1>=0 && x+1<=lastX && y>=0 && y<=lastY){
	right = reverseConvert(theMap[x+1][y])
	}
	var roadtypes2 = ['hroad' ,'vroad' ,'croad' ,'esroad' ,'swroad' ,'wnroad' ,'neroad' ,'eswroad' ,'swnroad' ,'wneroad' ,'nesroad']
	var rivertypes2 = ['hriver' ,'vriver' ,'criver' ,'esriver' ,'swriver' ,'wnriver' ,'neriver' ,'eswriver' ,'swnriver' ,'wneriver' ,'nesriver']
	var pipetypes = ['hpipe' ,'vpipe' ,'espipe' ,'swpipe' ,'wnpipe' ,'nepipe']
	
	var roadtypes = ['hroad' ,'vroad' ,'croad' ,'esroad' ,'swroad' ,'wnroad' ,'neroad' ,'eswroad' ,'swnroad' ,'wneroad' ,'nesroad','hbridge','vbridge','neutralcity','neutralbase','neutralairport','neutralport','neutrallab','neutralcomtower','orangestarcity','orangestarbase','orangestarairport','orangestarport','orangestarhq','orangestarlab','orangestarcomtower','bluemooncity','bluemoonbase','bluemoonairport','bluemoonport','bluemoonhq','bluemoonlab','bluemooncomtower','greenearthcity','greenearthbase','greenearthairport','greenearthport','greenearthhq','greenearthlab','greenearthcomtower','yellowcometcity','yellowcometbase','yellowcometairport','yellowcometport','yellowcomethq','yellowcometlab','yellowcometcomtower','blackholecity','blackholebase','blackholeairport','blackholeport','blackholehq','blackholelab','blackholecomtower','redfirecity','redfirebase','redfireairport','redfireport','redfirehq','redfirelab','redfirecomtower','greyskycity','greyskybase','greyskyairport','greyskyport','greyskyhq','greyskylab','greyskycomtower','browndesertcity','browndesertbase','browndesertairport','browndesertport','browndeserthq','browndesertlab','browndesertcomtower','amberblazecity','jadesuncity','pinkcosmoscity','tealgalaxycity','purplelightningcity','cobalticecity','acidraincity','whitenovacity','amberblazelab','jadesunlab','pinkcosmoslab','tealgalaxylab','purplelightninglab','cobalticelab','acidrainlab','whitenovalab','amberblazecomtower','jadesuncomtower','pinkcosmoscomtower','tealgalaxycomtower','purplelightningcomtower','cobalticecomtower','acidraincomtower','whitenovacomtower','amberblazebase','jadesunbase','pinkcosmosbase','tealgalaxybase','purplelightningbase','cobalticebase','acidrainbase','whitenovabase','amberblazeairport','jadesunairport','pinkcosmosairport','tealgalaxyairport','purplelightningairport','cobalticeairport','acidrainairport','whitenovaairport','amberblazeport','jadesunport','pinkcosmosport','tealgalaxyport','purplelightningport','cobalticeport','acidrainport','whitenovaport','amberblazehq','jadesunhq','pinkcosmoshq','tealgalaxyhq','purplelightninghq','cobalticehq','acidrainhq','whitenovahq']
	var rivertypes = ['hriver' ,'vriver' ,'criver' ,'esriver' ,'swriver' ,'wnriver' ,'neriver' ,'eswriver' ,'swnriver' ,'wneriver' ,'nesriver', 'hbridge', 'vbridge', 'sea', 'reef','vshoal','vshoale','hshoal','hshoaln']
	
	
	
	if(roadtypes2.indexOf(tile) >= 0){
		if(roadtypes.indexOf(above) >= 0 && !(roadtypes.indexOf(below) >= 0) && !(roadtypes.indexOf(left) >= 0) && !(roadtypes.indexOf(right) >= 0)){
			tile = 'vroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && roadtypes.indexOf(below) >= 0 && !(roadtypes.indexOf(left) >= 0) && !(roadtypes.indexOf(right) >= 0)){
			tile = 'vroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && !(roadtypes.indexOf(below) >= 0) && roadtypes.indexOf(left) >= 0 && !(roadtypes.indexOf(right) >= 0)){
			tile = 'hroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && !(roadtypes.indexOf(below) >= 0) && !(roadtypes.indexOf(left) >= 0) && roadtypes.indexOf(right) >= 0){
			tile = 'hroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && roadtypes.indexOf(below) >= 0 && !(roadtypes.indexOf(left) >= 0) && !(roadtypes.indexOf(right) >= 0)){
			tile = 'vroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && !(roadtypes.indexOf(below) >= 0) && roadtypes.indexOf(left) >= 0 && roadtypes.indexOf(right) >= 0){
			tile = 'hroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && roadtypes.indexOf(below) >= 0 && roadtypes.indexOf(left) >= 0 && roadtypes.indexOf(right) >= 0){
			tile = 'croad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && roadtypes.indexOf(below) >= 0 && !(roadtypes.indexOf(left) >= 0) && roadtypes.indexOf(right) >= 0){
			tile = 'esroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && roadtypes.indexOf(below) >= 0 && roadtypes.indexOf(left) >= 0 && !(roadtypes.indexOf(right) >= 0)){
			tile = 'swroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && !(roadtypes.indexOf(below) >= 0) && roadtypes.indexOf(left) >= 0 && !(roadtypes.indexOf(right) >= 0)){
			tile = 'wnroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && !(roadtypes.indexOf(below) >= 0) && !(roadtypes.indexOf(left) >= 0) && roadtypes.indexOf(right) >= 0){
			tile = 'neroad'
		}
		else if(!(roadtypes.indexOf(above) >= 0) && roadtypes.indexOf(below) >= 0 && roadtypes.indexOf(left) >= 0 && roadtypes.indexOf(right) >= 0){
			tile = 'eswroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && roadtypes.indexOf(below) >= 0 && roadtypes.indexOf(left) >= 0 && !(roadtypes.indexOf(right) >= 0)){
			tile = 'swnroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && !(roadtypes.indexOf(below) >= 0) && roadtypes.indexOf(left) >= 0 && roadtypes.indexOf(right) >= 0){
			tile = 'wneroad'
		}
		else if(roadtypes.indexOf(above) >= 0 && roadtypes.indexOf(below) >= 0 && !(roadtypes.indexOf(left) >= 0) && roadtypes.indexOf(right) >= 0){
			tile = 'nesroad'
		}
	theMap[x][y] = convert(tile)
	document.getElementById('imgx'+x+'y'+y).src = './images/'+tile+'.gif'
	}
	
	else if(rivertypes2.indexOf(tile) >= 0){
		if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile = 'vriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile = 'vriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile = 'hriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile = 'hriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile = 'vriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile = 'hriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile = 'criver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile = 'esriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile = 'swriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile = 'wnriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile = 'neriver'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile = 'eswriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile = 'swnriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile = 'wneriver'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile = 'nesriver'
		}
	theMap[x][y] = convert(tile)
	document.getElementById('imgx'+x+'y'+y).src = './images/'+tile+'.gif'
	}
	else if(tile=='vbridge' || tile == 'hbridge'){
		if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile='hbridge'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile='hbridge'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile='hbridge'
		}
		else if(rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(above) >= 0) && !(rivertypes.indexOf(right) >= 0)){
			tile='vbridge'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(right) >= 0 && !(rivertypes.indexOf(left) >= 0) && !(rivertypes.indexOf(below) >= 0)){
			tile='vbridge'
		}
		else if(rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0 && !(rivertypes.indexOf(above) >= 0) && !(rivertypes.indexOf(below) >= 0)){
			tile='vbridge'
		}
	theMap[x][y] = convert(tile)
	document.getElementById('imgx'+x+'y'+y).src = './images/'+tile+'.gif'
	}
	else if(tile=='vshoal' || tile=='vshoale' || tile=='hshoal' || tile=='hshoaln'){
		if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile='hshoal'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile='vshoal'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && rivertypes.indexOf(right) >= 0){
			tile='hshoaln'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile='vshoale'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile='vshoale'
		}
		else if(!(rivertypes.indexOf(above) >= 0) && rivertypes.indexOf(below) >= 0 && !(rivertypes.indexOf(left) >= 0) && rivertypes.indexOf(right) >= 0){
			tile='hshoal'
		}
		else if(rivertypes.indexOf(above) >= 0 && rivertypes.indexOf(below) >= 0 && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile='vshoal'
		}
		else if(rivertypes.indexOf(above) >= 0 && !(rivertypes.indexOf(below) >= 0) && rivertypes.indexOf(left) >= 0 && !(rivertypes.indexOf(right) >= 0)){
			tile='hshoaln'
		}
	theMap[x][y] = convert(tile)
	document.getElementById('imgx'+x+'y'+y).src = './images/'+tile+'.gif'
	}
	else if(pipetypes.indexOf(tile) >= 0){
		if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = 'vpipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = 'vpipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = 'hpipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = 'hpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = 'vpipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && pipetypes.indexOf(right) >= 0){
			tile = 'hpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && pipetypes.indexOf(below) >= 0 && pipetypes.indexOf(left) >= 0 && pipetypes.indexOf(right) >= 0){
			tile = 'hpipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = 'espipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = 'swpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = 'wnpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = 'nepipe'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && pipetypes.indexOf(left) >= 0 && pipetypes.indexOf(right) >= 0){
			tile = 'espipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && pipetypes.indexOf(below) >= 0 && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = 'swpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && pipetypes.indexOf(right) >= 0){
			tile = 'wnpipe'
		}
		else if(pipetypes.indexOf(above) >= 0 && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = 'nepipe'
		}
	theMap[x][y] = convert(tile)
	document.getElementById('imgx'+x+'y'+y).src = './images/'+tile+'.gif'
	}
	}
}

/*function pipeFixer(x,y){
	var tile = '0'
	var pipetypes = ['./images/hpipe.gif' ,'./images/vpipe.gif' ,'./images/espipe.gif' ,'./images/swpipe.gif' ,'./images/wnpipe.gif' ,'./images/nepipe.gif']
	var pipetypes2 = ['./images/hpipe.gif' ,'./images/vpipe.gif' ,'./images/espipe.gif' ,'./images/swpipe.gif' ,'./images/wnpipe.gif' ,'./images/nepipe.gif']
	var l=x-1
	var r=x+1
	var a=y-1
	var b=y+1
	if(x>=0 && y>=0 && x<=lastX && y<=lastY){
	tile = document.getElementById('imgx'+x+'y'+y).src
	}
	var above = '0' 
	var below = '0'
	var left = '0'
	var right = '0'
	if(x>=0 && x<=lastX && y-1>=0 && y-1<=lastY){
	above = document.getElementById('imgx'+x+'y'+a).src
	}
	if(x>=0 && x<=lastX && y+1>=0 && y+1<=lastY){
	below = document.getElementById('imgx'+x+'y'+b).src
	}
	if(x-1>=0 && x-1<=lastX && y>=0 && y<=lastY){
	left = document.getElementById('imgx'+l+'y'+y).src
	}
	if(x+1>=0 && x+1<=lastX && y>=0 && y<=lastY){
	right = document.getElementById('imgx'+r+'y'+y).src
	}
	
	if(pipetypes2.indexOf(tile) >= 0){
		if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/vpipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/vpipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/hpipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = './images/hpipe.gif'
		}
		else if(pipetypes.indexOf(above) >= 0 && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/vpipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && pipetypes.indexOf(right) >= 0){
			tile = './images/hpipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = './images/espipe.gif'
		}
		else if(!(pipetypes.indexOf(above) >= 0) && pipetypes.indexOf(below) >= 0 && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/swpipe.gif'
		}
		else if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && pipetypes.indexOf(left) >= 0 && !(pipetypes.indexOf(right) >= 0)){
			tile = './images/wnpipe.gif'
		}
		else if(pipetypes.indexOf(above) >= 0 && !(pipetypes.indexOf(below) >= 0) && !(pipetypes.indexOf(left) >= 0) && pipetypes.indexOf(right) >= 0){
			tile = './images/nepipe.gif'
		}
		 document.getElementById('imgx'+x+'y'+y).src =tile
	}
}*/

function rfixAll(){
	var x,y
	for(y=0;y<lastY;y++){
		for(x=0;x<lastX;x++){
			roadFixer(x,y)
		}
	}
}

function symmetry(){
	var type = document.getElementById('sym').value
	if(type == 1){//rotation
		if(lastX!=lastY){
			alert("Rotational symmetry will only work on squaremaps.");
		}
		else{
		var x,y
		var mapTL = []
		for(y=0;y<Math.floor((lastY+1)/2);y++){
			
			for(x=0;x<Math.floor((lastX+1)/2);x++){
				if(mapTL.length==Math.floor(Math.floor((lastX+1)/2))){
				mapTL[x][y] = theMap[x][y]
				}
				else{
				mapTL.push([])
				mapTL[x][y] = theMap[x][y]
				}
			}
		}
		
		var j=0
		for(x=lastX;x>=Math.ceil((lastX+1)/2);x--){
			var i=0
			for	(y=0;y<Math.floor((lastY+1)/2);y++){
				theMap[x][y] = mapTL[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
		
		var j=0
		for	(y=lastY;y>=Math.ceil((lastY+1)/2);y--){
			var i=0
			for(x=lastX;x>=Math.ceil((lastX+1)/2);x--){
				theMap[x][y] = mapTL[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
		var j=0
		for(x=0;x<Math.floor((lastX+1)/2);x++){
			var i=0
			for	(y=lastY;y>=Math.ceil((lastY+1)/2);y--){
				theMap[x][y] = mapTL[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
		}

	}

	if(type == 2){//left right flip
		var x,y
		var mapL = []
		for(y=0;y<lastY+1;y++){
			for(x=0;x<Math.floor((lastX+1)/2);x++){
				if(mapL.length==Math.floor(Math.floor((lastX+1)/2))){
				mapL[x][y] = theMap[x][y]
				}
				else{
				mapL.push([])
				mapL[x][y] = theMap[x][y]
				}
			}
		}
		j=0
		for(y=0;y<lastY+1;y++){
			var i=0
			for(x=lastX;x>=Math.ceil((lastX+1)/2);x--){
				theMap[x][y] = mapL[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
	
	}

	if(type == 3){//left right diag
		var x,y
		var mapL = []
		for(y=0;y<lastY+1;y++){
			for(x=0;x<Math.floor((lastX+1)/2);x++){
				if(mapL.length==Math.floor(Math.floor((lastX+1)/2))){
				mapL[x][y] = theMap[x][y]
				}
				else{
				mapL.push([])
				mapL[x][y] = theMap[x][y]
				}
			}
		}
		
		var j=0
		for	(y=lastY;y>=0;y--){
			var i=0
			for(x=lastX;x>=Math.ceil((lastX+1)/2);x--){
				theMap[x][y] = mapL[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
	
	}
	
	if(type == 4){//top bottom flip
		var x,y
		var mapT = []
		for(y=0;y<Math.floor((lastY+1)/2);y++){
			for(x=0;x<lastX+1;x++){
				if(mapT.length==lastX+1){
				mapT[x][y] = theMap[x][y]
				}
				else{
				mapT.push([])
				mapT[x][y] = theMap[x][y]
				}
			}
		}
		j=0
		for(y=lastY;y>=Math.ceil((lastY+1)/2);y--){
			var i=0
			for(x=0;x<lastX+1;x++){
				theMap[x][y] = mapT[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
	
	}
	
	if(type == 5){//top bottom diag
		var x,y
		var mapT = []
		for(y=0;y<Math.floor((lastY+1)/2);y++){
			for(x=0;x<lastX+1;x++){
				if(mapT.length==lastX+1){
				mapT[x][y] = theMap[x][y]
				}
				else{
				mapT.push([])
				mapT[x][y] = theMap[x][y]
				}
			}
		}
		j=0
		for(y=lastY;y>=Math.ceil((lastY+1)/2);y--){
			var i=0
			for(x=lastX;x>=0;x--){
				theMap[x][y] = mapT[i][j]
				document.getElementById('imgx'+x+'y'+y).src = document.getElementById('imgx'+i+'y'+j).src
				i++
			}
			j++
		}
	
	}

	if(type == 6){//true diag
		if(lastX!=lastY){
			alert("True diaganol symmetry will only work on squaremaps.");
		}
		else{
			for(y=0;y<=lastY;y++){
				for(x=0;x<=lastX;x++){
					theMap[y][x]=theMap[x][y]
					document.getElementById('imgx'+y+'y'+x).src = document.getElementById('imgx'+x+'y'+y).src
					roadFixer(x,y)
				}
			}
		}
	}
	
	if(type == 7){//true diag 2
		if(lastX!=lastY){
			alert("True diaganol symmetry will only work on squaremaps.");
		}
		else{
			for(y=lastY;y>=0;y--){
				for(x=lastX;x>=0;x--){
					theMap[y][x]=theMap[x][y]
					document.getElementById('imgx'+y+'y'+x).src = document.getElementById('imgx'+x+'y'+y).src
				}
			}
		}
	}
	rfixAll()
}

function propertyCounter(x,y){
			var tile = reverseConvert(theMap[x][y])
			if(tile.includes('city')){
				cities++
			}
			if(tile.includes('base')){
				bases++
			}
			if(tile.includes('airport')){
				airports++
			}
			if(tile.includes('port')&&!(tile.includes('air'))){
				ports++
			}
			if(tile.includes('lab')){
				labs++
			}
			if(tile.includes('comtower')){
				comtowers++
			}
			document.getElementById('ccount').innerHTML = cities
			document.getElementById('bcount').innerHTML = bases
			document.getElementById('acount').innerHTML = airports
			document.getElementById('pcount').innerHTML = ports
			document.getElementById('lcount').innerHTML = labs
			document.getElementById('comcount').innerHTML = comtowers
}

/*function participants(){//IE sucks, I'll just disable this in it. Damn microsoft.
	if(navigator.appName != 'Microsoft Internet Explorer'){
			var os=true
			var bm=true
			var ge=true
			var yc=true
			var bh=true
			var rf=true
			var gs=true
			var bd=true
				var hqtypes = ['orangestarhq','bluemoonhq','greenearthhq','yellowcomethq','blackholehq','redfirehq','greyskyhq','browndeserthq']
	
				var hqcount = 0
				document.getElementById('hq').innerHTML = ''
				var i,j
				for(j=0;j<=lastY;j++){
					for(i=0;i<=lastX;i++){
				var pos = hqcount*14
				var hphoneRox = reverseConvert(theMap[i][j])
				if(hphoneRox == hqtypes[0] && os){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/oslogo.gif">'
					os=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[1] && bm){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/bmlogo.gif">'
					bm=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[2] && ge){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/gelogo.gif">'
					ge=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[3] && yc){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/yclogo.gif">'
					yc=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[4] && bh){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/bhlogo.gif">'
					bh=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[5] && rf){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/rflogo.gif">'
					rf=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[6] && gs){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/gslogo.gif">'
					gs=false
					hqcount++
				}
				else if(hphoneRox == hqtypes[7] && bd){
					document.getElementById('hq').innerHTML += '<img style="position:absolute; left:'+pos+'px;" src="./images/bdlogo.gif">'
					bd=false
					hqcount++
				}
				
				}}
	}
}*/

function unCounter(x,y){
	var ctypes = ['neutralcity','orangestarcity','bluemooncity','greenearthcity','yellowcometcity','blackholecity','greyskycity','redfirecity','browndesertcity','amberblazecity','jadesuncity','cobalticecity','pinkcosmoscity','tealgalaxycity','purplelightningcity','acidraincity','whitenovacity']
	var ltypes = ['neutrallab','orangestarlab','bluemoonlab','greenearthlab','yellowcometlab','blackholelab','redfirelab','greyskylab','browndesertlab','amberblazelab','jadesunlab','cobalticelab','pinkcosmoslab','tealgalaxylab','purplelightninglab','acidrainlab','whitenovalab']
	var comtypes = ['neutralcomtower','orangestarcomtower','bluemooncomtower','greenearthcomtower','yellowcometcomtower','blackholecomtower','redfirecomtower','greyskycomtower','browndesertcomtower','amberblazecomtower','jadesuncomtower','cobalticecomtower','pinkcosmoscomtower','tealgalaxycomtower','purplelightningcomtower','acidraincomtower','whitenovacomtower']
	var btypes = ['neutralbase','orangestarbase','bluemoonbase','greenearthbase','yellowcometbase','blackholebase','redfirebase','greyskybase','browndesertbase','amberblazebase','jadesunbase','cobalticebase','pinkcosmosbase','tealgalaxybase','purplelightningbase','acidrainbase','whitenovabase']
	var atypes = ['neutralairport','orangestarairport','bluemoonairport','greenearthairport','yellowcometairport','blackholeairport','redfireairport','greyskyairport','browndesertairport','amberblazeairport','jadesunairport','cobalticeairport','pinkcosmosairport','tealgalaxyairport','purplelightningairport','acidrainairport','whitenovaairport',]
	var ptypes = ['neutralport','orangestarport','bluemoonport','greenearthport','yellowcometport','blackholeport','redfireport','greyskyport','browndesertport','amberblazeport','jadesunport','cobalticeport','pinkcosmosport','tealgalaxyport','purplelightningport','acidrainport','whitenovaport']
	var hqtypes = ['orangestarhq','bluemoonhq','greenearthhq','yellowcomethq','blackholehq','redfirehq','greyskyhq','browndeserthq','acidrainhq','whitenovahq','amberblazehq','jadesunhq','cobalticehq','pinkcosmoshq','tealgalaxyhq','purplelightninghq','acidrainhq','whitenovahq']
	
	
			var hphoneSux=reverseConvert(theMap[x][y])
			if(ctypes.indexOf(hphoneSux)>=0){
				cities--
			}
			if(ltypes.indexOf(hphoneSux)>=0){
				labs--
			}
			if(comtypes.indexOf(hphoneSux)>=0){
				comtowers--
			}
			if(btypes.indexOf(hphoneSux)>=0){
				bases--
			}
			if(atypes.indexOf(hphoneSux)>=0){
				airports--
			}
			if(ptypes.indexOf(hphoneSux)>=0){
				ports--
			}
	
			document.getElementById('ccount').innerHTML = cities
			document.getElementById('bcount').innerHTML = bases
			document.getElementById('acount').innerHTML = airports
			document.getElementById('pcount').innerHTML = ports
			//document.getElementById('lcount').innerHTML = labs
			//document.getElementById('comcount').innerHTML = comtowers
}
		
function reverseConvert(a){
var tile = 'plain'
if (a =='0'){
tile='blacktile'
}
else if (a =='1'){
tile='plain'
}
else if (a =='2'){
tile='mountain'
}
else if (a =='3'){
tile='wood'
}
else if (a =='4'){
tile='hriver'
}
else if (a =='5'){
tile='vriver'
}
else if (a =='6'){
tile='criver'
}
else if (a =='7'){
tile='esriver'
}
else if (a =='8'){
tile='swriver'
}
else if (a =='9'){
tile='wnriver'
}
else if (a =='10'){
tile='neriver'
}
else if (a =='11'){
tile='eswriver'
}
else if (a =='12'){
tile='swnriver'
}
else if (a =='13'){
tile='wneriver'
}
else if (a =='14'){
tile='nesriver'
}
else if (a =='15'){
tile='hroad'
}
else if (a =='16'){
tile='vroad'
}
else if (a =='17'){
tile='croad'
}
else if (a =='18'){
tile='esroad'
}
else if (a =='19'){
tile='swroad'
}
else if (a =='20'){
tile='wnroad'
}
else if (a =='21'){
tile='neroad'
}
else if (a =='22'){
tile='eswroad'
}
else if (a =='23'){
tile='swnroad'
}
else if (a =='24'){
tile='wneroad'
}
else if (a =='25'){
tile='nesroad'
}
else if (a =='26'){
tile='hbridge'
}
else if (a =='27'){
tile='vbridge'
}
else if (a =='28'){
tile='sea'
}
else if (a =='29'){
tile='hshoal'
}
else if (a =='30'){
tile='hshoaln'
}
else if (a =='31'){
tile='vshoal'
}
else if (a =='32'){
tile='vshoale'
}
else if (a =='33'){
tile='reef'
}
else if (a =='34'){
tile='neutralcity'
}
else if (a =='35'){
tile='neutralbase'
}
else if (a =='36'){
tile='neutralairport'
}
else if (a =='37'){
tile='neutralport'
}
else if (a =='38'){
tile='orangestarcity'
}
else if (a =='39'){
tile='orangestarbase'
}
else if (a =='40'){
tile='orangestarairport'
}
else if (a =='41'){
tile='orangestarport'
}
else if (a =='42'){
tile='orangestarhq'
}
else if (a =='43'){
tile='bluemooncity'
}
else if (a =='44'){
tile='bluemoonbase'
}
else if (a =='45'){
tile='bluemoonairport'
}
else if (a =='46'){
tile='bluemoonport'
}
else if (a =='47'){
tile='bluemoonhq'
}
else if (a =='48'){
tile='greenearthcity'
}
else if (a =='49'){
tile='greenearthbase'
}
else if (a =='50'){
tile='greenearthairport'
}
else if (a =='51'){
tile='greenearthport'
}
else if (a =='52'){
tile='greenearthhq'
}
else if (a =='53'){
tile='yellowcometcity'
}
else if (a =='54'){
tile='yellowcometbase'
}
else if (a =='55'){
tile='yellowcometairport'
}
else if (a =='56'){
tile='yellowcometport'
}
else if (a =='57'){
tile='yellowcomethq'
}
else if (a =='58'){
tile=''
}
else if (a =='59'){
tile=''
}
else if (a =='60'){
tile=''
}
else if (a =='61'){
tile=''
}
else if (a =='62'){
tile=''
}
else if (a =='63'){
tile=''
}
else if (a =='64'){
tile=''
}
else if (a =='65'){
tile=''
}
else if (a =='66'){
tile=''
}
else if (a =='67'){
tile=''
}
else if (a =='68'){
tile=''
}
else if (a =='69'){
tile=''
}
else if (a =='70'){
tile=''
}
else if (a =='71'){
tile=''
}
else if (a =='72'){
tile=''
}
else if (a =='73'){
tile=''
}
else if (a =='74'){
tile=''
}
else if (a =='75'){
tile=''
}
else if (a =='76'){
tile=''
}
else if (a =='77'){
tile=''
}
else if (a =='78'){
tile=''
}
else if (a =='79'){
tile=''
}
else if (a =='80'){
tile=''
}
else if (a =='81'){
tile='redfirecity'
}
else if (a =='82'){
tile='redfirebase'
}
else if (a =='83'){
tile='redfireairport'
}
else if (a =='84'){
tile='redfireport'
}
else if (a =='85'){
tile='redfirehq'
}
else if (a =='86'){
tile='greyskycity'
}
else if (a =='87'){
tile='greyskybase'
}
else if (a =='88'){
tile='greyskyairport'
}
else if (a =='89'){
tile='greyskyport'
}
else if (a =='90'){
tile='greyskyhq'
}
else if (a =='91'){
tile='blackholecity'
}
else if (a =='92'){
tile='blackholebase'
}
else if (a =='93'){
tile='blackholeairport'
}
else if (a =='94'){
tile='blackholeport'
}
else if (a =='95'){
tile='blackholehq'
}
else if (a =='96'){
tile='browndesertcity'
}
else if (a =='97'){
tile='browndesertbase'
}
else if (a =='98'){
tile='browndesertairport'
}
else if (a =='99'){
tile='browndesertport'
}
else if (a =='100'){
tile='browndeserthq'
}
else if (a =='101'){
tile='vpipe'
}
else if (a =='102'){
tile='hpipe'
}
else if (a =='103'){
tile='nepipe'
}
else if (a =='104'){
tile='espipe'
}
else if (a =='105'){
tile='swpipe'
}
else if (a =='106'){
tile='wnpipe'
}
else if (a =='107'){
tile='npipeend'
}
else if (a =='108'){
tile='epipeend'
}
else if (a =='109'){
tile='spipeend'
}
else if (a =='110'){
tile='wpipeend'
}
else if (a =='111'){
tile='missilesilo'
}
else if (a =='112'){
tile='missilesiloempty'
}
else if (a =='113'){
tile='hpipeseam'
}
else if (a =='114'){
tile='vpipeseam'
}
else if (a =='115'){
tile='hpiperubble'
}
else if (a =='116'){
tile='vpiperubble'
}
else if (a =='117'){
tile='amberblazeairport'
}
else if (a =='118'){
tile='amberblazebase'
}
else if (a =='119'){
tile='amberblazecity'
}
else if (a =='120'){
tile='amberblazehq'
}
else if (a =='121'){
tile='amberblazeport'
}
else if (a =='122'){
tile='jadesunairport'
}
else if (a =='123'){
tile='jadesunbase'
}
else if (a =='124'){
tile='jadesuncity'
}
else if (a =='125'){
tile='jadesunhq'
}
else if (a =='126'){
tile='jadesunport'
}
else if (a =='127'){
tile='amberblazecomtower'
}
else if (a =='128'){
tile='blackholecomtower'
}
else if (a =='129'){
tile='bluemooncomtower'
}
else if (a =='130'){
tile='browndesertcomtower'
}
else if (a =='131'){
tile='greenearthcomtower'
}
else if (a =='132'){
tile='jadesuncomtower'
}
else if (a =='133'){
tile='neutralcomtower'
}
else if (a =='134'){
tile='orangestarcomtower'
}
else if (a =='135'){
tile='redfirecomtower'
}
else if (a =='136'){
tile='yellowcometcomtower'
}
else if (a =='137'){
tile='greyskycomtower'
}
else if (a =='138'){
tile='amberblazelab'
}
else if (a =='139'){
tile='blackholelab'
}
else if (a =='140'){
tile='bluemoonlab'
}
else if (a =='141'){
tile='browndesertlab'
}
else if (a =='142'){
tile='greenearthlab'
}
else if (a =='143'){
tile='greyskylab'
}
else if (a =='144'){
tile='jadesunlab'
}
else if (a =='145'){
tile='neutrallab'
}
else if (a =='146'){
tile='orangestarlab'
}
else if (a =='147'){
tile='redfirelab'
}
else if (a =='148'){
tile='yellowcometlab'
}
else if (a =='149'){
tile='cobalticeairport'
}
else if (a =='150'){
tile='cobalticebase'
}
else if (a =='151'){
tile='cobalticecity'
}
else if (a =='152'){
tile='cobalticecomtower'
}
else if (a =='153'){
tile='cobalticehq'
}
else if (a =='154'){
tile='cobalticelab'
}
else if (a =='155'){
tile='cobalticeport'
}
else if (a =='156'){
tile='pinkcosmosairport'
}
else if (a =='157'){
tile='pinkcosmosbase'
}
else if (a =='158'){
tile='pinkcosmoscity'
}
else if (a =='159'){
tile='pinkcosmoscomtower'
}
else if (a =='160'){
tile='pinkcosmoshq'
}
else if (a =='161'){
tile='pinkcosmoslab'
}
else if (a =='162'){
tile='pinkcosmosport'
}
else if (a =='163'){
tile='tealgalaxyairport'
}
else if (a =='164'){
tile='tealgalaxybase'
}
else if (a =='165'){
tile='tealgalaxycity'
}
else if (a =='166'){
tile='tealgalaxycomtower'
}
else if (a =='167'){
tile='tealgalaxyhq'
}
else if (a =='168'){
tile='tealgalaxylab'
}
else if (a =='169'){
tile='tealgalaxyport'
}
else if (a =='170'){
tile='purplelightningairport'
}
else if (a =='171'){
tile='purplelightningbase'
}
else if (a =='172'){
tile='purplelightningcity'
}
else if (a =='173'){
tile='purplelightningcomtower'
}
else if (a =='174'){
tile='purplelightninghq'
}
else if (a =='175'){
tile='purplelightninglab'
}
else if (a =='176'){
tile='purplelightningport'
}
else if (a =='181'){
tile='acidrainairport'
}
else if (a =='182'){
tile='acidrainbase'
}
else if (a =='183'){
tile='acidraincity'
}
else if (a =='184'){
tile='acidraincomtower'
}
else if (a =='185'){
tile='acidrainhq'
}
else if (a =='186'){
tile='acidrainlab'
}
else if (a =='187'){
tile='acidrainport'
}
else if (a =='188'){
tile='whitenovaairport'
}
else if (a =='189'){
tile='whitenovabase'
}
else if (a =='190'){
tile='whitenovacity'
}
else if (a =='191'){
tile='whitenovacomtower'
}
else if (a =='192'){
tile='whitenovahq'
}
else if (a =='193'){
tile='whitenovalab'
}
else if (a =='194'){
tile='whitenovaport'
}
	else {
	tile='oops'
	}
	return tile
}

function convert(tile){
	var output = '1'
	
if(tile == 'blacktile'){
output='0'
}
else if(tile == 'plain'){
output='1'
}
else if(tile == 'mountain'){
output='2'
}
else if(tile == 'wood'){
output='3'
}
else if(tile == 'hriver'){
output='4'
}
else if(tile == 'vriver'){
output='5'
}
else if(tile == 'criver'){
output='6'
}
else if(tile == 'esriver'){
output='7'
}
else if(tile == 'swriver'){
output='8'
}
else if(tile == 'wnriver'){
output='9'
}
else if(tile == 'neriver'){
output='10'
}
else if(tile == 'eswriver'){
output='11'
}
else if(tile == 'swnriver'){
output='12'
}
else if(tile == 'wneriver'){
output='13'
}
else if(tile == 'nesriver'){
output='14'
}
else if(tile == 'hroad'){
output='15'
}
else if(tile == 'vroad'){
output='16'
}
else if(tile == 'croad'){
output='17'
}
else if(tile == 'esroad'){
output='18'
}
else if(tile == 'swroad'){
output='19'
}
else if(tile == 'wnroad'){
output='20'
}
else if(tile == 'neroad'){
output='21'
}
else if(tile == 'eswroad'){
output='22'
}
else if(tile == 'swnroad'){
output='23'
}
else if(tile == 'wneroad'){
output='24'
}
else if(tile == 'nesroad'){
output='25'
}
else if(tile == 'hbridge'){
output='26'
}
else if(tile == 'vbridge'){
output='27'
}
else if(tile == 'sea'){
output='28'
}
else if(tile == 'hshoal'){
output='29'
}
else if(tile == 'hshoaln'){
output='30'
}
else if(tile == 'vshoal'){
output='31'
}
else if(tile == 'vshoale'){
output='32'
}
else if(tile == 'reef'){
output='33'
}
else if(tile == 'neutralcity'){
output='34'
}
else if(tile == 'neutralbase'){
output='35'
}
else if(tile == 'neutralairport'){
output='36'
}
else if(tile == 'neutralport'){
output='37'
}
else if(tile == 'orangestarcity'){
output='38'
}
else if(tile == 'orangestarbase'){
output='39'
}
else if(tile == 'orangestarairport'){
output='40'
}
else if(tile == 'orangestarport'){
output='41'
}
else if(tile == 'orangestarhq'){
output='42'
}
else if(tile == 'bluemooncity'){
output='43'
}
else if(tile == 'bluemoonbase'){
output='44'
}
else if(tile == 'bluemoonairport'){
output='45'
}
else if(tile == 'bluemoonport'){
output='46'
}
else if(tile == 'bluemoonhq'){
output='47'
}
else if(tile == 'greenearthcity'){
output='48'
}
else if(tile == 'greenearthbase'){
output='49'
}
else if(tile == 'greenearthairport'){
output='50'
}
else if(tile == 'greenearthport'){
output='51'
}
else if(tile == 'greenearthhq'){
output='52'
}
else if(tile == 'yellowcometcity'){
output='53'
}
else if(tile == 'yellowcometbase'){
output='54'
}
else if(tile == 'yellowcometairport'){
output='55'
}
else if(tile == 'yellowcometport'){
output='56'
}
else if(tile == 'yellowcomethq'){
output='57'
}
else if(tile == 'redfirecity'){
output='81'
}
else if(tile == 'redfirebase'){
output='82'
}
else if(tile == 'redfireairport'){
output='83'
}
else if(tile == 'redfireport'){
output='84'
}
else if(tile == 'redfirehq'){
output='85'
}
else if(tile == 'greyskycity'){
output='86'
}
else if(tile == 'greyskybase'){
output='87'
}
else if(tile == 'greyskyairport'){
output='88'
}
else if(tile == 'greyskyport'){
output='89'
}
else if(tile == 'greyskyhq'){
output='90'
}
else if(tile == 'blackholecity'){
output='91'
}
else if(tile == 'blackholebase'){
output='92'
}
else if(tile == 'blackholeairport'){
output='93'
}
else if(tile == 'blackholeport'){
output='94'
}
else if(tile == 'blackholehq'){
output='95'
}
else if(tile == 'browndesertcity'){
output='96'
}
else if(tile == 'browndesertbase'){
output='97'
}
else if(tile == 'browndesertairport'){
output='98'
}
else if(tile == 'browndesertport'){
output='99'
}
else if(tile == 'browndeserthq'){
output='100'
}
else if(tile == 'vpipe'){
output='101'
}
else if(tile == 'hpipe'){
output='102'
}
else if(tile == 'nepipe'){
output='103'
}
else if(tile == 'espipe'){
output='104'
}
else if(tile == 'swpipe'){
output='105'
}
else if(tile == 'wnpipe'){
output='106'
}
else if(tile == 'npipeend'){
output='107'
}
else if(tile == 'epipeend'){
output='108'
}
else if(tile == 'spipeend'){
output='109'
}
else if(tile == 'wpipeend'){
output='110'
}
else if(tile == 'missilesilo'){
output='111'
}
else if(tile == 'missilesiloempty'){
output='112'
}
else if(tile == 'hpipeseam'){
output='113'
}
else if(tile == 'vpipeseam'){
output='114'
}
else if(tile == 'hpiperubble'){
output='115'
}
else if(tile == 'vpiperubble'){
output='116'
}
else if(tile == 'amberblazeairport'){
output='117'
}
else if(tile == 'amberblazebase'){
output='118'
}
else if(tile == 'amberblazecity'){
output='119'
}
else if(tile == 'amberblazehq'){
output='120'
}
else if(tile == 'amberblazeport'){
output='121'
}
else if(tile == 'jadesunairport'){
output='122'
}
else if(tile == 'jadesunbase'){
output='123'
}
else if(tile == 'jadesuncity'){
output='124'
}
else if(tile == 'jadesunhq'){
output='125'
}
else if(tile == 'jadesunport'){
output='126'
}
else if(tile == 'amberblazecomtower'){
output='127'
}
else if(tile == 'blackholecomtower'){
output='128'
}
else if(tile == 'bluemooncomtower'){
output='129'
}
else if(tile == 'browndesertcomtower'){
output='130'
}
else if(tile == 'greenearthcomtower'){
output='131'
}
else if(tile == 'jadesuncomtower'){
output='132'
}
else if(tile == 'neutralcomtower'){
output='133'
}
else if(tile == 'orangestarcomtower'){
output='134'
}
else if(tile == 'redfirecomtower'){
output='135'
}
else if(tile == 'yellowcometcomtower'){
output='136'
}
else if(tile == 'greyskycomtower'){
output='137'
}
else if(tile == 'amberblazelab'){
output='138'
}
else if(tile == 'blackholelab'){
output='139'
}
else if(tile == 'bluemoonlab'){
output='140'
}
else if(tile == 'browndesertlab'){
output='141'
}
else if(tile == 'greenearthlab'){
output='142'
}
else if(tile == 'greyskylab'){
output='143'
}
else if(tile == 'jadesunlab'){
output='144'
}
else if(tile == 'neutrallab'){
output='145'
}
else if(tile == 'orangestarlab'){
output='146'
}
else if(tile == 'redfirelab'){
output='147'
}
else if(tile == 'yellowcometlab'){
output='148'
}
else if(tile == 'cobalticeairport'){
output='149'
}
else if(tile == 'cobalticebase'){
output='150'
}
else if(tile == 'cobalticecity'){
output='151'
}
else if(tile == 'cobalticecomtower'){
output='152'
}
else if(tile == 'cobalticehq'){
output='153'
}
else if(tile == 'cobalticelab'){
output='154'
}
else if(tile == 'cobalticeport'){
output='155'
}
else if(tile == 'pinkcosmosairport'){
output='156'
}
else if(tile == 'pinkcosmosbase'){
output='157'
}
else if(tile == 'pinkcosmoscity'){
output='158'
}
else if(tile == 'pinkcosmoscomtower'){
output='159'
}
else if(tile == 'pinkcosmoshq'){
output='160'
}
else if(tile == 'pinkcosmoslab'){
output='161'
}
else if(tile == 'pinkcosmosport'){
output='162'
}
else if(tile == 'tealgalaxyairport'){
output='163'
}
else if(tile == 'tealgalaxybase'){
output='164'
}
else if(tile == 'tealgalaxycity'){
output='165'
}
else if(tile == 'tealgalaxycomtower'){
output='166'
}
else if(tile == 'tealgalaxyhq'){
output='167'
}
else if(tile == 'tealgalaxylab'){
output='168'
}
else if(tile == 'tealgalaxyport'){
output='169'
}
else if(tile == 'purplelightningairport'){
output='170'
}
else if(tile == 'purplelightningbase'){
output='171'
}
else if(tile == 'purplelightningcity'){
output='172'
}
else if(tile == 'purplelightningcomtower'){
output='173'
}
else if(tile == 'purplelightninghq'){
output='174'
}
else if(tile == 'purplelightninglab'){
output='175'
}
else if(tile == 'purplelightningport'){
output='176'
}
else if(tile == 'acidrainairport'){
output='181'
}
else if(tile == 'acidrainbase'){
output='182'
}
else if(tile == 'acidraincity'){
output='183'
}
else if(tile == 'acidraincomtower'){
output='184'
}
else if(tile == 'acidrainhq'){
output='185'
}
else if(tile == 'acidrainlab'){
output='186'
}
else if(tile == 'acidrainport'){
output='187'
}
else if(tile == 'whitenovaairport'){
output='188'
}
else if(tile == 'whitenovabase'){
output='189'
}
else if(tile == 'whitenovacity'){
output='190'
}
else if(tile == 'whitenovacomtower'){
output='191'
}
else if(tile == 'whitenovahq'){
output='192'
}
else if(tile == 'whitenovalab'){
output='193'
}
else if(tile == 'whitenovaport'){
output='194'
}
	else {
	output='1'
	}
	return output
}

function saveProject(name){
	if(true){
	setCookie(name,map,365);
	}
}

function loadProject(name){
	var a = getCookie(name)
	if(true){
		document.getElementById('map').value = a
		loadMap();
	}
}

//cookie functions stolen from w3schools...
					//so blame them if this bugs out
function setCookie(c_name,value,exdays){
var exdate=new Date();

if(exdays == 'undefined'){
	exdays=365
}

exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
var i,x,y
var ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++){
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name){
    return unescape(y);
    }
  }
}
//support for Acid Rain and White Nova added by mirddes