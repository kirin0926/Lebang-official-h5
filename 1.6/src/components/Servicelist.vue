

<template>
  <div class="main">
    <ul class="storelist">
      <li v-for="li in StorelistData" v-on:click="toshop(li.dianpu.id)">
      <img class="fl project_img"  v-bind:src="shopphoto + li.dianpu.cover" />
      <div class="store_content">
      <h3>{{li.dianpu.mingcheng}}</h3>
      <p class="ellipsis">{{li.dianpu.jianjie}}</p>
      <div class="owh starbox">
      <div class="fl" v-if="li.dianpu.pingfen ==0 "><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
      <div class="fl" v-else-if="li.dianpu.pingfen ==1"><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
      <div class="fl" v-else-if="li.dianpu.pingfen ==2 "><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
      <div class="fl" v-else-if="li.dianpu.pingfen ==3 "><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
      <div class="fl" v-else-if="li.dianpu.pingfen ==4 "><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i></div>
      <div class="fl" v-else-if="li.dianpu.pingfen ==5 "><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></div>
      <div class="fr store_distance" v-if="li.dianpu.juli <1000">{{li.dianpu.juli}}米</div><div class="fr store_distance" v-else-if="li.dianpu.juli >1000">{{ Math.round(li.dianpu.juli/1000) }}km</div></div>
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'main',
  data:function(){
    return {
        StorelistData: [],
        shopphoto:"http://www.quanminlebang.com/photo/shanghu/"
    }
  },
  created:function(){
      var self = this;
      axios.get("http://www.quanminlebang.com/app220/bianminfuwu.php?bs=jiansuoshanghuliebiao&erjileibie=2&zuobiao=116,34")
      .then(function(res){
        self.StorelistData = res.data.obj.list;
        //console.log(res)
      })
      .catch(function(err){
          console.log(err);
      })
  },
  methods:{


  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  //margin: 0 10px;
}
</style>
