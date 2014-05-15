function Moon_rabbit(){

	this.x=0;
	this.y=0;
	
	this.move=function(obj){
		var moon = document.getElementById('typemoon');
		var cssrule = document.styleSheets[0].rules||document.styleSheets[0].cssRules;
		var k = obj.value;
		var top = parseInt(cssrule[2].style.top.substr(0,cssrule[2].style.top.length-2));
		//extract the top postion from the string.
		var left = parseInt(cssrule[2].style.left.substr(0,cssrule[2].style.left.length-2));
		//extract the left postion from the string.
		switch(k){
			case "向下走":
				top=top+20;cssrule[2].style.top = top+"px";
				break;
			case "向右走":
				left=left+20;cssrule[2].style.left = left+"px";
				break;
			case "向左走":
				cssrule[2].style.left = (left-20)+"px";
				break;
			case "向上走":
				cssrule[2].style.top = (top-20)+"px";
				break;
			default:
				window.alert("no action");
		}
	}
}

var moon_rabbit = new Moon_rabbit();

//get time;
function showTime(){
	document.getElementById("mytime").innerText=new Date().toLocaleString();
}
window.setInterval("showTime()",1000);

//test keyCode;
function keyTest(event){
	if(event.keyCode<48 || event.keyCode>57){
		window.alert("你输入的不是数");
		return false;
	}
}

//test createElement
function testCreate(){
	var myElement = document.createElement("a");
	myElement.href = "http://www.baidu.com";
	myElement.innerText = "链接到百度";
	myElement.style.left="600px";
	myElement.style.top="800px";
	myElement.style.position="absolute";
	//attention!!
	document.body.appendChild(myElement);
}
