<template>
  <div class="container">
    <navBar to="/earnings"/>
    <div class="main">
      <div class="buysuccess">
        <van-steps direction="vertical" :active="0" active-color="#5196FF">
          <van-step>
            <div>
              成功赎回
              <span>{{$store.state.sellsuccess.volume}}份</span>
            </div>
            <p>{{$store.state.sellsuccess.fund_name}}</p>
          </van-step>
          <van-step>{{$store.state.sellsuccess.data}}赎回到账，可在账户余额查看资金</van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "redemptionsuccess",
  components: {
    navBar
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.buysuccess {
  margin-top: 16px;
  padding: 31px 35px 35px 26px;
  background: #fff;
  .van-step--vertical {
    padding: 25px 10px 20px 0;
    .van-step__circle-container {
      font-size: 20px;
      top: 35px;
    }
    .van-step__line {
      top: 25px;
    }
  }

  .van-step__circle {
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    background-color: #dbdbdb;
    border-radius: 50%;
  }
  .van-step__title {
    color: #333333;
    div {
      font-size: 15px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: #333333;
      span {
        color: #ff5941;
        margin-left: 5px;
      }
    }
    p {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      margin-top: 8px;
    }
  }
}
</style>

