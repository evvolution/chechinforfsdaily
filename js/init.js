/**
 * note:佛山日报年会
 * author：zx
 * date：2020-1-9
 * modify：/
 */

$(document).ready(function(){ 
    checkisHavePhone();
    machine1.shuffle(0, onComplete);
})

window.onload = function() {
    ischecked();
}

var link = 'http://server.foshanplus.com/'
var openid = getParam('openid');
// openid = 'odV5F22ssVF2vl12YTId739_1mw';
var userid = '';
var usericon = getParam('headimg');
// usericon = "http://thirdwx.qlogo.cn/mmopen/vi_32/HK2sJo7x8FHIPxlLuoFicHKqKa5268K88aF7um7fdtjbJ6LQ1YfDubLuc1468xaTfSP4Yzyq6icWjlJF1sas2QiaQ/132";
var username = getQueryString('name');
// username = '测试名字';
// alert(username)
var usernewphone = 'fake';
var todaydate = '2020-01-14';
var choice = '';

const btn = document.querySelector('#random');
const el1 = document.querySelector('#group');
const machine1 = new SlotMachine(el1, {
    active: 0,
    delay: 450,
});

function onComplete(active){
    this.element.id = 'Index: ${this.active}';
    choice = $('#greet' + (Number(this.active)-1)).html();
    // alert(choice);
    // console.log(this.active)
}

btn.addEventListener('click', () => {
    machine1.shuffle(0, onComplete);
});

function sendBiu(){
    $.ajax({
        type:"post",
        url: link + 'message/add_msg/',
        data:{"exam_id":12,"openid":openid,"content":choice,"pics":usericon},
        dataType:"json",
        success:function(data){
            console.log(data);
            alert("Biu~请留意大屏幕");
        },
        error: function(){
            console.log('sendBiu*****xxx');
            alert("系统繁忙，请重试");
        }
    })
}

function checkisHavePhone(){
    $.ajax({
        type:"get",
        url: link + 'wxusers/?openid=' + openid,
        dataType:"json",
        async:false,
        success:function(datax){
            console.log(datax);
            if(datax.results.length == 0){
                $("#userinfo").css("display","block");//显示用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","none");//隐藏留言
                $.ajax({
                    type:"post",
                    url: link + 'wxusers/',
                    data:{"head_pic":usericon,"openid":openid,"name":username,"phone":usernewphone},
                    dataType:"json",
                    success:function(data){
                        // console.log(data);
                        // console.log(data.id);
                        userid = data.id;
                        // usernewphone = datax.results[0].phone;
                        // username = datax.results[0].name;
                    },
                    error: function(){
                        console.log('checkisHavePhoneIIIIN*****xxx');
                        alert("系统繁忙，请重试");
                    }
                })
            }else{
                usernewphone = datax.results[0].phone;
                username = datax.results[0].name;
                if(usernewphone == "fake"){
                    $("#userinfo").css("display","block");//显示用户信息
                    $("#checkin").css("display","none");//隐藏签到
                    $("#sendgreetingall").css("display","none");//隐藏留言
                }else{
                    // alert(1)
                    $("#userinfo").css("display","none");//隐藏用户信息
                    $("#checkin").css("display","block");//显示签到
                    $("#sendgreetingall").css("display","none");//隐藏留言
                    $("#username").html(username + ',');
                    $("#usernamewelcome").html(username + ',');
                }
            }
        },
        error: function(){
            console.log('checkisHavePhone*****xxx');
            alert("系统繁忙，请重试");
        }
    })
}

function ischecked(){
    $.ajax({
        type:"get",
        url: link + 'examlog/?exam=12&created_gte=' + todaydate + '&openid=' + openid,
        dataType:"json",
        // async:true,
        success:function(data){
            // console.log(data);
            // console.log(data.results.length);
            if((data.results.length == 0) && (usernewphone == "fake")){
                // console.log(1)
                $("#userinfo").css("display","block");//显示用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","none");//隐藏留言 
            }else if((data.results.length > 0) && (usernewphone != "fake")){
                // console.log(2)
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","block");//显示留言 
            }else if((data.results.length == 0) && (usernewphone != "fake")){
                // console.log(3)
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","block");//显示签到
                $("#sendgreetingall").css("display","none");//隐藏留言 
            }
        },
        error: function(){
            console.log('ischecked*****xxx');
            alert("系统繁忙，请重试");
        }
    })
}

function checkedin(){
    $.ajax({
        type:"post",
        url: link + 'examlog/add_exam_log/',
        data:{"exam":12,"openid":openid},
        dataType:"json",
        success:function(data){
            // console.log(data);
            if(data.is_error == false){//签到成功
                alert("签到成功");
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","block");//显示留言
                $("#usernamewelcome").html(username + ',');
            }else{//签到异常
                alert("当前签到人数过多，请重试");
                return;
            }
        },
        error: function(){
            console.log('ischecked*****xxx');
            alert("系统繁忙，请重试");
        }
    })
}

function confirmuserphone(){
    console.log(userid)
    var userphone = $("#userphone").val();
    if(userphone == ""){
        alert("请输入您的手机号");
        return;
    }else if(userphone.length < 11){
        alert("请输入正确的手机号");
        return;
    }else{
        var confirmphone = confirm("请确认您的手机号");
        if(confirmphone == true){
            $.ajax({
                type:"PUT",
                url: link + 'wxusers/'+ userid,
                data:{"id":userid,"openid":openid,"phone":userphone},
                async:false,
                success:function(data){
                    // console.log(userid)
                    console.log(data)
                    // alert("手机号登记成功");
                    usernewphone = userphone;
                    $("#userinfo").css("display","none");//隐藏用户信息
                    $("#checkin").css("display","block");//显示签到
                    $("#sendgreetingall").css("display","none");//隐藏留言
                    $("#usernamewelcome").html(username + ',');
                },
                error: function(){
                    console.log('confirmuserphone*****xxx');
                    alert("手机号登记失败");
                }
            })
        }else{
            return;
        }
    }
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

function getQueryString(name) {   
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");   
    var r = window.location.search.substr(1).match(reg);   
    if (r != null) return decodeURI(r[2]); return null;   
} 
