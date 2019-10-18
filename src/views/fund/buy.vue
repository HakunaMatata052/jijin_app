<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="buyTop">
        <p class="tip">交易提示：完成支付后预计在{{info.yujitime}}确认</p>
        <div>
          <p>{{info.stock.fund_name}}（{{info.stock.fund_code}}）</p>
          <p>
            费率：
            <span>{{info.feilv}}</span>
          </p>
        </div>
      </div>
      <van-field
        class="buyNum"
        v-model.number="money"
        label="填写购买金额"
        :placeholder="`最低${info.stock.minmoney}元起购`"
        @input="feilvFn"
        type="number"
        pattern="[0-9]*"
      />

      <van-cell-group>
        <van-cell clickable>
          <template slot="title">
            使用账户余额（可用余额
            <span class="custom-t">{{info.account}}</span>+<span class="custom-t">{{info.tyj}}</span>)
          </template>
          <!-- <van-switch v-model="checked" size="24px" slot="right-icon" /> -->
        </van-cell>
        <!-- <van-cell is-link class="bank">
          <template slot="title">
            <span class="custom-title">付款方式</span>
          </template>
          <template slot="default">
            <span class="custom-title">建设银行 230</span>
          </template>
        </van-cell>-->
      </van-cell-group>
      <div class="updata" @click="submit">提交</div>
    </div>

    <password-box ref="passwordBox" @onSuccess="ajaxBuyState" />
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "buy",
  components: {
    navBar,
    passwordBox
  },
  data() {
    return {
      info: {
        stock: {
          fund_name:"",
          fund_code: "",
          minmoney:0,
        },
        feilv: "",
        account: "0"
      },
      money: "",
      checked: false,
      timer: 0
    };
  },
  created() {
    this.$SERVER
      .stockBuy({
        fund_code: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
      });
  },
  methods: {
    feilvFn() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$SERVER
          .liandong({
            fund_code: this.$route.params.id,
            money: this.money
          })
          .then(res => {
            this.info.feilv = res.data;
          });
      }, 500);
    },
    submit() {
      if (this.money.length == 0) {
        this.$toast.fail("请输入金额");
        return;
      }
      if (this.money < this.info.stock.minmoney) {
        this.$toast.fail("金额低于最低起购值！");
        return;
      }
      if (this.money >  (this.info.account+this.info.tyj)) {
        this.$toast.fail("余额不足！");
        return;
      }
      
      this.$refs.passwordBox.showFn();
    },
    ajaxBuyState(pwd) {
      this.$SERVER
        .ajaxBuyState({
          fund_code: this.$route.params.id,
          money: this.money,
          pay_pwd: pwd,
          type: 1
        })
        .then(res => {
          this.$store.state.buysuccess = res.data;
          this.$router.push("/buysuccess");
        })
        .catch(err => {
          this.$refs.passwordBox.clearFn();
        });
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
    height: 82px;
    p:nth-child(1) {
      margin: 15px;
    }
    p:nth-child(2) {
      margin: 0 15px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
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
}
.custom-t {
  color: #ff5941;
}
</style>

