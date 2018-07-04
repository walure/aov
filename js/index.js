$(function() {
	FastClick.attach(document.body);
})
function isMobile() {
    return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
}

 var facebookObj ={
     init:function(id){
        this.FB='';
        var that = this;
        this.load(function(){
            that.fevents(id) 
        })
     },
     load:function(callback){
         var that = this;
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        document.getElementById('facebook-jssdk').onload=function(){
            console.log('loading完成')
            that.FB = FB
            FB.init({
                appId: '1019196208221081',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10'
            });
            FB.AppEvents.logPageView();
            callback()
        }
     },
     FBshare(shareURL) {
        this.FB.ui({
            method: 'share',
            href: "http://www.baidu.com" //这里换成你的网址
          }, function(response){
            //分享回调
          })
    },
     fevents:function(id){
         var that = this;
        $(id).click(function(){
            console.log(999)
            console.log(FB)
            that.FBshare(location.href);
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