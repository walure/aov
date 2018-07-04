$(function() {
	FastClick.attach(document.body);
})

$('#login').click(function(){
    console.log(1)
})
$('#client').click(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "移动端专题地址"+location.search;
    }else{
        window.location.href = "https://www.arenaofvalor.com/"
    }
})