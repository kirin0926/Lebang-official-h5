/**
 * Created by Administrator on 2016/11/4.
 */
var leftseconds = 120;
var getcodetimer;
function getmobilecode(v)
{
    if(v == "��ȡ��֤��")
    {
        var act = $("#password").val();
        $("#sendbtn").val("���ڷ���...");
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
                        $("#sendbtn").val("120������»�ȡ");
                        $("#sendmsg").html("��֤���ѷ��ͣ�������ֻ�����").show();
                        leftseconds = 120;
                        getcodetimer = setInterval("showlefttime()", 1000);
                        break;
                    case "-1":
                        $("#sendbtn").val("��ȡ��֤��");
                        $("#sendbtn").attr("disabled",false);
                        $("#sendmsg").html("ϵͳ������֤�뷢��ʧ�ܣ�����");
                        $("#sendmsg").show().delay(3000).fadeOut("slow");
                        break;
                    case "-2":
                        window.location.href = "/message.php";
                        break;
                    case "-3":
                        $("#sendbtn").val("��ȡ��֤��").attr("disabled",false);
                        $("#sendmsg").html("������֤�뷢�͹���Ƶ��������Ϣһ���ٷ���");
                        $("#sendmsg").show().delay(3000).fadeOut("slow");
                        break;
                    case "-4":
                        $("#sendbtn").val("��ȡ��֤��");
                        $("#sendmsg").html("�ֻ���֤�뷢�ʹ������࣬��1Сʱ���ٽ��д˲���");
                        $("#sendmsg").show();
                        break;
                    case "-5":
                    case "-6":
                        window.location.href = "/safemanager.php";
                        break;
                    default:
                        $("#sendbtn").val("��ȡ��֤��").attr("disabled",false);
                        $("#sendmsg").html("��������æ�����Ժ�����").show();
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
        $("#sendbtn").val("��ȡ��֤��");
        $("#sendmsg").html("");
        $("#sendbtn").attr("disabled",false);
    }
    else
    {
        $("#sendbtn").val(leftseconds + "������»�ȡ");
        leftseconds--;
    }
}
// ��֤�ֻ���֤��
function verifysmscode() {
    var forward = $("#forward").val();
    var smscode = $("#smscode").val();
    if(smscode.length == 0)
    {
        $('#smscodemsg').html('��������֤��!');
        return;
    }
    else if(/^\d{6}$/.test(smscode) == false)
    {
        $('#smscodemsg').html('��֤��ӦΪ6λ����!');
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
                $('#smscodemsg').html("��֤���Ѿ�ʧЧ�������·���!");
                $("#smscode").val('');
                break;
            case "-1":
                $('#smscodemsg').html("���������֤�벻��ȷ!");
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