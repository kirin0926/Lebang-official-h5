/**
 * Created by Administrator on 2016/11/4.
 */
var leftseconds = 120;
var getcodetimer;
function getmobilecode(v)
{
    if(v == "获取验证码")
    {
        var act = $("#password").val();
        $("#sendbtn").val("正在发送...");
        $("#sendbtn").attr("disabled",true);
        var param={action:'sendSMS',act:act};
        $.ajax({
            url : '/safe/mobile.php',
            type : 'POST',
            data : param,
            success : function(code){
                switch(code)
                {
                    case "1":
                        $("#sendbtn").val("120秒后重新获取");
                        $("#sendmsg").html("验证码已发送，请进入手机查收").show();
                        leftseconds = 120;
                        getcodetimer = setInterval("showlefttime()", 1000);
                        break;
                    case "-1":
                        $("#sendbtn").val("获取验证码");
                        $("#sendbtn").attr("disabled",false);
                        $("#sendmsg").html("系统错误，验证码发送失败！！！");
                        $("#sendmsg").show().delay(3000).fadeOut("slow");
                        break;
                    case "-2":
                        window.location.href = "/message.php";
                        break;
                    case "-3":
                        $("#sendbtn").val("获取验证码").attr("disabled",false);
                        $("#sendmsg").html("您的验证码发送过于频繁，请休息一下再发送");
                        $("#sendmsg").show().delay(3000).fadeOut("slow");
                        break;
                    case "-4":
                        $("#sendbtn").val("获取验证码");
                        $("#sendmsg").html("手机验证码发送次数过多，请1小时后再进行此操作");
                        $("#sendmsg").show();
                        break;
                    case "-5":
                    case "-6":
                        window.location.href = "/safemanager.php";
                        break;
                    default:
                        $("#sendbtn").val("获取验证码").attr("disabled",false);
                        $("#sendmsg").html("服务器繁忙，请稍候再试").show();
                        break;
                }
            }
        });
    }
}
function showlefttime()
{
    if (leftseconds <= 0)
    {
        clearInterval(getcodetimer);
        $("#sendbtn").val("获取验证码");
        $("#sendmsg").html("");
        $("#sendbtn").attr("disabled",false);
    }
    else
    {
        $("#sendbtn").val(leftseconds + "秒后重新获取");
        leftseconds--;
    }
}
// 验证手机验证码
function verifysmscode() {
    var forward = $("#forward").val();
    var smscode = $("#smscode").val();
    if(smscode.length == 0)
    {
        $('#smscodemsg').html('请输入验证码!');
        return;
    }
    else if(/^\d{6}$/.test(smscode) == false)
    {
        $('#smscodemsg').html('验证码应为6位整数!');
        return;
    }
    var params = {action:'verifySMSCode',smscode:smscode};
    $.post("/safe/mobile.php", params, function(data){
        switch(data)
        {
            case "1":
                window.location.href = forward;
                break;
            case "2":
                window.location.href = '/safemanager_finish.php';
                break;
            case "3":
                window.location.href = '/safemanager_finish.php';
                break;
            case "0":
                $('#smscodemsg').html("验证码已经失效，请重新发送!");
                $("#smscode").val('');
                break;
            case "-1":
                $('#smscodemsg').html("您输入的验证码不正确!");
                $("#smscode").val('');
                break;
            case "-2":
            case "-3":
            case "-4":
            case "-5":
                window.location.href = '/message.php';
                break;
            case "-6":
                window.location.href = '/safemanager.php';
                break;
        }
    });
}