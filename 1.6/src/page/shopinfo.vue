<template>
	<div class="shopinfo_box" style="margin-top: 0;">
         <div>
                <div class="shopdetailone">
                	<span class="servicename">{{mingcheng}}</span>
                	<span class="fr starbox" v-if="pingfen=='1'"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span>
                	<span class="fr starbox" v-else-if="pingfen=='2'"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span>
                	<span class="fr starbox" v-else-if="pingfen=='3'"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span>
                	<span class="fr starbox" v-else-if="pingfen=='4'"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span>
                	<span class="fr starbox" v-else-if="pingfen=='5'"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span>
                </div>
                <div class="shopdetailtime">服务时间 : <i class="kaishi">{{kaishishijian}}</i> - <i class="jieshu">{{jieshushijian}}</i></div>
                <div class="shopdetailtwo">
                    <div class="quyubox">
                        <span class="quyu">服务地址 : {{dizhi}}</span>
                        <a class="tell_phone" href="tel:18662219331"><i class="icon-phone"></i></a>
                    </div>
                </div>
          </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        mingcheng:'',
        pingfen:'',
        kaishishijian:'',
        jieshushijian:'',
        dizhi:''
    }
  },
  props:['messaage'],
  created:function(){
  	  const self = this
  	  //精选服务列表
  	  Vue.http.get(newfix+"shanghu.php?bs=shanghuxiangqing&openid="+openid+"&id="+this.messaage).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        if(json.code==200){
	       	self.listData = json.obj;
	       	self.mingcheng = self.listData.dianpu.mingcheng;
	        self.pingfen = self.listData.dianpu.pingfen;
	        self.kaishishijian = self.listData.dianpu.kaishishijian;
	        self.jieshushijian = self.listData.dianpu.jieshushijian;
	        self.dizhi = self.listData.dianpu.dizhi;
        }else{
        	self.$router.push('/page/notshop');
        }
      },function(response){
//        console(response);
      })
  },
  methods:{


  }
}
</script>

<style>
</style>