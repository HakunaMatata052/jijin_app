<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="mytreasureone">
        <van-tabs
          class="title-tabs"
          :color="$store.state.color"
          :title-active-color="$store.state.color"
          v-model="activeType"
          @change="tabFn"
        >
          <van-tab title="每日收益" name="0"></van-tab>
          <van-tab title="月度收益" name="1"></van-tab>
          <van-tab title="累计收益" name="2"></van-tab>
        </van-tabs>
        <div class="benefitanalysis">
          <h1>{{info.time}}</h1>
          <van-row class="listone">
            <van-col span="12">
              <p class="listoneT">日收益</p>
              <p :class="info.rise?'listoneper':'die'">{{info.profit}}</p>
            </van-col>
            <van-col span="12">
              <p class="listoneT">日盈利率</p>
              <p :class="info.rise?'listoneper':'die'">{{info.probability}}</p>
            </van-col>
          </van-row>
          <van-row class="listtwo">
            <van-col span="24">现金宝 {{info.xianjinbao}}</van-col>
          </van-row>
          <van-row class="listthree">
            <van-col span="12">
              <span class="listthreeT">基金</span>
              <span :class="info.rise?'listthreeN':'die'">{{info.profit}}</span>
            </van-col>
            <van-col span="12">
              <span :class="info.rise?'listthreeN':'die'">{{info.probability}}</span>
            </van-col>
          </van-row>
        </div>
        <canvas id="myChart" v-if="activeType!=2"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import F2 from "@antv/f2/lib/index";
import "@antv/f2/lib/interaction";
export default {
  name: "benefitanalysis",
  components: {
    navBar
  },
  data() {
    return {
      activeType: "0",
      info: {
        probability: "0%",
        profit: 0,
        time: "2019-09-03",
        xianjinbao: "0.00"
      },
      list: [],
      data:[]
    };
  },
  created() {
    if (this.$route.params.type) {
      this.activeType = this.$route.params.type;
    }
    this.getData();
  },
  mounted(){    
    this.drawLine();
  },
  methods: {
    tabFn() {
      this.getData();
      this.drawLine();
    },
    getData() {
      this.$SERVER
        .ProfitIndex({
          type: this.activeType
        })
        .then(res => {
          this.info = res.data;
        });
    },
    drawLine() {
      if(this.activeType==2) return;
      this.$SERVER
        .chart_day({
          type: this.activeType
        })
        .then(res => {
          this.data = res.data;
          const chart = new F2.Chart({
            id: "myChart",
            pixelRatio: window.devicePixelRatio // 指定分辨率
          });
          chart.legend(false); // 不使用默认图例
          chart.interaction("pan");
          chart.interaction("pinch");

          // Step 2: 载入数据源
          chart.source(this.data, {
            time: {
              type: "timeCat",
              tickCount: 3,
              range: [0, 1]
            },
            probability: {
              tickCount: 10
            }
          });
          // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
          chart
            .line()
            .position("time*probability")
            .shape("smooth")
            .color("l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF");
          // Step 4: 渲染图表
          chart.axis("probability", {
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
.mytreasureone {
  .benefitanalysis {
    margin: 15px 0;
    padding: 0 21px;
    background: #fff;
    h1 {
      font-size: 15px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 40px;
      border-bottom: 1px solid #eee;
    }
    .listone {
      line-height: 25px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      padding-top: 18px;
      .listoneT {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
      }
      .listoneper {
        font-size: 20px;
        color: rgba(255, 89, 65, 1);
      }
      .die {
        font-size: 20px;
        color: rgba(81, 150, 255, 1);
      }
    }
    .listtwo {
      font-size: 15px;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
      margin-top: 10px;
    }
    .listthree {
      padding-bottom: 20px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      line-height: 35px;
      font-size: 15px;
      .listthreeT {
        color: rgba(51, 51, 51, 1);
      }
      .listthreeN {
        color: rgba(255, 89, 65, 1);
      }
      .die {
        color: rgba(81, 150, 255, 1);
      }
    }
  }
}

#myChart {
  width: 100%;
  height: 320px;
  background: #fff;
}
</style>

