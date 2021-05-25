import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

var routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/index",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "首页"
        },
        component: () => import("../views/index/index.vue")
      },
      {
        path: "/need",
        name: "need",
        redirect: { name: "needs" },
        meta: {
          title: "委托业务管理"
        },
        component: () => import("../views/entrust/homes.vue"),
        children: [
          {
            path: "needs",
            name: "needs",
            meta: {
              title: "委托业务管理/委托需求管理",
              keepAlive: true
            },
            component: () => import("../views/entrust/need.vue")
          },
          {
            path: "needDetail",
            name: "needDetail",
            meta: {
              title: "委托业务管理/委托需求管理/委托需求详情",
              keepAlive: false
            },
            component: () =>
              import("../views/entrust/needDetail/needDetail.vue")
          },
          {
            path: "needAdd",
            name: "needAdd",
            meta: {
              title: "委托业务管理/委托需求管理/添加委托需求",
              keepAlive: false
            },
            component: () => import("../views/entrust/needAdd/needAdd.vue")
          }
        ]
      },
      {
        path: "/order",
        name: "order",
        redirect: { name: "orders" },
        meta: {
          title: "委托业务管理"
        },
        component: () => import("../views/entrust/homes1.vue"),
        children: [
          {
            path: "orders",
            name: "orders",
            meta: {
              title: "委托业务管理/委托订单管理",
              keepAlive: true
            },
            component: () => import("../views/entrust/order.vue")
          },
          {
            path: "orderPa",
            name: "orderPa",
            meta: {
              title: "委托业务管理/委托订单管理/委托订单管理详情",
              keepAlive: false
            },
            component: () => import("../views/entrust/particulars/orderPa.vue")
          }
        ]
      },
      {
        path: "/protocol",
        name: "protocol",
        redirect: { name: "protocols" },
        meta: {
          title: "委托业务管理"
        },
        component: () => import("../views/entrust/homes2.vue"),
        children: [
          {
            path: "protocols",
            name: "protocols",
            meta: {
              title: "委托业务管理/委托协议管理",
              keepAlive: true
            },
            component: () => import("../views/entrust/protocol.vue")
          },
          {
            path: "protocolxq",
            name: "protocolxq",
            meta: {
              title: "委托业务管理/委托协议管理/委托协议管理详情/",
              keepAlive: false
            },
            component: () => import("../views/entrust/particulars/protocolxq.vue")
          }
        ]
      },
      {
        path: "/sign",
        name: "sign",
        redirect: { name: "signs" },
        meta: {
          title: "标的物管理"
        },
        component: () => import("../views/sign/homes.vue"),
        children: [
          {
            path: "signs",
            name: "signs",
            meta: {
              title: "标的物管理",
              keepAlive: true
            },
            component: () => import("../views/sign/sign.vue")
          },
          {
            path: "signDetail",
            name: "signDetail",
            meta: {
              title: "标的物管理/详情",
              keepAlive: true
            },
            component: () => import("../views/sign/signDetail/signDetail.vue")
          },
          {
            path: "signDetails",
            name: "signDetails",
            meta: {
              title: "标的物管理/详情",
              keepAlive: true
            },
            component: () => import("../views/sign/signDetail/signDetails.vue")
          },
          {
            path: "signDetailss",
            name: "signDetailss",
            meta: {
              title: "标的物管理/详情",
              keepAlive: true
            },
            component: () => import("../views/sign/signDetail/signDetailss.vue")
          },
        ]
      },
      {
        path: "/bidding",
        name: "bidding",
        meta: {
          title: "竞价管理"
        },
        component: () => import("../views/transaction/bidding.vue")
      },
      {
        path: "/biddingDetail",
        name: "biddingDetail",
        meta: {
          title: "竞价管理详情"
        },
        component: () =>
          import(
            /* webpackChunkName: "donate" */
            "../views/transaction/biddingDetail/biddingDetail.vue"
          )
      },
      {
        path: "/biddingAdd",
        name: "biddingAdd",
        meta: {
          title: "添加竞价单"
        },
        component: () =>
          import(
            /* webpackChunkName: "donate" */
            "../views/transaction/biddingAdd/biddingAdd.vue"
          )
      },
      {
        path: "/bidderDetails",
        name: "bidderDetails",
        meta: {
          title: "添加竞价单"
        },
        component: () =>
          import(
            /* webpackChunkName: "donate" */
            "../views/transaction/biddingDetail/bidderDetails.vue"
          )
      },
      {
        path: "/indent",
        name: "indent",
        redirect: { name: "indents" },
        meta: {
          title: "交易管理"
        },
        component: () => import("../views/transaction/homes.vue"),
        children:[
          {
            path: "indents",
            name: "indents",
            meta: {
              title: "交易管理/订单管理"
            },
            component: () => import("../views/transaction/indent.vue")
          },
          {
            path: "indentDetail",
            name: "indentDetail",
            meta: {
              title: "交易管理/订单管理/订单管理详情"
            },
            component: () =>
              import("../views/transaction/indentDetail/indentDetail.vue")
          },
        ]
      },
    
      {
        path: "/earnestmoney",
        name: "earnestmoney",
        meta: {
          title: "保证金管理"
        },
        component: () => import("../views/earnestmoney/earnestmoney.vue")
      },
      {
        path: "/earnestmoneyDetail",
        name: "earnestmoneyDetail",
        meta: {
          title: "保证金详情"
        },
        component: () =>
          import(
            "../views/earnestmoney/earnestmoneyDetail/earnestmoneyDetail.vue"
          )
      },
      {
        path: "/statement",
        name: "statement",
        meta: {
          title: "结算单管理"
        },
        component: () => import("../views/finance/statement.vue")
      },
      {
        path: "/StatementDetails",
        name: "StatementDetails",
        meta: {
          title: "结算单管理"
        },
        component: () =>
          import("../views/finance/StatementDetails/StatementDetails.vue")
      },
      {
        path: "/account",
        name: "account",
        meta: {
          title: "资金账户管理"
        },
        component: () => import("../views/finance/account.vue")
      },
      {
        path: "/invoice",
        name: "invoice",
        meta: {
          title: "发票管理"
        },
        component: () => import("../views/finance/invoice.vue")
      },
      {
        path: "/checking",
        name: "checking",
        meta: {
          title: "对账管理"
        },
        component: () => import("../views/finance/checking.vue")
      },
      {
        path: "/CheckAdd",
        name: "CheckAdd",
        meta: {
          title: "对账单添加或详情"
        },
        component: () =>
          import("../views/finance/CheckManagement/CheckAdd/CheckAdd.vue")
      },
      {
        path: "/CheckStatements",
        name: "CheckStatements",
        meta: {
          title: "详情"
        },
        component: () =>
          import(
            "../views/finance/CheckManagement/CheckStatements/CheckStatements.vue"
          )
      },
      {
        path: "/projectfund",
        name: "projectfund",
        meta: {
          title: "开票管理"
        },
        component: () => import("../views/finance/projectfund.vue")
      },
      {
        path: "/projectfundDetails",
        name: "projectfundDetails",
        meta: {
          title: "开票管理详情"
        },
        component: () =>
          import("../views/finance/projectfundDetails/projectfundDetails.vue")
      },
      {
        path: "/Inputinvoice",
        name: "Inputinvoice",
        meta: {
          title: "录入发票"
        },
        component: () =>
          import("../views/finance/projectfundDetails/Inputinvoice.vue")
      },
      {
        path: "/detail",
        name: "detail",
        meta: {
          title: "出入金明细"
        },
        component: () => import("../views/finance/detail.vue")
      },
      {
        path: "/statistics",
        name: "statistics",
        meta: {
          title: "统计分析"
        },
        component: () => import("../views/statistics/statistics.vue")
      },
      {
        path: "/client",
        name: "client",
        redirect: { name: "clients" },
        meta: {
          title: "组织管理",
         
        },
        component: () => import("../views/organization/homes.vue"),
        children: [
          {
            path: "clients",
            name: "clients",
            meta: {
              title: "组织管理/委托方管理",
              keepAlive: true
            },
            component: () => import("../views/organization/client.vue")
          },
          {
            path: "client_details",
            name: "client_details",
            meta: {
              title: "组织管理/委托方管理/委托方详情",
              keepAlive: false
            },
            component: () => import("../views/organization/client_details.vue")
          },

          {
            path: "client_add",
            name: "client_add",
            meta: {
              title: "组织管理/委托方管理/添加委托方",
              keepAlive: false
            },
            component: () => import("../views/organization/client_add.vue")
          },

          {
            path: "client_bianji",
            name: "client_bianji",
            meta: {
              title: "组织管理/委托方管理/编辑委托方", 
              keepAlive: false
            },
            component: () => import("../views/organization/client_bianji.vue")
          },
          {
            path: "employees",
            name: "employees",
            meta: {
              title: ""
            },
            component: () => import("../views/organization/employees.vue")
          },
          {
            path: "xiangqing",
            name: "xiangqing",
            meta: {
              title: "组织管理/委托方管理/人员详情",
              keepAlive: false
            },
            component: () =>
              import("../views/organization/zaccount/xiangqing.vue")
          }
        ]
      },
      {
        path: "/authority",
        name: "authority",
        redirect: { name: "authoritys" },
        meta: {
          title: "组织管理"
        },
        component: () => import("../views/organization/homes1.vue"),
        children: [
          {
            path: "authoritys",
            name: "authoritys",
            meta: {
              title: "组织管理/角色权限管理",
              keepAlive: true
            },
            component: () => import("../views/organization/authority.vue")
          },
          {
            path: "authorityadd",
            name: "authorityadd",
            meta: {
              title: "组织管理/角色权限管理/角色权限详情",
              keepAlive: false
            },
            component: () => import("../views/organization/authorityadd.vue")
          },
          {
            path: "add",
            name: "add",
            meta: {
              title: "组织管理/角色权限管理/添加、修改角色权限",
              keepAlive: false
            },
            component: () => import("../views/organization/add/add.vue")
          }
        ]
      },
      {
        path: "/zaccount",
        name: "zaccount",
        redirect: { name: "zaccounts" },
        meta: {
          title: "组织管理"
        },
        component: () => import("../views/organization/homes2.vue"),
        children: [
          {
            path: "zaccounts",
            name: "zaccounts",
            meta: {
              title: "组织管理/人员管理",
              keepAlive: true
            },
            component: () => import("../views/organization/zaccount.vue")
          },
          {
            path: "zaccountadd",
            name: "zaccountadd",
            meta: {
              title: "组织管理/人员管理/添加、修改人员",
              keepAlive: false
            },
            component: () =>
              import("../views/organization/zaccount/zaccountadd.vue")
          },
          {
            path: "xiangqings",
            name: "xiangqings",
            meta: {
              title: "组织管理/人员管理/人员详情",
              keepAlive: false
            },
            component: () =>
              import("../views/organization/zaccount/xiangqing.vue")
          }
        ]
      },

      {
        path: "/log",
        name: "log",
        meta: {
          title: "日志"
        },
        component: () => import("../views/log/log.vue")
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "找不到页面"
        },
        component: () =>
          import(
            /* webpackChunkName: "404" */
            "../views/404.vue"
          )
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限"
        },
        component: () => import("../views/403.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () =>
      import(
        /* webpackChunkName: "login" */
        "../views/Login.vue"
      )
  },
  {
    path: "/qrcode",
    name: "qrcode",
    meta: {
      title: "二维码"
    },
    component: () => import("../views/qrcode/qrcode.vue")
  }
];

var router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

router.beforeEach((to, from, next) => {
  document.title = "铁建商城";
  var role = localStorage.getItem("certificate");
  if (to.path == "/qrcode") {
    next();
  } else {
    if (!role && to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
