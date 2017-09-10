<template>
	<div class="">
		<div class="fix_top" style="display: block;">
		    <div class="fix_left">
		        <img src="static/image/512.png" alt="全民乐帮">
		        <div class="fix_data">
		            <h3>全民乐帮</h3>
		            <h3 style="font-size: 12px">小区生活服务APP</h3>
		        </div>
		    </div>
		    <div class="fix_right">
		        <button v-on:click="openApp()">打开</button>
		    </div>
		</div>
	</div>
</template>

<script>
export default{
  name: 'fixtop',
  data:function(){
    return{
        listData: []
    }
  },
  created:function(){
  	
  },
  components:{
  	
  },
  methods:{
  	openApp:function(){
  	var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href = "lebang://"; /***��app��Э�飬��iosͬ���ṩ***/
        window.setTimeout(function(){
            window.location.href = "https://itunes.apple.com/cn/app/quan-min-le-bang/id1131512680?mt=8"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        },2000);
    }	else if (/android/.test(ua)) {
        window.location.href = "qmlb://openapp.com/"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        window.setTimeout(function(){
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.qinlin.lebang"; /***��app��Э�飬�а�׿ͬ���ṩ***/
        },2000);
    }
  	}
  }
}
</script>

<style>
</style>