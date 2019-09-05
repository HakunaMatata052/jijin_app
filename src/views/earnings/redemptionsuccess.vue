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
}
</style>

