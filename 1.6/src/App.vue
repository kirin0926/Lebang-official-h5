<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>


<script>
//import Life from './life.vue'

export default{
  name: 'app',
  data: function(){
      return {
        list: []
      }
  },
  //components: {
   //   life: Life
  //}
}
</script>

<style>
#app{
	font-family: "PingFang SC";
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #333;
  //margin-top: 60px;
}
</style>

