<template>
	<div class="couupon-par" v-bind:class="bg">

     <div class="coupon-box">

          <div class="header">
            <img class="header-avater" v-bind:src="avater"/>
            <h3 v-text="mingcheng"></h3>
            <img class="header-over" v-if="zhuangtai=='1'"/>
            <img class="header-over" v-bind:src="over" v-else-if="zhuangtai=='2'"/>
            <img class="header-over" v-bind:src="down" v-else-if="zhuangtai=='3'"/>
          </div>
          <div>
            <div class="quanbox">
              <div class="quantype">计次卡</div>
              <div class="quanname">{{mingcheng}} X {{shengyucishu}}</div>
            </div>
            <div class="quanbtn">
            	<a v-bind:class="bg" v-bind:href="shopmain">立即使用</a>
              <div>到店消费即可使用计次卡</div>
            </div>
          </div>
          
          <div class="footer">
            <div class="item">
              <div class="fl">使用规则：</div>
              <div class="owh">仅可在{{mingcheng}}使用</div>
            </div>
            <div class="item">
              <div class="fl">有效期限：</div>
              <div class="owh">{{ addtime }}至{{ daoqishijian }}</div>
            </div>
            <div class="item">
              <div class="fl">店铺地址：</div>
              <div class="owh">{{dizhi}}</div>
            </div>
            <a class="meterbtn" v-bind:href="shopmain"><div class="coupon-main">店铺主页</div></a>
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
        shopphoto:"http://www.quanminlebang.cn/photo/shanghu/",
        bg:'bg5',
        avater:'static/image/512.png',
        over:'static/image/over.png',
        down:'static/image/down.png',
        shopmain:'',
        mingcheng:'',
        shengyucishu:'',
        addtime:'',
        daoqishijian:'',
        dizhi:'',
        zhuangtai:''
    }
  },
  created:function(){
  	  const self = this
  	  Vue.http.get(fixurl+"user.php?bs=jicikaxiangqing&jicikaid=12").then(function(response){
        // sucess callback
        var json= response.body;
        self.listData = eval("(" + json +")").obj.list;
        self.mingcheng = self.listData.dianpu.mingcheng
        self.shengyucishu = self.listData.jicika.shengyucishu
        self.addtime = new Date(parseInt(self.listData.jicika.addtime) * 1000).toISOString().slice(0,10);
        self.daoqishijian = new Date(parseInt(self.listData.jicika.daoqishijian) * 1000).toISOString().slice(0,10)
        self.dizhi = self.listData.dianpu.dizhi
        self.zhuangtai = self.listData.jicika.zhuangtai
        self.shopmain = 'http://www.quanminlebang.com/m/mobile/mobilestation/index.html?share=yes&id='+self.listData.dianpu.id;
//      console.log(self.listData)
      },function(response){
//        console(response);
      })
  }
}
	
</script>

<style>
.bg5{
    background: #1aa6ff;
    padding-top: 15px;
    padding-bottom: 130px;
}
    
.quanbtn .meterbtn{
    color: #fff;
    border: navajowhite;
    padding: 12px 70px;
    border-radius: 4px;
    font-size: 16px;
    display: block;
    width: 25%;
    margin: 0 auto;
    margin-bottom: 13px;
}
</style>