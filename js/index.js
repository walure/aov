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
              appId      : '2033559596907192',
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
        if(!window.FBshareNum){
            window.FBshareNum=true
            statistic('fb')
        }
        var fbUrl = "https://www.facebook.com/dialog/feed?" +
            "app_id=2033559596907192&display=touch" +
            "&link=" + encodeURIComponent(shareURL) +
            "&redirect_uri=" + encodeURIComponent(tmpShareUrl);
            location.href = fbUrl;
    },
     fevents:function(id){
         var that = this;
        $(id).click(function(){
            console.log(999)
            that.FBshare(location.href);
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
        this.isLoad()
        this.loadUser()
        this.fabulous()
    },
    loadUser:function(){
        var that = this;
        $.ajax({
            type : 'get',
            url : GServiceType[getQueryString('sServiceType')]['api']+'/commonAct/a20180702AOV/index.php',
            dataType : 'json',
            data : {
                sServiceType:getQueryString('sServiceType'),
                language:getQueryString('language'),
                ticket:getQueryString('ticket') || getCookie('ticket'),
                areaid:getQueryString('areaid'),
                partition:getQueryString('partition'),
                platid:getQueryString('platid'),
                action:'getUserData',
                from:getQueryString('from'),
                iOpenid:getQueryString('from')=='mine' ? '' : getQueryString('openid'),
                sign:getQueryString('sign'),
                access_token:getQueryString('access_token') || getCookie('access_token')
            },
            success:function(res){
                console.log(res)
                document.getElementById("loading").style.display='none';
                if(res.code===0){
                    if(res.data.role_count==2){
                        $('#dialog-box-select').addClass('show');
                        that.selectArea()
                        return
                    }
                    that.innerText(res.data)
                }else{
                    dialogFuc.show(GlobLAN['code'+res.code],0)
                }
                
                if(res.code==997){
                    document.getElementById("page403").style.display='block';
                }else{
                    document.getElementById("content").style.display='block';
                    
                }
                    
                    
              
               
            },
            error:function(res){
                dialogFuc.show(GlobLAN['tipsLag'],1)
            }
        });
    },
    //如果t服
    selectArea:function(){
        $('#selectArea1,#selectArea2').click(function(){
            var partition =''
            if($(this).attr('id')=='#selectArea1'){
                partition=1011
            }else{
                partition=1012
            }
            var parm = '?sServiceType='+getQueryString('sServiceType')+
            '&language='+getQueryString('language')+
            '&ticket='+getQueryString('ticket')+
            '&areaid='+getQueryString('areaid')+
            '&partition='+partition+
            '&platid='+getQueryString('platid')+
            '&action='+getQueryString('action')+
            '&openid='+getCookie('openid')+
            '&from=mine'

            location.href=location.origin+location.pathname+parm

        })
    },
    innerText:function(data){
        $('#content .role_name').text(data.role_name);
        $('#content .grade_level').text(data.grade_level);
        $('#content .grade_icon').attr('src',data.grade_icon);
        $('#content .register_year').text(data.register_year+'.'+data.register_mon+'.'+data.register_day);
        $('#content .days').text(data.days);
        $('#content .total_game_cnt').text(data.total_game_cnt);

        $('#content .honor_1_icon').attr('src',data.honor_1_icon);
        $('#content .honor_1').text(data.honor_1);
        $('#content .honor_1_val').text(data.honor_1_val);
        
        $('#content .honor_2_icon').attr('src',data.honor_2_icon);
        $('#content .honor_2').text(data.honor_2);
        $('#content .honor_2_val').text(data.honor_2_val);
        //战斗荣誉
        var html = '';
        for(var i=0,o;o=data.honors[i];i++){
            html+=' <div class="item">'+
                   '<p class="ico"><img class="honor_1_icon" src="'+o.honor_icon+'"></p>'+
                    '<p class="honor_1">'+o.honor+'</p>'+
                    '<p class="honor_1_val">'+o.honor_val+'</p>'+
                '</div>'
        }
        $('#honors-box').html(html)

        //常用英雄
         html = '';
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
      
        var datas={
            survive: data.radar_hurt,
            damage:data.radar_behurt,
            support:data.radar_kda,
            supplies:data.radar_towndestroy,
            kills:data.radar_percoin,
        }
        initChart(datas);
        $(window).resize(function(){
            GChart1.resize();
        });

        //
        $('#content .avg_hurt').text(data.avg_hurt);
        $('#content .avg_behurt').text(data.avg_behurt);
        $('#content .kda').text(data.kda);
        $('#content .avg_towndestroy').text(data.avg_towndestroy);
        $('#content .percoin_cnt').text(data.percoin_cnt);

        //user-box
        $('#user-box .vote').text(data.vote);
        $('#fabulous').attr('vote',data.vote);
        //是否已点赞
        if(data.isVote==0){
            $('#fabulous').show()
        }else{
            $('#fabuloused').show();
            $('#flLiked-num').html(data.vote)
        }

        // 设置复制
        $('#js-copy').attr('data-clipboard-text',location.href)
        var btn = document.getElementById('js-copy');
        var clipboard = new Clipboard(btn);//实例化

        //复制成功执行的回调，可选
        clipboard.on('success', function(e) {
            console.log(e)
            if(!window.copyNum){
                window.copyNum=true
                statistic('copy')
            }
           //dialogFuc.show('复制成功')
        });

        //复制失败执行的回调，可选
        clipboard.on('error', function(e) {
            console.log(e);
        });

    },
    isLoad:function(){
        var index = 999
        //页面加载的时候
        console.log(getQueryString('openid'),getCookie('openid'))
        if(getQueryString('openid') != getCookie('openid') && isLogin()){
            index = 2;
            //其他用户登陆
            this.seeSelf()
        }
        else if(isLogin()){
            //当前用户
            index = 1
        }else{
            //未登录
            index = 0
        }
        $('#user-box .user-item').eq(index).removeClass('hidden');
        if(getQueryString('sServiceType') =='nawzryhw' || getQueryString('sServiceType') =='sawzryhw' ){
            $('#shareGarena').hide()
        }
       
    },
    //点赞动作
    fabulous:function(){
        $('#fabulous').click(function(){
            $.ajax({
                type : 'get',
                url : GServiceType[getQueryString('sServiceType')]['api']+'/commonAct/a20180702AOV/vote.php',
                dataType : 'json',
                data : {
                    iOpenid:getCookie('openid'),
                    language:getQueryString('language'),
                    ticket:getQueryString('ticket'),
                    partition:getQueryString('partition'),
                    from:getQueryString('from'),
                    sServiceType:getQueryString('sServiceType')
                },
                success:function(res){
                    console.log(res)
                    if(res.code==0){
                        $('#fabulous').hide()
                        $('#fabuloused').show()
                        var num = parseInt($('#fabulous').attr('vote'))
                        $('#flLiked-num').html(num++)
                    }
                },
                error:function(res){
                    dialogFuc.show(GlobLAN['tipsLag'],1)
                }
            })
        })
    },
    //查看自己
    seeSelf:function(){
        $('#seeSelf').click(function(){
            var partition = getQueryString('partition')
            if(getQueryString('language').toLocaleLowerCase()=='tw'){
                partition = 0;
            }
             var parm = '?sServiceType='+getQueryString('sServiceType')+
                        '&language='+getQueryString('language')+
                        '&ticket='+getQueryString('ticket')+
                        '&areaid='+getQueryString('areaid')+
                        '&partition='+partition+
                        '&platid='+getQueryString('platid')+
                        '&action='+getQueryString('action')+
                        '&openid='+getCookie('openid')+
                        '&from=mine'

            location.href=location.origin+location.pathname+parm

        })
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