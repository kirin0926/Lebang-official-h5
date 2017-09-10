<template>
	
    <div class="couupon-par" v-bind:class="bg">

     <div class="coupon-box">
          <div class="header">
            <img class="header-avater" v-bind:src="cover"/>
            <h3 v-text="mingcheng"></h3>
            <img class="header-over" src="static/image/over.png" v-if="zhuangtai =='2'" />
            <img class="header-over" src="static/image/down.png" v-if="zhuangtai =='3'" />
          </div>
          <div>
            <div class="quanbox">
              <div class="quantype" v-if="leixing =='1' ">通用券</div>
              <div class="quantype" v-if="leixing =='2' ">满减券</div>
              <div class="quantype" v-if="leixing =='3' ">体验券</div>
              <div class="quantype" v-if="leixing =='4' ">赠礼券</div>
              <div class="quanname" v-text="kaquanmingcheng"></div>
            </div>
            <div class="quanbtn">
              <a v-bind:href="shopmain"><button v-bind:class="bg">立即使用</button></a>
              <div v-if="leixing =='1' ">到店消费即享立减优惠</div>
              <div v-if="leixing =='2' ">到店消费即定金额享立减优惠</div>
              <div v-if="leixing =='3' ">免费体验指定服务</div>
              <div v-if="leixing =='4' ">到店消费即可获赠精美礼品</div>
            </div>
          </div>
          <div class="footer">
            <div class="item">
              <div class="fl">使用规则：</div>
              <div class="owh br" v-if="leixing =='1' ">无最低消费、仅可在{{mingcheng}}使用</div>
              <div class="owh br" v-if="leixing =='2' ">限消费即定金额、仅可在{{mingcheng}}使用</div>
              <div class="owh br" v-if="leixing =='3' ">限店铺指定服务项目、仅可在{{mingcheng}}使用</div>
              <div class="owh br" v-if="leixing =='4' ">限消费即定金额、仅可在{{mingcheng}}使用</div>
            </div>
            <div class="item">
              <div class="fl">有效期限：</div>
              <div class="owh">{{ kaishishijian}} 至 {{ jieshushijian }}</div>
            </div>
            <div class="item">
              <div class="fl">店铺地址：</div>
              <div class="owh" v-text="dizhi"></div>
            </div>
            <a v-bind:href="shopmain"><div class="coupon-main">店铺主页</div></a>
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
        bg:'bg2',
        shopmain:'',
        cover:'',
        mingcheng:'',
        zhuangtai:'',
        leixing:'',
        kaquanmingcheng:'',
        kaishishijian:"",
        jieshushijian:"",
        dizhi:''
    }
  },
  created:function(){
  	  const self = this
  	  const kaquanid = sessionStorage.getItem('kaquanid')
//      请求详情
  	  Vue.http.get(newfix+"user.php?bs=kaquanxiangqing&huiyuankaquanid="+kaquanid).then(function(response){
        // sucess callback
          var json=response.body;
          self.response = eval("(" + json +")");
          self.listData = self.response.obj.list;
          if(self.listData.dianpu!=null){
          	  self.cover = shopphoto +self.listData.dianpu.cover;
			  self.mingcheng = self.listData.dianpu.mingcheng;
			  self.zhuangtai = self.listData.kaquan.zhuangtai;
			  self.leixing = self.listData.kaquan.leixing;
			  self.kaquanmingcheng = self.listData.kaquan.kaquanmingcheng;
			  self.kaishishijian = new Date(parseInt(self.listData.kaquan.kaishishijian) * 1000).toISOString().slice(0,10);
			  self.jieshushijian = new Date(parseInt(self.listData.kaquan.jieshushijian) * 1000).toISOString().slice(0,10);
			  self.dizhi = self.listData.dianpu.dizhi;
			  self.shopmain = '#/page/main?id='+self.listData.dianpu.id;
          }
          if(self.response.obj.zongtiaoshu != '0'){
		  	self.nocoupon = !self.nocoupon;
		  }
  	  	sessionStorage.setItem('gocenter',0);
      },function(response){
//        console(response);
      })
  },
  methods:{


  }
}
</script>

<style>
	
  .couupon-par{
    overflow: hidden;
    padding-bottom: 100px;
  }
  /*1 通用 2满减 3体验 4礼品*/
  .bg1{
    background: #fe5f2d;
  }
  .bg2{
    background: #fc4a5b;
  }
  .bg3{
    background:#38c27a;
  }
  .bg4{
    background:#f9c032;
  }
</style>