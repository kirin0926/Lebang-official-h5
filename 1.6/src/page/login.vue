<template>
	<div id="" style="background: #fff;">
		<h3 class="login_h3">请使用全民乐帮账号登录</h3>
		<div class="input-row">
	        <i class="login_phone"></i>
	        <input id="account" type="text" placeholder="请输入手机号" maxlength="11" v-model="phone">
	    </div>
	    <div class="input-row" style="position: relative;">
	        <i class="login_sms"></i>
	        <input id="password" type="text" placeholder="请输入验证码" maxlength="4" v-model="code">
	        <input id="sendbtn" class="getCode" type="button" v-model="timerCodeMsg" v-on:click="getcode(this)">
	        	<!--value="获取验证码"-->
	        <!--disabled="disabled"-->
    	</div>
    	<div class="input-row mt1">
        	<input id="sign" class="submits" type="submit" value="登录" v-on:click="login()">
    	</div>
    	
	</div>
	
    
</template>

<script scoped>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        phone:'',
        code:'',
        codeData:'',
        loginData:'',
        bg:true,
        o:'获取验证码',
        timerCodeMsg:''
    }
  },
  created:function(){
  	  const backg = this.bg;
  	  
     this.timerCodeMsg = '获取验证码'
  	  if(backg){
  	  	document.getElementsByTagName("html")[0].setAttribute("style","background-color:white")
  	  }
  },
  methods:{
	getcode:function(){
  	  const self = this
		if(this.phone.length!=11){
			alert("请输入正确的手机号");
		}else{
			let sec =60;
		    for(let  i=0; i<=60; i++){
		       window.setTimeout(function(){
		           if (sec != 0) {
		             self.timerCodeMsg =  "已发送("+sec+")";
		            sec--;
		         } else {
		             self.timerCodeMsg =   "重新获取" ;
		             sec = 60;//如果倒计时结束就让  获取验证码显示出来
		             self.fetchCodeMsg = true
		        }
		       }, i * 1000)
		     }
			const phone = this.phone;
			const ip =(returnCitySN["cip"]);
		    const self = this;
            const times = Date.parse(new Date())/1000 ;
            const mac = "30-55-24-99-03-81";
//          macs = mac.substr(0,mac.length-1);
            const bef = Number(times)-Number(444);
            const sign = md5(bef+phone+"3c66790a694fd53aed110a8e85f1aeec"+ip);
	  	  //获取验证
	  	  Vue.http.get(fixurl+"ajax.php?bs=sms&phonemob="+phone+"&ip="+ip+"&mac="+mac+"&time="+times+"&sign="+sign).then(function(response){
	      //sucess callback
	        var json= response.body;
	        self.codeData = eval("(" + json +")");
	        if(self.codeData.code==200){
//	        	alert("已发送验证码，注意查收");
	        }else{
//	        	alert(self.codeData.code);
	        }
	//      console.log(self.listData)
	      },function(response){
	//        console(response);
	      })
	  	  
		}
	},
	login:function(){
  	  const self = this
		Vue.http.get(fixurl+"user.php?bs=login&laiyuan=yidongzhan&sms="+self.code+"&phone="+self.phone).then(function(response){
	      //sucess callback
	        var json= response.body;
	        self.loginData = eval("(" + json +")");
	        if(self.loginData.code==200){
  	  			document.getElementsByTagName("html")[0].setAttribute("style","background-color:")
  	  			localStorage.setItem('user',JSON.stringify(self.loginData.obj.user))
  	  			localStorage.setItem('openid',self.loginData.obj.user.openid)
				self.$router.push('/page/main?id='+localStorage.getItem("shanghuid"));
	        }else{
//	        	alert(self.loginData.code)
	        }
	      },function(response){
	//        console(response);
	      })
	}
  }
}

</script>

<style scoped>
.login_h3{font-size:18px;color:#333;font-weight:500;margin-top:5pc}
.input-row,.login_h3{text-align:center}
.login_phone{background:url(../../static/image/login_phone.png) no-repeat;background-size:13px;width:19px;height:23px;position:absolute;margin-top:30px;margin-left:10px;z-index:1}
#account{width:80%;border:#ffdead;border-bottom:1px solid hsla(0,0%,80%,.5);border-radius:0;padding:0 0 0 35px;margin:18px 0;font-size:14px;height:3pc}
.login_sms{background:url(../../static/image/login_sms.png) no-repeat;background-size:14px;width:20px;height:23px;position:absolute;margin-top:9pt;margin-left:9px}
#password{width:80%;border:#ffdead;border-bottom:1px solid hsla(0,0%,80%,.5);border-radius:0;padding:0 0 0 35px;font-size:14px;height:3pc}
#sendbtn:disabled{color:#c7c7cd!important}
#sendbtn{background:#fff;position:absolute;left:inherit;right:10px;padding:0;height:46px;color:#f60;border:none;width:106px;opacity:1;border-radius:0;border-top-right-radius:3px;border-bottom-right-radius:3px}
#sign:disabled{color:#ff8c3f}
#sign,#sign:disabled{background:#f60;border:none}
#sign{height:47px;border-radius:3px;font-size:1pc;width:90%;opacity:1;color:#fff}
.mt1{margin-top:25px}
</style>