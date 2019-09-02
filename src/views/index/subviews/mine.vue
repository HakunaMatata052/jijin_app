<template>
  <div id="mine">
    <navBar :stl="'nobg'" />
    <div class="main">
      <div class="own" :style="'padding-top:'+ top +'px'">
        <van-uploader
          :after-read="uploadAvatar"
          :accept="'image/*'"
          class="ownHeadImg"
        >
          <img src="../../../assets/images/default.png" />
        </van-uploader>
        <div class="ownInfor">
          <span>{{$store.state.userInfo.user_nickname}}</span>
          <van-icon class-prefix="icon" name="bianji" class="editorIcon" @click="isShow = true" />
        </div>
      </div>
      <van-cell-group class="mineList">
        <van-cell
          :title="item.text"
          is-link
          v-for="(item,index) in mineList"
          :key="index"
          :to="item.path"
        >
          <template slot="icon">
            <svg-icon :icon-class="item.ico" class="mine-ico svgIcon" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-button type="danger" class="logout" @click="logout" :hairline="false">退出</van-button>
    </div>
    <!-- 修改昵称 -->

    <van-dialog v-model="isShow" title="修改昵称" @confirm="setNickname" show-cancel-button>
      <input v-model="user_nickname" placeholder="输入昵称" class="nickname" />
    </van-dialog>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "mine",
  components: {
    navBar
  },
  data() {
    return {
      top: 0,
      myInfo: {
        fansCount: 0,
        attentionCount: 0,
        orderCount: 0
      },
      mineList: [
        {
          text: "修改支付密码",
          path: "/setPayPassword",
          ico: "mima"
        },
        {
          text: "修改登录密码",
          path: "/resetPassword",
          ico: "mima"
        },
        {
          text: "绑定银行卡",
          path: "/bankup",
          ico: "yinhangka"
        },
        {
          text: "实名认证",
          path: "/registration",
          ico: "shezhi"
        },
        {
          text: "修改绑定手机",
          path: "/securityaccount",
          ico: "bianji"
        },
        {
          text: "在线客服",
          path: "/chat",
          ico: "kefu"
        },
        {
          text: "关于我们",
          path: "/aboutus",
          ico: "guanzhu"
        }
      ],
      isShow: false,
      user_nickname: this.$store.state.userInfo.user_nickname
    };
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
      this.searchEmptyShow = true;
    }
  },
  methods: {
    logout() {
      this.$METHOD.removeStore("token");
      this.$METHOD.removeStore("userInfo");
      this.$METHOD.removeStore("rongyunToken");
      this.$store.state.userInfo = {};
      this.$toast.success("退出成功！");
      this.$router.push("/");
      this.$SERVER.logout().then(res => {});
    },
    uploadAvatar(file) {
      let formData = new FormData();
      // formData.append('file', file.file);
      formData.append('a',"a");
      // console.log(typeof formData)
      this.$SERVER.uploadfile(formData);
    },
    uploadSuccess(val) {
      var that = this;
      that.$METHOD.updateLocalUserInfo(
        that.activePopup.field,
        that.activePopup.value
      );
    },
    setNickname() {
      this.$SERVER
        .faceup({
          user_nickname: this.user_nickname
        })
        .then(res => {
          this.$toast.success("修改成功！");
          this.$store.state.userInfo.user_nickname = this.user_nickname;
          this.$METHOD.updateLocalUserInfo("user_nickname", this.user_nickname);
        });
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    }
  },
  activated() {}
};
</script>

<style lang="less" scoped>
#mine {
  background: #fff;
  width: 100%;
  height: 100%;
  .main {
    background: url(../../../assets/images/mine-bg.png) no-repeat center top;
    background-size: 100% auto;
    padding-top: 60px;
    .own {
      .ownHeadImg {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        display: block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .ownInfor {
        margin-top: 14px;
        text-align: center;
        span {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .editorIcon {
          margin-left: 6px;
          color: rgba(153, 153, 153, 1);
          font-size: 11px;
        }
      }
    }
    .mineList {
      margin-top: 36px;
    }
    .svgIcon {
      margin-right: 15px;
    }
  }
}
.logout {
  width: 100%;
  margin-top: 20px;
  background: #5196ff;
  border: 0;
}
.nickname {
  border: 1px solid #eee;
  height: 35px;
  line-height: 35px;
  width: 90%;
  margin: 10px auto;
  border-radius: 5px;
  display: block;
  padding: 5px 10px;
}
</style>

