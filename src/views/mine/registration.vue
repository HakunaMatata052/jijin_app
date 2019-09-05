<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="registration">
      <div class="tipBox" v-if="!$store.state.userInfo.auth">
        <van-icon class-prefix="icon" name="jinggao" class="jinggaoIcon" />
        <div class="tipContent">投资者须知1：根据监管部门规定，基金投资账户需通过实名认证，以保证投资安全。</div>
      </div>
      <div class="steps" v-if="!$store.state.userInfo.auth">
        <div class="stepsL active">
          <p class="stepsLT">1</p>
          <p class="stepsLC">实名认证</p>
          <p class="stepsLB">保护个人资产</p>
        </div>
        <div class="stepsC">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div class="stepsR">
          <p class="stepsLT">2</p>
          <p class="stepsLC">设置交易密码</p>
          <p class="stepsLB">用于投资和提现</p>
        </div>
      </div>
      <form class="nameAndidcard">
        <van-cell-group>
          <van-field v-model="$store.state.userInfo.user_real_name" label="姓名" placeholder="请输入真实姓名" clearable :readonly="Boolean($store.state.userInfo.auth)" />
          <van-field v-model="$store.state.userInfo.user_id_card"  label="身份证号" placeholder="请输入身份证号" clearable :readonly="Boolean($store.state.userInfo.auth)" />
        </van-cell-group>
      </form>      
      <van-button type="info" class="btn" :loading="loading" @click="submit" v-if="!$store.state.userInfo.auth">完成认证并设置交易密码</van-button>
      <van-button type="primary" v-else>已完成实名认证</van-button>
    </div>
  </div>
  </div>
</template>

<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "registration",
  components: {
    navBar
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  methods: {
    submit(){
      if(!regexUtil.isChinese(this.$store.state.userInfo.user_real_name)){
        this.$toast.fail('姓名必须是中文！')
        return
      }      
      if(!regexUtil.isIDCard(this.$store.state.userInfo.user_id_card)){
        this.$toast.fail('请填写合法的身份证号！')
        return
      }
      this.loading = true;
      this.$SERVER.realname({
        user_real_name: this.$store.state.userInfo.user_real_name,
        user_id_card: this.$store.state.userInfo.user_id_card
      }).then(res=>{
        this.loading = false
        this.$toast.success('认证成功！')
        this.$METHOD.updateLocalUserInfo('user_real_name',this.$store.state.userInfo.user_real_name)
        this.$METHOD.updateLocalUserInfo('user_id_card',this.$store.state.userInfo.user_id_card)        
        this.$METHOD.updateLocalUserInfo('auth',1)
        this.$router.push('/setPayPassword')
      }).catch(err=>{        
        this.$METHOD.updateLocalUserInfo('user_real_name',null)
        this.$METHOD.updateLocalUserInfo('user_id_card',null)   
        this.loading = false
      })
    }
  }
};
</script>

<style lang="less" scoped>
.registration {
  .tipBox {
    display: flex;
    padding: 23px 21px 19px 21px;
    background: rgba(255, 89, 65, 0.1);
    .tipContent {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 89, 65, 1);
      line-height: 20px;
    }

    .jinggaoIcon {
      font-size: 29px;
      color: rgba(255, 89, 65, 1);
      margin-right: 11px;
      margin-top: 3px;
    }
  }
  .steps {
    padding: 20px;
    background: #fff;
    display: flex;
    .stepsL,
    .stepsR {
      flex: 1;
      text-align: center;
      .stepsLT {
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background: rgba(179, 179, 179, 1);
        border-radius: 50%;
        margin: 0 auto;
      }
      .stepsLC {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        margin: 10px auto;
      }
      .stepsLB {
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .stepsC {
      display: flex;
      width: 50px;
      margin-top: 40px;
      justify-content: space-around;
      p {
        height: 8px;
        width: 8px;
        background: rgba(224, 224, 224, 1);
        border-radius: 50%;
      }
    }
    .active {
      .stepsLT {
        background: rgba(81, 150, 255, 1);
      }
      .stepsLC {
        color: #333333;
      }
    }
  }
  .nameAndidcard {
    margin: 15px 0 60px;
  }
  .btn {
    width: 270px;
    height: 44px;
    background: rgba(81, 150, 255, 1);
    border-radius: 22px;
    font-size:17px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 44px;
    margin: 0 auto;
    display: block;
  }
}
</style>

