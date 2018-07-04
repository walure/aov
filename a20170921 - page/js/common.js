// alert(1);

//prompt('href', location.href);


var _roleInfoUrl = '//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=5';
var _rediretUrl = 'https://external.mrms.garena.tw/commonAct/a20170814challenge/redirect.php?'+getRediretParam();
// alert(_rediretUrl);
var _authLoginUrl = '//auth.garena.com/oauth/login?client_id=100050&redirect_uri='+encodeURIComponent(_rediretUrl)+'&response_type=token&all_platforms=1&locale=zh-TW&platform=1';
var _initUrl = '//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=0';
var _shareUrl = '//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=2';
var _sharePage = 'https://game.moba.garena.tw/act/a20170921/index.html';
var _getGfitUrl ='//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=1';

var _exchangeCodeUrl = '//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=3';
var _exchangeGiftBook = '//external.mrms.garena.tw/commonAct/a20170814challenge/adAct.php?op=4';

var clipBoardArr = [];

var _hrefLogout = '//auth.garena.com/oauth/logout';

var _heroConfig = [
    {name:'史蘭茲',title:'【商會惡霸】史蘭茲的印記',summary:'惡名遠播的商會惡霸，卻也是信譽卓著的邊境巨賈，從不相信這個世界的黑與白，只關心自己的生意和利益。！'},
    {name:'娜塔亞',pic:'',title:'【煉獄之災】娜塔亞的印記',summary:'背離了親族，沉淪於黑暗，只有毒牙的陪伴，能夠撫慰她滿目瘡痍的心房。'},
    {name:'科里納卡',title:'【閻甲刺客】科里納卡的印記','summary':'沒有堅硬的甲胄，那就用鋒銳的觸角，去守護這份血脈相連的契約！'},
    {name:'普雷塔',title:'【瘟疫騎士】普雷塔的印記',summary:'瘟疫的氣息彌漫著戰場的每一個角落，飛龍的雙翼投下死亡的陰影，墮落的騎士啊，已經化身死神的使者！'},
    {name:'愛里',pic:'',title:'【龍影忍者】愛里',summary:'吾自迷島來，獨行天地間，除刀無外物，刀與心相伴。吾名半藏，參上！'},
    {name:'納克羅斯',pic:'',title:'【冥獄幻刃】納克羅斯的印記',summary:'他是冷酷無情的深淵領主，手握惡靈鍛造的幽冥幻刃。沒人追得上他的腳步，亦無人見過他的真實面目。'},
    {name:'瑟斐斯',pic:'',title:'【不死領主】瑟斐斯的印記',summary:'長矛如雷電劃破天際，在敵人身上留下一道道血痕。他用堆積如山的屍骨，鑄就了自己的赫赫威名。'},
    {name:'贊尼爾',pic:'',title:'【聖裁使者】贊尼爾的印記',summary:'虔誠的光明信徒，一手握著懲戒異端的戰錘，一手捧著傳播福音的聖殿之書。他是光明女神最信賴的守護者！'}
]

var _serverConfig = {
    '1011':'聖騎之王',
    '1012':'純潔之翼'
}

var getPropsPeriod = 0;
var getHeroPeriod =0;

var logined = false;

var actStartDate = new Date('2017/10/07 00:00:00');

$("document").ready(function () {

    //added by adams，fb分享成功提示
    /*if(getUrlParam('fbShareSucc') == 1){
        openDialog('#modal-share-success');
    }*/

    // $(".md-overlay").click(function(){closeDialog()})
    if(judgePageEnv() ===1 ){
        delAllcookie();
    }
    checkLogin(function () {

        logined = true;

         //alert(2);
        checkRole(function (userInfo) {//success
             //alert(3);
            initRoleShowInfo(userInfo);
            initUserInfo();
            showGetGift();


        },function () {//fail
            showLoading();
            getInterfaceData({url:_roleInfoUrl,success:function (res) {
                closeLoading();

                if(res.iRet === 0){
                    openDialogRoleSelect(res.jData);
                }
                else if(res.iRet === -11005){
                    openDialogRoleSelect({});

                }
                else if(res.iRet === -11004|| res.iRet === -11000){
                    delAllcookie();
                    location.href = _authLoginUrl;

                }
                else{
                    alert(decodeURIComponent(res.sMsg));
                }},
                async:false
            })

        })
    },function (res) {

        openDialog('#modal-unlogin');

        //delAllcookie();
        //location.href = _authLoginUrl;
    })

});

//点击跳转登录
function logIn(){
    if(getSeverDateTime() > actStartDate){
        delAllcookie();
        location.href = _authLoginUrl;
    } else {
        alert('對不起，請確認活動時間再來參與哦');
    }
}

/**
 * 初始化英雄个人信息
 * @param userInfo
 */
function initRoleShowInfo(userInfo) {
    var _loginInfohtml = '';
    if(judgePageEnv() === 1){
        _loginInfohtml = '<div class="bar_R_t1">點擊印記可將多餘印記贈送好友</div>\n' +
            '                   <div class="bar_R_t2">'+userInfo.rolename+' 玩家您好</div>\n';
    }
    else{
        _loginInfohtml = '<div class="bar_R_t1">點擊印記可將多餘印記贈送好友</div>\n' +
            '                   <div class="bar_R_t2">'+userInfo.rolename+' 玩家您好</div>\n' +
            '                   <div class="bar_R_t2"><a href="javascript:logOut()">[ 登出 ]</a></div>';
    }
    $('#bar-info').html(_loginInfohtml);

}

/**
 * 初始化任务信息
 * @param data
 */
function initTaskInfo(data) {
    if(data.hd ==2){
        $('#modal-task .task-1').html('已獲得');
    }
    if(data.hs ==1){
        $('#modal-task  .task-2').html('已獲得');
    }
    else{
        //added by adams,1 in-game,4 pc
        var tmpMsg = ((judgePageEnv() === 1) || (judgePageEnv() === 4)) ? '未完成' : '<a href="javascript:closeDialog()" style="color: #ffde00;cursor:pointer;text-decoration: none">去分享</a>';

        $('#modal-task  .task-2').html(tmpMsg);
    }

    //task 3 finished task 4 not finished
    if(data.ht == 2){
        $('#modal-task .task-3').html('已獲得');

        //added by adams,1 in-game,4 pc
        var tmpMsg = ((judgePageEnv() === 1) || (judgePageEnv() === 4)) ? '未完成' : '<a href="javascript:startGame()" style="color: #ffde00;cursor:pointer;text-decoration: none" >未完成</a>';
        $('#modal-task .task-4').html(tmpMsg);
    }
    //task 3 not finished task 4 finished
    else if(data.ht == 1){

        //added by adams,1 in-game,4 pc
        var tmpMsg = ((judgePageEnv() === 1) || (judgePageEnv() === 4)) ? '未完成' : '<a href="javascript:startGame()" style="color: #ffde00;cursor:pointer;text-decoration: none">未完成</a>';
        $('#modal-task .task-3').html(tmpMsg);
        $('#modal-task .task-4').html('已獲得');
    }
    //task 3 task 4 all finished
    else if(data.ht == 3){
        $('#modal-task .task-3').html('已獲得');
        $('#modal-task .task-4').html('已獲得');
    }
    else{
        //added by adams,1 in-game,4 pc
        var tmpMsg = ((judgePageEnv() === 1) || (judgePageEnv() === 4)) ? '未完成' : '<a href="javascript:startGame()" style="color: #ffde00;cursor:pointer;text-decoration: none">未完成</a>';

        $('#modal-task .task-3').html(tmpMsg);
        $('#modal-task .task-4').html(tmpMsg);
    }
}


/**
 * 检查页面环境
 * @returns {number} 1 in-game 2 android 3 ios 4 pc
 */
function judgePageEnv() {
    if(getUrlParam('sTicket') != ""){
        return 1;
    }
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
        return 2;
    }

    if(u.indexOf('iPhone') > -1){
        return 3;
    }
    return 4;

}

/**
 * 初始化应用信息
 */
function initUserInfo() {
    // checkRole();
    getInterfaceData({url:_initUrl,success:function (res) {
        if(res.iRet <0){
            alert(decodeURIComponent(res.sMsg));
        }
        // var _html = '';
        if(res.iRet === 0){
            getPropsPeriod = parseInt(res.jData.getPropsPeriod);
            getHeroPeriod = parseInt(res.jData.getHeroPeriod);

            //added by adams，初始化显示召唤/兑换按钮
            if(getHeroPeriod == 0 && getPropsPeriod == 1) {//只可以召唤印记
                $('.onlyGetProps').css('display', 'block');
            } else if(getHeroPeriod == 1 && getPropsPeriod == 1) {//召唤印记和兑换审判书重叠
                $('.onlyGetProps').css('display', 'none');
                $('.propsAndBook').css('display', 'block');
            } else if(getHeroPeriod == 1 && getPropsPeriod == 0) {//只可以兑换审判书
                $('.onlyGetProps').css('display', 'none');
                $('.propsAndBook').css('display', 'none');
                $('.onlyGetBook').css('display', 'block');
            }

            $('.num-left').html('本日剩餘召喚 '+(parseInt(res.jData.hsl) + parseInt(res.jData.hdl) + parseInt(res.jData.htl))+' 次');
            initHeroSignetList(res.jData.propsList);

            initGiftList(res.jData.propsFlow);
            initTaskInfo(res.jData);
        }
    }})

}

//added by adams，弹框选择兑换审判书或召唤印记
function openSelect() {
    openDialog('#modal-openSelect');
}

/**
 * 判断活动阶段
 * @returns {number}
 */
function judgeActState() {
    var serverTime = getSeverDateTime() || new Date();
    // alert(getHeroPeriod);
    // alert(getPropsPeriod);
    if(getUrlParam('debug') != "" ){
        return getUrlParam('debug');
    }
    if(getHeroPeriod == 0 && getPropsPeriod == 0){
        return 1;
    }
    else if(getPropsPeriod == 1){
        return 2;
    }
    else{
        return 1;
    }
    // if(serverTime.getDate() >=14 && serverTime.getMonth() == 9){
    //     return 2;
    // }else if(serverTime.getDate() <14 && serverTime.getMonth() == 9){
    //     return 1;
    // }
    // else{
    //     return 1;
    // }


}

/**
 * fb 分享
 * @constructor
 */
function FBshare(_quote,_shareUrl,_sharejpg){
    var _tempShareUrl = '';
    var _tempQuote = '收集8枚印記即可兌換永久英雄7選1，快來一起參與吧！';
    var _tempShareJpg = 'https://overseas-img.qq.com/NgameTW/a20170921/share.jpg';
    if(typeof(_shareUrl) != 'undefined'){
        _tempShareUrl = _shareUrl;
    }
    else{
        _tempShareUrl = _sharePage;
    }
    var fbUrl = '';
    if(typeof(_quote) != 'undefined') {
        _tempQuote = _quote;
    }

    if(typeof(_sharejpg) != 'undefined'){
        _tempShareJpg = _sharejpg;
    }

    //added by adams，fb分享跳转回页面需要带上所有参数
    var curHref = window.location.href;
    var tmpShareUrl =  curHref + ((curHref.indexOf('?') != -1) ? "&fbShareSucc=1" : '?fbShareSucc=1');

    fbUrl = "https://www.facebook.com/dialog/feed?" +

            "app_id=361640907293623&display=touch" +

            "&link=" + encodeURIComponent(_tempShareUrl) +

            "&picture=" + encodeURIComponent(_tempShareJpg) +

            "&description=" + encodeURIComponent(_tempQuote) +

            "&redirect_uri=" + encodeURIComponent(tmpShareUrl);
    // alert(fbUrl);
    location.href = fbUrl;

}

/**
 * 印記兑换
 */
function getHeroBook() {
    showLoading();
    getInterfaceData({url:_exchangeGiftBook,success:function (res) {
        closeLoading();
        if(res.iRet == 0){
            openDialog('#modal-get-hero-book-success');

            //added by adams，兑换成功后刷新页面印记数量
            initHeroSignetList(res.jData.propsList);
        }
        else{
            $('#modal-get-hero-book-fail .g_t2').html(decodeURIComponent(res.sMsg)+'<br><span style="color: #ff6c6c;">***每個Garena/Facebook帳號限制兌換一次***</span>');
            openDialog('#modal-get-hero-book-fail');
        }

    }})

}

/**
 * 初始化英雄印記列表
 * @param data
 */
function initHeroSignetList(data) {
    var _html = '';
    for(var i=0;i<data.length;i++){
        var _headpic = '';
        var _imgSrc = '//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(data[i]['iPropsType']+1)+'b.png';
        var _href = 'javascript:openDialog(\'#modal-hero-signet-zero\')';
        if(data[i]['iPropsType'] == 7){
            //if(judgeActState() == 1){
                _imgSrc = '//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(data[i]['iPropsType']+1)+'.png';
                //_href= 'javascript:showHeroInfo('+data[i]['iPropsType']+')';
                //_href= 'javascript:openDialog(\'#modal-call-not-begin\')';
            /*}
            else{
                _imgSrc = '//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(data[i]['iPropsType']+1)+'b.png';
                //_href= 'javascript:openDialog(\'#modal-main-hero\')';

            }*/
        }
        //else{
            if(data[i]['iPropsCount'] > 0){
                _headpic = 'headpic'
                _imgSrc = '//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(data[i]['iPropsType']+1)+'.png';
                _href= 'javascript:showHeroInfo('+data[i]['iPropsType']+')';
            }

        //}

        if(!data[i].hasOwnProperty('iPropsType') || data[i]['iPropsType'] >7)
            continue;
        _html +='<div id="icon_v1">\n' +
            '                   <a id="icon_pic" class="md-trigger '+_headpic+'" href="'+_href+'"><img src="'+_imgSrc+'" class="headpic"></a>\n' +
            '                   <div class="icon_t1">'+_heroConfig[data[i]['iPropsType']]['name']+'</div>\n' +
            '                   <div class="icon_t2">X'+data[i]['iPropsCount']+' 個</div>\n' +
            '               </div>';
    }
    $('#banner').html(_html);
}



/**
 *
 * @param pa
 * @returns {string}
 */
function getUrlParam(pa) {
    var url = window.location.href.replace(/#+.*$/, ''),
        params = url.substring(url.indexOf("?")+1,url.length).split("&"),
        param = {} ;
    for (var i=0; i<params.length; i++){
        var pos = params[i].indexOf('='),//查找name=value
            key = params[i].substring(0,pos),
            val = params[i].substring(pos+1);//提取value
        param[key] = val;
    }
    return (typeof(param[pa])==="undefined") ? "" : param[pa];
}


/**
 *
 * @param logined
 * @param notLogin
 * @returns {boolean}
 */
function checkLogin(logined,notLogin) {
    var sTicket = getUrlParam('sTicket')|| getCookie('sTicket')||"";
    if(sTicket !== ""){
        var tikectIdInfo = $("#sTicket");
        if(tikectIdInfo.length >0){
            setCookie('sTicket',sTicket,3);
            $("#sTicket").val(sTicket);
        }
        else{
            $("body").append('<input type="hidden" value="'+sTicket+'" id="sTicket">')
        }
        logined();
        return true;
    }
    var access_token =getUrlParam('access_token')|| getCookie('access_token') ;
    if(access_token !== ""){
        var access_tokenInfo = $("#access_token");
        if(access_tokenInfo.length >0){
            $("#access_token").val(access_token);
        }
        else{
            $("body").append('<input type="hidden" value="'+access_token+'" id="access_token">')
        }
        logined();
        return true;
    }

    notLogin();

}

/**
 * 检查角色信息
 * @param success
 * @param fail
 * @returns {*}
 */
function checkRole(success,fail) {
    var area = getUrlParam('area') || getCookie('area')  || 1; //正式服默认1
    var partition = getUrlParam('partition')||getCookie('partition') || $('#partition').val() || null;

    //modified by adams
    var rolename = getUrlParam('rolename') ||getCookie('rolename') ||  $('#rolename').val() || getCookie('charac_name') || null;

    var platid = getUrlParam('platid') || getCookie('platid') ||  1;
    //in-game hide rolename
    if(judgePageEnv() == 1){
        rolename = decodeURIComponent(getUrlParam('roleid'));

    }
    // if(get)
    // alert(getCookie('rolename'));
    if(area !== null && partition !== null && rolename !== null){
        // $('#'+areaId).val(areaId);
        initAreaInfo(area,partition,rolename,platid);
        // success(rolename);
        return success({area:area,partition:partition,platid:platid,rolename:rolename})
        // return $('#'+roleNameInfoId).html(rolename +' 玩家您好');
    }
    fail();
}


/**
 * 初始化 区服信息
 * @param area
 * @param partition
 * @param rolename
 * @param platid
 */
function initAreaInfo(area,partition,rolename,platid) {
    var areaIdObj = $("#areaid");
    if(areaIdObj.length >0){
        areaIdObj.val(area);
    }
    else{
        $('body').append('<input type="hidden" value="'+area+'" id="areaid">')

    }

    var partitionObj = $("#partition");
    if(partitionObj.length > 0){
        setCookie('partition',partition,3)
        partitionObj.val(partition);
    }
    else{
        $('body').append('<input type="hidden" value="'+partition+'" id="partition">')
    }

    var roleNameObj = $("#rolename");
    if(roleNameObj.length >0){
        roleNameObj.val(rolename);
    }
    else{

        $('body').append('<input type="hidden" value="'+rolename+'" id="rolename">')
    }

    var platidObj = $("#platid");
    if(platidObj.length > 0){
        platidObj.val(platid);
    }
    else{
        $('body').append('<input type="hidden" value="'+platid+'" id="platid">')
    }
    setCookie('area',area,3)
    setCookie('platid',platid,3)
    setCookie('rolename',rolename,3)
    setCookie('partition',partition,3)
}

/**
 *
 * @param data
 */
function openDialogRoleSelect(data){
    var hasRole =false;
    var _html = '';
    var firstPartition = '';
    for(var partition in data){
        if(data.hasOwnProperty(partition) && data[partition]['hasrole'] === 1){
          hasRole = true;
          if(firstPartition == ''){
              firstPartition = partition;
          }
          _html += '<option value="'+partition+'">'+_serverConfig[partition]+'</option>';
        };
    }
    $("#modal-server select[name=partition]").html(_html);


    if(hasRole === false){
        showNoRoleView();
    }
    else{

        $('#modal-server select[name=partition]').on('change',function () {
            $('#modal-server select[name=role]').html('<option>'+data[$(this).val()]['rolename']+'</option>');
        });

        $('#modal-server select[name=partition]').val(firstPartition);
        $('#modal-server select[name=role]').html('<option>'+data[firstPartition]['rolename']+'</option>')

        $("#btn-confirm-role-select").click(function () {
            var area =   getUrlParam('area') ||getCookie('area') || 1; //正式服默认1
            var platid =  getUrlParam('platid') || getCookie('platid') || 1;
            var partition = $("#modal-server select[name=partition]").val();
            var rolename = $("#modal-server select[name=role]").val();
            initAreaInfo(area,partition,rolename,platid);
            initRoleShowInfo({rolename:rolename,area:area,partition:partition,platid:platid})

            closeDialog();
            location.reload();

        })

        openDialog('#modal-server')

    }

}


/**
 * 展示没有角色弹框
 */
function showNoRoleView() {
    // var systemInfo = getPhoneSystem();
    openDialog('#modal-dialog-enter-game');

}

/**
 * 抽取印記
 */
function getGift() {
    //< new Date('2017/10/11 00:00:00')
    if(getSeverDateTime() > actStartDate){
        //页面未初始化时，只有召唤印记一个按钮，在这里判断登录即可
        if(logined){
            showLoading();
            getInterfaceData({url:_getGfitUrl,success:function (res) {
                closeLoading();
                if(res.iRet ==0){
                    // $('#num-left').html('本日剩餘召喚 '+res.jData.hsl+' 次');
                    $('.num-left').html('本日剩餘召喚 '+(parseInt(res.jData.hsl) + parseInt(res.jData.hdl) + parseInt(res.jData.htl))+' 次');
                    initHeroSignetList(res.jData.propsList);

                    initGiftList(res.jData.propsFlow);

                    if(res.jData.lotRet == 8){
                        openDialog('#modal-get-gift-fail');

                    }
                    else{
                        $("#modal-success .g_title").html('恭喜您獲得'+_heroConfig[res.jData.lotRet]['title']);
                        $("#modal-success .g_pic img").attr('src','//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(parseInt(res.jData.lotRet) + 1)+'c.png');
                        $("#modal-success .g_summary").html(_heroConfig[res.jData.lotRet]['summary']);
                        $("#modal-success .send-gift").attr('onclick','confirmShare('+res.jData.lotRet+')');
                        openDialog('#modal-success');
                    }

                }
                else{
                    //@todo confirm code
                    if(res.iRet === -10103){
                        $('#modal-num-not-enough .invite').attr('onclick','FBshare(\'收集8枚印記即可兌換永久英雄7選1，快來一起參與吧！\')')
                        return openDialog('#modal-num-not-enough');
                    }
                    alert(decodeURIComponent(res.sMsg))
                }
            }})
        } else {
            logIn();
        }
    } else {
        alert('對不起，請確認活動時間再來參與哦');
    }
}

/**
 * 获取服务器时间
 * @returns {Date}
 */
function getSeverDateTime() {
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
    xhr.open("HEAD", window.location.href, false);
    xhr.send();
    var d = new Date(xhr.getResponseHeader("Date"));
    var nowyear = d.getFullYear();
    var locationDate = (new Date).getFullYear();
    if (nowyear < locationDate) {
        d = new Date
    }
    return d
}


/**
 * 展示浮层
 */
function showLoading() {
    $("#amsmobi_loading_cover").css('display','block')
    $("#amsmobi_loading").css("display","block")

}

/**
 * 关闭浮层
 */
function closeLoading() {
    $("#amsmobi_loading_cover").css('display','none')
    $("#amsmobi_loading").css("display","none")
}

/**
 * 展示 印記获取记录
 */
function showGiftList(){
    openDialog("#modal-record");
}

/**
 * 初始化印記记录数据
 * @param data
 */
function initGiftList(data) {
    var _html = ' <tr>\n' +
        '<td style="background: #105b73;font-weight: 700;color:#ffde00;font-size: 1.15em;">時間</td>\n' +
        '<td style="background: #105b73;font-weight: 700;color:#ffde00;font-size: 1.15em;">物品</td>\n' +
        '<td style="background: #105b73;font-weight: 700;color:#ffde00;font-size: 1.15em;">類別</td>\n' +
        '</tr>';

    $("#modal-record table").empty().append(_html);

    var tmpHtml = '';

    for(var i=0;i<data.length;i++){
        var tempDesc = '';
        var tempName = '';
        if(data[i]['iPropsCount'] == 1){
            if(data[i]['iPropsType'] == 8){
                tempName ='召喚失敗';
                tempDesc = '未獲得任何印記';

            }
            else if(data[i]['iPropsType'] == 10){
                tempName = '';
                for(var j=0;j<_heroConfig.length;j++){
                    tempName += _heroConfig[j]['name'] +'印記-1，';
                }
                tempName = tempName.substr(0,tempName.length -1);
                tempDesc ='兌換“贊尼爾之書”\n' +
                    '請在遊戲內“系統郵件”領取\n';
            }
            else{
                if(data[i]['sShareCode'] == ""){
                    tempDesc ='召喚獲得';
                }
                else{
                    tempDesc ='贈送獲得';
                }
                tempName = _heroConfig[data[i]['iPropsType']]['name'] +'印記+1';

            }
        }
        if(data[i]['iPropsCount'] == -1){
            var tempUrl = _sharePage+'?sShareCode='+data[i].sShareCode+'&shareUser='+encodeURIComponent(getRoleName())+'&shareHero='+data[i]['iPropsType'];
            tempDesc ='贈送扣除，分享鏈接如下：<br/>'+tempUrl+' <a class="btn-copy" style="color: #ffde00;cursor:pointer" data-clipboard-text="'+tempUrl+'">複製網址</a>';
            tempName = _heroConfig[data[i]['iPropsType']]['name'] +'印記-1';
        }
        tmpHtml += '<tr>\n' +
            '<td>'+data[i]['dtCreateDate']+'</td>\n' +
            '<td>'+tempName+'</td>\n' +
            '<td>'+tempDesc+'</td>\n' +
            '</tr>';

        //每十条数据插入一次表格，避免一次性拼接字符串过长
        if(i%5 == 0){
            //console.log('insert ' + i);
            $("#modal-record table").append(tmpHtml);
            tmpHtml = '';
        }

    }
    $("#modal-record table").append(tmpHtml);
    initCopy();

}

/**
 * 获取手机系统
 * @returns {string}
 */
function getPhoneSystem() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = '';
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = Agents[v];
            break;
        }
    }
    return flag;
}

/**
 * 获取 下载地址
 * @returns {*}
 */
function getDownloadLocation() {
    var os = getPhoneSystem();
    if (os == "iPhone") {
        return "https://app.appsflyer.com/id1089079153?pid=OrganicA&c=XNL_iOS";
    } else if (os == "Android") {
        return "https://app.appsflyer.com/com.garena.game.kgtw-Standalone?pid=OrganicA&c=XNL_APK&af_r=http://dl.mobile.garenanow.com/kgtw/third/GarenaMobileMoba.apk";
    }else{
        return "http://moba.garena.tw/";
    }

}


/**
 *  获取好友赠送的印記
 */
function showGetGift() {
    var sShareCode = getUrlParam('sShareCode');
    var shareHero = getUrlParam('shareHero');
    if(sShareCode != "" &&shareHero !="" &&typeof(_heroConfig[shareHero]) !='undefined'){

        var tmpCookieName = sShareCode + '_' + getCookie('access_token');

        if(getCookie(tmpCookieName) != 1){//分享码处理完本地写cookie，不需要重复提醒
            getInterfaceData({url:_exchangeCodeUrl,success:function (res) {
                if(res.iRet == 0){
                    initHeroSignetList(res.jData.propsList);

                    initGiftList(res.jData.propsFlow);
                    initTaskInfo(res.jData);
                    showHeroInfo(parseInt(shareHero),1);

                    setCookie(tmpCookieName, 1, 3);//分享码处理完本地写cookie，不需要重复提醒
                }
                else if(res.iRet == -10122){//印記已被领取
                    //added by adams
                    var msg = '好友贈送的' + _heroConfig[shareHero]['title'] + '已經被領取！下次手要快一點囉~';
                    showExchangeFail(msg);

                    setCookie(tmpCookieName, 1, 3);//分享码处理完本地写cookie，不需要重复提醒
                } else {
                    showExchangeFail(decodeURIComponent(res.sMsg));
                }
            }},{sShareCode:sShareCode});
        }
    }
}

/**
 * 展示兑换失败弹框
 * @param msg
 */
function showExchangeFail(msg) {
    $('#modal-exchange-fail .g_t2').html(msg);
    openDialog('#modal-exchange-fail');
}

/**
 * 显示详细英雄信息
 * @param n
 * @param type
 */
function showHeroInfo(n,type) {
    n = parseInt(n);
    var _title = '';
    if(typeof(type) !='undefined' && type==1){
        _title = '獲得了'+_heroConfig[n]['title'];
    }
    else{
        _title = _heroConfig[n]['title'];
    }

    var _sumary = _heroConfig[n]['summary'];
    $('#modal-hero-info .g_title').html(_title);
    $('#modal-hero-info .g_summary').html(_sumary);
    // alert(n);
    // $('#modal-hero-info .g_summary').html('111');
    $('#modal-hero-info .g_pic img').attr('src','//overseas-img.qq.com/NgameTW/a20170921/icon_p'+(n+1)+'c.png');

    $('#modal-hero-info .g_btn_b').attr('onclick','confirmShare('+n+')');
    openDialog('#modal-hero-info');

}

/**
 * 选择分享类型
 * @param n
 */
// function selectShareType(n) {
//     $('#modal-select-send-type .fb-send-event').attr('onclick','confirmShare('+n+',1)');
//     $('#modal-select-send-type .cp-send').attr('onclick','confirmShare('+n+',2)');
//     openDialog('#modal-select-send-type');
// }

function initCopyDialog(text) {
    $("#modal-share .content").html(text);
    $("#modal-share .title").html('將網址發送給好友，好友點擊以下網址，即可領取印記(只有首位點擊網址的好友可領取印記)');
    $("#modal-share .btn-copy").attr('data-clipboard-text',text);
    // alert(text);
    // alert(111);
    // alert($("#modal-share .btn-copy").attr('data-clipboard-text'));
    initCopy();
    return openDialog("#modal-share");
}

/**
 *
 * @param n
 * @param shareType 1 facebook 2 cp
 */
function confirmShare(n) {
    $("#modal-confirm-share .g_t2").html('點擊【繼續贈送】，將扣除'+_heroConfig[n]['name']+'印記*1，若關閉贈送頁面，已扣除的印記不會被返還哦~<br>需要開啟瀏覽器彈出式視窗才可進行分享/贈送，如頁面意外關閉，可以在領取/贈送紀錄中重新分享');
    $("#modal-confirm-share .confirm-send").attr('onclick','costHeroSignet('+n+')');
    openDialog('#modal-confirm-share');
}

/**
 * 扣除英雄印記
 * @param n
 * @param shareType 1 facebook 2 copy
 */
function costHeroSignet(n) {
    // $('#modal-select-send-type').attr('oncli')
    showLoading();
    getInterfaceData({
        url:_shareUrl +'&iPropsType='+n,
        success:function (res) {
            closeLoading();
            // alert(1);
            if(res.iRet == 0){

                initHeroSignetList(res.jData.propsList);

                initGiftList(res.jData.propsFlow);
                var roleName = getRoleName();
                var _url = _sharePage+'?sShareCode='+res.jData.shareCode+'&shareUser='+encodeURIComponent(roleName)+'&shareHero='+n;
                console.log(_url);
                var _quote = '贈送你一枚' +_heroConfig[n]['title'] +'收集8枚印記即可兌換永久英雄7選1，快來一起參與吧！';
                $("#modal-select-send-type .fb-send-event").attr("onclick","FBshare('"+_quote+"','"+_url+"','"+'https://overseas-img.qq.com/NgameTW/a20170921/icon_p'+(n+1)+'.png'+"')");
                // alert(_url);
                $("#modal-select-send-type .cp-send").attr("onclick","initCopyDialog('"+_url+"')")
                return openDialog('#modal-select-send-type');

                // alert(4);
            }
            else{
                alert(decodeURIComponent(res.sMsg));
            }
        }
    }
    )
}

/**
 * 初始化复制操作
 */
function initCopy() {
    $(".btn-copy").unbind();
    for(var i =0;i<clipBoardArr.length;i++){
        clipBoardArr[i].destroy();
    }
    clipBoardArr = [];

    var clipboard = new Clipboard('.btn-copy');
    clipBoardArr.push(clipboard);

    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.clearSelection();
        alert('複製成功');
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
}


/**
 * 获取角色名称
 * @returns {string|*|jQuery|string}
 */
function getRoleName() {
    //modified by adams，接口写cookie昵称：charac_name
    return getCookie('rolename') || getUrlParam('rolename')||getUrlParam('roleid') || $('#rolename').val() || getCookie('charac_name') || "";

}


/**
 * 开始游戏
 */
function startGame() {
    var pageEnv = judgePageEnv();
    if(pageEnv == 1){
        return showCommonDialog('即將進入遊戲內，完成指定任務獲得召喚次數');
    }
    switch (getPhoneSystem()) {
        case 'iPhone':
        case 'iPad':
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.location = getDownloadLocation();//ios
                } else {
                    window.close();
                }
            }, 500);

            window.location = 'ngame1130://action';
            break;
        case 'Android':
            try {
                window.location = 'ngame1130://action';

                setTimeout(function () {
                    window.location = getDownloadLocation(); //android
                }, 500);
            } catch (e) {
            }
            break;
        default:
            window.location = getDownloadLocation();
            break;
    }
}

/**
 *从接口中查询数据
 */
function getInterfaceData(ajaxOption,data) {
    var optData = {};
    optData.areaid = $("#areaid").val() || 0;
    optData.partition = $("#partition").val() || 0;
    optData.platid = $("#platid").val() || 0;
    optData.access_token = $("#access_token").val() || 0;
    optData.sTicket = $("#sTicket").val() || getUrlParam('sTicket') || 0;

    //added by adams
    optData.roleid = getUrlParam('roleid') || '';

    if(typeof(data) === 'object' && typeof(data.length) !== 'number'){
        optData = $.extend(optData,data);
    }
    var _opt  =$.extend({
        'url':'',
        'data':optData,
        xhrFields: {
            withCredentials: true
        },
        'success':function(){},
        'dataType':'jsonp'
    },ajaxOption);
    $.ajax(_opt);
}

function getRediretParam() {
    var tempParam = [];
    if(getUrlParam('sShareCode') !='')
        tempParam.push('sShareCode='+getUrlParam('sShareCode'));

    if(getUrlParam('shareUser') !='')
        tempParam.push('shareUser='+getUrlParam('shareUser'));

    if(getUrlParam('shareHero') != '')
        tempParam.push('shareHero='+getUrlParam('shareHero'));

    return tempParam.join('&');

}


/**
 * 登出
 */
function logOut() {
    var access_token = getCookie('access_token ') || getUrlParam('access_token ')||$("#access_token ").val()||"";

    var tmpRediretUrl = 'https://external.mrms.garena.tw/commonAct/a20170814challenge/redirect.php';

    var _url = _hrefLogout+'?format=redirect&access_token='+access_token+'&redirect_uri='+encodeURIComponent(tmpRediretUrl);
    delAllcookie();
    location.href = _url;
}

/**
 *
 */
function delAllcookie() {
    delCookie('area');
    delCookie('partition');
    delCookie('platid');
    delCookie('access_token');
    delCookie('rolename');
    delCookie('sTicket');
}

/*
    打开弹框
 */
function openDialog(id) {
    $('.md-modal').removeClass('md-show');
    $(id).addClass('md-show');
}

/**
 * 关闭弹框
 */
function closeDialog(){
    $('.md-modal').removeClass('md-show');
}

/**
 * 打开通用弹框
 * @param msg
 */
function showCommonDialog(msg) {
    $('#modal-common .g_t2').html(msg);
    openDialog('#modal-common');

}

/**
 *
 * @param Name
 * @returns {string}
 */
function getCookie(Name){
    var search = Name + "="; //查询检索的值
    var _valToReturn = "";//返回值
    if (document.cookie.length > 0) {
        _indexInfo = document.cookie.indexOf(search);
        // sd = 0;
        if (_indexInfo !== -1){
            sd = search.length + _indexInfo;
            end = document.cookie.indexOf(";", sd);
            if (end === -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            _valToReturn=unescape(document.cookie.substring(sd, end))
        }
    }
    return _valToReturn;
}

/**
 *
 * @param name
 * @param value
 * @param expireHours
 */
function setCookie(name,value,expireHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间

    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + ";expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

/**
 *
 * @param name
 */
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}













