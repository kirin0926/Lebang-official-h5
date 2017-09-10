<template>
	<div v-show="hide">
		<div class="balancebg owh">
			<div class="countbalace">
				{{consumoney}}
			</div>
			<div class="owh" style="margin-bottom: 14px;">
				<div class="fl balancetabl">
					<div>{{savemoney}}</div>
					<div>储值金额</div>
				</div>
				<div class="fl balancetabl">
					<div>{{wastmoney}}</div>
					<div>消费金额</div>
				</div>
			</div>
		</div>
		<div class="box-title">交易记录</div>
		<ul class="meterorderlist" v-if="shos==2">
				<li v-for="li in consulist">
					<div class="fl">
						<h3 class="metername" v-if="li.type =='1'">消费 </h3>
						<h3 class="metername" v-else="li.type =='2'">储值 </h3>
						<div class="metertime">{{new Date(parseInt(li.addtime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\//g,'-')}}</div>
					</div>
					<div class="owh tr metercount" v-if="li.type =='1'">- {{li.money}}</div>
					<div class="owh tr metercount" v-else="li.type =='2'">+ {{li.money}}</div>
				</li>
		</ul>
		<nodata v-else="shos==1"></nodata>
	</div>
</template>

<script>
import Vue from 'vue'
import nodata from './nodata.vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: "",
        wastmoney:'',
        savemoney:'',
        consulist:'',
        consumoney:'',
        hide:false,
        shos:""
    }
  },
  created:function(){
  	//计次卡列表
      const Request = new UrlSearch(); //实例化
      const openid = Request.openid;      //APP a0f3bfb2d34f2821f540bd5b747a9b8a
      const share = Request.share;  //Share
      const paramValue = Request.shanghuid;    //id; 1939
  	  const self = this
      sessionStorage.setItem('gocenter',1);
  	  Vue.http.get(newfix+"user.php?bs=chuzhijilu&openid="+openid+"&shanghuid="+paramValue).then(function(response){
        // sucess callback
        var json= response.body;
        self.listData = JSON.parse(json).obj;
        if(self.listData.xiaofei==null){
        	self.wastmoney = 0.; //消费金额
        }else{
        	self.wastmoney = self.listData.xiaofei; //消费金额
        }
        if(self.listData.chuzhi ==null){
        	self.savemoney = 0; //储值金额
        }else{
        	self.savemoney = self.listData.chuzhi; //储值金额
        }
        self.consumoney = self.listData.money;
        self.consulist = self.listData.list;//我的余额交易记录
        self.hide = !self.hide;
        if(self.consulist==null){//无数据
        	self.shos = "1";
        }else{
        	self.shos = "2";
        }
     
      },function(response){
//        console(response);
      })
		document.setTitle('我的余额');
  },
  components:{
  	nodata:nodata
  },
  methods:{
  	
  }
}
	
</script>

<style scoped="scoped">
.balancebg{background:#f60}
.countbalace{text-align:center;font-size:50px;color:#fff;margin-top:64px;margin-bottom:53px}
.balancetabl{width:50%;text-align:center}
.balancetabl div:first-child{font-size:16px;color:#fff;margin-bottom:12px}
.balancetabl div:last-child{font-size:12px;color:rgba(255,255,255,.6)}

</style>