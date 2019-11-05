<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="box2">
        <div class="con">
          <h4>充值金额</h4>
          <div class="field">
            <span>￥</span>
            <input
              v-model.number="form.money"
              placeholder="请输入要提现的金币数量"
              type="number"
              pattern="[0-9]*"
            />
          </div>
          <h4>充值方式</h4>
          <van-radio-group v-model="form.type" class="radio-group">
            <van-radio :name="1" class="radio">微信充值</van-radio>
            <van-radio :name="2" class="radio">支付宝充值</van-radio>
          </van-radio-group>
          <van-button
            type="info"
            size="large"
            :loading="loading"
            @click="submit"
            class="submit"
          >确认充值</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "recharge",
  components: {
    navBar
  },
  data() {
    return {
      bankList: [],
      withdrawInfo: {},
      form: {
        type: 1,
        money: null,
        order_id:""
      },
      withdrawList: [],
      loading: false,
      showPopup: false
    };
  },
  created() {
    this.$SERVER
      .price_show()
      .then(res => {
        this.form.order_id = res.data.order_id; 
      });
  },
  methods: {
    submit() {
      if (this.form.money > 0) {
        this.loading = true;
        this.$SERVER.recharge_add(this.form).then(res => {
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
        })
      } else {
        this.$toast.fail("请填写正确的提现金额！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 30px 15px;
}
.box2 {
  border-radius: 5px;
  overflow: hidden;
  .box2-top {
    background: #ffd948;
    padding: 25px;
    display: flex;
    h3 {
      font-size: 17px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-right: 30px;
    }
  }
  .con {
    padding: 30px;
    background: #fff;
    h4 {
      font-size: 15px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 10px;
    }
    .field {
      margin: 30px 0;
      font-size: 13px;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: rgba(51, 51, 51, 1);
        font-size: 45px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      input {
        flex-grow: 1;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
      .amount {
        width: 90px;
      }
    }
    .radio-group {
      .radio {
        margin-bottom: 10px;
      }
    }
  }
  .tips {
    margin: 25px 0;
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    p {
      font-size: 15px;
      font-weight: 500;
      color: rgba(255, 217, 72, 1);
    }
  }
}
.submit {
  font-size: 15px;
  font-weight: 500;
  border: 0;
  margin-top: 20px;
}
.nosubmit {
  background: rgba(230, 230, 230, 1);
  font-size: 15px;
  font-weight: 500;
  color: rgba(165, 165, 165, 1);
  border: 0;
}
.table {
  width: 100%;
  margin-top: 45px;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  th {
    background: rgba(255, 217, 72, 1);
    height: 42px;
    line-height: 42px;
  }
  td {
    background: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.popup {
  width: 80%;
  height: 80%;
  padding: 15px;
  border-radius: 5px;
  overflow: scroll;
}
</style>