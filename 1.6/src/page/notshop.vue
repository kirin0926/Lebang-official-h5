<template>
	<div>
		<div class="notshop-bg">
			<img src="static/image/noshop.png" alt="Logo" />
			<div class="notshop-yun" v-bind:style="{'background-image':'url('+noshopyun+')'}"></div>
		</div>
		<div class="notshop-word">
			店铺未审核，请联系客服！
		</div>
		<div class="notshop-btn">
			<a v-bind:href="chatphone">联系客服</a>
		</div>
	</div>
</template>

<script>
export default{
  name: 'fixtop',
  data:function(){
    return{
        chatphone:[],
        noshopyun:''
    }
  },
  created:function(){
  		this.chatphone  = "tel:"+customer;
  		this.noshopyun = "static/image/noshopyun.png";
  }
}
</script>

<style scoped="scoped">
body{background:#FFFFFF}
.notshop-bg img{width:105px;margin-top:30px}
.notshop-bg{height:266px;text-align:center;background:#FF6600;position:relative}
.notshop-word{padding:13px;text-align:center;font-size:18px;color:#333333}
.notshop-btn{margin-top:20px;text-align:center;padding:13px}
.notshop-btn a{display:block;height:50px;line-height:50px;color:#fff;background:#ff6600;border-radius:2px;font-size:16px}
.notshop-yun{position:absolute;height:57px;width:100%;background-size:100% 100%;bottom:0}
</style>