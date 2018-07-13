
var _this;
function loading(options){
	this.options=options || {};
	//this.complete 完成
	_this=this;
	this.imgList=[
				'image/info-bg/1.jpg',				
				'image/info-bg/2.jpg',				
				'image/info-bg/3.jpg',				
				'image/info-bg/4.jpg',				
			
				'image/bg-1.png',				
				'image/close.png',				
				'image/dian.png',				
				'image/icon.png',				
				'image/line.png',				
				'image/logo.png',				
				'image/name-bg.png',				
				'image/npc.png',				
				'image/title-line.png'			
				];
	this.percentage=0;
	this.total=0;
	this.loadingNow=0;
	
}
loading.prototype={
	init:function(){
		this.imgLoad();
	},
	imgLoad:function(){
		for(var i=0;i<this.imgList.length;i++){
			var image = new Image();
			image.onload=function(){	
				_this.percentage++;
				
				_this.total=parseInt(_this.percentage/_this.imgList.length*100);
				_this.timeShow();	
			}
			image.src=_this.imgList[i];
		}
	
	},
	timeShow:function(){
		//console.log(_this.percentage)
		// if(this.loadingNow<=this.total){
		// 	this.loadingNow++;
		// }
		this.loadingNow =Math.floor(this.percentage/_this.imgList.length)*100;
		if(this.loadingNow==100){
			this.loadingNow = 99
		}
		document.getElementById("load").innerHTML=this.loadingNow+'%';
		document.getElementById("loading-ico").style.left=this.loadingNow+'%';
		document.getElementById("vague-box").style.width=this.loadingNow+'%';
		
		if(_this.imgList.length=this.percentage){
			setTimeout(function(){
				console.log('加载完成')
				//document.getElementById("loading").style.display='none';
				//document.getElementById("content").style.display='block';
				//if(_this.options.complete) _this.options.complete();
			},200)
			return;
		}
		//setTimeout(function(){
		//	_this.timeShow();
		//},1000/30)
	}
}

var ImgLoading=new loading({
	complete:function(){
   }});	
ImgLoading.init();  
 
