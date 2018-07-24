(function (win, doc) {
    if (!win.addEventListener) return;
    var html = document.documentElement;
    function setFont() {
        var html = document.documentElement;
        var k = 750;
        if( location.pathname.indexOf('login.html')>-1){
            if(document.documentElement.clientWidth>=800){
                html.style.fontSize = '80px'
                document.getElementsByClassName('login-bg-img')[0].style.height='18rem'
            }else{
                html.style.fontSize = html.clientWidth / k * 100 + "px";
                document.getElementsByClassName('login-bg-img')[0].style.height='100%'
            }
        }else{
            html.style.fontSize = html.clientWidth / k * 100 + "px";
        }
    }
    setFont();
    setTimeout(function () {
        setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
})(window, document);