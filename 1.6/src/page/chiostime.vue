<template>
	<div>
		<ul class="t_ul">
            <li v-bind:class="{ 'active': layout == 'one'}" v-on:click="layout = 'one'"><div class="t_lin">{{toplist[0].t}}</div><div class="t_lit">{{toplist[0].day}}</div></li>
            <li v-bind:class="{ 'active': layout == 'two'}" v-on:click="layout = 'two'"><div class="t_lin">{{toplist[1].t}}</div><div class="t_lit">{{toplist[1].day}}</div></li>
            <li v-bind:class="{ 'active': layout == 'thr'}" v-on:click="layout = 'thr'"><div class="t_lin">{{toplist[2].t}}</div><div class="t_lit">{{toplist[2].day}}</div></li>
            <li v-bind:class="{ 'active': layout == 'for'}" v-on:click="layout = 'for'"><div class="t_lin">{{toplist[3].t}}</div><div class="t_lit">{{toplist[3].day}}</div></li>
            <li v-bind:class="{ 'active': layout == 'fiv'}" v-on:click="layout = 'fiv'"><div class="t_lin">{{toplist[4].t}}</div><div class="t_lit">{{toplist[4].day}}</div></li>
        </ul>
        <div class="t_b" v-if="layout == 'one'">
            <ul class="b_ul">
            	<li v-for="li in timelistone" v-on:click="chiosetime(li.dataTime)">{{li.val}}</li>
            </ul>
        </div>
        <div class="t_b" v-if="layout == 'two'">
            <ul class="b_ul">
            	<li v-for="li in timelisttwo" v-on:click="chiosetime(li.dataTime)">{{li.val}}</li>
            </ul>
        </div>
        <div class="t_b" v-if="layout == 'thr'">
            <ul class="b_ul">
            	<li v-for="li in timelistthr" v-on:click="chiosetime(li.dataTime)">{{li.val}}</li>
            </ul>
        </div>
        <div class="t_b" v-if="layout == 'for'">
            <ul class="b_ul">
            	<li v-for="li in timelistfor" v-on:click="chiosetime(li.dataTime)">{{li.val}}</li>
            </ul>
        </div>
        <div class="t_b" v-if="layout == 'fiv'">
            <ul class="b_ul">
            	<li v-for="li in timelistfir" v-on:click="chiosetime(li.dataTime)">{{li.val}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
  name: 'center',
  data:function(){
    return {
    	listp:[],
    	layout:'one',
    	//顶部导航
    	toplist:[],
    	//底部时间表
    	timelistone:[],
    	timelisttwo:[],
    	timelistthr:[],
    	timelistfor:[],
    	timelistfir:[],
    	//
    	data2:''
    }
  },
  created:function(){
	    var now = new Date();
	    var y = now.getFullYear();  //年
	    var m = now.getMonth()+1; //月
	    var d = now.getDate();   //日
	    var h = now.getHours();  //时
	    var t = now.getDay();   ////获取当前星期X(0-6,0代表星期天)
	    var mint = now.getMinutes();  //分钟
	    var nowcho = Date.parse(new Date()) / 1000;   //当前时间戳
	    //循环toplist
  		for(var top=0;top<5;top++){
  			if(t == 0){
                var t_lin = "星期天";
                d++;
            }else if(t == 1){
                var t_lin = "星期一";
                t++;
                d++;
            }else if(t == 2){
                var t_lin = "星期二";
                t++;
                d++;
            }else if(t == 3){
                var t_lin = "星期三";
                t++;
                d++;
            }else if(t == 4){
                var t_lin = "星期四";
                t++;
                d++;
            }else if(t == 5){
                var t_lin = "星期五";
                t++;
                d++;
            }else if(t == 6){
                var t_lin = "星期六";
                t++;
                d++;
            }else if(t == 7){
                var t_lin = "星期天";
                t = 1
                d++;
            }
  			this.toplist.push({
	  				day:m+'月'+d+'日',
	  				t:t_lin
  			})
            if(d>30){
                d = 1;
                m++
            }
  		}
  		
  		//循环日期对应的时间
  		var time1 = "1496790000000";//开始时间
  		var time2 = "1496835000000";//结束时间
  		var ok = 1 ;
  		for(var time=0;time<20;time++){
  			
  			if(time1>time2){
  				ok=0
  			}else{
  				this.data2 = new Date(1496790000000);
  				
  				console.log(this.data2.getMinutes());
  				if(0<=this.date2.getMinutes()&&this.date2.getMinutes()<9){
  					const m = "0"+this.date2.getMinutes();
  				}else{
  					const m = this.date2.getMinutes();
  				}
  				//明天
  				this.timelisttwo.push({
  					val:date2.getHours()+':'+m,
  					dataTime:''
  				});
  				
  			}
  			
  			//今天时间戳
  			this.timelistone.push({val:'7:30',dataTime:''});
  			
  			//
  			this.timelistthr.push({
  					val:'9:30',
  					dataTime:''
  				});
  			//
  			this.timelistfor.push({
  					val:'10:30',
  					dataTime:''
  				});
  			//
  			this.timelistfir.push({
  					val:'11:30',
  					dataTime:''
  				});
  		}
  		console.log(this.timelisttwo);
  },
  methods:{
	chiosetime:function(val){
		alert(val);
	}
  }
}
</script>

<style>
.t_ul .active div{color:#F60}
.t_ul{background:#fff;border-bottom:1px solid #e5e5e5;overflow-x:auto;
/*height:69px;*/
width:100%;overflow-y:hidden}
.t_ul li{float:left;width:20%}
.t_li_active{border-bottom:1px solid #f60}
.t_li_active div{color:#f60}
.t_lin{text-align:center;color:#9e9e9e;margin-top:10px;font-size:12px;margin-bottom:5px}
.t_lit{text-align:center;color:#636363;padding-bottom:10px;font-size:16px}
.t_b{background:#fff}
.b_li_active{background:#f60;color:#fff!important;border-color:#fff!important}
.b_ul{padding-bottom:10px;overflow:hidden}
.b_ul li{float:left;margin-top:10px;margin-left:10px;border:1px solid #e7e7e7;border-radius:4px;color:#333;width:.52rem;text-align:center;height:40px;line-height:40px;font-size:15px}
.pay_button{line-height:inherit;border:#ffdead;width:94%}
.pay_box{text-align:center;margin-top:20px}

</style>