<template>
	<div v-show="hide">
		<nav class="por">
			<img class="logo" v-bind:src="shanghu+cover" alt="店铺Logo">
			<div class="poa" v-on:click="shoucang()" v-if="soucang==0">收藏店铺</div>
			<!--<div class="poa" v-else="soucang==1">已收藏</div>-->
		</nav>
        <shopinfo :messaage="shopid"></shopinfo>
        <!--服务列表-->
        <div class="shopinfo_box fuwubox" style="padding: 0;" v-show="hidefuwu">
            <div class="shopinfo_box_title">服务项目 </div>
            <service :messaage="shopid"></service>
        </div>
        <!--11-->
        <div class="shopinfo_box userbox" style="padding: 0;" v-show="hideclerk">
            <div class="shopinfo_box_title">服务人员 </div>
            <people  :messaage="shopid"></people>
        </div>
        <!--22-->
        <div class="shopinfo_box" style="padding: 0;">
            <router-link class="shopinfo_boxa_title pinpaixinxi" v-bind:to="tobrandinfo">
            	<div class="shopinfo_box_title">品牌信息 <i class="icon-right fr"></i></div>
            </router-link>
            <div class="shopjianjie" style="padding: 13px">{{jianjie}}</div>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
import service from './service.vue'
import people from './people.vue'
import shopinfo from './shopinfo.vue'
//toast
import { Toast } from 'mint-ui';
export default{
  name: 'center',
  data:function(){
    return{
        listData: [],
        data:'',
        cover:'',
        shanghu:'',
        jianjie:'',
        shopid:'',
        hide:false,
        shopname:'',
        tobrandinfo:'',
        hideclerk:true,
        hidefuwu:true,
        soucang:'',
    }
  },
  props:['messaage'],
  created:function(){
  	  const self = this
      self.shopid = this.messaage;
      self.soucang = '收藏店铺'
      self.tobrandinfo = "/page/brandinfo?id="+self.shopid;
//		Toast({
//message: '操作成功',
//iconClass: 'icon icon-success'
//});
      //清空店员选择服务时数据
      localStorage.removeItem("clerkname");
      localStorage.removeItem("clerkopenid");
      localStorage.removeItem("add");
  	  //精选服务列表  shifoushoucang 0 已收藏 1 未收藏
  	  Vue.http.get(newfix+"shanghu.php?bs=shanghuxiangqing&openid="+openid+"&id="+self.messaage).then(function(response){
        // sucess callback
        		var json= response.body;
				if(JSON.parse(json).code==200){ //接口正常
		        	self.listData = JSON.parse(json).obj;
	        		self.hide = !self.hide;
		        	self.cover = self.listData.dianpu.cover;
		        	self.jianjie = self.listData.dianpu.jianjie;
		        	self.shanghu = shopphoto;
		        	self.shopname = self.listData.dianpu.mingcheng;
		        	if(self.listData.dianpu.fuwu==null){ //判空操作
		        		self.hidefuwu = false;
		        	}
		        	if(self.listData.dianpu.clerk==null){ //判空操作
		        		self.hideclerk = false;
		        	}
		        	if(self.listData.dianpu.shifoushoucang==0){//0未收藏    1已收藏隐藏按钮
//						self.$router.push('/page/shopopup?openid='+openid+'&id='+self.messaage);
		        	}else{
		        		self.soucang = self.listData.dianpu.shifoushoucang;
		        	}
		        	localStorage.setItem('startTime',self.listData.dianpu.kaishishijian);
					var endtime = self.listData.dianpu.jieshushijian
                    var num = self.listData.dianpu.jieshushijian.indexOf(":");
                    var endtimes = endtime.substr(0,num);
                    
                    var startime = self.listData.dianpu.kaishishijian;
                    var snum = self.listData.dianpu.kaishishijian.indexOf(":")
                    var startimes = self.listData.dianpu.kaishishijian.slice(0,snum);
                    if(Number(endtimes)<Number(startimes)){    //结束时间 < 开始时间
                    	localStorage.setItem('endTime', "24:00");
                    }else{
                    	localStorage.setItem('endTime', self.listData.dianpu.jieshushijian);
                    }
					localStorage.setItem('shopname',self.listData.dianpu.mingcheng);
					//分享店铺信息
					localStorage.setItem('shop',JSON.stringify(self.listData.dianpu));
	      			document.setTitle(self.shopname);
				}else{
					self.$router.push('/page/notshop');
				}
      },function(response){
//        console(response);
      })
  },
  components:{
     service:service,
     people:people,
     shopinfo:shopinfo
  },
  methods:{
  	shoucang:function(){
//		alert()
	  	const self = this
  		Vue.http.get(newfix+"shanghu.php?bs=shoucangshanghu&openid="+openid+"&shanghuid="+self.messaage).then(function(response){
	    // sucess callback
	    var json= response.body;
        self.data = eval("(" + json +")");
        if(self.data.code==200){  //成功 
        	self.soucang = "已经收藏";
        }else if(self.data.code==4011){ //已经收藏
        	self.soucang = "已经收藏";
        }
	  },function(response){
//        console(response);
      })
  	},
  	clear:function(){
		localStorage.clear();
		alert("成功");
  	}
  }
}
</script>

<style scoped>
.shopinfo_box{background:#fff;margin-top:10px;padding:13px;border:1px solid hsla(0,0%,93%,.7);border-left:initial;border-right:initial}
nav .logo{margin-bottom:-5px}
.shopinfo_box_title{padding:13px;border-bottom:1px solid rgba(238,238,238,.701961);font-size:14px;color:#636363}
nav .poa{right:0;bottom:30px;height:44px;line-height:44px;background:#333;opacity:.8;color:#fff;width:96px;text-align:center;border-radius:40px;border-bottom-right-radius:0;border-top-right-radius:0;font-size:15px;font-weight:600}
</style>