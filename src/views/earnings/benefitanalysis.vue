<template>
<div class="container">
   <navBar />
  <div class="main">   
    <div class="mytreasureone">
      <van-tabs
        class="title-tabs"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
      >
        <van-tab title="每日收益"></van-tab>
        <van-tab title="月度收益"></van-tab>
        <van-tab title="累计收益"></van-tab>
      </van-tabs>
      <div class="benefitanalysis">
        <h1>2019-08-08</h1>
        <van-row class="listone">
          <van-col span="12">
            <p class="listoneT">日收益</p>
            <p class="listoneper">+0.28</p>
          </van-col>
          <van-col span="12">
            <p class="listoneT">日盈利率</p>
            <p class="listoneper">+0.14%</p>
          </van-col>
        </van-row>
        <van-row class="listtwo">
          <van-col span="24">现金宝 0.00</van-col>
        </van-row>
        <van-row class="listthree">
          <van-col span="12">
            <span class="listthreeT">基金</span>
            <span class="listthreeN">+0.28</span>
          </van-col>
          <van-col span="12">
            <span class="listthreeN">+0.14%</span>
          </van-col>
        </van-row>
      </div>
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </div>
</div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "benefitanalysis",
  components: {
    navBar
  },
  data() {
    return {};
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["2019/06/18", "2019/07/03", "2019/07/18"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "本基金涨跌幅",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [5, 2, 6]
          },
          {
            name: "深沪300",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [9, 3, 6]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mytreasureone {
  #myChart {
    margin-top: 15px;
    background: #fff;
  }
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
      .listthreeT {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
      }
      .listthreeN {
        font-size: 15px;
        color: rgba(255, 89, 65, 1);
      }
    }
  }
}
</style>

