<template>
  <div class="Lifepage" style="margin-bottom: 50px;">
  		<fixtop v-show="fixtop"></fixtop>
      <div v-if="layout == 'mainshop'" class="grid"><mainshop :messaage="shopid"></mainshop></div>
      <div v-if="layout == 'service'" class="list"><service :messaage="shopid"></service></div>
      <div v-if="layout == 'center'" class="list"><center :messaage="shopid"></center></div>
	    <div class="nav-bottom">
	        <div class="nav-bottom-btn">
	          <a v-bind:class="{ 'active': layout == 'mainshop'}" v-on:click="layout = 'mainshop'">店铺主页</a>
	          <a v-bind:class="{ 'active': layout == 'service'}" v-on:click="layout = 'service'">精选服务</a>
	          <a v-bind:class="{ 'active': layout == 'center'}" v-on:click="layout = 'center'">会员中心</a>
	          <!--tocenter()-->
	        </div>
	    </div>
  </div>
</template>

<script>
import mainshop from './mainshop.vue'
import service from './service.vue'
import center from './center.vue'
import fixtop from './fixtop.vue'
export default{
  name: 'Lifepage',
  data:function(){
    return {
      layout: 'mainshop',
      id:'389',
      fixtop:false,
      shopid:''
    }
  },
  created:function(){
      var Request = new UrlSearch(); //实例化
      var paramValue = Request.id;    //id; 1939
      var share = Request.share;    //id; 1939
      this.shopid = paramValue
      localStorage.setItem('shanghuid',paramValue);
      //判断是否有顶部显示
      if(share=="yes"){
      	this.fixtop = !this.fixtop ;
      }
      if(sessionStorage.getItem('gocenter')==1){ //判断是否进入会员中心界面
      	this.layout="center";
      }
      var openid = localStorage.getItem('openid');
//    if(openid==null){
////    	alert("没有登录");
//      var ua = window.navigator.userAgent.toLowerCase();
//      var wx_content = '<div class="mui-col-sm-12 mui-col-xs-12"><li class="wx_login"><a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e994fa8a62b206&redirect_uri=http%3a%2f%2fwww.quanminlebang.com%2fm%2fmobile%2fmobilestation%2flogin.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"><img src="static/image/weixin@3x.png" alt="微信登录"/><h3>微信一键登录</h3></a></li> </div>';
//      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ //在微信中
//  				localStorage.setItem('loginfrome',"1"); //1 店铺主页  2会员卡中心 3我的预约  4我的店铺  5优惠券
//      	  window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e994fa8a62b206&redirect_uri=http%3a%2f%2fwww.quanminlebang.com%2fm%2fmobile15%2flogin.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
//          return true;
//      }else{//不在微信中
//  				localStorage.setItem('loginfrome',"1"); //1 店铺主页  2会员卡中心 3我的预约  4我的店铺  5优惠券
//      		window.location.href="login.html";
//          return false;
//      }
//    }
		$.ajax({
			type:"post",
			url:newfix+"wxvip.php",
			dataType:"json",
			data:{
				bs:"access_token"
			},
			success:function(data){
				console.log(data);
				const token = data.obj.access_token;
						$.ajax({
							type:"post",
							url:"https://api.weixin.qq.com/cgi-bin/menu/create",
							dataType:"jsonp",
							data:{
								access_token:token,
								body:{
											    "button": [
											        {
											            "type": "click", 
											            "name": "今日歌曲", 
											            "key": "V1001_TODAY_MUSIC"
											        }, 
											        {
											            "name": "菜单", 
											            "sub_button": [
											                {
											                    "type": "view", 
											                    "name": "搜索", 
											                    "url": "http://www.soso.com/"
											                }, 
											                {
											                    "type": "click", 
											                    "name": "赞一下我们", 
											                    "key": "V1001_GOOD"
											                }
											            ]
											        }
											    ]
											}
							},
							success:function(data){
								console.log(data);
							}
						})
			}
		})
    /*
     * 注意：
     * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
     * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
     * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *
     * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
     * 邮箱地址：weixin-open@qq.com
     * 邮件主题：【微信JS-SDK反馈】具体问题
     * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
     */
    /*配置信息*/
    $.ajax({
        type:"get",
        url:newfix+"user.php?bs=ticket",
        dataType:"json",
        success:function(data){
            var ticket = data.ticket;
            var timestamp = Date.parse(new Date())/1000;
            var nocestr = "Wm3WZYTPz1wzccnW";
            var signature = $.sha1("jsapi_ticket="+ticket+"&noncestr="+nocestr+"&timestamp="+timestamp+"&url="+location.href);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxeae69af12a763633', // 必填，公众号的唯一标识
                timestamp:timestamp , // 必填，生成签名的时间戳
                nonceStr:nocestr, // 必填，生成签名的随机串
                signature:signature,// 必填，签名，见附录1
                jsApiList:[
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQZone',
                    'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                var xinxianshiarry = localStorage.getItem('shop');  //
                var list = JSON.parse(xinxianshiarry);
                // 在这里调用 API
                var title = list.mingcheng;
                var descs  =  list.jianjie; //分享描述
                var imgurl = shopphoto+list.cover;  //分享图标
                var links = "";//分享链接

                /** 朋友圈 */
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: links, // 分享链接
                    imgUrl: imgurl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                /** 朋友 */
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: descs, // 分享描述
                    link: links, // 分享链接
                    imgUrl: imgurl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                /** QQ空间 */
                wx.onMenuShareQZone({
                    title: title, // 分享标题
                    desc: descs, // 分享描述
                    link: links, // 分享链接
                    imgUrl: imgurl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                /** QQ好友 */
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: descs, // 分享描述
                    link: links, // 分享链接
                    imgUrl: imgurl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }
    });
  },
  components:{
     mainshop:mainshop,
     service:service,
     center:center,
     fixtop:fixtop
  },
  methods:{
  	tocenter:function(){
    	localStorage.setItem('loginfrome',"3"); //1 店铺主页  2会员卡中心 3我的预约  4我的店铺  5优惠券
      var openid = localStorage.getItem('openid');
//		if(openid==null){
//      window.location.href="login.html";
//		}else{
//			this.layout = 'center';
//		}
  	}
  }
} 
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab_btn .active{background: #ff6600;color: #ffffff !important;}
  .nav-bottom{position: fixed;bottom: 0;display: table;width: 100%;table-layout: fixed;z-index: 10;right: 0; left: 0;}
  .nav-bottom-btn{margin: 0 auto;background: #fff;border-top: 1px solid hsla(0, 0%, 93%, 0.7);    overflow: hidden;}
  .nav-bottom-btn a{width: 33.3%;display: block;float:left;text-align: center;height: 50px;line-height: 50px;font-size: 16px;}
  .nav-bottom-btn .active{color: #FF6600;}
</style>