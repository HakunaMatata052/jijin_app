<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="buyfund">
        <van-cell value="基金详情" class="buyfundtitle">
          <template slot="title">
            <span>前海开源沪港深</span>
            <span>006011</span>
          </template>
        </van-cell>
        <van-row class="buyfundone">
          <van-col span="12">
            <p class="buyfundonetitle">金额(元）</p>
            <p class="buyfundonetitlemoney">100.00</p>
          </van-col>
          <van-col span="12">
            <p class="buyfundonetitle">日涨跌幅</p>
            <p class="buyfundonetitleper">0.85%</p>
          </van-col>
        </van-row>
        <div class="buyfundtwo">
          <div class="buyfundtwoT">
            <span>待确认金额：</span>
            <span>100.00元</span>
          </div>
          <van-cell is-link>
            <template slot="title">
              <div>
                <span class="custom-title">持有份额：</span>
                <span>0.00元</span>
              </div>
              <div class="custom-titlB">
                <span class="custom-title">07-19净值：</span>
                <span>1.1700</span>
              </div>
            </template>
            <template slot="default">
              <div>
                <span class="custom-title" style="margin-left:12px;">昨日收益：</span>
                <span class="custom-titleT">更新中</span>
              </div>
              <div class="custom-titlB">
                <span class="custom-title" style="margin-left:12px;">累计收益：</span>
                <span class="custom-titleT">1,700.00</span>
              </div>
            </template>
          </van-cell>
        </div>
        <div class="buyfundthree">
          <van-tabs
            class="title-tabs"
            :color="$store.state.color"
            :title-active-color="$store.state.color"
          >
            <van-tab title="近一月" name="a"></van-tab>
            <van-tab title="近三月" name="b"></van-tab>
            <van-tab title="近半年" name="c"></van-tab>
            <van-tab title="近一年" name="d"></van-tab>
          </van-tabs>
          <van-row class="showDeepAndGains">
            <van-col span="12">
              <van-icon class-prefix="icon" name="dian" class="gainsIcon" />
              <span class="gains">本基金涨跌幅</span>
              <span class="gainsPer">+8.16%</span>
            </van-col>
            <van-col span="12">
              <van-icon class-prefix="icon" name="dian" class="deepIcon" />
              <span class="deep">深沪300</span>
              <span class="deepPer">+8.16%</span>
            </van-col>
          </van-row>
          <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        </div>
        <div class="buyfundfour">
          <van-cell title="交易记录" is-link />
        </div>
      </div>
    </div>
    <div class="bottom-btn" :style="'height:'+ (50+bottom)+'px;'">
      <div class="btn sell" @click="gobuy('/redemption/')">赎回</div>
      <div class="btn buy" @click="gobuy('/redemption/')">申购</div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "buyfund",
  components: {
    navBar
  },
  data() {
    return {
      bottom: 0
    };
  },
  created(){
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
  },
  methods: {
    gobuy(type) {
      this.$router.push(type + this.$route.params.id);
    }
  }
};
</script>

<style lang="less" scoped>
.buyfund {
  margin-top: 16px;
  .buyfundtitle {
    .van-cell__value {
      flex: 0.3;
      line-height: 30px;
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(81, 150, 255, 1);
    }
    .van-cell__title {
      display: flex;
      span:nth-child(1) {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      span:nth-child(2) {
        font-size: 15px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        margin-left: 7px;
      }
    }
  }
  .buyfundone {
    height: 74px;
    background: rgba(255, 255, 255, 1);
    margin: 15px 0;
    padding: 0 16px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    line-height: 18px;
    .buyfundonetitle {
      padding-top: 17px;
      font-size: 13px;
      color: rgba(153, 153, 153, 1);
    }
    .buyfundonetitlemoney {
      padding-top: 7px;
      font-size: 21px;
      color: rgba(255, 89, 65, 1);
    }
    .buyfundonetitleper {
      padding-top: 7px;
      font-size: 15px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .buyfundtwo {
    .buyfundtwoT {
      height: 50px;
      background: rgba(255, 255, 255, 1);
      line-height: 50px;
      padding: 0 15px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      span:nth-child(2) {
        color: #333333;
      }
    }
    .van-cell__value {
      text-align: left;
      .custom-titleT {
        color: #ff5941;
      }
    }
    .custom-titlB {
      margin: 15px auto 18px;
    }
    .van-cell__title {
      .custom-title {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .buyfundthree {
    background: #fff;
    .showDeepAndGains {
      padding: 15px 15px 0 15px;
      .gainsIcon {
        color: rgba(255, 89, 65, 1);
        position: absolute;
      }
      .deepIcon {
        color: rgba(81, 150, 255, 1);
        position: absolute;
      }
      .gains,
      .deep {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #999999;
        line-height: 18px;
        padding-left: 20px;
      }
      .gainsPer,
      .deepPer {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #ff5941;
        line-height: 18px;
      }
    }
  }
  .buyfundfour {
    margin: 15px 0 60px 0;
    .van-cell__title {
      color: #333;
    }
  }
  .van-button--warning {
    background: #fff;
    border: none;
    font-size: 17px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    flex: 0.7;
  }
  .van-button--danger {
    background: rgba(255, 89, 65, 1);
    border: none;
  }
}
.bottom-btn {
  display: flex;
  .btn {
    flex-grow: 1;
    line-height: 50px;
    background: #fff;
    text-align: center;
    &.sell {
      width: 40%;
    }
    &.buy {
      background: rgba(255, 89, 65, 1);
      color: #fff;
      width: 60%;
    }
  }
}
</style>

