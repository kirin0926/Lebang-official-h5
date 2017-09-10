<template>
	<div>
		<nav>
        	<img class="logo" v-bind:src="shoplogo" alt="全民乐帮商户图片"/>
    	</nav>
		<div class="shopinfo_count" style="border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);">
		    <h3 class="shopname">{{shopname}}</h3>
		</div>
		<div class="shopinfo_box jianjiebox" style="margin-top: 10px;">
		    <h3>店铺简介</h3>
		    <div class="shopjianjie">{{shopjianj}}</div>
		</div>
	    <div class="shopinfo_box" style="margin-top: 10px;">
	        <h3 style="padding-bottom: 13px;">店铺环境</h3>
	        <div class="shopxiangqing service_circums" v-html="shopjieshao"></div>
	    </div>
	</div>
	
</template>

<script>
import Vue from 'vue'
export default{
  name: 'brandinfo',//品牌信息
  data:function(){
    return {
        listData: [],
        shoplogo:'',
        shopname:'',
        shopjianj:'',
        shopjieshao:''
    }
  },
  created:function(){
  	  const self = this
      var Request = new UrlSearch(); //实例化
      var id = Request.id;      //APP
  	  //品牌信息
  	  Vue.http.get(newfix+"shanghu.php?bs=shanghuxiangqing&openid="+openid+"&id="+id).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        	if(json.code==200){
	        	self.listData = json.obj;
	        	self.shoplogo = shopphoto+self.listData.dianpu.cover;
	        	self.shopname = self.listData.dianpu.mingcheng;
	        	self.shopjianj = self.listData.dianpu.jianjie;
	        	self.shopjieshao = self.listData.dianpu.jieshao.replace(/src="\/photo/g, 'src="http://www.quanminlebang.com/photo');
        	}else{
//      		alert(json.code);
        	}        
      },function(response){
//        console(response);
      })
  }
}
</script>

<style scoped="scoped">
.shopinfo_count{background:#fff;overflow:hidden}
.shopname{padding:13px 0;margin:0;font-size:16px;color:#333;font-weight:600;text-align:center;width:auto}
.shopinfo_box h3{font-size:14px;margin:0;color:#333}
.shopjianjie{padding:13px 0;color:#636363;font-size:14px;padding-bottom:0}
nav img{
	margin-bottom: -5px;
}
</style>