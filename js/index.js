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





//弹出层
var dialogFuc={
    show:function(txt,btnType,callback){
        //0 确定 1 刷新 
        if(txt){
            $('#dialog-box-text').html(txt)
        }
        if(btnType==0){
            $('#dia-submit .text').html(
                '<i class="icon success"></i><i>'+GlobLAN['tipsConfirm']+'</i>'
            )
        }else if(btnType==1){
            $('#dia-submit .text').html(
                '<i class="icon refresh"></i><i>'+GlobLAN['tipsRefresh']+'</i>'
            )
        }
        var that = this;
        $('#dialog-box').addClass('show')
        
        $('#dia-submit').unbind().bind('click',function(){
            that.hide()
        })
    },
    hide:function(){
        $('#dialog-box').removeClass('show')
    },
    init:function(){
        var that = this
        $('#dia-close').click(function(){
            that.hide()
        })
    }
}
dialogFuc.init();

//选区控制
var dialogSelectFuc={
    show:function(){
        $('#dialog-box-select').addClass('show');
       
    },
    hide:function(){
        $('#dialog-box-select').removeClass('show')
    },
    init:function(){
        var that = this
        $('#dia-select-close').click(function(){
            that.hide()
        })
    }
}
dialogSelectFuc.init()







//定义图表
var GChart1;
        
//信息
var  dataHandle={
    init:function(){
        this.loadUser()
    },
    loadUser:function(){
        var that = this;
        $.ajax({
            type : 'get',
            url : 'http://external.mrms.garena.tw/commonAct/a20180702AOV/index.php',
            dataType : 'json',
            data : {
                sServiceType:getQueryString('sServiceType'),
                language:getQueryString('language'),
                ticket:getQueryString('ticket'),
                areaid:getQueryString('areaid'),
                partition:getQueryString('partition'),
                platid:getQueryString('platid'),
                action:getQueryString('action'),
                from:getQueryString('from'),
            },
            success:function(res){
                console.log(res)
                if(res.code===0){
                    that.innerText(res.data)
                }else{
                    dialogFuc.show(GlobLAN['code'+res.code],0)
                }
               
            },
            error:function(res){
                dialogFuc.show(GlobLAN['tipsLag'],1)
            }
        });
    },
    innerText:function(data){
        $('#content .role_name').text(data.role_name);
        $('#content .register_year').text(data.register_year);
        $('#content .days').text(data.days);
        $('#content .total_game_cnt').text(data.total_game_cnt);
        
        var html = '';
        for(var i=0,o;o=data.heroes[i];i++){
            html+='<li class="item">'+
                    '<div class="hero-img"><img src="'+o.hero_icon+'"></div>'+
                    '<div class="use-info">'+
                        '<div class="name c-t-1" data-text="'+o.hero_name+'">'+o.hero_name+'</div>'+
                        '<div class="txt">'+
                            '<span class="c-t text-set" data-id="heroProficiency" data-text="熟練度"></span> '+
                            '<span class="c-c ico-s" ><span style="background-image:url('+o.profession_icon+')"></span>'+o.proficiency+'</span> '+
                        '</div>'+
                        '<div class="txt">'+
                                '<span class="c-t text-set" data-id="heroMatches" data-text="場次"></span> '+
                                '<span class="c-c">232</span> '+
                        '</div>'+
                        '<div class="txt">'+
                                '<span class="c-t text-set" data-id="heroWinRate" data-text="勝率"></span> '+
                                '<span class="c-c">'+o.win_percent+'%</span> '+
                        '</div>'+
                    '</div>'+
                '</li>'
        }
        $('#hero-list').html(html);
        setText(GlobLAN);

        // 图表
      
        var data={
            survive: data.avg_hurt,
            damage:'68',
            support:'45.8',
            supplies:'45.8',
            kills:'45.28',
        }
        initChart(data);
        $(window).resize(function(){
            GChart1.resize();
        });

        //
    }
}

dataHandle.init()





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
    console.log(e)
    dialogFuc.show('复制成功')
});

//复制失败执行的回调，可选
clipboard.on('error', function(e) {
    console.log(e);
});









//屏幕变化时自动调整图表
function initChart(data) {
    GChart1 = echarts.init(document.getElementById('main'));
    var data1 = [data['survive'],data['damage'],data['support'],data['supplies'],data['kills']];
    var maxLine = 0;
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




//facebook 分享
facebookObj.init('#shareFacebook')