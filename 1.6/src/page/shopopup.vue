<template>
	<div>
		<div class="popup-center">
			<img src="static/image/shoucangdian.png" alt="收藏店铺" />
			<h3>成为本店会员，店铺将会获取您的基本信息</h3>
			<div class="popup-btn">
				<div class="popup-btn-left" v-on:click="jujue()">残忍拒绝</div>
				<div class="popup-btn-right" v-on:click="shoucang()">收藏店铺</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
  name:'shopopup',
  data:function(){
    return {
      data: ''
    }
  },
  created:function(){
  	  //订单列表

  	document.setTitle("收藏店铺弹窗");
  },
  components:{
  	
  },
  methods:{
	shoucang:function(){
		
  	  const self = this
  	  var Request = new UrlSearch(); //实例化
      var paramValue = Request.openid;    //id; 1939
      var shanghuid = Request.id;
  	  Vue.http.get("http://www.quanminlebang.cn/weizhan150/shanghu.php?bs=shoucangshanghu&openid="+paramValue+"&shanghuid="+shanghuid).then(function(response){
	    // sucess callback
	    var json= response.body;
        self.data = eval("(" + json +")");
        if(self.data.code==200){
        	alert("收藏成功");
        	self.$router.push('/page/main?id='+shanghuid);
        }else if(self.data.code==4011){
        	alert("已经收藏");
        	self.$router.push('/page/main?id='+shanghuid);
        }
	  },function(response){
//        console(response);
      })
	},
	jujue:function(){
  	  var Request = new UrlSearch(); //实例化
      var paramValue = Request.openid;    //id; 1939
      var shanghuid = Request.id;
      this.$router.push('/page/main?id='+shanghuid);
	}
  }
} 
</script>

<style scoped="scoped">
.popup-center{width:85%;background:#fff;margin:0 auto;margin-top:100px;overflow:hidden;border-radius:4px}
.popup-center img{width:100%}
.popup-center h3{text-align:center;margin:40px;color:#9e9e9e;font-size:14px}
.popup-btn{margin-bottom:40px;text-align:center}
.popup-btn div{display:inline-block;width:45%;text-align:center;cursor: pointer;}
.popup-btn-left{height:50px;line-height:50px;border-radius:30px;border:1px solid #e7e7e7;color:#9e9e9e;font-size:16px}
.popup-btn-right{height:50px;line-height:50px;border-radius:30px;background:#f60;color:#FFF;font-size:16px}

</style>