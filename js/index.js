$(function() {
	FastClick.attach(document.body);
})
function isMobile() {
    return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
}

 var facebookObj ={
     setShareData:function(){

     },
     init:function(id){
        this.setShareData()
        this.FB='';
        var that = this;
        this.load(function(){
            that.fevents(id) 
        })
     },
     load:function(callback){
         var that = this;
         window.fbAsyncInit = function() {
            FB.init({
              appId      : '333894633812906',
              xfbml      : true,
              version    : 'v3.0'
            });
            FB.AppEvents.logPageView();
          };
        
          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));
        document.getElementById('facebook-jssdk').onload=function(){
            console.log('loading完成')
            callback()
        }
     },
     FBshare(shareURL) {
        var curHref = window.location.href;
        var tmpShareUrl =  curHref + ((curHref.indexOf('?') != -1) ? "&fbShareSucc=1" : '?fbShareSucc=1');

        var fbUrl = "https://www.facebook.com/dialog/feed?" +
            "app_id=333894633812906&display=touch" +
            "&link=" + encodeURIComponent(shareURL) +
            "&redirect_uri=" + encodeURIComponent(tmpShareUrl);
            location.href = fbUrl;
    },
     fevents:function(id){
         var that = this;
        $(id).click(function(){
            console.log(999)
            console.log(FB)
            that.FBshare("http://chuoquan.com/aov");
        })
     }
 }

 facebookObj.init('#shareFacebook')





$('#login').click(function(){
    console.log(1)
    
})
$('#client').click(function(){

    if(isMobile()) {
        window.location.href = "移动端专题地址"+location.search;
    }else{
        window.location.href = "https://www.arenaofvalor.com/"
    }
})


var btn = document.getElementById('js-copy');
var clipboard = new Clipboard(btn);//实例化

//复制成功执行的回调，可选
clipboard.on('success', function(e) {
    console.log(e);
});

//复制失败执行的回调，可选
clipboard.on('error', function(e) {
    console.log(e);
});