<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="mytreasureone">
        <div class="mytreasureoneT">
          <p>默认充值基金</p>
          <p>
            {{info.fund_name}}
            <van-icon class-prefix="icon" name="sanjiao_down" class="downIcon"  @click="$router.push('/fundDetail/'+info.fund_code)"/>
          </p>
          <div class="mytreasureoneTC">
            <div class="mytreasureoneTCL">
              <p>七日年化</p>
              <p>2.574%</p>
            </div>
            <div class="mytreasureoneTCR">
              <p>万份收益</p>
              <p>0.6970</p>
              <p>数据发布时间：2019/08/08</p>
            </div>
          </div>
        </div>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        <h1>收益数据仅供参考，不构成投资建议。市场有风险，投资需谨慎</h1>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "mytreasure",
  components: {
    navBar
  },
  data() {
    return {
      info:{}
    };
  },
  created() {
    this.$SERVER.fundcustomize().then(res=>{
      this.info = res.data
    })
  },
  mounted() {
    this.drawLine();
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
  },
  methods: {
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
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
  margin-top: 15px;
  .mytreasureoneT {
    background: #fff;
    padding: 15px 0 10px 0;
    text-align: center;
    p {
      font-family: PingFang-SC-Bold;
    }
    p:nth-child(1) {
      font-size: 13px;
      color: rgba(153, 153, 153, 1);
    }
    p:nth-child(2) {
      font-size: 17px;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 22px;
      margin-top: 15px;
      .downIcon {
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 0;
      }
    }
    .mytreasureoneTC {
      display: flex;
      padding: 0 15px;
      .mytreasureoneTCL,
      .mytreasureoneTCR {
        flex: 1;
        text-align: left;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        p {
          font-family: PingFang-SC-Bold;
        }
        p:nth-child(1) {
          padding-top: 25px;
          border-top: 1px solid #eee;
          font-size: 15px;
          color: rgba(153, 153, 153, 1);
          margin-bottom: 10px;
        }
      }
      .mytreasureoneTCL {
        p:nth-child(2) {
          font-size: 40px;
          color: rgba(255, 89, 65, 1);
          font-weight: bold;
        }
      }
      .mytreasureoneTCR {
        p:nth-child(2) {
          font-size: 21px;
          color: rgba(255, 89, 65, 1);
          padding-bottom: 0;
        }
        p:nth-child(3) {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  #myChart {
    margin-top: 15px;
    background: #fff;
  }
  h1 {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 35px;
    text-align: center;
  }
}
</style>

