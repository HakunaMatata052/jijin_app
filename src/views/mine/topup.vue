<template>
<div class="container">
     <navBar :title="json.title"/>
  <div class="main">
    <van-cell-group class="money">
      <h1>{{json.title}}</h1>
      <van-field v-model="value" placeholder="请输入充值金额" />
    </van-cell-group>
    <van-cell is-link class="bank">
      <template slot="title">
        <span class="custom-title">{{json.title3}}</span>
      </template>
      <template slot="default">
        <span class="custom-title">建设银行 230</span>
      </template>
    </van-cell>
    <div class="updata">提交</div>
  </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "topup",
  components: {
    navBar
  },
  data() {
    var param = this.$route.query.id
    console.log(param)
     var json
    if(param==1){
      json = {
        title:"充值",
        title1:"充值金额",
        title3:"付款方式",
        title4:"请输入充值金额"
      }
    }else{
      json = {
        title:"提现",
        title1:"提现金额",
        title3:"提现至",
        title4:"当前可提现金额2000.00元"
      }
    }
    console.log(json)
    return {json};
  },
  created() {
     
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.money {
  h1 {
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding: 21px 0 15px 17px;
  }
  margin: 16px 0;
}
.bank {
  .van-cell__title {
    flex: 0.5;
    font-size: 15px;
    color: rgba(51, 51, 51, 1);
  }
  .van-cell__value {
    text-align: left;
    font-size: 15px;
    color: rgba(153, 153, 153, 1);
  }
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
</style>

