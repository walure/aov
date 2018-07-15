
    function getPhoneSystem() { 
        var userAgentInfo = navigator.userAgent; 
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
        var flag = ''; 
        for (var v = 0; v < Agents.length; v++) { 
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = Agents[v]; break; } 
        } 
        return flag; 
    }

    function downloadGame() {
        //pgvSendClick({virtualDomain: 'sok.qq.com', hottag:'ngame.officalweb.downloadgame2'});
        switch(getPhoneSystem()) {
            case 'iPhone':
            case 'iPad':
                window.location = getDownloadLocation(getParam('gameId'), "iPhone");//ios下载地址
                break;
            case 'Android':
                window.location= getDownloadLocation(getParam('gameId'), "Android"); //android下载地址
                break;
            default:
                break;
        }
    }

    function getParam(para){
         return GServiceType[getQueryString('sServiceType')][para]
    }

    function startGame() {
        //pgvSendClick({virtualDomain: 'sok.qq.com', hottag:'ngame.officalweb.startgame2'});
        console.log(getPhoneSystem())
        switch(getPhoneSystem()) {
            case 'iPhone':
            case 'iPad':
                // var loadDateTime = new Date();
                // window.setTimeout(function() {
                //     var timeOutDateTime = new Date();
                //     if (timeOutDateTime - loadDateTime < 5000) {
                //         window.location = getDownloadLocation(getParam('gameId'), "iPhone");//ios下载地址
                //     } else {
                //         window.close();
                //     }
                // },25);
                console.log(getParam('gameId'))
                if(getParam('gameId') == '1136' || getParam('gameId') == '1134' || getParam('gameId') == '1187') {
                    window.location = 'ngame1135://deeplink' + location.search;
                } else {
                    window.location = 'ngame' + getParam('gameId') + '://deeplink' + location.search;
                }
                break;
            case 'Android':
                try {
                    if(getParam('gameId') == '1136' || getParam('gameId') == '1134' || getParam('gameId') == '1187') {
                        window.location = 'ngame1135://deeplink' + location.search;
                    } else {
                        window.location = 'ngame' + getParam('gameId') + '://deeplink' + location.search;
                    }
                    // setTimeout(function(){
                    //     window.location= getDownloadLocation(getParam('gameId'), "Android"); //android下载地址
                    // },500);
                } catch(e) {}
                break;
            default:
                break;
        }
    }

    function getDownloadLocation(gameId, os) {
        switch(gameId) {
            case "1185":
                if(os == "iPhone") {
                    return "https://itunes.apple.com/app/id1323945138";
                } else if(os == "Android") {
                    return "market://details?id=com.ngame.allstar.india";
                }
                break;
            case "1133":
                if(os == "iPhone") {
                    return "https://itunes.apple.com/app/id1192646082";
                } else if(os == "Android") {
                    return "market://details?id=com.ngame.allstar.au";
                }
                break;
            case "1134":
            case "1135":
            case "1136":
                if(os == "iPhone") {
                    return "https://itunes.apple.com/app/id1150318642";
                } else if(os == "Android") {
                    return "market://details?id=com.ngame.allstar.eu";
                }
                break;
            case "1139":
                if(os == "iPhone") {
                    return "https://itunes.apple.com/app/id1150331854";
                } else if(os == "Android") {
                    return "market://details?id=com.garena.game.kgsam";
                }
                break;
            default:
                if(os == "iPhone") {
                    return "https://itunes.apple.com/app/id1150318642";
                } else if(os == "Android") {
                    return "market://details?id=com.ngame.allstar.eu";
                }
                break;
        }
    }

    $('#login-game').click(function(){
        console.log(0)
        startGame();
    })
    $('#downLoad-game').click(function(){
        console.log(1)
        downloadGame();
    })