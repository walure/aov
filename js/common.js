var GlobLAN = {}
//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  }

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
  }
//设置logo
    function setLogo(lan){
       var lan = getQueryString('language') || 'TW'
      $('#logo').attr('src','image/logo-lan/LOGO_'+lan.toUpperCase()+'.png')          
      $('#logo2').attr('src','image/logo-lan/ProPic_'+lan.toUpperCase()+'.png')          
      $('#logo729').attr('src','image/logo-lan/729LOGO_'+lan.toUpperCase()+'.png')          
    }
  function loadLan(){
    var lan = getQueryString('language') || 'zh';
    $.get('language/wap/'+lan.toLowerCase()+'.json',function(res){
        console.log(res);
        GlobLAN = res;
        setText(res)
    });

    
  }
  loadLan()
  setLogo()