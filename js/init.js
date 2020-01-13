/**
 * note:佛山日报年会
 * author：zx
 * date：2020-1-9
 * modify：/
 */

$(document).ready(function(){  
    checkisHavePhone();
})

var link = 'http://server.foshanplus.com/'
var openid = getParam('openid');
// openid = 'odVsFj1vvasAMVEYem_0piudYl9Y';
var userid = getParam('id');
// userid = '628';
var usericon = getParam('icon');
// usericon = "http://thirdwx.qlogo.cn/mmopen/vi_32/HK2sJo7x8FHIPxlLuoFicHKqKa5268K88aF7um7fdtjbJ6LQ1YfDubLuc1468xaTfSP4Yzyq6icWjlJF1sas2QiaQ/132";
var username = '';
var todaydate = '2020-01-13';
var choice = '';

const btn = document.querySelector('#random');
const el1 = document.querySelector('#group');
const machine1 = new SlotMachine(el1, {
    active: 0,
    delay: 450,
});

function onComplete(active){
    this.element.id = 'Index: ${this.active}';
    choice = $('#greet' + this.active).html();
    // alert(choice);
    // console.log(this.active)
}

btn.addEventListener('click', () => {
    machine1.shuffle(0, onComplete);
});


function checkisHavePhone(){
    $.ajax({
        type:"get",
        url: link + 'wxusers/?openid=' + openid,
        dataType:"json",
        success:function(data){
            if((data.results.length == 0) || (data.results[0].phone == "")){
                $("#userinfo").css("display","block");//显示用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","none");//隐藏留言
            }else{
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","block");//显示签到
                $("#sendgreetingall").css("display","none");//隐藏留言
                username = data.results[0].name;
                $("#username").html(username + ',');
                $("#usernamewelcome").html(username + ',');
            }
            // console.log(data);
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
        success:function(data){
            // console.log(data);
            if(data.results.length == 0){
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","block");//显示签到
                $("#sendgreetingall").css("display","none");//隐藏留言 
            }else{
                $("#userinfo").css("display","none");//隐藏用户信息
                $("#checkin").css("display","none");//隐藏签到
                $("#sendgreetingall").css("display","block");//显示留言 
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
            console.log(data);
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
                async:true,
                success:function(data){
                    alert("手机号登记成功");
                    $("#userinfo").css("display","none");//隐藏用户信息
                    $("#checkin").css("display","block");//显示签到
                    $("#sendgreetingall").css("display","none");//隐藏留言
                    $("#usernamewelcome").html(username + ',');
                    ischecked();
                    // console.log(data)
                },
                error: function(){
                    console.log('confirmuserphone*****xxx');
                    alert("系统繁忙，请重试");
                }
            })
        }else{
            alert(2)
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