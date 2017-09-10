<template>
	<div style="padding: 13px;">
			<div class="coupon-other" v-if="shos==2">你有0张优惠券待领取哦!~</div>
			<div v-if="shos==2">
		      <div class="card" v-for="li in listData" v-if="li.kaquan.leixing == 1" v-bind:style="{backgroundImage:'url(static/image/bg1.png)'}" v-on:click="todetail(li.kaquan.huiyuankaquanid)"><div class="card-bg"><img class="coupon-list-avater" v-bind:src="shopphoto+li.dianpu.cover" alt="店铺头像"/><h3 class="name">{{li.kaquan.kaquanmingcheng}}</h3></div><div class="wave"><div>优惠券来源：{{li.dianpu.mingcheng}}</div><div>使用规则  ：无限制，任何服务项目均可使用</div></div></div>
		      <div class="card" v-for="li in listData" v-if="li.kaquan.leixing == 2" v-bind:style="{backgroundImage:'url(static/image/bg2.png)'}" v-on:click="todetail(li.kaquan.huiyuankaquanid)"><div class="card-bg"><img class="coupon-list-avater" v-bind:src="shopphoto+li.dianpu.cover" alt="店铺头像"/><h3 class="name">{{li.kaquan.kaquanmingcheng}}</h3></div><div class="wave"><div>优惠券来源：{{li.dianpu.mingcheng}}</div><div>使用规则  ：消费满既定额度即可享受一定优惠</div></div></div>
		      <div class="card" v-for="li in listData" v-if="li.kaquan.leixing == 3"  v-bind:style="{backgroundImage:'url(static/image/bg3.png)'}" v-on:click="todetail(li.kaquan.huiyuankaquanid)"><div class="card-bg"><img class="coupon-list-avater" v-bind:src="shopphoto+li.dianpu.cover" alt="店铺头像"/><h3 class="name">{{li.kaquan.kaquanmingcheng}}</h3></div><div class="wave"><div>优惠券来源：{{li.dianpu.mingcheng}}</div><div>使用规则  ：指定服务项目体验券</div></div></div>
		      <div class="card" v-for="li in listData" v-if="li.kaquan.leixing == 4"  v-bind:style="{backgroundImage:'url(static/image/bg4.png)'}" v-on:click="todetail(li.kaquan.huiyuankaquanid)"><div class="card-bg"><img class="coupon-list-avater" v-bind:src="shopphoto+li.dianpu.cover" alt="店铺头像"/><h3 class="name">{{li.kaquan.kaquanmingcheng}}</h3></div><div class="wave"><div>优惠券来源：{{li.dianpu.mingcheng}}</div><div>使用规则  ：到店消费即有礼品赠送</div></div></div>
			</div>
          <div class="nocoupon" v-else="shos==1">
              <img src="static/image/nocomt.png" alt=""/>
              <h3>暂时还没有优惠券哦！</h3>
          </div>
      </div>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        shopphoto:"",
        topStatus: '',
        shos:''
    }
  },
  created:function(){
  	  const self = this
      var Request = new UrlSearch(); //实例化
      var openid = Request.openid;      //APP a0f3bfb2d34f2821f540bd5b747a9b8a
      var share = Request.share;  //Share
      var paramValue = Request.shanghuid;    //id; 1939
      if(openid==null){
    	  localStorage.setItem('loginfrome',"5"); //1 店铺主页ok  2会员卡中心ok 3我的预约ok  4我的店铺ok  5优惠券ok
          window.location.href="login.html";
      }
      sessionStorage.setItem('gocenter',1);
      document.setTitle("我的优惠券");
  	  //优惠券列表   商户id可以为空查询全部优惠券，不为空查询对应店铺优惠券
  	  Vue.http.get(newfix+"user.php?bs=kaquanliebiao&openid="+openid+"&shanghuid="+paramValue).then(function(response){
        // sucess callback
          var json=response.body;
          self.response = JSON.parse(json);
          self.listData = self.response.obj.list;
          if(self.listData==null){//无数据
          	self.shos = "1";
          }else{ //有数据
          	self.shos = "2";
          }
		  self.shopphoto = shopphoto
      },function(response){
//        console(response);
      })
  },
  methods:{
		todetail:function (obj) {
      	  sessionStorage.setItem('kaquanid', obj);
          this.$router.push('/page/coupondetail');
       }
  }
}
</script>

<style scoped="scoped">
.nocoupon{text-align:center}
.nocoupon img{width:50%;margin-top:150px}
.nocoupon h3{font-size:14px;color:#9e9e9e}
.coupon-list-avater{width:40px;height:40px;border-radius:20px;position:absolute;margin-left:13px;margin-top:13px}
.coupon-other{font-size:16px;color:#f60;background:#fff;padding:13px;box-shadow:1px 2px 10px rgba(1,1,2,.1);margin-bottom:10px;border-radius:4px}
</style>