
var _this;
function loading(options){
	this.options=options || {};
	//this.complete 完成
	_this=this;
	var picUrl='https://overseas-img.qq.com/images/bodproximabeta/act/a20190702AOV_eu';
	this.imgList=[
				'/info-bg/1.jpg',				
				'/info-bg/2.jpg',				
				'/info-bg/3.jpg',				
				'/info-bg/4.jpg',				
				'/info-bg/hero-icon.png',				
			
				'/bg-1.png',				
				'/close.png',				
				'/dian.png',				
				'/icon.png',				
				'/line.png',				
				'/logo.png',				
				'/name-bg.png',				
				'/npc.png',				
				'/title-line.png'			
				];
	for(var i=0;i<this.imgList.length;i++){
		this.imgList[i] = picUrl+this.imgList[i] 
	}				
	this.percentage=0;
	this.total=0;
	this.loadingNow=0;
	
}
loading.prototype={
	init:function(callback){
		this.callback = callback
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
		
		try {
			this.loadingNow =Math.floor(this.percentage/_this.imgList.length*100)
			if(this.loadingNow>=100){
				this.loadingNow = 99;
				if(this.callback) this.callback()
			}
			//console.log(this.loadingNow,this.percentage,_this.imgList.length)
			document.getElementById("load").innerHTML=this.loadingNow+'%';
			document.getElementById("loading-ico").style.left=this.loadingNow+'%';
			document.getElementById("vague-box").style.width=this.loadingNow+'%';
			
			

		} catch (error) {
				alert('78:'+JSON.stringify(error))
		}
	}
}

var ImgLoading=new loading({
	complete:function(){
   }});	

