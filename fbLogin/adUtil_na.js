/**
 * Created by adamswang on 2018/5/13.
 */

var pageSharePrefix = "https://www.arenaofvalor.com/act/a20180507fivearmy/index_na_m.html";
var imageURLPrefix = "//overseas-img.qq.com/m/a20180507fivearmy/";
var userEventType = window.supportTouch ? "touchend" : "click";
var fbLoginPrefix = "https://www.arenaofvalor.com/act/oauth/index.html?game=1134&lang=en-US&redirect=";

var mrmsPrefix = "https://mrms.na.ngame.proximabeta.com/commonAct/a20180507fivearmy/adAct.php";

var isLogin = false;

function alertMsg(msg) {
    $('#pop6 .txtpop1').empty().text(msg);
    popup('#pop6');
}

function noLogin() {
    alertMsg("Sorry, you haven't logged in yet!");
}

function isIOS() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return /iphone|ipod|ipad/i.test(ua);
}

function isMobile() {
    return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
}

var giftMapping = {
    '844690': ['Permanent hero：Ilumia', 0, 'Permanent_hero_Ilumia.png'],
    '845156': ['Skin：Heartbreaker', 1, 'Skin_Heartbreaker.png'],
    '845158': ['Magic Crystal*1', 2, 'Magic_Crystal1.png'],
    '845159': ['Trial Card：Fright Circus*1 day', 3, 'Trial_Card_Fright_Circus1_day.png'],
    '845160': ['Lvl 2 Red Arcana Chest*1', 4, 'Lvl_2_Red_Arcana_Chest1.png'],
    '845161': ['Lvl 2 Arcana Pack*1', 5, 'Lvl_2_Arcana_Pack1.png'],
    '845162': ['Trial Card：Ilumia*3 days', 6, 'Trial_Card_Ilumia3_days.png'],
    '845163': ['Gem Pack*1', 7, 'Gem_Pack1.png']
};

window.fbAsyncInit = function () {
    FB.init({
        appId: '1019196208221081',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * fb 分享
 * @constructor
 */
function FBshare(shareURL) {
    //added by adams，fb分享跳转回页面需要带上所有参数
    var curHref = window.location.href.replace(/[?&]fbShareSucc=1/ig, '');
    var redirect_uri = curHref + ((curHref.indexOf('?') != -1) ? "&fbShareSucc=1" : '?fbShareSucc=1');

    var tmpShareUrl = '';
    if (shareURL != undefined && shareURL != '') {
        tmpShareUrl = shareURL;
    } else {
        tmpShareUrl = pageSharePrefix;
    }

    fbUrl = "https://www.facebook.com/dialog/share?" +
        "app_id=1019196208221081&display=touch" +
        "&href=" + encodeURIComponent(tmpShareUrl) +
        "&redirect_uri=" + encodeURIComponent(redirect_uri);
    location.href = fbUrl;
}

milo.ready(function () {
    var share = false;//是否为分享页面 false：不是   true：是

    if (milo.request('shareCode') != '') {
        share = true;
    }

    var sData = {
        'openid': milo.request('openid'),
        'areaid': milo.request('areaid'),
        'platid': milo.request('platid'),
        'partition': milo.request('partition'),
        'roleid': milo.request('roleid'),
        'rolename': milo.request('rolename'),
        'sTicket': (milo.request('sTicket') != '') ? milo.request('sTicket') : milo.request('ticket'),
        'sServiceType': milo.request('sServiceType')
    };

    function checkLogin() {
        return ((milo.request('sTicket') == '' && milo.request('ticket') == '') ? false : true);
    }

    function queryRequest(opt) {
        need(["util.zepto", "biz.widget.dialog"], function ($, widget) {
            widget.showLoading();
            extend(sData, opt);

            var url = mrmsPrefix + '?'
                + milo.serialize(sData) + '&_t=' + Math.ceil(Math.random() * 1000);
            loadScript(url, function () {
                widget.hideLoading();

                var result = window['adAct'];
                if (result.iRet < 0) {//返回码小于0，直接弹错误提示
                    alert(decodeURIComponent(result.sMsg));
                } else {
                    //执行相应的动作
                    switch (opt.op) {
                        case 0://pageInit
                            pageInit(result, 0);
                            break;
                        case 1://doReserve
                            doReserve(result, 1);
                            break;
                        case 2://bindMailBox
                            bindMailBox(result, 2);
                            break;
                        case 3://doInvite
                            doInvite(result, 3);
                            break;
                        case 4://doLottery
                            doLottery(result, 4);
                            break;
                        case 5://fbShare
                            fbShare(result, 5);
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }

    //fb分享
    function fbShare(result, op) {
        var shareRet = result.jData.shareRet;

        if (shareRet == 0) {
            //alertMsg('分享成功，并获得一次新的抽奖机会');
            pageInit(result, op);
        } else {
            //alertMsg('分享成功');
        }
    }

    //抽奖
    function doLottery(result, op) {//op = 4
        var lotResult = result.jData.lotResult;
        var lotIndex = giftMapping[lotResult][1];

        lottery.playto(lotIndex, function () {
            $('#pop5 img').attr('src', imageURLPrefix + giftMapping[lotResult][2]);
            $('#pop5 span').text(giftMapping[lotResult][0]);
            popup('#pop5');

            pageInit(result, op);
        });

        /*lottery.config.onClickRollEvent = calllotteryToRoll(lotIndex);
         lottery.config.onCompleteRollEvent = function () {
         $('#pop5 img').attr('src', imageURLPrefix + giftMapping[lotResult][2]);
         $('#pop5 span').text(giftMapping[lotResult][0]);
         popup('#pop5');

         pageInit(result, op);
         };*/
    }

    function copyCode() {
        var copyVal = "";
        var save = function (e) {
            copyVal = $('#pop7 input').attr('value');
            e.clipboardData.setData("text/plain", copyVal);
            e.preventDefault();
        };
        document.addEventListener("copy", save);
        document.execCommand("copy");
        document.removeEventListener("copy", save);

        if (copyVal != "") {
            alert("Successfully Copied!");
        }
    }

    //邀请好友
    function doInvite(result, op) {// op = 3
        var shareCode = result.jData.shareCode;
        //var shareURL = pageSharePrefix + "?shareCode=" + shareCode;
        $('#pop7 input').attr('value', shareCode + " " + pageSharePrefix);
        popup('#pop7');

        $('#doInvite').unbind().click(function () {
            $('#pop7 input').attr('value', shareCode + " " + pageSharePrefix);
            popup('#pop7');
        });
    }

    //绑定邮箱
    function bindMailBox(result, op) {//op = 2
        var bindRet = result.jData.bindRet;

        if (bindRet['br'] == 0 || bindRet['br'] == 2) {
            alert('Successfully bound!');
        } else if (bindRet['br'] == 1) {
            alert("Sorry, You have already bound email: " + bindRet['mb'] + '!');
        }

        hidePopOk('#pop11');
        pageInit(result, op);
    }

    //玩家预约
    function doReserve(result, op) {//op = 1
        var resRet = result.jData.resRet;
        if (resRet == 0) {
            hidePopOk('#pop1');
            alertMsg('Please check your in-game mailbox for your Appointment Package.');
        }

        pageInit(result, op);
    }

    //页面初始化
    function pageInit(result, op) {
        var holdLeft = result.jData.hl;
        var iHold = result.jData.ih;
        var iHoldInvite = result.jData.hi;
        var iHoldShare = result.jData.hs;
        var iHoldReserve = result.jData.hr;
        var iHoldMailBind = result.jData.hmb;
        var sUserMail = result.jData.um;

        var roleName = result.jData.rolename;
        $('#fbLogin').hide();
        //$('#fbLogout').show();
        $('#logined').text('Welcome, ' + roleName).show();

        $('#fbShare').unbind().click(function () {
            queryRequest({'op': 5});
            FBshare(pageSharePrefix);
        });

        //更新抽奖次数
        if (op == 0 || op == 1 || op == 2 || op == 4 || op == 5) {
            $('#holdLeft').text(holdLeft);

            if (holdLeft == 0) {//没有剩余资格，禁用抽奖
                /*lottery.config.onClickRollEvent = function () {
                 alertMsg('对不起，您的抽奖资格不够了哦！');
                 lottery.enable();
                 }*/

                $('.btn-lottery').unbind().on('click', function () {
                    alertMsg("Sorry, You don't have lottery draws.");
                });
            } else if (holdLeft > 0) {//有剩余资格
                /*lottery.config.onClickRollEvent = function () {
                 queryRequest({'op': 4});//点击执行抽奖请求
                 lottery.enable();
                 }*/
                $('.btn-lottery').unbind().on('click', function () {
                    queryRequest({'op': 4});//点击执行抽奖请求
                });
            }

            if (iHold > 7 && holdLeft == 0) {//已经到达抽奖上限
                /*lottery.config.onClickRollEvent = function () {
                 alertMsg('每个账号最多可抽8次，您已经达到上限了哦');
                 lottery.enable();
                 }*/
                $('.btn-lottery').unbind().on('click', function () {
                    alertMsg("You've reached the maximum number of draws!");
                });
            }

            if (iHoldReserve > 0) {//已经预约过
                $('#doReserve').unbind().click(function () {
                    hidePopOk('#pop1');
                    alertMsg("Sorry, You have already made appointment.");
                });
            } else {
                $('#doReserve').unbind().click(function () {
                    var opt = {'op': 1};
                    var shareCodeInput = $('#pop1 input').val();
                    var notice = '';

                    if (/\w{16}/ig.test(shareCodeInput) || shareCodeInput == '') {//valid shareCode
                        opt['sShareCode'] = shareCodeInput;
                        notice = 'Confirm to make appointment?';
                    } else {
                        notice = 'Invalid code, continue to make appointment?';
                    }

                    if (confirm(notice)) {//confirm to submit
                        queryRequest(opt);
                    }

                    /*if (share) {
                     opt['sShareCode'] = milo.request('shareCode');
                     }*/
                });
            }

            if (iHoldMailBind > 0) {//已经绑定过邮箱
                $('#bindMailBox').unbind().click(function () {
                    alert("Sorry, You have already bound email：" + sUserMail + '');
                });
            } else {
                $('#bindMailBox').unbind().click(function () {
                    var opt = {'op': 2};
                    $mailInput = $('#pop11 input').val();

                    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test($mailInput)) {//验证邮箱
                        opt['sUserMail'] = $mailInput;

                        queryRequest(opt);
                    } else {
                        alert('Please enter a valid email.');
                    }
                });
            }
        }

        //查询预约人数
        if (op == 0 || op == 1) {
            var iReserveTotal = result.jData.irt;
            $("#iReserveTotal").text(iReserveTotal);
        }

        //查询预约记录
        if (op == 0) {//页面初始化绑定动作
            var inviteCount = result.jData.ic;
            $("#inviteCount").text(inviteCount);

            var shareCode = result.jData.sc;//invite code
            if (shareCode != undefined && shareCode != '') {
                $('#doInvite').unbind().click(function () {
                    $('#pop7 input').attr('value', shareCode + " " + pageSharePrefix);
                    popup('#pop7');
                });
            } else {
                $('#doInvite').unbind().click(function () {
                    queryRequest({'op': 3});
                });
            }
        }

        //查询抽奖记录
        if (op == 0 || op == 4) {
            var lotteryList = result.jData.ulr;

            if (lotteryList.length > 0) {
                $('#lotteryList').empty();
                $('.hasGift').show();
                $('.noGift').hide();

                for (var i = 0; i < lotteryList.length; i++) {
                    var iGiftId = lotteryList[i].iGiftId;
                    var giftName = giftMapping[iGiftId][0];

                    var tmpEle = '<p class="lottrtget">' + giftName + '</p>';
                    $('#lotteryList').append(tmpEle);
                }
            }
        }
    }

    //游戏外只需要验证ticket，游戏内没有sTicket，直接前端返回接口报错即可
    if (milo.request('ticket') == '' && milo.request('sTicket') == '') {
        var tmpHref = pageSharePrefix
            + ((milo.request('shareCode') != '') ? ('?shareCode=' + milo.request('shareCode')) : '');
        $('#fbLogin').attr('href', fbLoginPrefix + encodeURIComponent(tmpHref));

        $('#doInvite').click(function () {
            noLogin();
        });
        $('#bindMailBox').click(function () {
            noLogin();
        });
        $('#doReserve').click(function () {
            hidePopOk('#pop1');
            noLogin();
        });
        $('#fbShare').unbind().click(function () {
            FBshare(pageSharePrefix);
        });
        $('.btn-lottery').unbind().on('click', function () {
            noLogin();
        });
    } else {//已登录
        isLogin = true;
        queryRequest({'op': 0});
    }

    if (!isIOS()) {
        $("#copy_link").unbind().on(userEventType, copyCode);
    } else {
        var clipboard = new Clipboard("#copy_link");
        clipboard.on("success", function () {
            if (($('#pop7 input').attr("value") != "")) {
                alert("Successfully Copied!");
            }
        });

        clipboard.on("error", function () {
            //alert("copy fail");
        });
    }

    var DownloadGameURL = isIOS() ? 'https://itunes.apple.com/app/id1150318642' : 'https://play.google.com/store/apps/details?id=com.ngame.allstar.eu';
    $('#DownloadGame').attr('href', DownloadGameURL);
});
