<template>
	<div style="padding: 13px;">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<li class="collect-li" v-for="li in listData" v-on:click="toshop(li.id)">
						<img class="fl" v-bind:src="shoplogo+li.cover" alt="店铺logo" />
						<div class="owh">
							<h3>{{li.mingcheng}}</h3>
							<div class="dizhi">地址：{{li.dizhi}}</div>
						</div>
					</li>
				</ul>
		</mt-loadmore>
	</div>
</template>

<script>
import Vue from 'vue'

import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default{
  name: 'collectshop',
  data:function(){
    return {
        listData: "",
        shoplogo:'',
        topStatus:"",
        allLoaded:false
    }
  },
  created:function(){
	  document.setTitle('选择店铺');
  	  const self = this
  	  var openid = localStorage.getItem("openid")
      if(openid==null){
    		localStorage.setItem('loginfrome',"4"); //1 店铺主页  2会员卡中心 3我的预约  4我的店铺  5优惠券
        	window.location.href="login.html";
      }
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
	loadTop() {
	  this.$refs.loadmore.onTopLoaded();
	},
	loadBottom() {
	  // 加载更多数据
	  this.allLoaded = true;// 若数据已全部获取完毕
	  this.$refs.loadmore.onBottomLoaded();
	},
  	handleTopChange(status){
        this.topStatus = status;
   	},
    handleBottomChange(status){
        this.topStatus = status;
    }
  }
}
	
</script>

<style scoped="scoped">
.collect-li{overflow:hidden;background:#FFF;padding:13px;box-shadow:1px 2px 10px rgba(1,1,2,.1);border-radius:4px;margin-bottom:10px;cursor:pointer}
.collect-li img{float:left;width:60px;height:60px;border-radius:30px;margin-right:13px}
.collect-li .owh h3{height:30px;line-height:30px;font-size:16px;color:#333}
.collect-li .owh .dizhi{height:30px;line-height:30px;font-size:15px;color:#9E9E9E}
</style>