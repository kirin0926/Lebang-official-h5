<template>
	<div>
		<ul class="order_list">
		        	<li class="order_list-li" v-for="li in orderlist" track-by="$index">
		        		<!--<router-link v-bind:to="toorderdetail+li.id">-->
		        		<div class="order_box" v-on:click="todetail(li.id,li.dianpu.id)">
		        			<div class="order-box-top">
		        				<div class="order_mess_img" v-bind:style="{'background-image':'url('+shopphoto+li.dianpu.cover+')'}"></div>
			        			<div class="order_mess">
			        				<h3 class="order_mess_name">
			        					<span class="order-mame ellipsis">{{li.dianpu.mingcheng}}</span>
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
		        						<div class="fl order-fuwu-name">{{is.fuwumingcheng}}</div>
			        					<div class="fr tl order-fuwu-peo ellipsis" v-if="is.fuwurenyuan==''">服务人员：----</div>
			        					<div class="fr tl order-fuwu-peo ellipsis" v-else-if="is.fuwurenyuan==null">服务人员：----</div>
			        					<div class="fr tl order-fuwu-peo ellipsis" v-else-if="is.fuwurenyuan!=null">服务人员：{{is.fuwurenyuan.shanghunicheng}}</div>
		        					</li>
		        				</ul>
		        				<div class="order_mess_time fl" v-if="li.fuwushijian=='NaN'">预约时间：---------</div>
		        				<div class="order_mess_time fl" v-else-if="li.fuwushijian==null">预约时间：---------</div>
		        				<div class="order_mess_time fl" v-else-if="li.fuwushijian==''">预约时间：---------</div>
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
</template>

<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
export default{
  name:'shopopup',
  data:function(){
    return {
      orderlist: '',
      ordershopcover:'',
      ordershopmingcheng:'',
      shopphoto:'',
      toorderdetail:'',
      orderlength:''
    }
  },
  created:function(){
  	  const self = this
  	  var openid = localStorage.getItem("openid")
      if(openid==null){
    		localStorage.setItem('loginfrome',"3"); //1 店铺主页ok  2会员卡中心ok 3我的预约ok  4我的店铺ok  5优惠券
        	window.location.href="login.html";
      }
  	  document.setTitle("我的预约");
  	  //订单列表
  	  Vue.http.get(newfix+"dingdan.php?bs=dingdanliebiao&openid="+openid).then(function(response){
	    // sucess callback
	    
	    var json= response.body;
        if(json.code==200){
	        self.orderlist = json.obj.list;
	        self.shopphoto = shopphoto;
	        if(self.orderlist==null){
	        	self.orderlength = !self.orderlength;
	        }
        }

	  },function(response){
//        console(response);
      })
  },
  components:{
  	
  },
  methods:{
	cancel:function(num){
				MessageBox.confirm('确定要取消预约吗?','').then(action => {
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
	todetail:function(id,shanghuid){
        this.$router.push('/page/orderdetail?id='+id+"&shanghuid="+shanghuid);
	}
  }
} 
</script>

<style scoped="scoped">
.order_list-li{overflow:hidden;margin:0 auto;margin-bottom:10px;padding:13px;border:1px solid hsla(0,0%,93%,.7);border-radius:4px;background:#fff}
.order_list-li:last-child{margin-bottom: 0;}
.order-box-top,.order_box{overflow:hidden;border-bottom:1px solid hsla(0,0%,93%,.7)}
.order-box-top{padding-bottom:10px}
.order-fuwu ul{margin-bottom:26px;padding-top:10px}
.order-fuwu ul li{clear:both;margin-bottom:25px;height:15px;line-height:15px}
.order-fuwu-name{color:#333;font-size:1pc}
.order-fuwu-peo{margin:1px auto;color:#333;font-size:14px;width: 141px;text-align: right;}
.order_list_box{padding-top:13px}
.order_mess_img{float:left;margin-right:13px;width:30px;height:30px;border-radius:15px;background-size:90pt}
.order_mess{overflow:hidden}
.order_mess_name{margin:0;height:30px;color:#333;font-size:1pc;line-height:30px}
.order_mess_time{clear:both;margin-bottom:13px;height:25px;color:#636363;font-size:14px;line-height:25px}
.order_mess_tit{font-size:12px;color:#636363}
.order_list_btn{padding:7px 12px;display:inline-block;border:1px solid #e7e7e7;font-size:12px;color:#636363;border-radius:2px;margin-left:13px}
.userlocal{font-size:15px;margin-left:13px;color:rgba(148,112,56,.8)}
.myaccount_level{font-size:14px;color:#FFF;margin-top:30px}
.order_list{padding: 13px;}
.order-mame{
	width: 50%;
	display: inline-block;
}
</style>