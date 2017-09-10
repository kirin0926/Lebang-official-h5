// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//核心文件
import Vuex from 'vuex'
import Vue from 'vue'
//mintui start
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//mintui end
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = true;

Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(VueResource);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
	store:store,
  template: '<App/>',
  components: {
    App
	}
});

const store = new Vuex.Store({
  state: {
    count: 0,
    openid:"a141ddbd3787227ae27ba99a48140b9e",
    list:[]
  },
  mutations: {  //更改状态方法
    increment (state) {
      state.count++
    },
    add(state,data){
    	state.list.push(data);
    }
  },
  getters:{   //获取方法
  	filterList(state){
  			let len = state.list.length,
  					newList;
  			for(let i=0;i<len;i++){
  				let element = state.list[i];
  				element.length >10?newList.push(element) : null;
  			}
  	}
  },
  actions:{		//actions处理异步问题
  	add({commit,state},data){
  		
  	}
  }
})
//store.commit('increment')
//console.log(store.state) // -> 1