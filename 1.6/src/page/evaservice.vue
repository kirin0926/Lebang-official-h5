<template>
	<div>
		<div class="top-hover">
			<a class="fl" href="Javascript:history.go(-1);void(0);"><i class="icon-back"></i></a>
				评价服务
			<a class="fr cor-f6" href="javascript:;" v-on:click="submit()">评价</a>
		</div>
		<ul class="eva-service" v-if="nodata==2">
			<li v-for="(li,index) in fuwulist">
				<div class="eva-service-top">
					<img class="fl" v-bind:src="fuwuurl+li.photo" alt="" />
					<div class="owh eva-service-ol">
						<h3 class="fl">{{li.fuwumingcheng}}</h3>
						<div class="fr">服务人员：{{li.fuwurenyuan.shanghunicheng}}</div>
					</div>
				</div>
				<div class="eva-service-middle">
					<div class="starsbox"><img v-bind:src="pingfen[index].imga" v-on:click="starbtn(1,index)"/><img v-bind:src="pingfen[index].imgb" v-on:click="starbtn(2,index)"/><img v-bind:src="pingfen[index].imgc" v-on:click="starbtn(3,index)"/><img v-bind:src="pingfen[index].imgd" v-on:click="starbtn(4,index)"/><img v-bind:src="pingfen[index].imge" v-on:click="starbtn(5,index)"/></div>
					<div class="pingfentit" v-model="pingfen[index].word">{{pingfen[index].word}}</div>
				</div>
				<div class="eva-service-bottom por">
				<textarea placeholder="服务的质量怎么样，店里的环境怎么样，快来说说你的感受吧～" rows="" cols="" maxlength="140" v-model="neirong[index].neirong"></textarea>
					<!--<input type="text"  v-model="neirong"/>-->
					<!--<div>{{neirong}}</div>-->
					<!--<div class="cor-9e ftsize12 poa eva-service-pos"><span v-bind="pinglunlength">{{pinglunlength}}</span>/140</div>-->
				</div>
			</li>
		</ul>
		<nodata style="margin-top: 100px;" v-else="nodata==1"></nodata>
	</div>
</template>

<script>
import Vue from 'vue'
import nodata from './nodata.vue'
import { MessageBox } from 'mint-ui';
export default{
  name:'evaservice',
  data:function(){
    return{
        listData:"",
        pingfen:[],//评分展示数组
        starnum:[],//评分数据数组
        neirong:[],//内容展示数组
        neirongs:[],//内容数据数组
        beipinglunopenids:[],//被评论openid 数组
        fuwuid:[],//服务id数组
        fuwulist:'',
        fuwuurl:'',
        ordernum:'', //订单号
        pinglunlength:'',
        nodata:''  //1没数据  2有数据
    }
  },
  created:function(){
  	//react end
    var Request = new UrlSearch(); //实例化
    var id = Request.id;      //
    var shanghuid = Request.shanghuid;      //
  	this.fuwuurl = fuwuhoto
  	  const self = this
  	  //服务订单详情调取订单列表
	  Vue.http.get(newfix+"dingdan.php?bs=dingdanxiangqing&id="+id+"&shanghuid="+shanghuid).then(function(response){
        // sucess callback
        var json= response.body;
        if(json.code==200){
        	console.log(json);
	        self.listData = json.obj;
	        if(self.listData.list!=null){
	        	self.nodata="2";
				self.fuwulist = self.listData.list[0].dingdanfuwu; //订单服务
		        self.ordernum = self.listData.list[0].ordernum; //订单号
		        for(var st=0;st<self.fuwulist.length;st++){
		        	self.pingfen.push({star:null,word:'给本次服务打个分吧！',imga:'static/image/star_null.png',imgb:'static/image/star_null.png',imgc:'static/image/star_null.png',imgd:'static/image/star_null.png',imge:'static/image/star_null.png'});//评分数组
		        	self.neirong.push({neirong:null});//内容数组
		        	self.beipinglunopenids.push([self.fuwulist[st].fuwuopenid]);//被评论openid 数组 ok
		        	self.fuwuid.push([self.fuwulist[st].fuwuid]);//服务id
		        }
	        }else{
				self.nodata="1";
	        }
        }else{
//      	alert(json.code);
        }

      },function(response){
		//console(response);
      })
		document.setTitle("评价服务");
  },
  components:{
  	nodata:nodata
  },
  methods:{
  	//亮星星
  	starbtn:function(id,index){
		if(id==1){  //点亮一颗星
			this.pingfen[index].word = "非常不满意，各方面都比较差";
			this.pingfen[index].star = "1";
			this.pingfen[index].imga = "static/image/star.png";
			this.pingfen[index].imgb = "static/image/star_null.png";
			this.pingfen[index].imgc = "static/image/star_null.png";
			this.pingfen[index].imgd = "static/image/star_null.png";
			this.pingfen[index].imge = "static/image/star_null.png";
		}else if(id==2){ //2
			this.pingfen[index].word = "不满意，比较差";
			this.pingfen[index].star = "2";
			this.pingfen[index].imga = "static/image/star.png";
			this.pingfen[index].imgb = "static/image/star.png";
			this.pingfen[index].imgc = "static/image/star_null.png";
			this.pingfen[index].imgd = "static/image/star_null.png";
			this.pingfen[index].imge = "static/image/star_null.png";
		}else if(id==3){
			this.pingfen[index].word = "一般，还需改善";
			this.pingfen[index].star = "3";
			this.pingfen[index].imga = "static/image/star.png";
			this.pingfen[index].imgb = "static/image/star.png";
			this.pingfen[index].imgc = "static/image/star.png";
			this.pingfen[index].imgd = "static/image/star_null.png";
			this.pingfen[index].imge = "static/image/star_null.png";
		}else if(id==4){
			this.pingfen[index].word = "比较满意，还不错";
			this.pingfen[index].star = "4";
			this.pingfen[index].imga = "static/image/star.png";
			this.pingfen[index].imgb = "static/image/star.png";
			this.pingfen[index].imgc = "static/image/star.png";
			this.pingfen[index].imgd = "static/image/star.png";
			this.pingfen[index].imge = "static/image/star_null.png";
		}else if(id==5){
			this.pingfen[index].word = "非常满意，无可挑剔";
			this.pingfen[index].star = "5";
			this.pingfen[index].imga = "static/image/star.png";
			this.pingfen[index].imgb = "static/image/star.png";
			this.pingfen[index].imgc = "static/image/star.png";
			this.pingfen[index].imgd = "static/image/star.png";
			this.pingfen[index].imge = "static/image/star.png";
		}
  	},
  	submit:function(){
  		//提交评价
  		
	    var Request = new UrlSearch(); //实例化
	    var id = Request.id;      //
	    var shanghuid = Request.shanghuid;      //
        var openid = localStorage.getItem('openid');
  	  	for(var nr =0;nr<this.neirong.length;nr++){
  	  		this.neirongs.push([this.neirong[nr].neirong]);
  	  		this.starnum.push([this.pingfen[nr].star]);
  	  	}
  	  	const self = this;
		$.ajax({
	 		type:"post",
	 		url:newfix+"dingdan.php",
	 		async:true,
	 		dataType:"json",
            data:{
            	bs:"fuwudingdanpinglun",
            	ordernum:self.ordernum, //订单号 ok
            	openid:openid,//openid ok
            	shanghuid:shanghuid, //ok
            	beipinglunopenids:self.beipinglunopenids,//被评论openid ok  
            	fuwuid:self.fuwuid, //服务id ok
            	pingfen:self.starnum, //评分数据数组 ok
            	neirong:self.neirongs //内容数据数组 ok 
            },
	 		success:function(data){
	 			if(data.code==200){
					MessageBox('', '评价成功');
					window.location.href = "#/page/main?id="+shanghuid;
	 			}
	 		}
	 });
	 
  	}
  	
  }
}
	
</script>

<style scoped>
	.top-hover{height: 44px;text-align: center;line-height: 44px;background: #fff;font-size: 18px;color: #333333;border-bottom: 1px solid hsla(0, 0%, 93%, 0.7);padding: 0 13px;}
	.eva-service-ol{height: 60px;line-height: 60px;}
	.eva-service-ol h3{font-size: 16px;color: #333333;}
	.eva-service-ol div{font-size: 14px;color: #333333;}
	.eva-service{padding: 13px;}
	.eva-service li{overflow: hidden;background: #FFFFFF;border-radius: 4px;border: 1px solid hsla(0, 0%, 93%, 0.7);padding: 13px;margin: auto;margin-bottom: 10px;}
	.eva-service-top img{width: 60px;height: 60px;margin-right: 13px;}
	.eva-service-bottom{clear: both;}
	.eva-service-bottom textarea{width: 93%;height: 79px;padding: 13px;font-size: 15px;line-height: 20px;border-radius: 4px;border: 1px solid hsla(0, 0%, 93%, 0.7);}
	.eva-service-middle{text-align: center;}
	.eva-service-middle img{width: 30px;height: 30px;text-align: center;overflow: hidden;margin-top: 13px;}
	.pingfentit{font-size: 14px;color: #333333;margin: 13px auto;}
	.starsbox img{margin-right: 6px;}
	.eva-service-pos{position: absolute;right: 9px;bottom: 10px;}
</style>