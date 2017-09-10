<template>
	<div>
		<div class="coupon" v-show="hide">
			<div class="meterbg">
				<div class="meternum" v-text="count"></div>
			<ul class="meterlist">
				<li v-for="lis in cardlist">
					<div class="fl" v-if="lis.jicikamingcheng==null">----</div>
					<div class="fl" v-else="lis.jicikamingcheng!=null">{{lis.jicikamingcheng}}</div>
					<div class="owh tr">{{lis.shengyucishu}} / <span class="countmeter">{{lis.cishu}}</span></div>
				</li>
			</ul>
		    </div>
	    	<div class="box-title">交易记录</div>
			<ul class="meterorderlist" v-if="shos==2">
				<li v-for="li in consulist">
					<div class="fl">
						<h3 class="metername" v-if="li.jicikamingcheng==null">----</h3>
						<h3 class="metername" v-if="li.jicikamingcheng!=null">{{li.jicikamingcheng}}</h3>
						<div class="metertime">{{new Date(parseInt(li.shijian) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\//g,'-')}}</div>
					</div>
					<div class="owh tr metercount" v-if="li.type=='1'">+{{li.cishu}}</div>
					<div class="owh tr" v-else="li.type=='2'">-{{li.cishu}}</div>
				</li>
			</ul>
	    	<nodata v-else="shos==1"></nodata>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import nodata from '../page/nodata.vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        cardlist:[],
        bg:'static/image/nocomt.png',
        consulist:[],
        count:'',
        hide:false,
        shos:''
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
  	  Vue.http.get(newfix+"user.php?bs=jicikaliebiao&openid="+openid+"&shanghuid="+paramValue).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        if(json.code==200){
        	self.listData = json.obj
	        self.consulist = self.listData.lists; //计次卡添加消费记录
	        self.cardlist = self.listData.list; //计次卡列表
	        self.count = self.listData.jicikashu;//计次卡总数
	        self.hide = !self.hide;
	        if(self.cardlist==null){//没有数据
	        	self.shos = "1";
	        }else{
	        	self.shos = "2"; //有数据
	        }
        }else{
        	alert(json.code);
        }

      },function(response){
//        console(response);
      })
  	  document.setTitle('我的计次卡')
  },
  components:{
  	nodata:nodata
  },
  methods:{
  	
  }
}
	
</script>

<style>
/*new*/
.meterbg{
	background: #44d089;
    overflow: hidden;
}
.meternum{
	margin-top: 60px;
    text-align: center;
    font-size: 50px;
    color: #fff;
    margin-bottom: 44px;
}
.meterlist{
	overflow: hidden;
    margin-bottom: 13px;
    width: 3.2rem;
}
.meterlist li{
	font-size: 16px;
	color: #FFFFFF;
    clear: both;
    margin-top: 13px;
    padding: 0 13px;
}
.box-title{
	padding: 13px;
    color: #8e8e8e;
    font-size: 14px;
}
.meterorderlist{
	background: #fff;
    
}
.meterorderlist li{
	padding: 13px;
    overflow: hidden;
    border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);
}
.meterorderlist li:last-child{
	border-bottom:none;
}
.metername{
	font-size: 16px;
	color: #333;
    margin-bottom: 12px;
}
.metertime{
	font-size: 12px;
	color: #9e9e9e;
}
.metercount{
	height: 45px;
    line-height: 45px;
}
.countmeter{
	color: rgba(255, 255, 255, 0.6);
}
</style>