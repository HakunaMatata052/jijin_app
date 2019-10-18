<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="up">
        <img :src="form.positive" class="img" v-if="form.positive" />
        <van-uploader
          :after-read="uploadAvatar"
          name="positive"
          :accept="'image/*'"
          :max-count="1"
          v-else
        >
          <div class="idCard">
            <van-icon class-prefix="icon" name="wode1" class="wode1Icon" />
            <br />请上传您的身份证正面照
          </div>
        </van-uploader>
      </div>
      <div class="up">
        <img :src="form.back" class="img" v-if="form.back" />
        <van-uploader
          :after-read="uploadAvatar"
          name="back"
          :accept="'image/*'"
          :max-count="1"
          v-else
        >
          <div class="idCard">
            <van-icon class-prefix="icon" name="guohui" class="guohuiIcon" />
            <br />请上传您的身份证正面照
          </div>
        </van-uploader>
      </div>
      <van-cell-group class="inforform">
        <van-field label="您的姓名" v-model="form.real_name" placeholder="请输入您的姓名" />
        <van-field label="身份证号" v-model="form.user_id_card" placeholder="请输入身份证号码" />
        <van-field label="新手机号" v-model="form.user_account" placeholder="请输入新的手机号" />
        <van-field label="验证码" class="phone" v-model="form.captcha" center clearable placeholder="请输入短信验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendchecknum"
            :disabled="checkNumDisabled"
          >
            <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
            <span v-else>发送验证码</span>
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn" @click="submit">确定</div>
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
        positive: null,
        back: null,
        real_name: "",
        user_account: "",
        user_id_card: "",
        captcha: ""
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    submit() {
      if(!this.form.positive || !this.form.back){
        this.$toast.fail("请上传身份证正反面！");
        return
      }
      if (!regexUtil.isChinese(this.form.real_name)) {
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
      this.$SERVER.appeal(this.form).then(res => {
        this.$toast.success(res.msg);
        this.$router.go(-1)
      });
    },
    uploadAvatar(file, detail) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("token", this.$store.state.token);
      this.$SERVER
        .uploadfile(formData)
        .then(res => {
          this.form[detail.name] = res.data.face;
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    },
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
  .idCard {
    width: 290px;
    height: 160px;
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
  .img {
    width: 100%;
    height: 100%;
  }
}
.van-cell {
  padding: 15px 40px;
}
.phone {
  .van-field__label {
    width: 35px;
  }
  .anquanIcon {
    font-size: 20px;
    color: rgba(173, 173, 173, 1);
  }
  .van-button--primary {
    background: rgba(81, 150, 255, 1);
    border: none;
    border-radius: 25px;
  }
}
.inforform {
  padding-bottom: 26px;
}
.btn {
  width: 270px;
  height: 44px;
  background: rgba(81, 150, 255, 1);
  border-radius: 22px;
  margin: 27px auto;
  font-size: 17px;
  font-family: PingFang;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
}
</style>

