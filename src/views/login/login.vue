<template>
  <div id="login">
    <navBar :stl="'nobg'" title />

    <div class="login">
      <img class="logoImg" :src="logo" />
      <div class="main">
        <h1>登录</h1>
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="form.user_account"
            clearable
            placeholder="请输入手机号"
            class="field"            
            type="number" pattern="[0-9]*"
            :border="false"
          >
            <template slot="left-icon">
              <van-icon class-prefix="icon" name="shouji" color="rgba(173,173,173,1)" />
            </template>
          </van-field>
          <van-field
            v-model="form.user_pwd"
            type="password"
            placeholder="请输入密码"
            class="field"
            :border="false"
          >
            <template slot="left-icon">
              <van-icon class-prefix="icon" name="mima" color="rgba(173,173,173,1)" />
            </template>
          </van-field>
        </van-cell-group>
        <span class="forget" @click="$router.push('/resetPassword')">忘记密码？</span>
        <van-button
          type="primary"
          size="large"
          :loading="loginLoading"
          loading-type="spinner"
          @click="loginFn"
          class="loginbtn"
          :hairline="false"
        >立即登录</van-button>
        <div class="sigIn"><span @click="$router.push('/register')">用户注册</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
import logo from "@/assets/images/logo.png";
export default {
  name: "login",
  components: {
    navBar
  },
  data() {
    return {
      logo:logo,
      form: {
        user_account: "",
        user_pwd: ""
      },
      loginLoading: false
    };
  },
  created() {
    if (this.$METHOD.getStore("token")) {
      this.$router.push("/");
    }
  },
  methods: {
    loginFn() {
      var that = this;
      if (!regexUtil.isPhone(that.form.user_account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if(that.form.user_pwd.length==0){
        this.$toast.fail("请填写密码");
        return;
      }
      that.loginLoading = true;
      that.$SERVER
        .login(that.form)
        .then(res => {
          that.$toast.success("登录成功");
          that.$METHOD.setStore("token", res.data.userinfo.token);
          that.$store.state.token = res.data.userinfo.token;
          that.$store.state.userInfo = res.data.userinfo_first;
          that.loginLoading = false;
          that.$router.go(-1);
        })
        .catch(res => {
          that.loginLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#login .van-field__control {
  color: rgba(153, 153, 153, 1);
}
.top {
  background: rgba(255, 255, 255, 0);
}
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login-bg.png") no-repeat center center;
  background-size: cover;
  .logoImg {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    margin-top: 65px;
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .main {
    background: #fff;
    border-radius: 20px;
    margin: 45px 20px 0 20px;
    width: 73%;
    padding: 0 32px;
  }
  h1 {
    font-size: 25px;
    font-weight: 800;
    color: rgba(81, 150, 255, 1);
    margin: 24px 0 20px 0;
    text-align: left;
  }
  .van-cell {
    padding: 0.4rem 0;
  }
  .cell-group,
  .field {
    background: none;
    border: 0;
  }
  .cell-group {
    margin-bottom: 25px;
  }
  .field {
    height: 60px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .forget {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .sigIn {
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(81, 150, 255, 1);
    text-align: center;
    margin: 31px 0 49px 0;
  }
  .loginbtn {
    background: rgba(81, 150, 255, 1);
    border-radius: 100px;
    margin-top: 30px;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    color: rgba(255, 255, 255, 1);
    border: 0;
  }
  .loginbtn span {
    font-weight: bold;
  }
  p {
    display: flex;
    margin-top: 30px;
    color: #fff;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: rgba(232, 232, 232, 1);
  }
}
</style>
