<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition name="van-fade">
      <autoLaunch v-if="show" @complete="complete" />
    </transition>
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view v-if="!show"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
/* eslint-disable */
import router from "./router/router.js";
import messageUtil from "@/common/js/messageUtil.js";
import autoLaunch from "@/components/autoLaunch/autoLaunch.vue";
export default {
  name: "App",
  components: {
    autoLaunch
  },
  data() {
    return {
      show: true,
      transitionName: "",
      keepAlive: [],
      id: ""
    };
  },
  created() {
    var that = this;
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes);
    // 记录路由,动态给定动画
    this.$navigation.on("forward", to => {
      this.transitionName = to.route.meta.isTransition ? "slide-left" : "";
    });
    this.$navigation.on("back", (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    });
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
      this.allEvent();
      // this.$RONGYUN.initRongyun(); //初始化融云
      that.$store.state.systemType = api.systemType;
      //关闭启动图
      api.removeLaunchView({
        animation: { type: "fade", duration: 0 }
      });
    }
    this.setVux();
    if (this.$METHOD.getStore("first")) {
      this.show = false;
    }
  },
  mounted() {
    // console.log(this.keepAlive); // 设置缓存匹配
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
      this.$socket.emit("setRoom", { roomId: this.$store.state.userInfo.user_id}); //监听connect事件
    },
    message(data) {
      //监听message事件，方法是后台定义和提供的
      console.log(123456)
      api.notification({
        notify: {
          title: "通知标题",
          content: data
        }
      });
      console.log(data);
    }
  },
  methods: {
    complete() {
      this.show = false;
    },
    allEvent() {
      var that = this;
      // 点击消息状态栏跳转
      api.addEventListener(
        {
          name: "swiperight"
        },
        function(ret, err) {
          if (
            that.$route.name == "home" ||
            that.$route.name == "video" ||
            that.$route.name == "game" ||
            that.$route.name == "mine"
          ) {
          } else {
            that.$router.go(-1);
          }
        }
      );
      //点击消息状态栏跳转
      api.addEventListener(
        {
          name: "noticeclicked"
        },
        function(ret, err) {
          if (ret.value.type) {
            that.$router.push("/" + ret.value.type + "/" + ret.value.value);
          }
        }
      );
    },
    db() {
      if (window.navigator.userAgent.match(/APICloud/i)) {
        messageUtil.openDb();
        messageUtil.createTable();
      }
    },
    setRouteKeepAlive(routes) {
      routes.map(item => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children);
        } else {
          if (item.meta && item.meta.keepAlive) {
            this.keepAlive.push(item.name);
          }
        }
      });
    },
    setVux() {
      this.$store.state.token = this.$METHOD.getStore("token");
      if (this.$METHOD.getStore("userInfo")) {
        this.$store.state.userInfo = JSON.parse(
          this.$METHOD.getStore("userInfo")
        );
      }
    }
  }
};
</script>

<style lang="less" scope>
#app {
  font-family: "PingFang-SC-Medium", "Microsoft YaHei", Helvetica, Tahoma, Arial,
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
</style>
