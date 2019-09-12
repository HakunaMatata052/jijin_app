import Vue from "vue";
import Router from "vue-router";
import {
  Toast
} from "vant";
Vue.use(Toast);
import $store from "../store/store.js";
// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
          path: "",
          name: "home",
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"首页",
            isMember: false,
            isLogin:false,
            index:0
          }
        },
        {
          path: "/fund/:name?/:theme?",
          name: "fund",
          component: () => import("@/views/index/subviews/fund.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title:"基金",
            isMember: false,
            isLogin:false,
            index:1
          }
        },
        {
          path: "/earnings",
          name: "earnings",
          component: () => import("@/views/index/subviews/earnings.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title:"收益",
            isMember: false,
            isLogin:true,
            index:2
          }
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"我的",
            isMember: false,
            isLogin:true,
            index:3
          },
        }
      ]
    },
    // {
    //   path: "/myfund",
    //   name: "myfund",
    //   component: () => import("@/views/fund/myfund.vue"),
    //   meta: {
    //     keepAlive: false,
    //     isTransition: true,
    //     title:"我的收益",
    //     isMember: false,
    //     isLogin:false
    //   }
    // },
    {
      path: "/mycollection",
      name: "mycollection",
      component: () => import("@/views/fund/mycollection.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"我的收藏",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/myinvitation",
      name: "myinvitation",
      component: () => import("@/views/fund/myinvitation.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"邀请有礼",
        isMember: false,
        isLogin:false
      }
    },
    // {
    //   path: "/myaccount",
    //   name: "myaccount",
    //   component: () => import("@/views/fund/myaccount.vue"),
    //   meta: {
    //     keepAlive: false,
    //     isTransition: true,
    //     title:"我的账户",
    //     isMember: false,
    //     isLogin:false
    //   }
    // },
    {
      path: "/myreport",
      name: "myreport",
      component: () => import("@/views/fund/myreport.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"市场研报",
        isMember: false,
        isLogin:false
      }
    },
    // {
    //   path: "/myearnings",
    //   name: "myearnings",
    //   component: () => import("@/views/fund/myearnings.vue"),
    //   meta: {
    //     keepAlive: false,
    //     isTransition: true,
    //     title:"热销基金",
    //     isMember: false,
    //     isLogin:false
    //   }
    // },
    {
      path: "/myselection",
      name: "myselection",
      component: () => import("@/views/fund/myselection.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"主题选基",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/mytreasure",
      name: "mytreasure",
      component: () => import("@/views/fund/mytreasure.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"现金宝",
        isMember: false,
        isLogin:false
      }
    },
    //基金详情
    {
      path: "/fundDetail/:id",
      name: "fundDetail",
      component: () => import("@/views/fund/fundDetail.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"基金详情",
        isMember: false,
        isLogin:false
      }
    },
     //购买基金详情
     {
      path: "/buyfund/:id",
      name: "buyfund",
      component: () => import("@/views/fund/buyfund.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"购买基金详情",
        isMember: true,
        isLogin:true
      }
    },
    //研报内容详情
    {
      path: "/myreportdetil/:id",
      name: "myreportdetil",
      component: () => import("@/views/fund/myreportdetil.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"市场正文",
        isMember: false,
        isLogin:false
      }
    },
    //购买须知
    {
      path: "/tradingknow",
      name: "tradingknow",
      component: () => import("@/views/fund/tradingknow.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"买入须知",
        isMember: false,
        isLogin:false
      }
    },
    //赎回
    {
      path: "/redemption/:id",
      name: "redemption",
      component: () => import("@/views/fund/redemption.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"赎回",
        isMember: true,
        isLogin:true
      }
    },
    //交易费率
    {
      path: "/interchangefees/:id",
      name: "interchangefees",
      component: () => import("@/views/earnings/interchangefees.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"交易费率",
        isMember: false,
        isLogin:false
      }
    },
     //交易记录
     {
      path: "/transactionrecords",
      name: "transactionrecords",
      component: () => import("@/views/earnings/transactionrecords.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"交易记录",
        isMember: false,
        isLogin:true
      }
    },
     //交易详情
     {
      path: "/transactionDetail/:id",
      name: "transactionDetail",
      component: () => import("@/views/earnings/transactionDetail.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"交易详情",
        isMember: false,
        isLogin:true
      }
    },    
    //购买基金交易记录
    {
      path: "/goldfund",
      name: "goldfund",
      component: () => import("@/views/earnings/goldfund.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"黄金基金",
        isMember: false,
        isLogin:false
      }
    },
    //购买成功
    {
      path: "/buysuccess",
      name: "buysuccess",
      component: () => import("@/views/earnings/buysuccess.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"支付成功",
        isMember: false,
        isLogin:true
      }
    },
    //赎回成功
    {
      path: "/redemptionsuccess",
      name: "redemptionsuccess",
      component: () => import("@/views/earnings/redemptionsuccess.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"赎回成功",
        isMember: false,
        isLogin:true
      }
    },
    //充值、提现
    {
      path: "/topup",
      name: "topup",
      component: () => import("@/views/mine/topup.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"",
        isMember: true,
        isLogin:true
      }
    },
    //余额明细
    {
      path: "/touchbalance",
      name: "touchbalance",
      component: () => import("@/views/mine/touchbalance.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"余额明细",
        isMember: false,
        isLogin:true
      }
    },
    //邀请用户
    {
      path: "/invitation",
      name: "invitation",
      component: () => import("@/views/mine/invitation.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"邀请用户",
        isMember: false,
        isLogin:true
      }
    },
    //设置交易密码
    {
      path: "/transaction",
      name: "transaction",
      component: () => import("@/views/mine/transaction.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"设置交易密码",
        isMember: true,
        isLogin:true
      }
    },
    //购买
    {
      path: "/buy/:id",
      name: "buy",
      component: () => import("@/views/fund/buy.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"购买",
        isMember: true,
        isLogin:true
      }
    },
     //历史净值
     {
      path: "/historyvalue/:id/:type?",
      name: "historyvalue",
      component: () => import("@/views/earnings/historyvalue.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"历史净值",
        isMember: false,
        isLogin:false
      }
    },
    //日收益
    {
      path: "/dayvalue/:id?",
      name: "dayvalue",
      component: () => import("@/views/earnings/dayvalue.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"日收益",
        isMember: false,
        isLogin:true
      }
    },
    //收益分析
    {
      path: "/benefitanalysis/:type?",
      name: "benefitanalysis",
      component: () => import("@/views/earnings/benefitanalysis.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"收益分析",
        isMember: false,
        isLogin:true
      }
    },
    
    //人工账号申诉
    {
      path: "/accountappeal",
      name: "accountappeal",
      component: () => import("@/views/mine/accountappeal.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"人工账号申诉",
        isMember: true,
        isLogin:true
      }
    },
    {
      path: "/setPayPassword",
      name: "setPayPassword",
      component: () => import("@/views/mine/setPayPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"设置支付密码",
        isMember: true,
        isLogin:true
      }
    },
    //搜索
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search/search.vue"),
      meta: {
        keepAlive: true,
        isTransition: false,
        title:"搜索",
        isMember: false,
        isLogin:false
      }
    },
    //实名认证
    {
      path: "/registration",
      name: "registration",
      component: () => import("@/views/mine/registration.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"实名认证",
        isMember: false,
        isLogin:true
      }
    },
     //修改绑定手机
     {
      path: "/securityaccount",
      name: "securityaccount",
      component: () => import("@/views/mine/securityaccount.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"修改绑定手机",
        isMember: true,
        isLogin:true
      }
    },
    // 关于我们
    {
      path: "/aboutus/:type",
      name:"aboutus",
      component: () => import("@/views/mine/aboutus.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"关于我们",
        isMember: false,
        isLogin:false
      }
    },
    //重置登录密码
    {
      path: "/resetOne",
      name: "resetOne",
      component: () => import("@/views/mine/resetOne.vue"),
      meta: {
        keepAlive: true,
        isTransition: true,
        title:"重置登录密码",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/resetTwo",
      name: "resetTwo",
      component: () => import("@/views/mine/resetTwo.vue"),
      meta: {
        keepAlive: true,
        isTransition: true,
        title:"重置登录密码",
        isMember: false,
        isLogin:true
      }
    },
    // 注册登录
    {
      path: "/login/:name?",
      name:"login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"登录",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/register",
      name:"register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"手机注册",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/registerPassword",
      name:"registerPassword",
      component: () => import("@/views/login/registerPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"手机注册",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/resetPassword",
      name:"resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"修改密码",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/chat/:id",
      name:"chat",
      component: () => import("@/views/message/chat.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"客服",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/bankup",
      name:"bankup",
      component: () => import("@/views/mine/bankup.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"绑定银行卡",
        isMember: true,
        isLogin:true
      }
    },
  ]
});
router.beforeEach((to, from, next) => {
  if(to.meta.index){
    $store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      if(from.name=="login"){
        router.push('/')
      }else{
        router.push('/login/'+from.name)
      }      
    }else{
      next()
    }
  }else {
    next()
  }
  if (to.meta.isMember) {
    if (!JSON.parse(window.localStorage.getItem('userInfo')).auth) {
      Toast.fail('请先实名认证后操作！')
      router.push('/registration')
    }else{
      next()
    }
  }
})

router.afterEach(route => {
    
  // console.log(route)
  // console.log("跳转")
})

export default router;