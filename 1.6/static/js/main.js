/**
 * Created by Administrator on 2017/1/13.
 */
$(".close_fix").click(function(){
    $(".fix_top").css("display","none");
    $(".title").css("display","none");
});
//��APP
function openApp(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href = "lebang://com.qinlin.lebang"; /***��app��Э�飬��iosͬ���ṩ***/
        window.setTimeout(function(){
            window.location.href = "https://itunes.apple.com/cn/app/quan-min-le-bang/id1131512680?mt=8"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        },2000);
    } else if (/android/.test(ua)) {
        window.location.href = "qmlb://openapp.com/"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        window.setTimeout(function(){
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.qinlin.lebang"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        },2000);
    }
}

/*
***
*         ��ȡUrl��ַ��
***
 */
function UrlSearch(){
    var name,value;
    var str = location.href; //ȡ��������ַ��
    var num = str.indexOf("?");
    str = str.substr(num+1); //ȡ�����в���   stringvar.substr(start [, length ]
    var arr = str.split("&"); //���������ŵ�������
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}
var Request = new UrlSearch(); //ʵ����
var app = Request.src;      //APP
var share = Request.share;  //Share
var paramValue = Request.id;    //id;
if(app == "app"){
    $("#header").css("display","none");
    $(".title").css("display","none");
}
if(share == "yes"){
    $(".fix_top").css("display","block");
    $(".title").css("display","block");
}



//�ж��Ƿ��¼
var shanghuarry = sessionStorage.getItem('shanghuarry');
function if_login(){
    var openid = sessionStorage.getItem('openid');

}
var online_order;
var online_order_name;


