
//-----路由与组件
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Life from '@/components/life'
import scroll from '@/components/scoll'
import scrolls from '@/components/scolls'
import metercard from '@/components/meter-card'
import meterdetail from '@/components/meter-detail'
import coupondetail from '@/components/coupon-detail'
import couponlist from '@/components/coupon-list'

import Main from '@/page/main'
import servicedetail from '@/page/servicedetail'
import clerk from '@/page/clerk'
import login from '@/page/login'
import people from '@/page/people'
import service from '@/page/service'
import mybalance from '@/page/mybalance' //我的余额
import online from '@/page/online-order' //在线下单
import Recruit from '@/components/Servicelist'
import perfectinfo from '@/page/perfect-info' //完善信息
import evaservice from '@/page/evaservice'	//评价服务
import orderdetail from '@/page/orderdetail' //订单详情
import brandinfo from '@/page/brandinfo' //品牌信息
//1.5banben
import shopopup from '@/page/shopopup' //店铺弹窗
import myorder from '@/page/myorder' //我的订单
import membercenter from '@/page/membercenter' //我的订单
import notshop from '@/page/notshop' //未审核通过
import collectshop from '@/page/collectshop' //收藏店铺
import couponcenter from '@/page/coupon-center' //优惠券中心

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      title:"主页"
    },
    {
      path:'/life',
      name:'life',
      compaonent:Life
    },
    {
      path: '/recruit',
      name: 'recruit',
      component: Recruit
		},
    {
      path: '/list',
      name: 'list',
      component: Life,
      title:"品质生活"
		},
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll,
      title:"滚动测试"
		},
    {
      path: '/page/main',
      name: 'main',
      component: Main,
      title:"店铺主页"
		},
		{
      path: '/page/servicedetail',
      name: 'servicedetail',
      component: servicedetail,
      title:"服务详情"
		},
		{
      path: '/page/clerk',
      name: 'clerk',
      component: clerk,
      title:"店员主页"
		},
    {
      path: '/page/metercard',
      name: 'metercard',
      component: metercard,
      title:"计次卡列表"
		},
    {
      path: '/page/meterdetail',
      name: 'meterdetail',
      component: meterdetail,
      title:"计次卡详情"
		},
    {
      path: '/page/coupondetail',
      name: 'coupondetail',
      component: coupondetail,
      title:"优惠券详情"
		},
    {
      path: '/page/couponlist',
      name: 'couponlist',
      component: couponlist,
      title:"优惠券列表"
		},
    {
      path: '/page/login',
      name: 'login',
      component: login,
      title:"登录"
		},
    {
      path: '/page/online',
      name: 'online',
      component: online,
      title:"在线下单"
		},
    {
      path: '/page/people',
      name: 'people',
      component: people,
      title:"服务人员列表"
		},
    {
      path: '/page/service',
      name: 'service',
      component: service,
      title:"服务项目列表"
		},
    {
      path: '/page/mybalance',
      name: 'mybalance',
      component: mybalance,
      title:"我的余额"
		},
    {
      path: '/page/scrolls',
      name: 'scrolls',
      component: scrolls,
      title:"滚动条"
		},
    {
      path: '/page/perfectinfo',
      name: 'perfectinfo',
      component: perfectinfo,
      title:"完善信息"
		},
    {
      path: '/page/evaservice',
      name: 'evaservice',
      component: evaservice,
      title:"评价服务"
		},
    {
      path: '/page/orderdetail',
      name: 'orderdetail',
      component: orderdetail,
      title:"订单详情"
		},
    {
      path: '/page/brandinfo',
      name: 'brandinfo',
      component: brandinfo,
      title:"品牌信息"
		},
    {		//1.5版本
      path: '/page/shopopup',
      name: 'shopopup',
      component: shopopup,
      title:"店铺弹窗"  
		},
    {
      path: '/page/myorder',
      name: 'myorder',
      component: myorder,
      title:"我的预约"
		},
    {
      path: '/page/membercenter',
      name: 'membercenter',
      component: membercenter,
      title:"会员卡中心"
		},
    {
      path: '/page/notshop',
      name: 'notshop',
      component: notshop,
      title:"店铺未审核通过" 
		},
    {
      path: '/page/collectshop',
      name: 'collectshop',
      component: collectshop,
      title:"收藏店铺列表"
		},
    {
      path: '/page/couponcenter',
      name: 'couponcenter',
      component: couponcenter,
      title:"优惠券中心"
		}
  ]
})
