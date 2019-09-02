<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="buyTop">
        <p class="tip">交易提示：完成支付后预计在{{info.time}}确认</p>
        <div>
          <p>黄金基金</p>
          <p>
            费率：
            <span>{{info.rate}}</span>
          </p>
          <p>
            赎回手续费：
            <span>{{info.redem_rate}}</span>
          </p>
          <p>
            赎回到账：
            <span>{{info.money}}</span>
          </p>
        </div>
      </div>
      <van-field
        class="buyNum"
        v-model.number="value"
        label="填写赎回份额"
        :placeholder="`当前可赎回份额${info.volume}`"
        size="large"
        label-width="120px"
        @focus="keyboardShow = true"
      >
        <span slot="button" @click="sellAll" class="sell-all">全部赎回</span>
      </van-field>

        <van-button type="info" class="updata" :loading="loading" @click="onConfirm">提交</van-button>
    </div>
    <van-number-keyboard
      :show="keyboardShow"
      extra-key="."
      close-button-text="完成"
      @blur="keyboardShow = false"
      v-model="value"
    />
    
    <password-box ref="passwordBox" @onSuccess="submit" />
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "redemption",
  components: {
    navBar,
    passwordBox
  },
  data() {
    return {
      info: {
        rate: 0,
        redem_rate: 0,
        money: 0,
        volume: 0
      },
      value: "",
      keyboardShow: false,
      loading: false,
    };
  },
  watch: {
    value(value) {
      if (Number(value) > Number(this.info.volume)) {
        this.$toast.fail("不能超过当前可赎回份额");
        this.value = ""
      }
    }
  },
  created() {
    this.$toast.loading({
      mask: true,
      duration:0,
      message: "加载中..."
    });
    this.$SERVER
      .redeemIndex({
        order_id: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
        this.$toast.clear();
      });
  },
  methods: {
    sellAll() {
      this.value = this.info.volume
    },    
    onConfirm() {
      if (this.value.length == 0) {
        this.$toast.fail("请输入份额");
        return;
      }
      this.$refs.passwordBox.showFn();
    },
    submit(pwd){
      this.loading = true
      this.$SERVER.redeemSubmit({
         order_id: this.$route.params.id,
         volume: this.volume,
         password: pwd
      }).then(res=>{
        this.loading = false
        this.$toast.success('赎回成功！')
        this.$router.go(-1)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.buyTop {
  .tip {
    height: 52px;
    background: rgba(255, 89, 65, 0.1);
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 89, 65, 1);
    line-height: 52px;
    padding-left: 14px;
  }
  div {
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    margin: 15px;
    p {
      margin: 10px 0;
    }
    p:nth-child(1) {
      font-size: 17px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-child(2) {
      span {
        color: #ff5941;
      }
    }
  }
}
.buyNum {
  margin-bottom: 20px;
}

.updata {
  width: 270px;
  height: 44px;
  background: rgba(81, 150, 255, 1);
  border-radius: 22px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin: 120px auto 0 auto;
  display: block;
}
.custom-t {
  color: #ff5941;
}
.sell-all{
  color:#1989fa;
}
</style>

