function getLanguage() {
        var language = (window.navigator.browserLanguage || window.navigator.language).toLowerCase();
        if (language.indexOf('en') > -1)      return "en";//英文
        else if (language.indexOf('fr') > -1) return "fr";//法语
        else if (language.indexOf('de') > -1) return "de";//德语
        else if (language.indexOf('it') > -1) return "it";//意大利语
        else if (language.indexOf('pt') > -1) return "pt";//葡萄牙
        else if (language.indexOf('es') > -1) return "es";//西班牙
        else if (language.indexOf('ru') > -1) return "ru";//俄罗斯
        else if (language.indexOf('tr') > -1) return "tr";//土耳其
        else return "en";
    }
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
                window.location = getDownloadLocation(getParam('gameid'), "iPhone");//ios下载地址
                break;
            case 'Android':
                window.location= getDownloadLocation(getParam('gameid'), "Android"); //android下载地址
                break;
            default:
                break;
        }
    }

    function getParam(para){
        var paraArr = location.search.substring(1).split('&');
        for(var i = 0;i < paraArr.length;i++){
            if(para == paraArr[i].split('=')[0]){
                return paraArr[i].split('=')[1];
            }
        }
        return '';
    }

    function startGame() {
        //pgvSendClick({virtualDomain: 'sok.qq.com', hottag:'ngame.officalweb.startgame2'});
        switch(getPhoneSystem()) {
            case 'iPhone':
            case 'iPad':
                // var loadDateTime = new Date();
                // window.setTimeout(function() {
                //     var timeOutDateTime = new Date();
                //     if (timeOutDateTime - loadDateTime < 5000) {
                //         window.location = getDownloadLocation(getParam('gameid'), "iPhone");//ios下载地址
                //     } else {
                //         window.close();
                //     }
                // },25);
                if(getParam('gameid') == '1136' || getParam('gameid') == '1134' || getParam('gameid') == '1187') {
                    window.location = 'ngame1135://deeplink' + location.search;
                } else {
                    window.location = 'ngame' + getParam('gameid') + '://deeplink' + location.search;
                }
                break;
            case 'Android':
                try {
                    if(getParam('gameid') == '1136' || getParam('gameid') == '1134' || getParam('gameid') == '1187') {
                        window.location = 'ngame1135://deeplink' + location.search;
                    } else {
                        window.location = 'ngame' + getParam('gameid') + '://deeplink' + location.search;
                    }
                    // setTimeout(function(){
                    //     window.location= getDownloadLocation(getParam('gameid'), "Android"); //android下载地址
                    // },500);
                } catch(e) {}
                break;
            default:
                break;
        }
    }

    function getDownloadLocation(gameid, os) {
        switch(gameid) {
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
        startGame();
    })
    $('#downLoad-game').click(function(){
        downloadGame();
    })