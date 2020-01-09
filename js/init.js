/**
 * note:佛山日报年会
 * author：zx
 * date：2020-1-9
 * modify：/
 */

$(document).ready(function(){

})

var link = 'http://server.foshanplus.com/'
var openid = getParam('openid');
/*var openid = "1234567890123456789012345675";*/





    // $.ajax({
    //     type:"get",
    //     url: link + 'exam/add_vote_three/?exam_id=7&openid=' + openid + '&vote_list=' + vote_list + '&type=100',
    //     dataType:"json",
    //     success:function(data){
    //         console.log(data);
    //         alert(data.msg);
    //         window.location.reload();
    //     },
    //     error: function(){
    //         console.log('vote*****xxx');
    //         alert("当前投票人数过多，请稍后重试");
    //     }
    // })




function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}