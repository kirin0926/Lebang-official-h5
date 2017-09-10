<template>
  <div class="Lifepage">
    <div class="nav">
        <a href="javascript:history.back(-1);" class="back_tbn"></a>
        <div class="tab_btn">
          <!--<router-link to="/foo">丽人</router-link><router-link to="/bar">商家</router-link>-->
          <a class="grid-icon" v-bind:class="{ 'active': layout == 'grid'}" v-on:click="layout = 'grid'" v-text>丽人</a>
          <a class="list-icon" v-bind:class="{ 'active': layout == 'list'}" v-on:click="layout = 'list'">商家</a>
        </div>
        <a href="javascript:;" class="search_btn"></a>
      </div>
      <div class="title"></div>
      <div v-if="layout == 'grid'" class="grid"><shoplist></shoplist></div>
      <div v-if="layout == 'list'" class="list"><servicelist></servicelist></div>
  </div>
</template>


<script>

  import Servicelist from './Servicelist.vue'
  import Shoplist from './Shoplist.vue'
  export default {
  name: 'Lifepage',
  data:function(){
    return {
      msg: '这是life界面',
      layout: 'grid',
      name:localStorage.getItem('tab_name')
    }
  },
  components:{
     servicelist:Servicelist,
     shoplist:Shoplist
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
  display: inline-block;
  margin: 0 10px;
}
.Lifepage{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    color: #2c3e50;
    //margin-top: 60px;
}

  .tab_btn .active{
    background: #ff6600;
    color: #ffffff !important;
  }
</style>
