<template>
	<ul class="clerk_list" style="background: #fff;">
            	<li class="clerklist_li" v-for="li in listData" v-on:click="tos(li.openid,li.shanghunicheng)">
            			<img class="fl clerklist_img" v-bind:src="zhiyezhao+li.zhiyezhao" v-if="li.zhiyezhao !='' ">
            			<img class="fl clerklist_img" v-bind:src="morenlogo" v-else-if="li.zhiyezhao =='' ">
	            		<div class="clerklist_body">
	            			<h3 class="clerklist_name ellipsis">{{li.shanghunicheng}}
	            			<span class="fr starboxp" v-if="li.fuwupingfen=='1'">
	            				<i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='2'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='3'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='4'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='5'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i>
	            			</span>
	            			</h3>
	            			<div class="clerklist_contents">
	            				<div class="clerklist_jianjie">{{li.yuangongjianjie}}</div>
	            				<div class="clerklist_order" v-if="li.fuwushu!='0'">已约{{li.jiedanshu}}单</div>
	            				<div class="clerklist_order" v-else="li.fuwushu=='0'"></div>
	            			</div>
	            		</div>
            	</li>
    </ul>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return {
        listData: [],
        zhiyezhao:'',
        morenlogo:'static/image/moren.png'
    }
  },
  props:['messaage'],
  created:function(){
  	  const self = this
  	  //服务人员列表
	  var Request = new UrlSearch(); //实例化
	  if(this.messaage ==undefined){
	      this.messaage = Request.id;    //id; 1939
	  }
  	  Vue.http.get(newfix+"shanghu.php?bs=shanghuxiangqing&openid="+openid+"&id="+this.messaage).then(function(response){
        // sucess callback
        var json= JSON.parse(response.body);
        self.listData = json.obj.dianpu.clerk;
        self.zhiyezhao = zhiyephoto;
      },function(response){
//        console(response);
      })
  },
  methods:{
	tos:function(openid,name){
	  var Request = new UrlSearch(); //实例化
		  if(Request.type=="2"){// 在线下单
	  		localStorage.setItem('online-peloname',name);
	  		localStorage.setItem('online-pelopenid',openid);
	 		this.$router.push('/page/online');
		  }else{  //店员详情
	 		this.$router.push('/page/clerk?openid='+openid);
		  }
	}

  }
}
</script>

<style scoped="scoped">
.clerklist_li{border-bottom:1px solid hsla(0,0%,80%,.3);padding:13px;overflow:hidden}
.clerklist_li:last-child{border-bottom:none}
.clerklist_img{width:80px!important;height:80px!important;border-radius:4px;margin-right:13px}
.clerklist_body{overflow:hidden}
.clerklist_name{font-size:16px!important;height:30px;margin:0;color:#333;line-height:30px;margin-bottom:0px;margin-top:0}
.clerklist_jianjie{font-size:12px;color:#636363;height:25px;line-height:25px}
.clerklist_order{font-size:12px;color:#9e9e9e;height:25px;line-height:25px}

</style>