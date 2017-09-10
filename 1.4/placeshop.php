<?php
ini_set('date.timezone','Asia/Shanghai');
header("Content-Type:text/html;charset=utf-8");
error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
    }
}

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

$body=$_GET['body'];
$attach="全民乐帮服务".$_GET['openid'];
$fee=$_GET['fee']*100;
$ordernum=$_GET['ordernum'];
//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody($body);
$input->SetAttach($attach.$openid);
$input->SetOut_trade_no($ordernum);
$input->SetTotal_fee($fee);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("全民乐帮服务");
$input->SetNotify_url("http://www.quanminlebang.com/wxpay/notify_url.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);


$order = WxPayApi::unifiedOrder($input);

printf_info($order);
$jsApiParameters = $tools->GetJsApiParameters($order);

//获取共享收货地址js函数参数
$editAddress = $tools->GetEditAddressParameters();

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>

<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>服务到店</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link href="asset/css/mui.min.css" rel="stylesheet"/>
    <!--App自定义的css-->
    <link rel="stylesheet" href="asset/css/app.css"/>
    <!--时间选择器插件-->
    <link rel="stylesheet" type="text/css" href="asset/css/mui.picker.min.css" />
	<script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $jsApiParameters; ?>,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				alert(res.err_code+res.err_desc+res.err_msg);
			}
		);
	}
	window.onload = function()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>
</head>
<script type="text/javascript" src="asset/js/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="asset/js/rem.js"></script>
<script src="asset/js/mui.min.js"></script>
<script src="asset/js/common.js"></script>
<!--时间选择器插件-->
<script src="asset/js/mui.picker.min.js"></script>
<script>
    //    时间选择器
    (function($) {
        $.init();
        var result = $('#demo1')[0];
        var btns = $('.btn');
        btns.each(function(i, btn) {
            btn.addEventListener('tap', function() {
                var optionsJson = this.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = this.getAttribute('id');
                /*
                 * 首次显示时实例化组件
                 * 示例为了简洁，将 options 放在了按钮的 dom 上
                 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                 */
                var picker = new $.DtPicker(options);
                picker.show(function(rs) {
                    /*
                     * rs.value 拼合后的 value
                     * rs.text 拼合后的 text
                     * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                     * rs.m 月，用法同年
                     * rs.d 日，用法同年
                     * rs.h 时，用法同年
                     * rs.i 分（minutes 的第二个字母），用法同年
                     */
                    result.innerHTML = rs.text;
                    /*
                     * 返回 false 可以阻止选择框的关闭
                     * return false;
                     */
                    /*
                     * 释放组件资源，释放后将将不能再操作组件
                     * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                     * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                     * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                     */
                    picker.dispose();
                });
            }, false);
        });
    })(mui);
</script>
<!--微信支付-->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"> </script>
<script src="http://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min.js"></script>
<!--<script src="http://demo.open.weixin.qq.com/jssdk/js/api-6.1.js?ts=1420774989"> </script>-->
<!--pingpp++-->
<!--<script src="asset/dist/pingpp.js"></script>-->
<script type="text/javascript" src="https://one.pingxx.com/lib/pingpp_one.js"></script>
<!--<script>-->
    <!--var pingpp = require('pingpp-js');-->
    <!--pingpp.createPayment(charge, function(result, err){-->
        <!--console.log(result);-->
        <!--console.log(err.msg);-->
        <!--console.log(err.extra);-->
        <!--if (result == "success") {-->
            <!--// 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。-->
        <!--} else if (result == "fail") {-->
            <!--// charge 不正确或者微信公众账号支付失败时会在此处返回-->
        <!--} else if (result == "cancel") {-->
            <!--// 微信公众账号支付取消支付-->
        <!--}-->
    <!--});-->
<!--</script>-->
<!-- 获取ip地址-->
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>
    var openid = sessionStorage.getItem('openid');  //用户的openid
    //var fuwuid = sessionStorage.getItem('fuwuid');  //服务id
    var ip =(returnCitySN["cip"]);
    function UrlSearch(){
        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                this[name]=value;
            }
        }
    }
    var Request=new UrlSearch(); //实例化
    var code = Request.code;      //code
    var order = Request.order;  //是否下单
    var ordernum = Request.Request;
    var fuwuid = Request.fuwuid;
    $.ajax({
        type:"get",
        url: fixurl + "bianminfuwu.php",
        async:true,
        dataType:"json",
        data:{
            bs:"fuwuxiangqing",
            id:fuwuid
        },
        success:function(json){
            var obj =json;
            if(json.code==200){
                var ovj = json.obj;
                var shanghu = ovj.fuwu;
                for (var i=0;i<shanghu.length;i++){
                    var shanghufuwuopenid =shanghu[i].openid;
                    $(".store_phone").text(shanghu[i].dianhua);    //商户电话
                    $(".store_fuwu_name").text(shanghu[i].name);    //服务名称
                    $(".local").text(shanghu[i].dizhi); //商户地址
                    $(".store_fuwu_money").text("￥"+shanghu[i].jine);   //金额
                    //    服务订单下单
                    $(".pay_button").click(function(){
                        var stringTime = $("#demo1").text();
                        var timestamp2 = Date.parse(new Date(stringTime));
                        timestamp2 = timestamp2 / 1000;
                        var local =$(".local").text();
                        var phone=$(".phone").val();
                        var name = $(".name").val();
                        if(openid ==null){
                            sessionStorage.setItem('judge_login',"1");        //判断登录 1登录后进入下单页面 placeshop.html  2登录后进入 placeorder.html
                            window.location.href="login.html";
                        }
                            type:"get",
                            url: fixurl + "order.php",
                            async:true,
                            dataType:"jsonp",
                            data:{
                                bs:"fuwudingdanadd",
                                openid:openid, //下单用户openid
                                fuwuopenid:shanghufuwuopenid,  //服务人员openid
                                name:name, //订单联系人
                                tel:phone, //联系电话
                                dizhi:local, //地址
                                fuwuid:fuwuid, //服务id
                                fuwushijian:timestamp2, //服务时间 时间戳
                                shuliang:1, //数量 默认1
                                fuwumoshi:2  // 服务模式 1到家2到店
                            },
                            success:function(json){
                                if(json.code==200){
                                    var obj = json.obj;
                                    var ordernum = obj.ordernum;
                                    var money =obj.danjia;
                                    //$.get("www.quanminlebang.com/m/placeshop.php?openId="+openid+"&fee="+money+"&ordernum="+ordernum+"&body=ceshi");
                                }
                            }
                        });
                    })
                }
            }else{
                alert(json.code)
            }
        },
        error:function(){
            alert("error")
        }
    });



</script>
</html>


