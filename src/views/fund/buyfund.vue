<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="buyfund">
        <van-cell value="基金详情" class="buyfundtitle" :to="'/fundDetail/'+info.fund_code">
          <template slot="title">
            <span>{{info.stock_name}}</span>
            <span>{{info.fund_code}}</span>
          </template>
        </van-cell>
        <van-row class="buyfundone">
          <van-col span="12">
            <p class="buyfundonetitle">金额(元）</p>
            <p class="buyfundonetitlemoney">{{info.money}}</p>
          </van-col>
          <van-col span="12">
            <p class="buyfundonetitle">月涨跌幅</p>
            <p class="buyfundonetitleper">{{info.month_incratio}}</p>
          </van-col>
        </van-row>
        <div class="buyfundtwo">
          <!-- <div class="buyfundtwoT">
            <span>待确认金额：</span>
            <span>{{info.dazhifu_money}}元</span>
          </div> -->
          <van-cell is-link :to="'/dayvalue/'+$route.params.id">
            <template slot="title">
              <div>
                <span class="custom-title">持有份额：</span>
                <span>{{info.amount}}元</span>
              </div>
              <div class="custom-titlB">
                <span class="custom-title">{{info.yesterday_time}}净值：</span>
                <span>{{info.yesterday_jing}}</span>
              </div>
            </template>
            <template slot="default">
              <div>
                <span class="custom-title" style="margin-left:12px;">昨日收益：</span>
                <span class="custom-titleT">{{info.yesterday}}</span>
              </div>
              <div class="custom-titlB">
                <span class="custom-title" style="margin-left:12px;">累计收益：</span>
                <span class="custom-titleT">{{info.zong_yingkui}}</span>
              </div>
            </template>
          </van-cell>
        </div>
        <div class="buyfundthree">
          <van-tabs
            class="title-tabs"
            :color="$store.state.color"
            :title-active-color="$store.state.color"
            v-model="activeType"
            @change="drawLine"
          >
            <van-tab title="近一月" name="one_month"></van-tab>
            <van-tab title="近三月" name="three_month"></van-tab>
            <van-tab title="近半年" name="six_month"></van-tab>
            <van-tab title="近一年" name="one_year"></van-tab>
          </van-tabs>
          <canvas id="myChart"></canvas>
        </div>
        <!-- <div class="buyfundfour">
          <van-cell title="交易记录" is-link />
        </div> -->
      </div>
    </div>
    <div class="bottom-btn">
      <div
        class="btn sell"
        @click="$router.push('/redemption/'+$route.params.id)"
        v-if="info.can_shuhui"
        :style="'height:'+ (50+bottom)+'px;'"
      >赎回</div>
      <div
        class="btn buy"
        @click="$router.push('/buy/'+info.fund_code)"
        v-if="info.can_buy"
        :style="'height:'+ (50+bottom)+'px;'"
      >申购</div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import F2 from "@antv/f2/lib/index";
export default {
  name: "buyfund",
  components: {
    navBar
  },
  data() {
    return {
      bottom: 0,
      activeType: "one_month",
      data: {},
      info: {
        amount: "0.00",
        bjj_zhangdie: 0,
        can_shuhui: 0,
        dazhifu_money: "0",
        fund_code: "",
        money: "0",
        month_incratio: 0,
        order_id: "",
        stock_name: "",
        yesterday: "更新中",
        yesterday_jing: "0",
        yesterday_time: "2019-08-30",
        zong_yingkui: 0
      }
    };
  },
  created() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
    this.$SERVER
      .stock_buy_detail({
        order_id: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
      });
  },
  mounted(){  
    setTimeout(() => {      
    this.drawLine();
    }, 500);  
  },
  methods: {
    drawLine() {
      this.$SERVER
        .buy_jingzhi({
          order_id: this.$route.params.id,
          month: this.activeType
        })
        .then(res => {
          this.data = res.data.k_xiantu;
          const chart = new F2.Chart({
            id: "myChart",
            pixelRatio: window.devicePixelRatio // 指定分辨率
          });

          // Step 2: 载入数据源
          chart.source(this.data, {
            fbrq: {
              type: "timeCat",
              tickCount: 3,
              range: [0, 1]
            },
            networth: {
              // tickCount: 10              
              alias: "收益率"
            }
          });
          chart.tooltip({
            custom: true,
            showXTip: true,
            showYTip: true,
            snap: true,
            crosshairsType: "xy",
            crosshairsStyle: {
              lineDash: [2]
            },
            onShow(ev) {
              var items = ev.items;
              items[0].name = null;
              items[0].value = items[0].value+"%";
            }
          });
          // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
          chart
            .line()
            .position("fbrq*networth")
            // .shape("smooth")
            .color("#5196ff");
          // Step 4: 渲染图表
          chart.axis("networth", {
            label: (text, index, total) => {
              const cfg = {
                textAlign: "right"
              };
              cfg.text = text + "%"; // cfg.text 支持文本格式化处理
              return cfg;
            }
          });
          chart.render();
        });
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
      font-weight: bold;
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

#myChart {
  width: 100%;
  height: 320px;
}
</style>

