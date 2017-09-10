<template>
	<div class="pg13">
		<div class="orderstatus pg13 bor1 bdr4">
			<!--<h3 class="fl ftsize16" v-text="status"></h3>-->
			<h3 class="fl ftsize16" v-if="status==0">等待商家确认信息</h3>
			<h3 class="fl ftsize16" v-else-if="status==1">等待商家确认信息</h3>
			<h3 class="fl ftsize16" v-else-if="status==2">商家已确认信息</h3>
			<h3 class="fl ftsize16" v-else-if="status==3">订单已完成</h3>
			<h3 class="fl ftsize16" v-else-if="status==5">订单已取消</h3>
			<div class="owh tr ftsize12 cor-63">{{overtime}}</div>
			<div class="cl mt10 ftsize12 cor-63" v-if="status==0">商家若长时间未联系您，您可以给商家打电话确认信息~</div>
			<div class="cl mt10 ftsize12 cor-63" v-else-if="status==1">商家若长时间未联系您，您可以给商家打电话确认信息~</div>
			<div class="cl mt10 ftsize12 cor-63" v-else-if="status==2">商家已确认预约，请您按商家约定时间准时到店哦~</div>
			<div class="cl mt10 ftsize12 cor-63" v-else-if="status==3">如果对订单有疑惑，可以拨打客服热线或联系商家</div>
			<div class="cl mt10 ftsize12 cor-63" v-else-if="status==5">如果对订单有疑惑，可以拨打客服热线或联系商家</div>
		</div>
		<div class="mt13 mb13">订单明细</div>
		<div class="orderprj pg13 bgfff bor1">
			<div class="orderprj-top">
				<img class="fl" v-bind:src="scurl+shopcover" alt="店铺头像" />
				<div class="owh" v-text="shopname"></div>
			</div>
			<div class="orderprj-view">
				<ul class="orderprj-fuwu">
					<li class="owh cl" v-for="li in shopslist">
						<img class="fl mr13" v-bind:src="fuwurl+li.photo" alt="" />
						<div class="owh">
							<h3 v-if="li.fuwurenyuan!=null">{{li.fuwumingcheng}}</h3>
							<h3 v-if="li.fuwurenyuan==null">----</h3>
							<div class="orderprj-money">
								¥{{li.danjia}} 
								<span class="fr ellipsis" v-if="li.fuwurenyuan!=null">服务人员：{{li.fuwurenyuan.shanghunicheng}}</span>
								<span class="fr ellipsis" v-else="li.fuwurenyuan==null">服务人员：----</span>
							</div>
						</div>
					</li>
				</ul>
				<div class="mt13 orderprj-count">预约时间：{{onlinetime}}<span class="fr">共{{shopslistlength}}项服务</span></div>
				<div class="orderPayment pt13" v-if="status==3">
					<!--判断订单状态staus==3订单状态完成的时候显示-->
					<!--有优惠的时候显示这里的内容，没有优惠的时候隐藏-->
					<!--hide == 2的时候显示，1的时候隐藏-->
					<ul v-show="hide==2">
						<li class="cl owh" v-if="leixing==1"><div class="fl cor-63 ftsize14"><i class="icon-quan" style="background-image: url(static/image/icon-quan.png);"></i>优惠券</div><div class="fr cor-f6 ftsize14">-¥10</div></li>
						<li class="cl owh" v-else="leixing==2"><div class="fl cor-63 ftsize14"><i class="icon-ji" style="background-image: url(static/image/icon-ci.png);"></i>计次卡</div><div class="fr cor-f6 ftsize14">-1</div></li>
						<!--<li class="cl owh"><div class="fl cor-63 ftsize14"><i class="icon-zhe" style="background-image: url(static/image/icon-zhe.png);"></i>会员折扣</div><div class="fr cor-f6 ftsize14">黄金会员0.85折</div></li>-->
						<li class="cl owh" v-if="chuzhi!=0"><div class="fl cor-63 ftsize14"><i class="icon-chu" style="background-image: url(static/image/icon-chu.png);"></i>储值支付</div><div class="fr cor-f6 ftsize14">-¥356</div></li>
					</ul>
					<div class="tr pt13 bortop1 ftsize14 cor-33">共付：<span class="cor-f6">¥{{shifujine}}</span></div>
				</div>
			</div>
		</div>
		
		<div class="mt13 mb13">其他信息</div>
		<div class="orderpaytype pg13 bgfff bor1 bdr4">
			<ul class="borbom1">
				<li><span>下单时间：</span>{{ordertime}}</li>
				<li v-if="fuwumoshi ==1"><span>服务模式：</span>上门服务</li>
				<li v-else="fuwumoshi ==2"><span>服务模式：</span>到店服务</li>
				<li><span>联系人信息：</span>{{payname+" "+payphone}}</li>
				<li v-if="status==3"><span>服务地址：</span>{{fuwudizhi}}</li>
			</ul>
			<div class="orderpaytype-btn" v-if="status==0"><a v-bind:href="customerphone">联系客服</a><a href="javascript:;" v-on:click="cancel(ordernum)">取消预约</a><a v-bind:href="shopphone">联系商家</a></div>
			<div class="orderpaytype-btn" v-else-if="status==1"><a v-bind:href="customerphone">联系客服</a><a href="javascript:;" v-on:click="cancel(ordernum)">取消预约</a><a v-bind:href="shopphone">联系商家</a></div>
			<div class="orderpaytype-btn" v-else-if="status==2"><a v-bind:href="customerphone">联系客服</a><a href="javascript:;" v-on:click="cancel(ordernum)">取消预约</a><a v-bind:href="shopphone">联系商家</a></div>
			<div class="orderpaytype-btn" v-else-if="status==3"><a v-bind:href="customerphone">联系客服</a><a href="javascript:;" v-on:click="toevaservice(1)">评价服务</a><a v-bind:href="shopphone">联系商家</a></div>
			<div class="orderpaytype-btn" v-else-if="status==5"><a v-bind:href="customerphone">联系客服</a><a v-bind:href="shopphone">联系商家</a></div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
export default{
  name: 'orderdetail',
  data:function(){
    return{
        listData: [],
        status:'3',  //订单状态 0 2 3 5   0 1未确认  2已确认 3完成  5 取消
        shopcover:'',
        scurl:"",
        shopname:'',
        shopslist:'',
        fuwurl:'',
        ordertime:'',
        payphone:'',
        payname:'',
        fuwumoshi:'',   //服务模式 1到家，2到店
        shopphone:'',
        ordernum:'',
        fuwudizhi:'',
        chuzhi:"",
        shifujine:'',
        leixing:"",
        hide:'1',
        shopslistlength:'',
        overtime:'',
        onlinetime:''
    }
  },
  created:function(){
  		const self = this
        var Request = new UrlSearch(); //实例化
        var id = Request.id;      //
        var shanghuid = Request.shanghuid;      //
        sessionStorage.setItem('gocenter',1);
  	  //订单详情 ?bs=dingdanxiangqing&id=1044&shanghuid=1939
  	  this.scurl = shopphoto;
  	  this.fuwurl = fuwuhoto;
  	  this.customerphone = "tel:"+customer;
  	  Vue.http.get(newfix+"dingdan.php?bs=dingdanxiangqing&id="+id+"&shanghuid="+shanghuid).then(function(response){
	    // sucess callback
	    var json= response.body;
        self.listData = json.obj;
        self.status = self.listData.list[0].status;//订单状态
        self.shopcover = self.listData.dianpu.cover;//店铺头像
        self.shopname = self.listData.dianpu.mingcheng;//店铺名称
        self.shopslist = self.listData.list[0].dingdanfuwu;//订单服务
        self.shopphone = "tel:"+self.listData.dianpu.dianhua;//店铺电话
        self.ordertime = new Date(parseInt(self.listData.list[0].addtime) * 1000).toISOString().replace(/T/,' ').substr(0,11)+new Date(parseInt(self.listData.list[0].addtime) * 1000).toTimeString().substr(0,5);//下单时间
        self.onlinetime= new Date(parseInt(self.listData.list[0].fuwushijian) * 1000).toISOString().replace(/T/,' ').substr(0,11)+new Date(parseInt(self.listData.list[0].fuwushijian) * 1000).toTimeString().substr(0,5);//服务时间
        self.fuwumoshi = self.listData.list[0].fuwumoshi;//服务模式
        self.fuwudizhi = self.listData.list[0].dizhi;
        self.payname = self.listData.list[0].name;//联系人名字
        self.payphone = self.listData.list[0].tel;//联系人手机号
        self.ordernum = self.listData.list[0].ordernum;//订单号
        self.shifujine = self.listData.list[0].shifujine;//总金额
        self.shopslistlength = self.listData.list[0].dingdanfuwu.length;//总服务
        self.chuzhi = self.listData.list[0].chuzhi; //储值=0 显示优惠券 
        if(self.listData.list[0].status==3){
        self.overtime = new Date(parseInt(self.listData.list[0].wanchengshijian) * 1000).toTimeString().substr(0,5);	
        }
        if(self.listData.list[0].youhui==null){
        	self.hide = "1"; //hide ==    1的时候隐藏
        }else{
        	//2 的时候显示
        	self.hide = "2";
	        self.leixing = self.lsistData.list[0].youhui.leixing;//根据优惠的类型判断 1 优惠券  2计次卡
        }
        document.setTitle("订单详情");
	  },function(response){
	  	
	  	
   })
  },
  methods:{
  	cancel:function(num){
  		MessageBox.confirm('确定要取消预约吗?','').then(action => {
				if(action=='confirm'){
							  Vue.http.get(newfix+"dingdan.php?bs=fuwudingdanquxiao&openid="+localStorage.getItem('openid')+"&ordernum="+num).then(function(response){
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
	toevaservice:function(id){
        var Request = new UrlSearch(); //实例化
        var id = Request.id;
        var shanghuid = Request.shanghuid;
        this.$router.push('/page/evaservice?id='+id+"&shanghuid="+shanghuid);
	}
  	
  }
}
	
</script>

<style scoped>
	.orderstatus{margin: 0 auto;background: #fff;}
	.orderstatus h3{color: #333333;}
	.orderprj{margin: 0 auto;border-radius: 4px;}
	.orderprj-top{overflow: hidden;padding-bottom: 13px;border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);}
	.orderprj-top img{width: 30px;height: 30px;border-radius: 15px;margin-right: 13px;}
	.orderprj-top div{height: 30px;line-height: 30px;font-size: 16px;color: #333333;}
	.orderprj-view .orderprj-fuwu li{padding: 13px 0;border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);}
	.orderprj-view ul li img{width: 60px;height: 60px;}
	.orderprj-view ul li h3{height: 30px;line-height: 30px;font-size: 16px;color: #333;}
	.orderprj-money{height: 30px;line-height: 30px;font-size: 16px;color: #FF6600;}
	.orderprj-money span{color: #636363;font-size: 14px;width: 141px;text-align: right;}
	.orderprj-count{font-size: 14px;color: #636363;}
	.orderprj-count span{color: #9e9e9e;}
	.orderpaytype{margin: 0 auto;}
	.orderpaytype ul li{font-size: 16px;color: #333333;margin-bottom: 25px;}
	.orderpaytype ul li:last-child{padding-bottom: 12px;margin-bottom: 0px;}
	.orderpaytype ul li span{width: 100px;display: inline-block;line-height: 20px;height: 20px;}
	.orderpaytype-btn{margin-top: 10px;text-align: right;}
	.orderpaytype-btn a{padding: 7px 13px;border: 1px solid hsla(0, 0%, 93%, 0.7);margin-right: 12px;display: inline-block;}
	.orderpaytype-btn a:last-child{margin-right: 0;}
	.orderPayment ul{border-top: 1px solid hsla(0, 0%, 93%, 0.7);padding: 13px 0;}
	.orderPayment ul li{height: 20px;line-height: 20px;margin-bottom: 10px;}
	.orderPayment ul li:last-child{margin-bottom: 0;}
	.icon-quan,.icon-ji,.icon-zhe,.icon-chu{width: 16px;height: 16px;background-repeat: no-repeat;background-size: 16px;margin-right: 6px;position: relative;top: 2px;}
</style>