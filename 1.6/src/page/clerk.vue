<template>
	<div style="margin-bottom: 50px;">
			<div style="padding: 13px;overflow: hidden;background: #FFFFFF;">
	            <div class="fl clerk_home_img" v-bind:style="{'background-image':'url('+zhiyezhao+')'}"></div>
	            <div class="clerk_home_body">
	                <h3 class="clerk_body_name">{{shanghunicheng}}<span class="fr starboxp"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span></h3>
	                <p class="clerk_body_cont">{{jianjie}}</p>
	            </div>
       		</div>
        <shopinfo :messaage="shopid"></shopinfo>
        <!--服务列表-->
        <div class="shopinfo_box fuwubox" style="padding: 0;margin-top: 10px;">
            <div class="shopinfo_box_title">服务项目 </div>
            <ul class="choice_ul">
				<li v-for="lis in servlist">
					<div class="fl project_img" v-on:click="tos(lis.id)" v-bind:style="{'background-image':'url('+fuwuhoto+lis.photo+')'}"></div>
					<div class="mui-media-body project_shop_content">
							<h3 class="ellipsis project_name"  v-on:click="tos(lis.id)">{{lis.name}}</h3>
							<p class="ellipsis project_content"  v-on:click="tos(lis.id)">{{lis.jianjie}}</p>
						<div class="project_price">
							<a href="javascript:;" v-on:click="tos(lis.id)"><i class="fs16">{{lis.jine}}</i> <i class="fs12">{{lis.danwei}}</i></a>
						</div>
					</div>
				</li>
			</ul>
        </div>
        <div class="footer_chiose" v-on:click="appoint()">立即预约</div>
	</div>
</template>

<script>
import Vue from 'vue'
import shopinfo from './shopinfo.vue'
import service from './service.vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        fuwuhoto:'',
        to:'',
        showis:true,
        shopid:'389',
        user:'',
        zhiyezhao:'',
        shanghunicheng:'',
        servlist:'',
        jianjie:''
    }
  },
  created:function(){
  	  const self = this
      var Request = new UrlSearch(); //实例化
      var paramValue = Request.openid;    //id; 1939
      this.shopid = localStorage.getItem('shanghuid');
      sessionStorage.setItem('gocenter',0);
  	  //店员详情
  	  Vue.http.get(newfix+"shanghu.php?bs=dianyuanxiangqing&openid="+paramValue+"&shanghuid="+this.shopid).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        if(json.code==200){
        	self.listData = json.obj.clerk;
        	self.fuwuhoto = fuwuhoto;
        	self.user = self.listData;
        	if(self.listData.zhiyezhao!=''){
        		self.zhiyezhao = zhiyephoto +self.listData.zhiyezhao; //职业照
        	}else{
        		self.zhiyezhao = "static/image/moren.png";
        	}
        	self.shanghunicheng = self.listData.shanghunicheng;
        	self.jianjie = self.listData.yuangongjianjie;
        	self.servlist = json.obj.fuwu;
	      	document.setTitle(self.shanghunicheng);
	      	//从店员里面下单
	      	localStorage.setItem('clerkname',self.shanghunicheng);
	      	localStorage.setItem('clerkopenid',paramValue);
        }else{
//      	alert(json.code);
        }
      },function(response){
//        console(response);
      })
  	  
  	  
  	  //店员查询服务
  	  Vue.http.get(newfix+"shanghu.php?bs=dianyuanfuwuliebiao&openid="+paramValue+"&shanghuid="+this.shopid).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        if(json.code==200){
        	self.servlist = json.obj;
        }else{
//      	alert(json.code);
        }
      },function(response){
//        console(response);
      })
  },
  methods:{
  	tos:function(id){
	 	this.$router.push('/page/servicedetail?id='+id);
	},
	appoint:function(){
      var Request = new UrlSearch(); //实例化
      var paramValue = Request.openid;    //id; 1939
		localStorage.removeItem("online_time");
		localStorage.removeItem("orderlist"); 
		localStorage.removeItem("fuwuxiangmu");
		localStorage.removeItem("inputname");
		localStorage.removeItem("inputdizhi");
		localStorage.removeItem("inputdizhis");
		localStorage.removeItem("add");
		if(localStorage.getItem('user')==null ){  //没有登录的话去登录
			window.location.href = "login.html";
      	}else{
      		//店员主页进入
			localStorage.setItem('orderfrom',"2");
      		const clerkadd = [{"ren":this.shanghunicheng,"xiangmu":"可选","type":'',"btn":false,"btnren":true}];
			const fuwuxiangmu = [[null,null,paramValue,null]]; //（服务id-服务名称-服务人员openid-价格）{"id":id,"name":name,"openid":null,"price":price}
			localStorage.setItem('orderlist',JSON.stringify(clerkadd));
			localStorage.setItem('fuwuxiangmu',JSON.stringify(fuwuxiangmu));
			//存储服务人员openid
			localStorage.setItem('fuwurenopenid',paramValue);
			//进入下单页面
			this.$router.push('/page/online');
      	}
		
	}
  },
  components:{
     service:service,
     shopinfo:shopinfo
  }
}
</script>

<style scoped>
.clerk_home_img{width:80px;height:80px;border:1px solid #e7e7e7;margin-right:13px;border-radius:4px;background-size:80px;background-repeat:no-repeat}
.clerk_home_body{overflow:hidden}
.clerk_body_name{font-size:16px!important;margin:0;color:#333;height:30px;line-height:30px}
.shopinfo_box_title{font-size: 14px;color: #636363;padding: 13px;border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);}
.footer_chiose {z-index: 200;height: 50px;text-align: center;line-height: 50px;background: #ff6600;color: #fff;cursor: pointer;font-size: 16px;width: 3.2rem;position: fixed;bottom: 0;}

/*服务项目*/
.choice_ul{background:#fff}
.choice_ul li{margin-top:0;margin-bottom:0;padding:13px;border-bottom:1px solid hsla(0,0%,93%,.7)}
.choice_ul li:last-child{border-bottom:none}
.project_img{width:80px!important;height:80px;margin-right:13px;border-radius:4px;background-size:120px}
.project_shop_content{overflow:hidden}
.project_name{font-size:16px;color:#333;margin-top:inherit;margin-bottom:inherit;height:25px;line-height:25px}
.project_content{color:#636363;font-size:12px;height:30px;line-height:30px}
.project_price{height:20px}
.project_price a{font-size:14px;color:#f60;height:25px;line-height:25px}
</style>