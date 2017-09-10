<template>
<div>
	<ul class="table-view" style="margin-top: 10px;">
		<li v-on:click="toChioseTime()"  class="icon-rt">
			<a href="javascript:;">
				<span>时间</span>
				<div class="view-li">
				<input type="text" value="" v-model="fuwutime" placeholder="请选择服务时间" maxlength="11"/>
				</div>
			</a>
		</li>
		<li>
			<a href="javascript:;">
				<span>联系电话</span>
				<div class="view-li">
					<input type="text" value="" v-model="phone" placeholder="请输入联系人电话" maxlength="11"/>
				</div>
			</a>
		</li>
		<li class="por">
			<a href="javascript:;">
				<span>联系人</span>
				<div class="view-li">
					<input type="text" value="" v-model="name" placeholder="请输入联系人姓名" v-on:change="inputname(name)" maxlength="6"/>
					<div class="sexbtn owh poa">
						<div class="fl" v-on:click="sex(1)"><img v-bind:src="seximg1" alt="1" />先生</div>
						<div class="fl" v-on:click="sex(2)"><img v-bind:src="seximg2" alt="2" />女士</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
	<div class="table-view" style="margin-top:10px;" v-if="items[0].type==1"> 		<!--根据第一个服务项目判断到家还是到店-->
		<!--添加服务地址-->
		<ul>
			<li>
				<a href="javascript:;">
					<span>服务地址</span>
					<div class="view-li">
						<input type="text" value="" v-model="dizhi" placeholder="请输入服务地址" v-on:change="inputdizhi(dizhi)"/>
					</div>
				</a>
			</li>
			<li>
				<a href="javascript:;">
					<div class="view-li" style="margin-left: 100px;">
						<input type="text" value="" v-model="dizhis" placeholder="具体楼号、门牌号" v-on:change="inputdizhis(dizhis)"/></div>
				</a>
			</li>
		</ul>
	</div>
	<!-- 添加服务人员 -->
    <div v-for="(item,index) in items"  style="margin-top: 10px;">
        <ul class="table-view">
			<li v-on:click="showpopsone(index)"  class="icon-rt"><a href="javascript:;"><span>服务人员</span><div class="view-li tr" style="margin-right: 20px;">{{item.ren}}</div></a></li>
			<li v-on:click="showpopstwo(index)"  class="icon-rt"><a href="javascript:;"><span>服务项目</span><div class="view-li tr" style="margin-right: 20px;">{{item.xiangmu}}</div></a></li>
		</ul>
    </div>
    
	<div class="addfuwupeople" v-on:click="addfuwu()" v-if="add==2"><img src="static/image/5.png" alt="add"/>继续添加服务</div>
	
	<div class="pay_box" v-on:click="tosubmit()"><button class="pay_button">立即预约</button></div>

<!--/选择服务时间-->
<!--<mt-popup v-model="popupVisiblec" position="right" popup-transition="popup-fade">
	<chiostime></chiostime>
	
    <div class="pay_box"><button class="pay_button" v-on:click="closetime()">确定选择</button></div>
</mt-popup>-->

<!--选择服务人员-->
<mt-popup v-model="popupVisiblea" position="right" popup-transition="popup-fade">
	<ul class="clerk_list">
            	<li class="clerklist_li" v-for="(li,index) in userlist"  v-on:click="closepopsone(li.shanghunicheng,li.openid,index)" >
            			<img class="fl clerklist_img" v-bind:src="zhiyezhao+li.zhiyezhao" v-if="li.zhiyezhao !='' ">
            			<img class="fl clerklist_img" v-bind:src="zhiyezhao+li.zhiyezhao" v-if="li.zhiyezhao =='' ">
	            		<div class="clerklist_body">
	            			<h3 class="clerklist_name ellipsis">{{li.shanghunicheng}}
	            			<span class="fr starboxp" v-if="li.fuwupingfen=='1'">
	            				<i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='2'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='3'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='4'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-null"></i>
	            			</span>
	            			<span class="fr starboxp" v-else-if="li.fuwupingfen=='5'">
	            				<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i>
	            			</span>
	            			</h3>
	            			<div class="clerklist_contents">
	            				<div class="clerklist_jianjie">{{li.yuangongjianjie}}</div>
	            				<div class="clerklist_order" v-if="li.fuwushu!='0'">已约{{li.jiedanshu}}单</div>
	            				<div class="clerklist_order" v-else="li.fuwushu=='0'"></div>
	            			</div>
	            		</div>
            	</li>
    </ul>
</mt-popup>

<!--选择服务项目-->
<mt-popup v-model="popupVisibleb" position="right" popup-transition="popup-fade">
		<ul class="choice_ul">
			<li v-for="lis in servlist"  v-on:click="closepopstwo(lis.id,lis.name,lis.jine,lis.fuwumoshi)">
				<!--只有和item中到家还是到店一样才显示-->
				<div class="fl project_img" v-bind:style="{'background-image':'url('+fuwuhoto+lis.photo+')'}"></div>
				<div class="mui-media-body project_shop_content">
						<h3 class="ellipsis project_name">{{lis.name}}</h3>
						<p class="ellipsis project_content">{{lis.jianjie}}</p>
					<div class="project_price">
						<a href="javascript:;"><i class="fs16">{{lis.jine}}</i> <i class="fs12">{{lis.danwei}}</i></a>
					</div>
				</div>
			</li>
		</ul>
</mt-popup>

</div>
</template>

<script>
import Vue from 'vue';
import chiostime from './chiostime.vue'
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

export default{
  name:'OnlineOrder',
  data:function(){
    return{
        listData: [],
        phone:'',
        name:'',
        dizhi:'',
        dizhis:'',
        fuwushijian:'',
        gohome:'2',  // 1预约服务到家显示服务地址    2不显示服务地址
        sexlei:'1',
        seximg1:'',
        seximg2:'',
        fuwupeolpe:'',
        add:'1',
        fuwutime:'',
        fuwuname:'',
        renname:'',
        shopid:'',
        //选择服务弹出框
        popupVisiblea:false,
        popupVisibleb:false,
        popupVisiblec:false,
        //服务人员
        userlist:'',
        zhiyezhao:'',
        //服务项目
        servlist:'',
        fuwuhoto:'',
        //数据列表 
        items:[{ren:'可选',xiangmu:'可选',type:'',btn:true,btnren:true}],
        fuwuxiangmu:[],//下单服务项目 
        data:[],
        //选择下标
        proindex:'',
        fuwurenopenid:'',
        moshi:'',
        over:""
    }
  },
  created:function(){
  	  const self = this
  	  //默认选择男女
	  this.seximg1='static/image/chiosboyhell.png';
	  this.seximg2=" static/image/chiosgirs.png";
	  //存储手机
  	  this.phone =JSON.parse(localStorage.getItem('user')).phone;
  	  //获取shanghuid
  	  this.shopid = localStorage.getItem('shanghuid');
  	  //设置当前页面标题
  	  if(this.moshi==1){
	  	document.setTitle("预约服务(到家)");
  	  }else{
	  	document.setTitle("预约服务");
  	  }
	  
//	  localStorage.setItem('online_time',1497056400)
	  
  	  //服务时间 数据展示
  	  const timelen = localStorage.getItem('online_time');
  	  if(timelen!=undefined){
  	  	var t = new Date(parseInt(timelen) * 1000).getDay();
        if(t == 0){
            var t_lin = "周日";
        }else if(t == 1){
            var t_lin = "周一";
        }else if(t == 2){
            var t_lin = "周二";
        }else if(t == 3){
            var t_lin = "周三";
        }else if(t == 4){
            var t_lin = "周四";
        }else if(t == 5){
            var t_lin = "周五";
        }else if(t == 6){
            var t_lin = "周六";
        }
        //绑定到本次存储
  	  	this.fuwushijian = timelen;
  	  	//绑定时间ui样式
  	  	this.fuwutime = new Date(parseInt(timelen) * 1000).toLocaleString().replace(/:\d{1,2}$/,'').substr(5, 5).replace(/\//,'月').replace(/ /,'日 ').replace(/P/,'').replace(/A/,'').replace(/下/,'').replace(/上/,'')+t_lin+" "+new Date(parseInt(timelen) * 1000).toTimeString().substr(0, 5);
  	  }else{
  	  	this.fuwutime = '';
  	  }
	  //先展示预约进来时候的选择
	  self.items = JSON.parse(localStorage.getItem("orderlist"));
	  self.fuwuxiangmu = JSON.parse(localStorage.getItem("fuwuxiangmu"));
	  //判断从哪里进入
	  var orderfrom = localStorage.getItem("orderfrom"); //从哪里进入下单界面的      1精选服务     2店员主页   3服务详情   4店员主页选择服务进入
	  if(orderfrom =="1" ){ //从精选服务
	  	this.moshi = self.items[0].type;
	  	//1精选服务中进来，通过服务查人
	  	 Vue.http.get(newfix+"shanghu.php?bs=fuwudianyuanliebiao&shanghuid="+this.shopid+"&fuwuid="+this.fuwuxiangmu[0][0]+"&fuwumoshi="+this.moshi).then(function(response){
	        var json= JSON.parse(response.body);
	        if(json.code=200){
	        	if(json.obj!=null){
	        		self.userlist = json.obj;
	        	}else{
	        		self.items[0].btn = false;
	        		MessageBox('', '当前服务项目没有可用的服务人员');
	        	}
	        	self.zhiyezhao = zhiyephoto;
	        }else{
	        	
	       
	        }
	     })
	  }else if(orderfrom == "2" ){ //从店员主页进入只要服务人员 通过服务人员查服务项目
	  	//2通过人查服务项目
	  	const opid = localStorage.getItem('fuwurenopenid');
	  	 Vue.http.get(newfix+"shanghu.php?bs=dianyuanfuwuliebiao&shanghuid="+this.shopid+"&openid="+opid+"&fuwumoshi="+this.moshi).then(function(response){
	        var json= JSON.parse(response.body);
	        if(json.code=200){
	        	if(json.obj!=null){
	        		self.servlist = json.obj;
	        	}else{
	        		self.items[0].btnren = false;
	        		MessageBox('', '当前服务人员没有服务项目');
	        	}
	        	self.fuwuhoto = fuwuhoto;
	        }else{
//	        	alert(json.code);
	        }
	     })
	  }else if(orderfrom == "3"){
	  	//3从服务详情中进入
	  	this.moshi = self.items[0].type;
	  	 Vue.http.get(newfix+"shanghu.php?bs=fuwudianyuanliebiao&shanghuid="+this.shopid+"&fuwuid="+this.fuwuxiangmu[0][0]+"&fuwumoshi="+this.moshi).then(function(response){
	        var json= JSON.parse(response.body);
	        if(json.code=200){
	        	if(json.obj!=null){
	        		self.userlist = json.obj;
	        	}else{
	        		self.items[0].btn = false;
	        		MessageBox('', '当前服务项目没有可用的服务人员');
	        	}
	        	self.zhiyezhao = zhiyephoto;
	        }else{
//	        	alert(json.code);
	        }
	    })
	  }else if(orderfrom == "4" ){
	  	//4店员主页选择服务进入 通过服务模式来查询所有的人和服务项目
	  	this.moshi = self.items[0].type;
	  	
		//重新调用数据的时候需要在这家店中根据商户id 和服务模式 来查所有的人和项目
		//商户员工列表  重置员工
	  	 Vue.http.get(newfix+"shanghu.php?bs=shanghuyuangongliebiao&shanghuid="+this.shopid+"&fuwumoshi="+this.moshi).then(function(response){
	        const json= JSON.parse(response.body);
	        if(json.code=200){
	        	self.userlist = json.obj;
	        }else{
//	        	alert(json.code);
	        }
	        self.zhiyezhao = zhiyephoto;
	     });
	  	 //商户服务列表  重置服务
	  	 Vue.http.get(newfix+"shanghu.php?bs=shanghufuwuliebiao&shanghuid="+this.shopid+"&fuwumoshi="+this.moshi).then(function(response){
	        const json= JSON.parse(response.body);
	        if(json.code==200){
	        	if(json.obj!=null){
		        	self.servlist = json.obj;
		        }else{ //没有数据的时候
		        	
		        }
	        }else{
//	        	alert(json.code)
	        }
	        self.fuwuhoto = fuwuhoto;
	     });
	  	
	  }
	  console.log(this.servlist);
	  if(localStorage.getItem("fuwuxiangmu")!=null){
	  		self.fuwuxiangmu = JSON.parse(localStorage.getItem("fuwuxiangmu"));
	  }
	  if(localStorage.getItem("add")==2){
	  		self.add = localStorage.getItem("add");
	  }else{
	  		self.add = "1";
	  }
	  if(localStorage.getItem("inputname")!=null){
	  		self.name = localStorage.getItem("inputname");
	  }
	  if(localStorage.getItem("inputdizhi")!=null){
	  		self.dizhi = localStorage.getItem("inputdizhi");
	  }
	  if(localStorage.getItem("inputdizhis")!=null){
	  		self.dizhis = localStorage.getItem("inputdizhis");
	  }
  },
  methods:{
	//选择服务项目时间
	toChioseTime:function(){
		//保存本地ui展示
		localStorage.setItem('orderlist',JSON.stringify(this.items));
		localStorage.setItem('fuwuxiangmu',JSON.stringify(this.fuwuxiangmu));
		//保存本地添加按钮
		localStorage.setItem('add',this.add);
		
		//跳转下单页面
		window.location.href = fixhtml+"chiosetime.html";
	},
	//closetime
	closetime:function(){
		this.popupVisiblec = !this.popupVisiblec;
	},
	//选择性别
	sex:function(n){
		if(n==1){//男
			this.seximg1='static/image/chiosboyhell.png';
			this.seximg2=" static/image/chiosgirs.png";
			this.sexlei='1';
		}else if(n==2){//女
			this.seximg1='static/image/chiosboy.png';
			this.seximg2=" static/image/chiosgirshell.png";
			this.sexlei='2';
		}
	},
	//添加服务项目
	addfuwu:function(){
		//添加项目
		this.items.push({ren: '可选',xiangmu:'可选',type:'',btn:true,btnren:true});
        //添加数据
        this.fuwuxiangmu.push([]);
		//隐藏继续添加按钮
		this.add = "1";
  	  	const self = this;
		//重新调用数据的时候需要在这家店中根据商户id 和服务模式 来查所有的人和项目
		//商户员工列表  重置员工
	  	 Vue.http.get(newfix+"shanghu.php?bs=shanghuyuangongliebiao&shanghuid="+this.shopid+"&fuwumoshi="+this.moshi).then(function(response){
	        const json= JSON.parse(response.body);
	        if(json.code=200){
	        	self.userlist = json.obj;
	        }else{
//	        	alert(json.code);
	        }
	        self.zhiyezhao = zhiyephoto;
	     })
	  	 //商户服务列表  重置服务
	  	 Vue.http.get(newfix+"shanghu.php?bs=shanghufuwuliebiao&shanghuid="+this.shopid+"&fuwumoshi="+this.moshi).then(function(response){
	        const json= JSON.parse(response.body);
	        if(json.code==200){
	        	if(json.obj!=null){
		        	self.servlist = json.obj;
		        }else{ //没有数据的时候
		        	
		        }
	        }else{
//	        	alert(json.code)
	        }
	        self.fuwuhoto = fuwuhoto;
	     })
	},
	//服务人员 		（服务id-服务名称-服务人员openid-价格）
	showpopsone:function(index){
		//列表下标
		this.proindex = index;
		if(this.items[this.proindex].btn==true){
			this.popupVisiblea = true;
		}else{
			this.popupVisiblea = false;
		}
	},
	closepopsone:function(name,openid,num){//服务人员名称  openid
		this.items[this.proindex].ren = name;
		this.items[this.proindex].btn = true;  //当前按钮关闭
		this.fuwuxiangmu[this.proindex][2]=openid;
		this.popupVisiblea = !this.popupVisiblea; //模态框关闭
		this.fuwurenopenid = openid;
		this.add = "2"; //显示添加按钮
	}, 
	showpopstwo:function(index){ //显示服务项目
		this.proindex = index;
		if(this.items[this.proindex].btnren==true){
			this.popupVisibleb = true;
		}else{
			this.popupVisibleb = false;
		}
	},
	closepopstwo:function(fwid,fwname,fwj,fwtype){
		this.items[this.proindex].xiangmu = fwname; //更新项目
		this.items[this.proindex].type = fwtype; //更新类型
		this.items[this.proindex].btnren = true;// 当前按钮关闭
		this.items[0].btnren = false;// 当前按钮关闭
		this.popupVisibleb = !this.popupVisibleb; //隐藏模态框
		this.add = "2"; //显示添加按钮
		this.fuwuxiangmu[this.proindex][0] = fwid;
		this.fuwuxiangmu[this.proindex][1] = fwname;
		this.fuwuxiangmu[this.proindex][3] = fwj;
	    this.moshi = this.items[0].type;    //判断第一个选择好的项目
	},
	//立即预约
	tosubmit:function(){
		if(this.fuwushijian ==null ||this.fuwushijian==undefined ||this.fuwushijian==''){
			MessageBox.alert('请选择服务时间', '');
		}else if(this.name ==null || this.name==undefined||this.name ==''){
			MessageBox.alert('请填写联系人', '');
		}else{
			if(this.moshi==1){//到家服务
				if(this.dizhi==null||this.dizhi==undefined||this.dizhi==''){ //没有数据的时候提示
					MessageBox.alert('请填写服务地址', '');
				}else{//有数据的时候请求接口
					for(let k=0;k<this.items.length;k++){
						if(this.items[k].ren=="可选"){
	        				MessageBox('', '请选择服务人员');
						}else if(this.items[k].xiangmu=="可选"){
	        				MessageBox('', '请选择服务项目');
						}else{
							this.over = "1";
						}
					}
					if(this.over=="1"){
						for(let v=0;v<this.fuwuxiangmu.length;v++){
							var sdda = this.fuwuxiangmu[v].join("-")
							this.data.push(sdda);
						}
						$.ajax({
					 		type:"post",
					 		url:newfix+"dingdan.php",
					 		async:true,
					 		dataType:"json",
				            data:{
				            	bs:"fuwudingdanadd",
				            	openid:JSON.parse(localStorage.getItem('user')).openid,
				            	name:this.name,
				            	tel:this.phone,
				            	fuwushijian:this.fuwushijian,
				            	fuwumoshi:this.moshi,
				            	laiyuan:'7',
				            	dizhi:this.dizhi+this.dizhis,
				            	shanghuid:localStorage.getItem('shanghuid'),
				            	sex:this.sexlei,
				            	fuwuxiangmu:this.data
				            },
					 		success:function(data){
					 			if(data.code==200){  //
									window.location.href = "#/page/main?id="+localStorage.getItem('shanghuid');
					 			}
					 		}
					 	});
					 	
					}
					
				}
				
			}else{ //到店服务
				for(let k=0;k<this.items.length;k++){
					if(this.items[k].ren=="可选"){
	        			MessageBox('', '请选择服务人员');
					}else if(this.items[k].xiangmu=="可选"){
	        			MessageBox('', '请选择服务项目');
					}else{
						this.over = "1";
					}
				}
				if(this.over=="1"){
					for(let v=0;v<this.fuwuxiangmu.length;v++){
						var sdda = this.fuwuxiangmu[v].join("-")
						this.data.push(sdda);
					}
					$.ajax({
				 		type:"post",
				 		url:newfix+"dingdan.php",
				 		async:true,
				 		dataType:"json",
			            data:{
			            	bs:"fuwudingdanadd",
			            	openid:JSON.parse(localStorage.getItem('user')).openid,
			            	name:this.name,
			            	tel:this.phone,
			            	fuwushijian:this.fuwushijian,
			            	laiyuan:'7',
			            	dizhi:this.dizhi+this.dizhis,
			            	shanghuid:localStorage.getItem('shanghuid'),
			            	sex:this.sexlei,
			            	fuwuxiangmu:this.data
			            },
				 		success:function(data){
				 			if(data.code==200){  //
								window.location.href = "#/page/main?id="+localStorage.getItem('shanghuid');
				 			}
				 		}
				 	});
				 	
				}
				
			 	
			}

		}
	},
	inputname:function(n){ //保存
        localStorage.setItem("inputname",n);
	},
	inputdizhi:function(d){
        localStorage.setItem("inputdizhi",d);
	},
	inputdizhis:function(s){
        localStorage.setItem("inputdizhis",s);
	}
 },
 components:{
 	chiostime:chiostime
 }
}
</script>
 
<style scoped="scoped">
.table-view{margin-bottom:0;list-style:none;background-color:#fff}
.table-view li{padding:13px;border-bottom:1px solid hsla(0,0%,93%,.6);cursor:pointer}
.table-view li span{color:#636363;width:100px;float: left;font-size:15px}
.table-view li:last-child{border-bottom:none;}
.view-li{overflow: hidden;font-size: 15px;}
.view-li input{border:none;color:#333;width:2rem;font-size: 15px;    font-family: "PingFang SC";}
.view-li input:-webkit-input-placeholder{color: #C7C7CD;}
.view-li input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */color: #C7C7CD;}
.view-li input::-moz-placeholder { /* Mozilla Firefox 19+ */color: #C7C7CD;}
.view-li input:-ms-input-placeholder{color: #C7C7CD;}
.view-li input::-webkit-input-placeholder{color: #C7C7CD;}
.pay_box{text-align:center;margin-top:20px;margin-bottom: 20px;}
.pay_button{height:50px;text-align:center;line-height:50px;background:#f60;color:#FFF;font-size:16px;cursor:pointer;border:#ffdead;width:94%}
.sexbtn{right: 13px;top: 11px;}
.sexbtn div{margin-left: 13px;}
.sexbtn img{width: 16px;height: 16px;margin-right: 7px;position: relative;top: 2px;}
.addfuwupeople{background: #FFFFFF;text-align: center;font-size: 15px;color: #9e9e9e;height: 44px;line-height: 44px;border-bottom:1px solid hsla(0,0%,93%,.6);border-top:1px solid hsla(0,0%,93%,.6);cursor:pointer;}
.addfuwupeople img{position: relative;width: 16px;height: 16px;margin-right: 13px;top: 1px;}
.mint-popup{width: 100%;height: 100%;}


/*服务人员*/
.clerklist_li{border-bottom:1px solid hsla(0,0%,80%,.3);padding:13px;overflow:hidden}
.clerklist_img{width:80px!important;height:80px!important;border-radius:4px;margin-right:13px}
.clerklist_body{overflow:hidden}
.clerklist_name{font-size:16px!important;height:30px;margin:0;color:#333;line-height:30px;margin-bottom:0px;margin-top:0}
.clerklist_jianjie{font-size:12px;color:#636363;height:25px;line-height:25px}
.clerklist_order{font-size:12px;color:#9e9e9e;height:25px;line-height:25px}

/*服务项目*/
.choice_ul{background: #fff;overflow-y: scroll;height: 100%;}
.choice_ul li{margin-top:0;margin-bottom:0;padding:13px;border-bottom:1px solid hsla(0,0%,93%,.7)}
.project_img{width:80px!important;height:80px;margin-right:13px;border-radius:4px;background-size:120px}
.project_shop_content{overflow:hidden}
.project_name{font-size:16px;color:#333;margin-top:inherit;margin-bottom:inherit;height:25px;line-height:25px}
.project_content{color:#636363;font-size:12px;height:30px;line-height:30px}
.project_price{height:20px}
.project_price a{font-size:14px;color:#f60;height:25px;line-height:25px}
</style>