<template>
	<div>
		<div class="myaccountbg" style="background-image: url(static/image/centerboxbg.png);">
        		<div class="myaccount_box_bg" style="background-image: url(static/image/centerbg.jpg);">
	                <div class="myaccount_head">
	                    <!--<img v-bind:src="useravater" alt=""/>-->
	                    <div class="myaccount_head_img" v-bind:style="{'background-image':'url('+useravater+')'}"></div>
	                    <a v-bind:href="userinfo">
	                        <div class="myaccount_head_cont" style="background-image: url(static/image/mycard-right.png);">
	                            <h3><span class="username">{{username}}</span><span class="userlocal">{{usersex}}·{{userlocation}}</span></h3>
	                            <!--<div class="myaccount_head_cont_loca">已绑定手机号:{{userphone}}</div>-->
		                        <div class="myaccount_level">{{mingcheng}}  {{memberendtime}}</div>
	                        </div>
	                    </a>
	                </div>
	            </div>
        </div>
        	<div class="myaccount_info">
                    <ul>
                    	<router-link v-bind:to="toyue" class="yue">
                    		<li>
	                            <div class="myaccount_money">{{money}}</div>
	                            <div>余额</div>
	                        </li>
                    	</router-link>
                        <router-link v-bind:to="tojicika" class="jicika">
                        	<li>
	                            <div class="myaccount_discount">{{jicikashu}}</div>
	                            <div>计次卡</div>
                        	</li>
                        </router-link>
                        <router-link v-bind:to="toyouhui" class="youhuiquan">
                        	 <li>
	                            <div class="myaccount_quan">{{youhuiquanshu}}</div>
	                            <div>优惠券</div>
	                        </li>
                        </router-link>
                    </ul>
               </div>
        <div class="shopinfo_box_title ordermex">订单列表</div>
			<div class="order-box">
				<ul class="order_list">
			        	<li class="order_list-li" v-for="li in orderlist" track-by="$index">
			        		<!--<router-link v-bind:to="toorderdetail+li.id">-->
			        		<div class="order_box" v-on:click="toorderdetail(li.id,li.dianpu.id)">
			        			<div class="order-box-top">
			        				<div class="order_mess_img" v-bind:style="{'background-image':'url('+shopphoto+li.dianpu.cover+')'}"></div>
				        			<div class="order_mess">
				        				<h3 class="order_mess_name">
				        					<span class="prder-name ellipsis">{{li.dianpu.mingcheng}}</span>
				        					<span class="fr order_mess_tit" v-if="li.status==0">等待商家确认</span>
				        					<span class="fr order_mess_tit" v-else-if="li.status==1">等待商家确认</span>
				        					<span class="fr order_mess_tit" v-else-if="li.status==2">商家已确认信息</span>
				        					<span class="fr order_mess_tit" v-else-if="li.status==3">订单已完成</span>
				        					<span class="fr order_mess_tit" v-else-if="li.status==4">预约申请取消</span>
				        					<span class="fr order_mess_tit" v-else-if="li.status==5">预约已取消</span>
				        				</h3>
				        			</div>
			        			</div>
			        			<div class="order-fuwu">
			        				<ul>
			        					<li v-for="(is,index) in li.dingdanfuwu" v-if="index<3">
			        						<div class="fl order-fuwu-name" v-if="is.fuwurenyuan==null">----</div>
			        						<div class="fl order-fuwu-name" v-else="is.fuwurenyuan!=null">{{is.fuwumingcheng}}</div>
			        						<div class="fr tl order-fuwu-peo ellipsis" v-if="is.fuwurenyuan==''">服务人员：----</div>
			        						<div class="fr tl order-fuwu-peo ellipsis" v-else-if="is.fuwurenyuan==null">服务人员：----</div>
			        						<div class="fr tl order-fuwu-peo ellipsis" v-else-if="is.fuwurenyuan!=null">服务人员：{{is.fuwurenyuan.shanghunicheng}}</div>
			        					</li>
			        				</ul>
			        				<div class="order_mess_time fl" v-if="li.fuwushijian==''">预约时间：---------</div>
			        				<div class="order_mess_time fl" v-else-if="li.fuwushijian==null">预约时间：---------</div>
			        				<div class="order_mess_time fl" v-else-if="li.fuwushijian=='NaN'">预约时间：---------</div>
			        				<div class="order_mess_time fl" v-else-if="li.fuwushijian!=''">预约时间：{{(new Date(parseInt(li.fuwushijian) * 1000).toISOString().replace(/T/,' ').substr(0,11))+new Date(parseInt(li.fuwushijian) * 1000).toTimeString().substr(0,5)}}</div>
			        				<div class="order_mess_count fr ftsize14 cor-9e" style="height: 25px;line-height: 25px;" v-if="li.dingdanfuwu==null">共0项服务</div>
			        				<div class="order_mess_count fr ftsize14 cor-9e" style="height: 25px;line-height: 25px;" v-else="li.dingdanfuwu!=''">共{{li.dingdanfuwu.length}}项服务</div>
			        			</div>
			        		</div>
			        		<!--</router-link>-->
			        		<div class="fr order_list_box">
			        			<a class="order_list_btn canl_order" href="javascript:;" v-on:click="cancel(li.ordernum)" v-if="li.status==0">取消预约</a>
			        			<a class="order_list_btn canl_order" href="javascript:;" v-on:click="cancel(li.ordernum)" v-else-if="li.status==1">取消预约</a>
			        			<a class="order_list_btn canl_order" href="javascript:;" v-on:click="cancel(li.ordernum)" v-else-if="li.status==2">取消预约</a>
			        			<a class="order_list_btn" v-bind:href="'tel:'+li.tel">联系商家</a>
			        		</div>
			        	</li>
			  </ul>
		 </div>
		 <nodata v-show="orderlength"></nodata>
   </div>
</template>
<script>
import Vue from 'vue'
//取消
import { MessageBox } from 'mint-ui';
import nodata from './nodata.vue'
//下拉刷新
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default{
  name: 'center',
  data:function(){
    return{
    	topStatus: '', //xia
        listData: [],
        money:'',
        youhuiquanshu:'',
        jicikashu:'',
        orderlist:[],
        mingcheng:'',
        memberendtime:'',
        shopphoto:'',
        orderlength:false,
        toyouhui:'',
        tojicika:'',
        toyue:'',
        username:'',
        usersex:'',
        userphone:'',
        userlocation:'',
        useravater:'',
        useropenid:'',
        userinfo:''
    }
  },
  props:['messaage'],
  created:function(){
//	  JSON.parse()

	  //用户openid
	  this.useropenid = localStorage.getItem('openid');
	  //优惠券
  	  this.toyouhui = "/page/couponlist?openid="+this.useropenid+"&shanghuid="+this.messaage;
  	  //计次卡
  	  this.tojicika = "/page/metercard?openid="+this.useropenid+"&shanghuid="+this.messaage;
  	  //余额
  	  this.toyue = "/page/mybalance?openid="+this.useropenid+"&shanghuid="+this.messaage;
  	  this.userinfo = fixhtml+'perfect_info.html';
  	  const self = this
  	  document.setTitle(localStorage.getItem('shopname'));
  	  //会员信息
  	  Vue.http.get(newfix+"user.php?bs=userinfo&openid="+this.useropenid+"&shanghuid="+this.messaage).then(function(response){
        // sucess callback
        const json= JSON.parse(response.body);
        if(json.code==200){
	        self.listData = json.obj.user;
	        self.username = self.listData.nickname; //昵称
		  	if(self.listData.sex=='1'){//性别
		  		self.usersex = "男";
		  	}else{
		  		self.usersex = "女";
		  	}
	        self.jicikashu = self.listData.huiyuan.jicika;//计次卡
	        self.youhuiquanshu = self.listData.huiyuan.youhuiquan;//优惠券
	  		self.userphone = self.listData.phone;//手机
	  		
	  		self.userlocation = self.listData.location;//地址
	  		self.useravater = avater+"s_"+self.listData.avatar;//头像
	        if(self.listData.huiyuan.dengjimingcheng==null){
	        	self.mingcheng = "";//等级
	        }else{
	        	self.mingcheng = self.listData.huiyuan.dengjimingcheng;//等级
	        }
	        if(self.listData.huiyuan.money==null){
	        	self.money = "0.00";  //余额
	        }else{
	        	self.money = self.listData.huiyuan.money;  //余额
	        }
	        if(self.listData.huiyuan.jieshushijian==null){
	        	self.memberendtime = "";
	        }else if(self.listData.huiyuan.jieshushijian==0){
	        	self.memberendtime = "永久";
	        }else{
	        	self.memberendtime = new Date(parseInt(self.listData.huiyuan.jieshushijian) * 1000).toISOString().replace(/T/,' ').substr(0,11);
	        }
        }else{
//      	alert(jsons.code);
        }
      })
  	  //订单列表
  	  Vue.http.get(newfix+"dingdan.php?bs=dingdanliebiao&openid="+this.useropenid+"&shanghuid="+this.messaage+"&page=1").then(function(response){
	    // sucess callback
	    const jsons= response.body;
        if(jsons.code==200){
	        self.orderlist = jsons.obj.list;
	        self.shopphoto = shopphoto;
	        if(self.orderlist==null){
	        	self.orderlength = !self.orderlength;
	        }
        }else{
//      	alert(jsons.code);
        }
	  },function(response){
//        console(response);
      })
  },
  components:{
  	nodata:nodata
  },
  methods:{
		cancel:function(num){
			MessageBox.confirm('确定要取消预约吗?','').then(action =>{
				if(action=='confirm'){
  	  						  var openid = localStorage.getItem("openid")
							  Vue.http.get(newfix+"dingdan.php?bs=fuwudingdanquxiao&openid="+openid+"&ordernum="+num).then(function(response){
						        // sucess callback
						        var json= response.body;
						      	if(json.code==200){
						      		//订单信息
						      		MessageBox('', '取消预约成功');
						      	}
						      },function(response){
						//        console(response);
						      })
				}
			})
		},
		toorderdetail:function(id,shanghuid){
        	this.$router.push('/page/orderdetail?id='+id+"&shanghuid="+shanghuid);
		}
  }
}
	
</script>

<style scoped>
.myaccountbg{overflow:hidden;background-size:100% 100%;background-repeat:no-repeat}
.myaccount_box_bg{margin:13px auto;margin-bottom:0;padding:13px;padding-bottom:0;width:85%;height:153px;border-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0;background-size:100% 170px;background-repeat:no-repeat}
.myaccount_head{overflow:hidden}
.myaccount_head img{float:left;margin-right:13px;width:60px;height:60px;border-radius:30px}
.myaccount_head_cont{z-index:200;overflow:hidden;background-position:right 20px;background-size:7px 14px;background-repeat:no-repeat}
.myaccount_head_cont h3{margin:0;height:30px;color:#fff;font-size:1pc;line-height:30px}
.myaccount_head_cont .myaccount_head_cont_loca{height:30px;color:rgba(148,112,56,.8);font-size:15px;line-height:30px}
.myaccount_info{z-index:32333333;overflow:hidden;border-bottom:1px solid hsla(0,0%,93%,.7);background:#fff}
.myaccount_info ul li{float:left;width:33.3%}
.myaccount_info ul li div:first-child{height:33px;color:#f60;text-align:center;font-size:1pc;line-height:33px}
.myaccount_info ul li div:last-child{height:33px;color:#333;text-align:center;font-size:9pt;line-height:33px}
.ordermex{padding:13px;border-bottom:none;background:0 0;color:#636363;font-size:14px}
.order_list-li{overflow:hidden;margin:0 auto;margin-bottom:10px;padding:13px;border:1px solid hsla(0,0%,93%,.7);border-radius:4px;background:#fff}
.order_list-li:last-child{margin-bottom: 0;}
.order-box-top,.order_box{overflow:hidden;border-bottom:1px solid hsla(0,0%,93%,.7)}
.order-box-top{padding-bottom:10px}
.order-fuwu ul{margin-bottom:26px;padding-top:10px}
.order-fuwu ul li{clear:both;margin-bottom:25px;height:15px;line-height:15px}
.order-fuwu-name{color:#333;font-size:1pc}
.order-fuwu-peo{margin:1px auto;color:#333;font-size:14px;width: 101px;text-align: right;}
.order_list_box{padding-top:13px}
.order_mess_img{float:left;margin-right:13px;width:30px;height:30px;border-radius:15px;background-size:90pt}
.order_mess{overflow:hidden}
.order_mess_name{margin:0;height:30px;color:#333;font-size:1pc;line-height:30px}
.order_mess_time{clear:both;margin-bottom:13px;height:25px;color:#636363;font-size:14px;line-height:25px}
.order_mess_tit{font-size:12px;color:#636363}
.order_list_btn{padding:7px 12px;display:inline-block;border:1px solid #e7e7e7;font-size:12px;color:#636363;border-radius:2px;margin-left:13px}
.userlocal{font-size:15px;margin-left:13px;color:rgba(148,112,56,.8)}
.myaccount_level{font-size:14px;color:#FFF;margin-top:30px}
.order_list{padding: 13px;padding-top: 0;}
.order-nodata{text-align:center}
.order-nodata img{width:50%}
.order-nodata-word{font-size:15px;color:#9e9e9e;margin-top:10px}
.myaccount_head_img{float:left;margin-right:13px;width:60px;height:60px;border-radius:30px;background-size:100%;background-repeat:no-repeat}
.prder-name{
	width: 50%;
	display: inline-block;
}
</style>