<template>
  <div class="main">
        <div class="quality" v-for="li in listData">
        	<router-link to="list"><span><img v-bind:src="leibielogo+li.logo" alt="logo"/>{{ li.mingcheng}}</span><ul><li v-bind:data-name="leibie.mingcheng" v-for="leibie in li.leibies" v-on:click="tolist(leibie.mingcheng,leibie.id)">{{leibie.mingcheng}}</li></ul></router-link></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'main',
  data:function(){
    return {
      listData: [],
      leibielogo:"http://www.quanminlebang.com/photo/leibie/"   //类别图片地址
    }
  },
  created:function(){
      var self = this;
      axios.post("http://www.quanminlebang.com/app220/bianminfuwu.php?bs=fuwuleibie")
      .then(function(res){
        self.listData = res.data.obj.leibie;
        //console.log(self)
      })
      .catch(function(err){
          console.log(err);
      })
  },
  methods:{
        tolist:function(obj,message){
          //localStorage.setItem("tab_name",obj);//名字
          //localStorage.setItem("tab_id",message);//id
          //window.location.href = "/service_list";
        }
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
