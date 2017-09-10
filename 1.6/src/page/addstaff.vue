<template>
	<div>
		<ul class="table-view" style="margin-top: 10px;">
			<li v-on:click="showpopsone()"  class="icon-rt"><a href="javascript:;"><span>服务人员</span><div class="view-li tr" style="margin-right: 20px;" v-text="item.ren"></div></a></li>
			<li v-on:click="toServiceProject()"  class="icon-rt"><a href="javascript:;"><span>服务项目</span><div class="view-li tr" style="margin-right: 20px;" v-text="item.xiangmu"></div></a></li>
		</ul>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
  name: 'center',
  data:function(){
    return{
        listData: []
    }
  },
  props: ['item'],
  created:function(){
  	
  },
  methods:{
  	//跳转服务人员
	toServicePeolple:function(){
		this.$router.push('/page/people?type=2&id='+localStorage.getItem('shanghuid'));
	},
	//跳转到服务项目
	toServiceProject:function(){
		this.$router.push('/page/service?type=2&id='+localStorage.getItem('shanghuid'));
	}
  }
}
	
</script>

<style>
.table-view {
    margin-bottom: 0;
    list-style: none;
    background-color: #fff;
}
</style>