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

 //facebookObj.init('#shareFacebook')





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







// 图表
var GChart1;
var GChart2;
var maxLine = 0;
var data={
    survive:'73.9',
    damage:'65.8',
    support:'45.8',
    supplies:'45.8',
    kills:'45.28',
}
initChart(data);
$(window).resize(function(){
    GChart1.resize();
});//屏幕变化时自动调整图表
function initChart(data) {
    GChart1 = echarts.init(document.getElementById('main'));
    var data1 = [data['survive'],data['damage'],data['support'],data['supplies'],data['kills']];

    maxLine = Math.round(maxLine*1.2);
    $("#maxLine").text(maxLine);
    $("#centerLine").text(Math.round(maxLine/2));
    var option = {
        legend: {
            data: ['detail']
        },
        radar: {
            splitArea: {
                show: false,
                areaStyle: {
                    color: ["none"]
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    opacity:0.39,
                    color: '#d8c18e'
                }
            },
            indicator: [
                {max: 100},
                {max: 100},
                {max: 100},
                {max: 100},
                {max: 100}
            ],
            axisLine: {
                show: false
            }
        },
        series: [{
                type: 'radar',
         
                data: [
                    {
                        value: data1,
                    }
                ],
                symbolSize: 6,
                lineStyle:{
                    normal:{
                       
                         width:0,
                    }
                },
                itemStyle:{
                    normal:{
                        opacity: "0.6",
                        color: "#44eceb",
                        shadowColor:'#44eceb',
                        shadowBlur: 4
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: "0.5",
                        color: "rgba(68,236,235,60)"
                    }
                }
            }]
    };
  
    GChart1.setOption(option);

}