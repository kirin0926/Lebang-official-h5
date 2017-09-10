<template>
<div style="padding: 13px;">
	<ul>
		<li class="coucen-li">
			<img class="fl" src="http://www.quanminlebang.com/photo/shanghu/1495855078661.jpg" alt="" />
			<div class="owh">
				<h3>金梦美甲</h3>
				<div>
					<div class="coucen-mess">到店消费立减10元</div>
					<div class="coucen-chit"><span class="fl ellipsis">无限制，任何服务均可使用</span><a href="javascript:;" class="fr" @click="receive">领取优惠券</a></div>
					
				</div>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui';
export default{
  name: 'coupon-center',
  data:function(){
    return {
        listData: ""
    }
  },
  created:function(){
	  document.setTitle('优惠券中心');
  	  const self = this
      const Request = new UrlSearch(); //实例化
      const openid = Request.openid;      //APP a0f3bfb2d34f2821f540bd5b747a9b8a
  	  Vue.http.get(newfix+"shanghu.php?bs=shoucangshuanghuliebiao&openid="+openid).then(function(response){
        // sucess callback
        var json= response.body;
        self.listData = JSON.parse(json).obj.list;
        self.shoplogo = shopphoto;
      },function(response){
//        console(response);
      })
  },
  methods:{
  	toshop:function(id){
      	sessionStorage.setItem('gocenter',0);
		this.$router.push('/page/main?id='+id)
  	},
  	receive:function(){
  		Toast('领取成功');
  	}
  }
}
	
</script>

<style scoped="scoped">
.coucen-li{background:#FFF;overflow:hidden;padding:13px;border-radius:4px;box-shadow:1px 2px 10px rgba(1,1,2,.1);border-left: 3px solid #ff6600;}
.coucen-li img{width:50px;height:50px;border-radius:25px;margin-right:13px}
.coucen-li .owh h3{height:30px;line-height:30px;font-size:16px;color:#333}
.coucen-mess{height:30px;line-height:30px;color:#333;font-size:14px}
.coucen-chit{height:30px;line-height:30px;font-size:14px;color:#9e9e9e}
.coucen-chit span{width:60%}
.coucen-chit a{width:100px;text-align:center;background:#f60;color:#fff;border-radius:37px}

</style>