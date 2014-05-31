//initialization

function init_web(){
	setInterval("bannerX()",1000);
}

window.m=0;//you will use the two variables in setInterval, 
window.n=3;//so, let them be the attributes of window
var bannerInfo="<br/>あれ？もう一度…";
//process the context of "banner" for liberating labors
function bannerX(){//window.m window.n "banner" will be changed in this function.
	//deal with "banner"
	if(window.m==0)
	{
		$("banner").innerHTML=
		"<br/>The page will be closed in "+window.n+" seconds";
	}
	else if(window.m==1)
	{
		if(window.n>3){
		$("banner").innerHTML = bannerInfo;
		}
		else
		$("banner").innerHTML = "<br/>The page will be closed in "+window.n+" seconds";
	}
	else
	{
		if(window.n==5)
		{
			bannerInfo = bannerInfo.substr(0,bannerInfo.length-6)+"れ"+
			bannerInfo.substr(bannerInfo.length-6,bannerInfo.length);
			$("banner").innerHTML=bannerInfo;
			
		}
		else if(window.n>3)
		{$("banner").innerHTML = bannerInfo;}
		else
		$("banner").innerHTML = "<br/>The page will be closed in "+window.n+" seconds";
	}
	
	//deal with the moving picture
	if(window.n==0)
	{
		window.n = 5;
		if(Math.random()<(0.5*Math.exp(-0.3*window.m)+0.5))
		{takeAction();window.m++;}
		else
		{if(window.confirm("permitted to close the page? ")){
			window.close();
		 }
		 else{
			window.m = 0;
			window.n = 3;
			bannerInfo="<br/>あれ？もう一度…";
		 }
		 }
	}
	else
	{
		window.n--;
	}
}

//the interface to generate the moving picture.
var picNum=0;
window.joke=new Array();
window.picSignal=new Array();
function takeAction(){
	window.joke[picNum] = new PicObj();
	//joke.linemove();
	window.picSignal[picNum] = setInterval("window.joke[" + picNum + "].linemove()",20);
	picNum++;
}

//about moving picture
//fundamental class of moving picture
function PicObj(inputX, inputY){
	if(arguments.length < 2 && arguments[0] == undefined)
	{	
		this.picX=Math.random()*(document.body.clientWidth-180);
		this.picY=Math.random()*(document.body.clientHeight-180);
	}
	else
	{
		this.picX=inputX;
		this.picY=inputY;
	}
	
	this.directX=2*Math.round(Math.random())-1;//generate the stochastic number from {1,-1}
	this.directY=2*Math.round(Math.random())-1;
	this.speed=10*Math.random();
	
	var picdiv=document.createElement("div");
	picdiv.style.top=this.picY+"px";//determined the style of document
	picdiv.style.left=this.picX+"px";
	picdiv.style.position="absolute";
	var img1=document.createElement("img");
	img1.src="./pictures/pic.jpg";
	picdiv.appendChild(img1);
	document.body.appendChild(picdiv);
	
	//attach the Event Listener
	setDrag(picdiv,picNum);
		
	this.linemove=function(){
		this.picX+=this.directX*this.speed;
		this.picY+=this.directY*this.speed;
		
		picdiv.style.top=this.picY+"px";//make the change
		picdiv.style.left=this.picX+"px";
		
		//the rule on the boundary
		if(this.picX+picdiv.offsetWidth>=document.body.clientWidth||this.picX<=0)
		{this.directX=-this.directX;}//offsetWidth能返回对象的实际宽度，而width属性需事先给定
		if(this.picY+picdiv.offsetHeight>=document.body.clientHeight||this.picY<=0)
		{this.directY=-this.directY;}
		
		//alert(picdiv.style.top);
		
	}
	
	this.randmove=function(){
		this.directX=2*Math.round(Math.random())-1;//generate the stochastic number from {1,-1}.
		this.directY=2*Math.round(Math.random())-1;
		
		this.picX+=this.directX*this.speed;
		this.picY+=this.directY*this.speed;
		
		picdiv.style.top=this.picY+"px";//make the change
		picdiv.style.left=this.picX+"px";
		
		//the rule on the boundary
		if(this.picX+picdiv.offsetWidth>=document.body.clientWidth||this.picX<=0)
		{this.directX=-this.directX;}
		if(this.picY+picdiv.offsetHeight>=document.body.clientHeight||this.picY<=0)
		{this.directY=-this.directY;}
	}
}


//function for liberating labors
function $(d) {return document.getElementById(d);}

function setDrag(handler,handlerNum){//make the target be 'dragable'- -
    var startX  = 0,
        startY  = 0,
        lastX   = 0,
        lastY   = 0,
        width   = document.body.clientWidth,
        height  = document.body.clientHeight,
        drag    = {
            down: function(e){
				window.clearInterval(window.picSignal[handlerNum]);//取消handler的移动
				
                e                    = e ? e : window.event; //hogo.getEvent(e);?
				if(e.perventDefault)//防止事件向上冒泡；
				{e.perventDefault();
				 e.stopPropagation();}//FireFox
				else
				{e.cancelBubble    = true;
				 e.returnValue     = false;}//IE
				
                handler.style.cursor = 'move';
                startX               = e.clientX - parseInt(handler.style.left);
                startY               = e.clientY - parseInt(handler.style.top);
                this.setCapture && this.setCapture(); // IE 下防止拖动过快丢失对象
                addEvent(document, 'mousemove', drag.move);
                addEvent(document, 'mouseup', drag.up);
                return false; // 防止在 chrome 下滚屏，并丢失 cursor:move 样式
            },
            move: function(e){
                e                    = e ? e : window.event;//hogo.getEvent(e);?
                if(e.perventDefault)//防止事件向上冒泡；
				{e.perventDefault();
				 e.stopPropagation();}//FireFox
				else
				{e.cancelBubble    = true;
				 e.returnValue     = false;}//IE
                
				lastX             = e.clientX - startX;
                lastY             = e.clientY - startY;
                lastX             = Math.max(0, Math.min(width - handler.offsetWidth - 19, lastX));
                lastY             = Math.max(0, Math.min(height - handler.offsetHeight - 2, lastY));
                handler.style.top     = lastY + 'px';
                handler.style.left    = lastX + 'px';
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 取消选择文本
            },
            up: function(e){
				e                    = e ? e : window.event;//hogo.getEvent(e);?
                if(e.perventDefault)//防止事件向上冒泡；
				{e.perventDefault();
				 e.stopPropagation();}//FireFox
				else
				{e.cancelBubble    = true;
				 e.returnValue     = false;}//IE
				
				removeEvent(document, 'mousemove', drag.move);
				
				window.joke[handlerNum].picX = parseInt(handler.style.left);
				window.joke[handlerNum].picY = parseInt(handler.style.top);
			    window.picSignal[handlerNum] = window.setInterval("window.joke[" + handlerNum + "].randmove()",20);//重新加载handler移动
				
                handler.style.cursor = 'auto';
                
                removeEvent(document, 'mouseup', drag.up);
                handler.releaseCapture && handler.releaseCapture(); // 防止拖动过快丢失对象
            }
        };
    addEvent(handler, 'mousedown', drag.down);
}

function addEvent(el,name,fn){  
  if(el.addEventListener) return el.addEventListener(name,fn,false);//在FireFox中会执行这一句
  return el.attachEvent('on'+name,fn);//在ie中执行这一句
 }

function removeEvent(el,name,fn){  
  if(el.removeEventListener) return el.removeEventListener(name,fn,false);//在FireFox中会执行这一句
  return el.detachEvent('on'+name,fn);//在ie中执行这一句
 } 
