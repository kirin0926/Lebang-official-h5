<template>
	<div>
		<div class="center">
			<div class="myaccount_head">
	            <img v-bind:src="useravater"/>
	            <div class="myaccount_head_cont">
	                <h3><span class="username">{{username}}</span> <span class="userlocal">{{usersex}}·{{userlocation}}</span></h3>
	                <div class="myaccount_head_cont_loca">已绑定手机号: {{userphone}}</div>
	            </div>
	        </div>
		</div>
		<div class="ordermex"><img src="static/image/huangguan.png"/>我的会员卡</div>
		<div class="member-card"  v-if="length!=0">
			<div class="member-li" v-for="li in memberlist" v-on:click="tomain(li.dianpu.id)">
				<div class="member-head owh">
		            <img v-if="li.dianpu.cover!=null" v-bind:src="shoplogo+li.dianpu.cover"/>
		            <img v-else="li.dianpu.cover==null" v-bind:src="morenlogo"/>
		            <div class="member-body owh">
		                <h3 v-if="li.dianpu.mingcheng ==null">----</h3>
		                <h3 v-else="li.dianpu.mingcheng !=null">{{li.dianpu.mingcheng}}</h3>
		                <div class="member-li-level" v-if="li.jieshushijian==0">{{li.dengjimingcheng +" "+"永久"}}</div>
		                <div class="member-li-level" v-if="li.jieshushijian!=0">{{li.dengjimingcheng +" "+new Date(parseInt(li.jieshushijian) * 1000).toISOString().replace(/T/,' ').substr(0,11)}}到期</div>
		            </div>
		        </div>
		        <div class="member-mess owh">
		        	<div class="fl mmleft">
		        		{{li.money}}
		        		<div class="mmtitle">账户余额</div>
		        	</div>
		        	<div class="fl mmright">
		        		{{li.jicika}}
		        		<div class="mmtitle">计次卡</div>
		        	</div>
		        </div>
			</div>
		</div>
		<div class="member-nocard" v-else="length==0">
			<img src="static/image/nodata.png" alt="没有数据logo图" />
			<div class="member-nocard-word">暂时没有相关内容</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        useravater:'',
        username:'强',
        usersex:'男',
        userlocation:'天之骄子',
        userphone:'15525925190',
        data:'',
        mdata:'',
        memberlist:'',
        shoplogo:'',
        morenlogo:'',
        length:''
    }
  },
  props:['messaage'],
  created:function(){
  	var openid = localStorage.getItem("openid")
    if(openid==null){
    	localStorage.setItem('loginfrome',"2"); //1 店铺主页  2会员卡中心 3我的预约  4我的店铺  5优惠券
        window.location.href="login.html";
    }
    
    
  	document.setTitle("会员卡中心");
  	this.shoplogo = shopphoto;
  	this.morenlogo = "static/image/moren.png";
  	const self = this;
  	Vue.http.get(newfix+"user.php?bs=userinfo&openid="+openid).then(function(response){
        // sucess callback
        var json= response.body;
        self.mdata = JSON.parse(json);
        if(self.mdata.code==200){
        	self.useravater = avater+self.mdata.obj.user.avatar;
        	self.username = self.mdata.obj.user.nickname;
        	self.userlocation = self.mdata.obj.user.location;
        	self.userphone = self.mdata.obj.user.phone;
        	if(self.mdata.obj.user.sex ==1){
        		self.usersex = "男"
        	}else{
        		self.usersex = "女"
        	}
        }else{
//      	alert(self.mdata.code);
        }
    });
  	Vue.http.get(newfix+"user.php?bs=huiyuankaliebiao&openid="+openid).then(function(response){
        // sucess callback
        var json= response.body;
        self.data = JSON.parse(json);
        if(self.data.code==200){
        	self.memberlist = self.data.obj.list;
	        if(self.data.obj.list==null){//没有数据
	        	self.length = "0";
	        }else if(self.data.obj.list.length==0){
	        	self.length = "0";
	        }else{
	        	self.length = "1";
	        }
        }else{
//      	alert(self.data.code)
        }
        
    });
  },
  components:{
  	
  },
  methods:{
  	tomain:function(id){
		if(id==undefined){
			alert("当前店铺异常");
		}else if(id==null){
			alert("当前店铺异常");
		}else if(id==''){
			alert("当前店铺异常");
		}else{
      		sessionStorage.setItem('gocenter',0);
			this.$router.push('/page/main?id='+id)
		}
  	}
  }
}
</script>

<style scoped="scoped">
.center{height:110px;background:-ms-linear-gradient(left,#fc5a58,#fe802c);background:-moz-linear-gradient(left,#fc5a58,#fe802c);background:-webkit-gradient(linear,0 0,0 100%,from(#fc5a58),to(#fe802c));background:-webkit-gradient(linear,0 0,0 100%,from(#fc5a58),to(#fe802c));background:-webkit-linear-gradient(left,#fc5a58,#fe802c);background:-o-linear-gradient(left,#fc5a58,#fe802c);overflow:hidden}
.myaccount_head{overflow:hidden;margin: 25px 0;margin-left: 13px;}
.myaccount_head img{float:left;margin-right:13px;width:60px;height:60px;border-radius:30px}
.myaccount_head_cont{z-index:200;overflow:hidden;background-position:right 20px;background-size:7px 14px;background-repeat:no-repeat}
.myaccount_head_cont h3{margin:0;height:30px;color:#fff;font-size:1pc;line-height:30px}
.myaccount_head_cont .myaccount_head_cont_loca{height:30px;color:#fac4ba;font-size:15px;line-height:30px}
.myaccount_info{z-index:32333333;overflow:hidden;border-bottom:1px solid hsla(0,0%,93%,.7);background:#fff}
.myaccount_info ul li{float:left;width:33.3%}
.myaccount_info ul li div:first-child{height:33px;color:#f60;text-align:center;font-size:1pc;line-height:33px}
.myaccount_info ul li div:last-child{height:33px;color:#333;text-align:center;font-size:9pt;line-height:33px}
.ordermex{padding: 0 13px;border-bottom: none;background: 0 0;color: #9e9e9e;font-size: 14px;}
.ordermex img{width: 30px;height: 30px;position: relative;top: 5px;margin-right: 10px;}
.member-card{padding:13px}
.member-li{background:#FFF;border-radius:4px;padding:13px;box-shadow:1px 2px 10px rgba(1,1,2,.1);overflow:hidden;margin-bottom: 10px;cursor: pointer;}
.member-li:last-child{margin-bottom: 0;}
.member-head img{width:44px;height:44px;border-radius:22px;float:left;margin-right:13px}
.member-body h3{height:22px;line-height:22px;font-size:16px;color:#333}
.member-li-level{height:22px;line-height:22px;color:#9E9E9E;font-size:15px}
.member-mess{text-align:center;font-size:17px;color:#333;margin-top:27px}
.mmleft{width:49.8%;height:60px;line-height:30px}
.mmright{width:49.8%;height:60px;line-height:30px;border-left:1px solid hsla(0,0%,93%,.7);}
.mmtitle{font-size: 15px;color: #9E9E9E;}

.member-nocard{
	text-align: center;
}
.member-nocard img{
	width: 50%;
}
.member-nocard-word{
	font-size: 15px;
	color: #9E9E9E;
	margin-top: 10px;
}
</style>