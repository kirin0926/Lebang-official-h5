<template>
	<div>
		<ul class="choice_ul" v-if="shos==2">
			<li v-for="lis in listData">
				<div class="fl project_img" v-on:click="tos(lis.id)" v-bind:style="{'background-image':'url('+fuwuhoto+lis.photo+')'}"></div>
				<div class="mui-media-body project_shop_content">
						<h3 class="ellipsis project_name"  v-on:click="tos(lis.id)" v-if="lis.cuxiao==1">{{lis.name}}<i class="cuxiao_icon">促</i></h3>
						<h3 class="ellipsis project_name"  v-on:click="tos(lis.id)" v-else="lis.cuxiao==0">{{lis.name}}</h3>
						<p class="ellipsis project_content"  v-on:click="tos(lis.id)">{{lis.jianjie}}</p>
					<div class="project_price">
						<a href="javascript:;" v-on:click="tos(lis.id)" v-if="lis.cuxiao=='0'"><i class="fs16">{{lis.jine}}</i> <i class="fs12">{{lis.danwei}}</i></a>
						<a href="javascript:;" v-on:click="tos(lis.id)" v-else="lis.cuxiao=='1'"><i class="fs16">{{lis.cuxiaojia}}</i> <i class="fs12">{{lis.danwei}}</i> <i class="fs12" style="text-decoration: line-through;color: #9e9e9e;">{{lis.jine+lis.danwei}}</i></a>
						<a href="javascript:;" v-on:click="appoint(lis.fuwumoshi,lis.name,lis.id,lis.jine)" class="fr order_now" v-if="type==1">立即预约</a>
					</div>
				</div>
			</li>
		</ul>
		<nodata v-else="shos==1" style="margin-top: 120px;"></nodata>
	</div>
</template>

<script>
import Vue from 'vue'
import nodata from './nodata.vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        fuwuhoto:'',
        type:'',
        shos:''
    }
  },
  props:['messaage'],
  created:function(){
  	  const self = this
	  var Request = new UrlSearch(); //实例化
	  if(this.messaage ==undefined){
	      this.messaage = Request.id;    //id; 1939
	  }
	  if(Request.type=="2"){// 在线下单
	  	this.type="2";
	  }else{  //店员详情
	  	this.type="1";
	  }
  	  //精选服务列表
  	  Vue.http.get(newfix+"shanghu.php?bs=shanghuxiangqing&openid="+openid+"&id="+this.messaage).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        if(json.code=200){
        	self.listData = json.obj.dianpu.fuwu;
        	if(self.listData==null){ //无数据
        		self.shos = "1";
        	}else{
        		self.shos = "2"; //有数据
        	}
        	self.fuwuhoto = fuwuhoto;
        }else{
        	self.$router.push('/page/notshop');
        }
      },function(response){
//        console(response);
      })
  },
  components:{
  	nodata:nodata
  },
  methods:{
	tos:function(id){
	  this.$router.push('/page/servicedetail?id='+id);
	},
	appoint:function(type,name,id,price){
		localStorage.removeItem("online_time");
		localStorage.removeItem("orderlist"); 
		localStorage.removeItem("fuwuxiangmu"); 
		localStorage.removeItem("inputname");
		localStorage.removeItem("inputdizhi");
		localStorage.removeItem("inputdizhis");
		localStorage.removeItem("add");
		if(localStorage.getItem('user')==null){  //没有登录的话去登录
			window.location.href = "login.html";
        }else{ //已经登录的话直接去下单
        	//1精选服务中进入
			localStorage.setItem('orderfrom',"1");
			const fuwuadd = [{"ren":"可选","xiangmu":name,"type":type,"btn":true,"btnren":false}];
			const fuwuxiangmu = [[id,name,null,price]]; //（服务id-服务名称-服务人员openid-价格）{"id":id,"name":name,"openid":null,"price":price}
			localStorage.setItem('orderlist',JSON.stringify(fuwuadd));
			localStorage.setItem('fuwuxiangmu',JSON.stringify(fuwuxiangmu));
			//进入下单页面
      		this.$router.push('/page/online');
      	}
	}

  }
}
</script>

<style scoped="scoped">
.choice_ul{background:#fff}
.choice_ul li{margin-top:0;margin-bottom:0;padding:13px;border-bottom:1px solid hsla(0,0%,93%,.7)}
.choice_ul li:last-child{border-bottom:none}
.project_img{width:80px!important;height:80px;margin-right:13px;border-radius:4px;background-size:120px}
.project_shop_content{overflow:hidden}
.project_name{font-size:16px;color:#333;margin-top:inherit;margin-bottom:inherit;height:25px;line-height:25px}
.project_content{color:#636363;font-size:12px;height:30px;line-height:30px}
.project_price{height:20px}
.project_price a{font-size:14px;color:#f60;height:25px;line-height:25px}
.cuxiao_icon {
    margin-left: 5px;
    font-size: 12px;
    color: #fff;
    background: #ff6600;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    border-radius: 4px;
    line-height: 20px;
    position: relative;
    top: -2px;
}
</style>