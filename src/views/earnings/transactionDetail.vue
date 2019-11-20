<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell
        :title="info.fund_name"
        is-link
        size="large"
        :label="info.fund_code"
        class="cell"
        :to="'/buyfund/'+info.order_id"
      />
      <van-panel title="支付金额" :status="info.zhifu_money+'元'" size="large" class="cell">
        <van-steps direction="vertical" :active="info.status" active-color="#5196FF" class="cell" v-if="info.type==1">
          <van-step class="step">
            申购申请
            <p>{{info.create_time}}</p>
          </van-step>
          <van-step class="step">
            份额确认，开始产生收益
            <p>{{info.yuji_time}}</p>
          </van-step>
          <van-step class="step">
            查看收益
            <p>{{info.yuji_shouyi}}</p>
          </van-step>
          <van-step class="step">
            交易结束
          </van-step>
        </van-steps>

       <van-steps direction="vertical" :active="info.status" active-color="#5196FF" class="cell" v-else>
          <van-step class="step">
            赎回申请
            <p>{{info.create_time}}</p>
          </van-step>
          <van-step class="step">
            赎回成功
            <p>{{info.yuji_shouyi}}</p>
          </van-step>
        </van-steps>
      </van-panel>
      <van-cell-group class="cell" v-if="info.type==1&&(info.status==2||info.status==3)">
        <van-cell title="确认金额" :value="info.queren_money+'元'" />
        <van-cell title="确认份数" :value="info.volume+'份'" />
        <van-cell title="确认净值" :value="info.deal_price" />
        <van-cell title="手续费" :value="info.transfer_fee+'元'" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "transactionDetail",
  components: {
    navBar
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.$SERVER
      .stock_detail({
        id: this.$route.params.id,
        state: this.$route.params.state
      })
      .then(res => {
        this.info = res.data;
      });
  }
};
</script>

<style lang="less" scoped>
.cell {
  margin-top: 10px;
}
.step {
  font-size: 15px;
  font-weight: bold;
  p {
    font-size: 13px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>