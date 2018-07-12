var GlobLAN = {}
//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  }

  function setText(res){
    $('.text-set').each(function(){
        $(this).html( res[$(this).attr('data-id')]);
        if($(this).attr('data-text')){
            $(this).attr('data-text',res[$(this).attr('data-id')])
        }
    })
  }

    function setLogo(lan){
       var lan = getQueryString('language') || 'tw';
      $('#logo').attr('src','image/logo-lan/'+lan.toLowerCase()+'.png')          
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