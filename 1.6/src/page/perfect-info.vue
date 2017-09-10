<template>
	<div style="background: #FFFFFF;overflow: hidden;">
		<div class="avater">
		    <div class="control-group js_uploadBox">
		        <div class="js_showBox  avater_box" style="background-image: url(static/image/touxiang@3x.png) no-repeat;">
		            <img class="js_logoBox" src="http://www.quanminlebang.com/photo/avatar/20170301202811_532.jpg">
		        </div>
		        <div class="btn-upload">
		            <input class="js_upFile" type="file" name="cover">
		        </div>
		    </div>
		    <div class="avater_tit">上传头像，展示最好的一面吧!~</div>
		</div>
		<!--姓名-->
		<ul class="table-view perfect-view">
			<li><a href="javascript:;">昵称<input type="text" class="fr perfect-li perfect-input" value="" placeholder="请输入姓名" /></a></li>
			<li><a href="javascript:;">性别<div class="fr perfect-li">男</div></a></li>
			<li><a href="javascript:;">年龄<div class="fr perfect-li">25</div></a></li>
			<li><a href="javascript:;">职业<div class="fr perfect-li">白领</div></a></li>
			<li><a href="javascript:;">所在小区<div class="fr perfect-li">九龙山家园</div></a></li>
		</ul>
        <div class="footer_chiose" v-on:click="appoint()">提交资料</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        zhiyezhao:''
    }
  },
  props:['messaage'],
  created:function(){
  	  const self = this
  	  //服务人员列表
//	  Vue.http.get(fixurl+"bianminfuwu.php?bs=shanghuxiangqing&openid=a141ddbd3787227ae27ba99a48140b9e&id="+this.messaage).then(function(response){
//      // sucess callback
//      var json= response.body;
//      if(self.listData.code=200){
//      	self.listData = eval("(" + json +")").obj.user;
//      	self.zhiyezhao = zhiyephoto;
//      	console.log(self.listData);
//      }else{
//      	alert(self.listData.code)
//      }
//    },function(response){
////        console(response);
//    })
  },
  methods:{
	appoint:function(){
//		alert("提交成功");
    	this.$router.push('/page/main?id=389');
	}

  }
}
</script>

<style scoped>
.avater{text-align:center;margin:15px 0;margin-top:20px}
.js_uploadBox{position:relative;overflow:hidden;width:80px;height:80px;margin:0 auto}
.avater_tit{font-size:15px;color:#333;margin-top:15px}
.avater_box{width:80px;height:80px;border:1px solid #e7e7e7;border-radius:40px;background-size:40px;background-position:center}
.js_showBox{position:relative}
.btn-upload{width:80px;height:80px;position:absolute;top:0}
.avater_box img{width:78px;border-radius:40px;height:78px;border:1px solid #e7e7e7}
.btn-upload input{width:106px;height:80px;position:absolute;left:0;top:0;z-index:1;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;cursor:pointer}
.perfect-view li a{font-size:15px;color:#333}
.perfect-li{font-size:15px;color:#9e9e9e}
.perfect-input{text-align:right;border:none}

</style>