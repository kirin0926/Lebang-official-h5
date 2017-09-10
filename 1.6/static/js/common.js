/**
 * Created by Administrator on 2016/11/4.
 */

/**
 url地址  quanminlebang.com       15210136451 7272

 */
var newfix = "http://www.quanminlebang.com/weizhan150/"
var fix = "http://www.quanminlebang.com";
var fixhtml = "http://www.quanminlebang.com/m/mobile14/";  //html调用的目录
var shopphoto = fix+"/photo/shanghu/";
var fuwuhoto = fix+"/photo/fuwu/";
var leibiephoto = fix+"/photo/leibie/";
var avater = fix+"/photo/avatar/";
var xinxianphoto=fix+"/photo/xinxianshi/";
var zhiyephoto  =fix+"/photo/zhiyezhao/";
var customer = "010-57206260"; //客服电话
console.log("%c Powered by Qiangqiang - QQ:963657293","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;");
var openid = localStorage.getItem('openid');
function UrlSearch(){
//              var name,value;
//              //获取当前地址
//              var str = location.href;
//              //查找下标
//              var num = str.indexOf("?");
//              str = str.substr(num+1);
//              var arr = str.split("&");
//              for(var i=0;i < arr.length;i++){
//                  num=arr[i].indexOf("=");
//                  if(num>0){
//                      name=arr[i].substring(0,num);
//                      value=arr[i].substr(num+1);
//                      this[name]=value;
//                  }
//              }
                var str = location.href; //获取当前地址
                if(str.indexOf("#")!=''){//
                	const chang = str.indexOf("#");
                	const leng = str.substr(chang+1);
                	var num = leng.indexOf("?");
	                var ks = leng.substr(num+1);
	                var arr = ks.split("&");
	                for(var i=0;i < arr.length;i++){
	                    num=arr[i].indexOf("=");
	                    if(num>0){
	                        name=arr[i].substring(0,num);
	                        value=arr[i].substr(num+1);
	                        this[name]=value;
	                    }
	                }
                }else{
                  	var num = str.indexOf("?");
	                str = str.substr(num+1);
	                var arr = str.split("&");
	                for(var i=0;i < arr.length;i++){
	                    num=arr[i].indexOf("=");
	                    if(num>0){
	                        name=arr[i].substring(0,num);
	                        value=arr[i].substr(num+1);
	                        this[name]=value;
	                    }
	                }
                }
                
                
                
}
//    var Request = new UrlSearch(); //实例化
//    var paramValue = Request.id;    //id; 1939
//    
//              	console.log(Request);
window.alert = function(name){
	var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
};
window.confirm = function (message){
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};
document.setTitle = function(t){
	document.title = t;
	var i = document.createElement('iframe');
		i.src = '//m.baidu.com/favicon.ico';
			i.style.display = 'none';
			i.onload = function(){
				setTimeout(function(){
					i.remove();
				}, 9)
			}
		  document.body.appendChild(i);
}
	  	
