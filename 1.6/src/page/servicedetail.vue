<template>
	<div class="Lifepage" style="margin-bottom: 60px;" v-show="hide">
		<nav><img class="logo" v-bind:src="fuwu+fuwulogo" alt="服务图片"></nav>
		<div class="shopinfo_box" style="margin-top: 0;">
        	<h3 class="shopdetailname" v-text="fuwuname"></h3>
        	<div class="shopdetailmoney"  v-if="cuxiao==0">
        		<span class="service_bespoke_jine">{{price}}</span><span class="service_bespoke_danwei">{{danwei}}</span>
        	</div>
        	<div class="shopdetailmoney"  v-else="cuxiao==1">
        		<span class="service_bespoke_jine">{{cuxiaoprice}}</span><span class="service_bespoke_danwei">{{danwei}}</span>
        		<span class="service_bespoke_cuxiao">{{price + danwei}}</span>
        	</div>
    	</div>
		
		<div class="shopinfo_box" style="margin-top: 0;border-top: none;">
        	<div class="service_brief" v-text="jianjie"></div>
    	</div>
    	
    	<div class="shopinfo_box" style="margin-top: 0;border-top: none;">
    		<div class="service_circums" v-html="xiangqing"></div>
    	</div>
    	<div style="margin-top: 10px;">
        	<shopinfo :messaage="shopid"></shopinfo>
    	</div>
       <div class="footer_chiose" v-on:click="appoint(fuwuname,togohome,fuwuid,price)">立即预约</div>
	</div>
</template>

<script>
import Vue from 'vue'
import shopinfo from './shopinfo.vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        fuwu:'',
        fuwulogo:[],
        fuwuname:[],
        jianjie:[],
        xiangqing:[],
        shopid:'',
        hide:false,
        cuxiao:'',
        price:'',
        cuxiaoprice:'',
        danwei:'',
        togohome:'',
        fuwuid:''
    }
  },
  created:function(){
      var Request = new UrlSearch(); //实例化
      var paramValue = Request.id;    //id; 1939
      this.fuwuid = paramValue;
      this.shopid = localStorage.getItem('shanghuid');
      sessionStorage.setItem('gocenter',0);
  	  const self = this
  	  //服务详情
  	  Vue.http.get(newfix+"shanghu.php?bs=fuwuxiangqing&fuwuid="+paramValue).then(function(response){
        // sucess callback 
        var json= JSON.parse(response.body);
        self.listData = json.obj;
        if(self.listData.code=200){
        	self.hide = !self.hide;
        	self.fuwulogo = self.listData.fuwu.photo
        	self.fuwuname = self.listData.fuwu.name
        	self.jianjie = self.listData.fuwu.jianjie
        	self.fuwu = fuwuhoto;
        	self.xiangqing = self.listData.fuwu.xiangqing.replace(/src="\/photo/g, 'src="http://www.quanminlebang.com/photo');
        	self.cuxiao = self.listData.fuwu.cuxiao;
        	self.price = self.listData.fuwu.jine;
        	self.cuxiaoprice =self.listData.fuwu.cuxiaojia;
        	self.danwei = self.listData.fuwu.danwei;
        	self.togohome = self.listData.fuwu.fuwumoshi;
        }else{
        	alert(self.listData.code)
        }
      },function(response){
//        console(response);
      })
  },
  methods:{
	appoint:function(name,type,id,price){ //name服务项目名称 type 到家还是到店
		localStorage.removeItem("online_time");
		localStorage.removeItem("orderlist");
		localStorage.removeItem("fuwuxiangmu"); 
		localStorage.removeItem("inputname");
		localStorage.removeItem("inputdizhi");
		localStorage.removeItem("inputdizhis");
		localStorage.removeItem("add");
		if(localStorage.getItem('user')==null ){ //判断是否登录
			window.location.href = "login.html";
      }
		var cn = localStorage.getItem("clerkname");
		var co = localStorage.getItem("clerkopenid");
		if(cn!=null){//已经选好了 服务人员
			const fuwuadd = [{"ren":cn,"xiangmu":name,"type":type,"btn":false,"btnren":false}];
			const fuwuxiangmu = [[id,name,co,price]]; //（服务id-服务名称-服务人员openid-价格）{"id":id,"name":name,"openid":null,"price":price}
			localStorage.setItem('orderlist',JSON.stringify(fuwuadd));
			localStorage.setItem('fuwuxiangmu',JSON.stringify(fuwuxiangmu));
			localStorage.setItem("add","2");//显示继续添加
			localStorage.setItem('orderfrom',"4"); //4店员主页选择服务进入
		}else{//没有选好服务人员
			const fuwuadd = [{"ren":"可选","xiangmu":name,"type":type,"btn":true,"btnren":false}];
			const fuwuxiangmu = [[id,name,null,price]]; //（服务id-服务名称-服务人员openid-价格）{"id":id,"name":name,"openid":null,"price":price}
			localStorage.setItem('orderlist',JSON.stringify(fuwuadd));
			localStorage.setItem('fuwuxiangmu',JSON.stringify(fuwuxiangmu));
			localStorage.setItem('orderfrom',"3"); //3服务详情
		}
	 	this.$router.push('/page/online');
	}

  },
  components:{
     shopinfo:shopinfo
  }
}
</script>

<style scoped="scoped">
.shopinfo_box{background:#fff;margin-top:10px;padding:13px;border:1px solid hsla(0,0%,93%,.7);border-left:initial;border-right:initial}
nav .logo{margin-bottom:-5px}
.shopinfo_box_title{padding:13px;border-bottom:1px solid rgba(238,238,238,.701961);font-size:14px;color:#636363}
.service_circums p{padding:13px 0;font-size:14px;padding-bottom:0}
.footer_chiose{z-index:200;height:50px;text-align:center;line-height:50px;background:#f60;color:#fff;cursor:pointer;font-size:16px;width:3.2rem;position:fixed;bottom:0}

</style>