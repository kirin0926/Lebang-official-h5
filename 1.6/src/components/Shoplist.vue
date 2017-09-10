

<template>
  <div class="main">
    <ul class="servicelist">
        <li v-for="li in servicelist"  v-on:click="greet(li.fuwu[0].id)">
        <img class="fl project_img" v-bind:src="fuwulogo + li.fuwu[0].photo"/>
        <div class="project_content">
        <h3>{{ li.fuwu[0].name }} <span class="fr ordernum">已约 {{ li.fuwu[0].xiaoliang }} 单</span></h3>
        <p class="ellipsis">{{ li.fuwu[0].jianjie }} </p>
        <span class="price"><i v-if="li.fuwu[0].cuxiao== 0 ">{{ li.fuwu[0].jine}}</i><i v-else="li.fuwu[0].cuxiao== 1">{{ li.fuwu[0].cuxiaojia}}</i>{{ li.fuwu[0].danwei}} </span>
        <div><span class="shopname ellipsis fl"><i class="icon-store"></i>{{ li.dianpu.mingcheng }}</span>
        <div class="fr" v-if="li.dianpu.pingfen ==0"><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
        <div class="fr" v-else-if="li.dianpu.pingfen ==1"><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
        <div class="fr" v-else-if="li.dianpu.pingfen ==2"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
        <div class="fr" v-else-if="li.dianpu.pingfen ==3"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i></div>
        <div class="fr" v-else-if="li.dianpu.pingfen ==4"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i></div>
        <div class="fr" v-else-if="li.dianpu.pingfen ==5"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></div>
        </div></div>
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
        servicelist: [],
        fuwulogo:"http://www.quanminlebang.com/photo/fuwu/"
    }
  },
  created:function(){
      var self = this;
      axios.get("http://www.quanminlebang.com/app220/bianminfuwu.php?bs=jiansuofuwuliebiao&erjileibie=2&zuobiao=116,34")
      .then(function(res){
        self.servicelist = res.data.obj.list;
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
