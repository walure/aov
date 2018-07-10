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
       var lan = getQueryString('lan') || 'tw';
      $('#logo').attr('src','image/logo-lan/'+lan+'.png')          
    }
  function loadLan(){
    var lan = getQueryString('lan') || 'zh';
    $.get('language/wap/'+lan+'.json',function(res){
        console.log(res);
        setText(res)
    });

    
  }
  loadLan()
  setLogo()