<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="inforform">
        <van-field label="您的姓名" v-model="form.user_real_name" placeholder="请输入您的姓名" clearable />
        <van-field label="身份证号" v-model="form.user_id_card" placeholder="请输入身份证号码" clearable />
        <van-field
          label="手机号"
          v-model="form.user_account"
          clearable
          type="number"
          pattern="[0-9]*"
          placeholder="请输入手机号"
        />
        <van-field
          class="phone"
          center
          clearable
          v-model="form.captcha"
          type="number"
          pattern="[0-9]*"
          placeholder="请输入短信验证码"
        >
          <template slot="label">
            <van-icon class-prefix="icon" name="anquan" class="anquanIcon" />
          </template>
          <van-button
            slot="button"
            size="small"
            type="info"
            @click="sendchecknum"
            :disabled="checkNumDisabled"
          >
            <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
            <span v-else>发送验证码</span>
          </van-button>
        </van-field>
        <van-cell value="手机无法接收验证码" to="/accountappeal" value-class="right-text" />
      </van-cell-group>
      <van-button type="info" class="btn" :loading="loading" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "accountappeal",
  components: {
    navBar
  },
  data() {
    return {
      form: {
          user_real_name: "",
          user_id_card: "",
          user_account: "",
          captcha: ""
      },
      loading: false,
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    sendchecknum() {
      if (regexUtil.isPhone(this.form.user_account)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .sendchecknum({
            mobile: this.form.user_account
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.form.captcha = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入正确的手机号码");
      }
    },
    submit() {
      if (!regexUtil.isChinese(this.form.user_real_name)) {
        this.$toast.fail("请输入正确的姓名");
        return;
      }
      
      if (!regexUtil.isIDCard(this.form.user_id_card)) {
        this.$toast.fail("请输入正确的身份证号");
        return;
      }
      if (!regexUtil.isPhone(this.form.user_account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      
      if (!this.form.captcha || this.form.captcha.length==0) {
        this.$toast.fail("请输入验证码");
        return;
      }
      this.loading = true;
      this.$SERVER
        .tradepwdup_auth(this.form)
        .then(res => {
          this.loading = false;
          this.$router.push("/transaction");
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.up {
  width: 290px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  margin: 29px auto;
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 15px;
    color: rgba(51, 51, 51, 1);
    .wode1Icon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 30px 0 15px 0;
    }
    .guohuiIcon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 20px 0;
    }
  }
  .upImg {
    opacity: 0;
  }
}
.phone {
  .anquanIcon {
    font-size: 20px;
    color: rgba(173, 173, 173, 1);
  }
}
.inforform {
  margin-top: 20px;
}
.btn {
  width: 270px;
  height: 44px;
  background: rgba(81, 150, 255, 1);
  border-radius: 22px;
  margin: 27px auto;
  font-size: 17px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
  display: block;
}
.right-text {
  text-align: right;
  color: #999;
}
</style>

