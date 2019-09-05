<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="tradingknow">
      <div class="tradingknowtop">
        <div class="tradingknowtopM">
          <van-col :span="5">份额确认</van-col>
          <van-col :span="19">
            15:00前购买，下1个交易日确认
            <br />15:00后购买，下2个交易日确认
          </van-col>
        </div>
        <div class="tradingknowtopM tradingknowtopMC">
          <van-col :span="5">撤销购买</van-col>
          <van-col :span="19">认购期与申购期购买后当日15:00前可撤销</van-col>
        </div>
        <div class="tradingknowtopM">
          <van-col :span="5">赎回规则</van-col>
          <van-col :span="19">可部分赎回，最低赎回份额不低于10.00份。赎回到账时间请以基金公司赎回清算时间为准</van-col>
        </div>
      </div>
      <div class="tradingknowCenter">
        <h1>交易时间确认表</h1>
        <van-grid :column-num="3" style="background:rgba(81,150,255,.04);">
          <van-grid-item text="交易申请时间" class="thead" />
          <van-grid-item text="申购确认" class="thead1" />
          <van-grid-item text="赎回到账" class="thead1" />
        </van-grid>
        <van-grid
          :column-num="3"
          v-for="(value,index) in tableList"
          :key="index"
          style="background:rgba(255,255,255,1);"
        >
          <van-grid-item :text="value.time" class="thead" />
          <van-grid-item :text="value.purchase" class="thead1" />
          <van-grid-item :text="value.redemption" class="thead1" />
        </van-grid>
      </div>
      <div class="service" @click="$router.push('/chat')">
        <van-icon class-prefix="icon" name="kefu" class="kefu"/>联系客服    
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "tradingknow",
  components: {
    navBar
  },
  data() {
    return {
      tableList: [
        {
          time: "上周五15:00~周一15:00",
          purchase: "周二",
          redemption: "下周一"
        },
        {
          time: "周一15:00~周二15:00",
          purchase: "周三",
          redemption: "下周二"
        },
        {
          time: "周二15:00~周三15:00",
          purchase: "周四",
          redemption: "下周三"
        },
        {
          time: "周三15:00~周四15:00",
          purchase: "周五",
          redemption: "下周四"
        },
        {
          time: "周四15:00~周五15:00 ",
          purchase: "下周一",
          redemption: "下周五"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.tradingknow {
  .tradingknowtop {
    margin-top: 16px;
    background: #fff;
    width: 100%;
    height: 150px;
    padding: 22px 0 24px;
    .tradingknowtopM {
      height: 50px;
      padding: 0 15px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 23px;
    }
    .tradingknowtopMC {
      line-height: 50px;
    }
  }
  .tradingknowCenter {
      background: #fff;
      padding: 18px 15px 30px 15px;
      margin-top: 15px;
    h1 {
      font-size: 15px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      padding:0 0 18px 6px;
    }
    .thead {
      flex-basis: 50% !important;
      div {
        background: rgba(0, 0, 0, 0) !important;
      }
    }
    .thead1 {
      flex-basis: 25% !important;
      div {
        background: rgba(0, 0, 0, 0) !important;
      }
    }
  }
  .service{
    height:44px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    font-size:15px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(81,150,255,1);
    line-height:45px;
    text-align: center;
    margin:35px 15px 100px 15px;
    position: relative;
    padding-left: 23px;
    .kefu{
        font-size: 18px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
        top: 4%;
    }
  }
}
</style>

