<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="mytreasureone">
        <div class="mytreasureoneT">
          <p>默认充值基金</p>
          <p>
            {{info.fund_name}}
            <van-icon
              class-prefix="icon"
              name="sanjiao_down"
              class="downIcon"
              @click="$router.push('/fundDetail/'+info.fund_code)"
            />
          </p>
          <div class="mytreasureoneTC">
            <div class="mytreasureoneTCL">
              <p>七日年化</p>
              <p>{{info.nianhua}}</p>
            </div>
            <div class="mytreasureoneTCR">
              <p>万份收益</p>
              <p>{{info.netvalue}}</p>
              <p>数据发布时间：{{info.fabu_time}}</p>
            </div>
          </div>
        </div>
        <canvas id="myChart"></canvas>
        <h1>收益数据仅供参考，不构成投资建议。市场有风险，投资需谨慎</h1>
      </div>
    </div>
    <div class="bottom-btn">
      <div
        class="btn buy"
        @click="$router.push('/buy/999999')"
        :style="'height:'+ (50+bottom)+'px;'"
      >立即充值</div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import F2 from "@antv/f2/lib/index";
export default {
  name: "mytreasure",
  components: {
    navBar
  },
  data() {
    return {
      bottom: 0,
      info: {}
    };
  },
  created() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
    this.$SERVER.fundcustomize().then(res => {
      this.info = res.data;
    });
    this.getJingzhi();
  },
  methods: {
    getJingzhi() {
      this.$SERVER
        .stock_jingzhi_list({
          page: 1,
          pagesize: 30,
          fund_code: "999999"
        })
        .then(res => {
          this.list = res.data;
          this.drawLine();
        });
    },
    drawLine() {
      const chart = new F2.Chart({
        id: "myChart",
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(this.list, {
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
          items[0].value = items[0].value + "%";
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .line()
        .position("fbrq*networth")
        // .shape("smooth")
        .color("#5196ff");

      chart.axis("networth", {
        label: (text, index, total) => {
          const cfg = {
            textAlign: "right"
          };
          cfg.text = text + "%"; // cfg.text 支持文本格式化处理
          return cfg;
        }
      });
      // Step 4: 渲染图表
      chart.render();
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
  h1 {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 35px;
    text-align: center;
  }

  #myChart {
    width: 100%;
    height: 320px;
    background: #fff;
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

