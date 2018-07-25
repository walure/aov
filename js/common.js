var GlobLAN = {}
//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null ) 
    {
      if(unescape(r[2])=='null'){
        return ''
      }
      return unescape(r[2]); 
    }
    return ''; 
  }

  var cookiePre = 'a0702aov_';
//设置cookie
  function setCookie(name, value)
  {
      name = cookiePre + name;
      var Days = 7;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
//获取cookie  
  function getCookie(name)
  {
      name = cookiePre + name;
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      arr = document.cookie.match(reg);
      if (arr) {
          return unescape(arr[2]);
      } else {
          return null;
      }
  }


// 判断手机
function isMobile() {
  return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
}

//统计接口
function statistic(platform){
    var ticket = getQueryString('ticket') || getCookie('ticket');
    var openid = '';
    var sign = '';
    var from = getQueryString('from');
    if (from === 'app') {
        openid = getQueryString('openid');
        sign = getQueryString('sign');
    }

    var data = {
            sServiceType:getQueryString('sServiceType'),
            partition:getQueryString('partition'),
            ticket:ticket,
            platform:platform,
            access_token:getCookie('access_token'),
            iOpenid:openid,
            sign:sign
        };

  $.ajax({
    type : 'get',
    url : GServiceType[getQueryString('sServiceType')]['api']+'/commonAct/a20180702AOV/statistic.php',
    dataType : 'json',
    data : data,
    success:function(res){
        console.log(res)
        if(res.code===0){
      
        }else{
  
        }  
    },
    error:function(res){
     console.log(res)
    }
  })
}

//判断是否登录
function isLogin(){
  if(getCookie('openid')){
       return true
  }
  return false
}



//设置语言
  function setText(res){
    $('.text-set').each(function(){
        $(this).html( res[$(this).attr('data-id')]);
        if($(this).attr('data-text')){
            $(this).attr('data-text',res[$(this).attr('data-id')])
        }
    })
    //设置facebook分享
    $('.fb-set').each(function(){
       $(this).attr('content',res[$(this).attr('data-id')])
    })
  }
//设置icon logo
    function setLogo(lan){
      var lan = getQueryString('language') || 'TW';
      lan=lan.toUpperCase()
      if(lan=='S_EN'){
        lan='EN'
      }
      var picUrl='https://overseas-img.qq.com/images/bodproximabeta/act/a20190702AOV_eu'
      $('#logo').attr('src',picUrl+'/logo-lan/LOGO_'+lan+'.png')          
      $('#logo2').attr('src',picUrl+'/logo-lan/ProPic_'+lan+'.png')          
      $('#logo729').attr('src',picUrl+'/logo-lan/729LOGO_'+lan+'.png')      
      
      var href = '';
      if(lan=='TW' || lan=='VN' || lan=='TH'){
        href='tty'
      }else if(lan=='ID'){
        href='id'
      }else{
        href='en'
      }

      $('.icon-head').attr('href',picUrl+'/title-icon/'+href+'.ico');
      //设置分享图 背景图
      var img =''
      if(getQueryString('sServiceType') =='nawzryhw' || getQueryString('sServiceType') =='sawzryhw' || getQueryString('sServiceType') =='idwzryhw' ){
        img='https://overseas-img.qq.com/images/bodproximabeta/act/a20190702AOV_eu/login-bg1.jpg'
      }else{
        img='https://overseas-img.qq.com/images/bodproximabeta/act/a20190702AOV_eu/login-bg.jpg'
      }
      $('.share-set-img').attr('content',img)
      $('.login-bg-img').attr('style','background-image:url('+img+')')


    }
    
  function loadLan(callback){
    var lan = getQueryString('language') || 'zh';
     
      $.getJSON('language/wap/'+lan.toLowerCase()+'.json',function(res){
          console.log(res);
          GlobLAN = res;
          setText(res)
          if(callback){
            callback()
          }
      });


    
  }
  
  if(location.pathname.indexOf('login.html')>-1){
    loadLan()
  }

  setLogo()

  //登录
  loginAccount()
  //loginAccount
  function loginAccount(){
    $('#loginAccount').click(function(){
      // location.href="https://auth.garena.com/oauth/login"+location.search
      var href = window.location.href;
      var match = href.match(/^(.*\/)(.*)\?/);
      if (!match) {
          return false;
      }
      var serviceType = getQueryString('sServiceType');
      var rediretUrl = match[1] + 'redirect.html?sServiceType='+getQueryString('sServiceType')+'&language='+getQueryString('language')+'&from='+getQueryString('from')+'&areaid='+getQueryString('areaid')+'&partition='+getQueryString('partition')+'&platid='+getQueryString('platid')+'&openid=' + getQueryString('openid') + '&sign=' + getQueryString('sign');
      if(!GServiceType[serviceType]){
          return false;
      }
      if (GServiceType[serviceType]['login'] == "garena") {
          //显示garena登录
          var authLoginUrl = 'https://auth.garena.com/oauth/login?client_id=' + GServiceType[serviceType]['id'] + '&redirect_uri=' + encodeURIComponent(rediretUrl) + '&response_type=token&all_platforms=1&locale=zh-TW&platform=1';
          location.href = authLoginUrl
      } else if (GServiceType[serviceType]['login'] == "facebook") {
          //显示facebook登录
          var authLoginUrl = 'https://www.arenaofvalor.com/act/oauth1.0/index.html?game=' + GServiceType[serviceType]['id'] + '&redirect=' + encodeURIComponent(rediretUrl);
         location.href = authLoginUrl
      }
   }) 
  }
 
