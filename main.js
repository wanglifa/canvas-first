var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);

listenToUser(yyy);


function autoSetCanvasSize(canvas){
	winBig();
	//窗口改变
	window.onresize = function(){
	  winBig();
	}
	//窗口大小
	function winBig(){
	  canvas.width =document.documentElement.clientWidth;
	  canvas.height = document.documentElement.clientHeight;
	}
}

//画点
function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill()
}
//画线
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.lineWidth = 5;
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}
//是否使用橡皮擦
var useeraser = false;
eraser.onclick = function(){
	useeraser = true;
	this.classList.add('active');
	brush.classList.remove('active');
}
brush.onclick = function(){
	useeraser = false;
	this.classList.add('active');
	eraser.classList.remove('active');
}
black.onclick = function(){
	this.classList.add('active');
	context.fillStyle = 'black';
	context.strokeStyle = 'black';
	red.classList.remove('active');
	blue.classList.remove('active');
	green.classList.remove('active');
}
red.onclick = function(){
	this.classList.add('active');
	context.fillStyle = 'red';
	context.strokeStyle = 'red';
	black.classList.remove('active');
	blue.classList.remove('active');
	green.classList.remove('active');
}
blue.onclick = function(){
	this.classList.add('active');
	context.fillStyle = 'blue';
	context.strokeStyle = 'blue';
	red.classList.remove('active');
	black.classList.remove('active');
	green.classList.remove('active');
}
green.onclick = function(){
	this.classList.add('active');
	context.fillStyle = 'green';
	context.strokeStyle = 'green';
	red.classList.remove('active');
	blue.classList.remove('active');
	black.classList.remove('active');
}

function listenToUser(canvas){
	var using = false;
	var lastPoint = {  //起点的点，因为一开始页面上没有点，所以	她的x，y就设置为未定义就好
	  'x':'undefined',
	  'y':'undefined'
	}
	//支持touch事件
	if(document.body.ontouchstart !== undefined){
		canvas.ontouchstart= function(a){
			var x = a.touches[0].clientX;
	   		var y = a.touches[0].clientY;
	   		using = true;//按下鼠标为true
	   		if(useeraser){ 
	   		  context.clearRect(x-5,y-5,10,10)
	   		}else{
	   		  lastPoint = {'x':x,'y':y}; //	刚开始鼠标点下的点肯定是起点
	   		  drawCircle(x,y,2.5);
	   		}
		}
		canvas.ontouchmove = function(a){
			var x = a.touches[0].clientX;
	  		var y = a.touches[0].clientY;
	  		if(!using){  //因为下面的不管是橡皮擦还是画笔都是在鼠标按下进行的，所以先判断如果没按下就直接返回
	  			return
	  		}
	  		if(useeraser){
	  		   context.clearRect(x-5,y-5,10,10);
	  		}else{
	  		  var newPoint = {'x':x,'y':y};//	鼠标开始移动后就是她的下一个点也就是所谓的终点
	  		  drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
	  		  lastPoint = newPoint;//将现在的这个点作为起点
	  		} 
		}
		canvas,ontouchend = function(){
			using = false;
		}
	}else{
		//非触屏设备
	   canvas.onmousedown = function(a){
	   		var x = a.clientX;
	   		var y = a.clientY;
	   		using = true;//按下鼠标为true
	   		if(useeraser){ 
	   		  context.clearRect(x-5,y-5,10,10)
	   		}else{
	   		  lastPoint = {'x':x,'y':y}; //	刚开始鼠标点下的点肯定是起点
	   		  drawCircle(x,y,2.5);
	   		}
	   
	}
	canvas.onmousemove = function(a){
	  var x = a.clientX;
	  var y = a.clientY;
	  if(!using){  //因为下面的不管是橡皮擦还是画笔都是在鼠标按下进行的，所以先判断如果没按下就直接返回
	  	return
	  }
	  if(useeraser){
	     context.clearRect(x-5,y-5,10,10);
	  }else{
	    var newPoint = {'x':x,'y':y};//	鼠标开始移动后就是她的下一个点也就是所谓的终点
	    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
	    lastPoint = newPoint;//将现在的这个点作为起点
	  } 
	}
	canvas.onmouseup = function(a){
	  using = false;
	}
	}
	
}

