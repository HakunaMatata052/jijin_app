<template>
  <div class="container">
    <navBar :stl="bg" class="navbar" :title="data.fund_name" />
    <div class="main">
      <h1 ref="top">
        <div :style="'height:'+(35+top)+'px'"></div>
        {{$route.params.id}}
      </h1>
      <van-row class="title">
        <van-icon class-prefix="icon" name="shuju" class="shenIcon" />{{data.explain}}
      </van-row>
      <div class="titleList2">
        <van-row class="titleListLine">
          <van-col span="12">近三月收益</van-col>
          <van-col span="12">单位净值（{{data.time}}）</van-col>
        </van-row>
        <van-row class="titleListLine">
          <van-col span="12" class="titleListLineper">{{data.quarter_incratio}}</van-col>
          <van-col span="12" class="titleListLineNum">{{data.netvalue}}</van-col>
        </van-row>
        <div class="button">
          <p :class="data.boom?'gao':''">{{data.fund_risk_level}}</p>
          <p>{{data.min_value}}元起购</p>
          <p>{{data.type2_id_desc}}</p>
        </div>
      </div>
      <div class="showPicture">
        <van-tabs
          class="title-tabs"
          :color="$store.state.color"
          :title-active-color="$store.state.color"
          animated
          :lazy-render="false"
        >
          <van-tab :title="data.type2_id_desc!='货币型'?'收益率走势':'万份收益走势'" :name="1">
            <canvas id="myChart"></canvas>
          </van-tab>
          <van-tab :title="data.type2_id_desc!='货币型'?'历史净值':'万份收益'" :name="2">
            <table class="table">
              <tr>
                <th>日期</th>
                <th v-if="data.type2_id_desc!='货币型'">单位净值</th>
                <th v-else>七日年化收益率</th>
                <th v-if="data.type2_id_desc!='货币型'">累计净值</th>
                <th v-if="data.type2_id_desc!='货币型'">日涨跌</th>
                <th v-else>万份收益</th>
              </tr>
              <tr v-for="(item,index) in list" :key="index" v-if="index<=4">
                <td>{{item.fbrq}}</td>
                <td>{{item.jjjz}}</td>
                <td v-if="data.type2_id_desc!='货币型'">{{item.ljjz}}</td>
                <td>
                  <span :class="item.rise==0?'die':'zhang'">{{item.networth}}%</span>
                </td>
              </tr>
            </table>
            <div
              class="more"
              @click="$router.push('/historyvalue/'+$route.params.id+'/'+data.type2_id_desc)"
            >查看更多</div>
          </van-tab>
        </van-tabs>

        <van-grid :column-num="3">
          <van-grid-item>
            <template slot="text">
              <p>累计净值</p>
              <p>{{data.ljjz}}</p>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <van-cell-group class="titleList">
        <van-cell title="基金档案" is-link value="基础信息 / 资产配置" />
        <div class="inforn">
          <div class="infornLeft">
            <img class="headerImg" src="../../assets/images/indexchart.png" />
          </div>
          <div class="infornRight">
            <div class="infornRightTop">
              <p class="infornRightTopText1">Soocool</p>
              <p class="infornRightTopText2">管理后涨幅</p>
            </div>
            <div class="infornRightBottom">
              <p class="infornRightBottomText1">2015年10月任职</p>
              <p class="infornRightBottomText2">48.30%</p>
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="交易须知" is-link value="详情" @click="$router.push('/tradingknow')" />
        <div class="tradingKnow">
          <div class="tradingKnowLeft">份额确认</div>
          <div class="tradingKnowRight">
            <div class="tradingKnowRightTop">
              <span>15:00</span>前购买，下1个交易日确认
            </div>
            <div class="tradingKnowRightBottom">
              <span>15:00</span>后购买，下2个交易日确认
            </div>
          </div>
        </div>
        <div class="tradingKnow" style="padding-top:2px;">
          <div class="tradingKnowLeft">份额确认</div>
          <div class="tradingKnowRight">可部分赎回，最低赎回份额不低于0.00份</div>
        </div>
      </van-cell-group>
      <van-cell-group class="titleListT">
        <van-cell is-link value="详情" class="know" :to="`/interchangefees/${$route.params.id}`">
          <template slot="title">
            <span class="trading">交易费率</span>
            <span class="tradingText1">{{data.rate}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-goods-action class="goods-action" safe-area-inset-bottom>
      <van-goods-action-icon @click="$router.push('/chat/10000')">
        <van-icon class-prefix="icon" name="kefu" class="kefu" />
        <p class="bottomTitle">客服</p>
      </van-goods-action-icon>
      <van-goods-action-icon @click="likeFn(data.like)">
        <van-icon name="star" color="rgba(255, 210, 0, 1)" size="23" v-if="data.like" />
        <van-icon name="star-o" size="23" v-else />
        <p class="bottomTitle">收藏</p>
      </van-goods-action-icon>
      <van-goods-action-button
        :to="'/buy/'+$route.params.id"
        :disabled="!data.can_buy"
        :color="data.can_buy?'rgba(255, 89, 65, 1)':'#999'"
      >
        <template slot="default">
          <p class="byTitle" v-if="data.can_buy">申购</p>
          <p class="byTitle" v-else>暂停申购</p>
          <p class="byNum">费率 {{data.rate}}</p>
        </template>
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import F2 from "@antv/f2/lib/index";
import "@antv/f2/lib/interaction";
export default {
  name: "fundDetail",
  components: {
    navBar
  },
  data() {
    return {
      chartNav: [
        {
          title: "夏普",
          per: "1.2"
        },
        {
          title: "最大回撤",
          per: "20%"
        },
        {
          title: "累计净值",
          per: "0"
        }
      ],
      top: 0,
      data: {},
      bg: "nobg",
      list: [],
      chartData: [
        {
          year: 2000,
          age: 27.2
        },
        {
          year: 2001,
          age: 27.5
        }
      ]
    };
  },
  created() {
    this.$SERVER
      .funddetails({
        fund_code: this.$route.params.id
      })
      .then(res => {
        this.data = res.data;
        this.data.ljjz = res.data.cache.ljjz;
      });
    this.getJingzhi();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
    }
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getJingzhi() {
      this.$SERVER
        .stock_jingzhi_list({
          page: 1,
          pagesize: 30,
          fund_code: this.$route.params.id
        })
        .then(res => {
          this.list = res.data;
          this.drawLine();
        });
    },
    handleScroll(e) {
      if (e.target.scrollTop > this.$refs.top.offsetHeight) {
        this.bg = "";
      } else {
        this.bg = "nobg";
      }
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
        jjjz: {
          tickCount: 10
        }
      });
      chart.legend(false); // 不使用默认图例

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .line()
        .position("fbrq*networth")
        .shape("smooth")
        .color("l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF");
      chart.interaction("pan");
      chart.interaction("pinch");

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
    },
    likeFn(type) {
      this.data.like = !this.data.like;
      this.$SERVER
        .stock_like_up({
          type: Number(!type),
          pro_code: this.$route.params.id
        })
        .then(res=>{

          console.log(1)
        })
        .catch(err => {
          this.data.like = !this.data.like;
        });
    }
  },
  activated() {}
};
</script>
<style lang="less" scoped>
.main {
  h1 {
    background: url(../../assets/images/fund-bg.png) no-repeat center top;
    background-size: 100% auto;
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    padding-bottom: 80px;
  }
  .title {
    font-size: 13px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    background: #fff;
    .shenIcon {
      margin: 13px 5px 13px 15px;
      font-size: 0.32rem;
      color: #5196ff;
    }
  }
  .titleListT {
    background: #fff;
    margin: 15px auto 100px;
    padding: 3px 0;
    .know .van-cell__value {
      flex: 0.5;
    }
    .trading {
      font-size: 15px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
    }
    .tradingText {
      font-size: 15px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      text-decoration: line-through;
      color: #999999;
      line-height: 18px;
    }
    .tradingText1 {
      font-size: 15px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #ff5941;
      line-height: 18px;
    }
  }
  .titleList2 {
    padding: 15px;
  }
  .titleList,
  .titleList2 {
    background: #fff;
    margin: 15px auto;
    .titleListLine {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin: 13px 0;
      line-height: 18px;
      .titleListLineper {
        font-size: 21px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
      }
      .titleListLineNum {
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    .button {
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
    }
    .button p {
      height: 25px;
      line-height: 25px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 13px;
      padding: 0 21px;
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      &.gao {
        border: 1px solid #f44f00 !important;
        color: #f44 !important;
      }
    }
  }

  .tradingKnow {
    padding: 14px 16px;
    display: flex;
    .tradingKnowLeft {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .tradingKnowRight {
      flex: 1;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #333333;
      line-height: 18px;
      margin-left: 22px;
      .tradingKnowRightTop,
      .tradingKnowRightBottom {
        span {
          color: #ff5941;
        }
      }
    }
  }
  .mineList {
    margin-top: 36px;
  }

  .gains,
  .deep {
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 23px;
  }
  .gainsIcon {
    font-size: 7px;
    color: rgba(255, 89, 65, 1);
  }
  .deepIcon {
    font-size: 7px;
    color: rgba(81, 150, 255, 1);
  }
  .gainsPer,
  .deepPer {
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #ff5941;
    line-height: 23px;
  }

  .showPicture {
    background: #ffffff;
    .showDeepAndGains {
      padding: 15px;
    }
    .more {
      text-align: center;
      padding: 10px 0;
      font-size: 13px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.inforn {
  display: flex;
  padding: 13px 0;
  .infornLeft {
    width: 44px;
    height: 44px;
    margin: 0 15px;
    .headerImg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .infornRight {
    flex: 1;
    margin-top: 4px;
    .infornRightTop,
    .infornRightBottom {
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      .infornRightTopText1 {
        font-size: 15px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .infornRightBottomText1 {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      .infornRightTopText2 {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      .infornRightBottomText2 {
        font-size: 18px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
        line-height: 18px;
      }
    }
    .infornRightBottom {
      margin-top: 10px;
    }
  }
}
.goods-action {
  z-index: 99;
  .byTitle {
    font-size: 17px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
  }
  .byNum {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
  }
  .icon {
    margin: 0 auto;
    font-size: 24px;
  }
  .kefu {
    color: rgba(81, 150, 255, 1);
  }
  .bottomTitle {
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
  }
}
.table {
  margin-top: 16px;
  text-align: center;
  background: #fff;
  width: 100%;
  position: relative;
  tr:nth-child(2n + 1) {
    background: rgba(250, 250, 250, 1);
  }
  th {
    line-height: 40px;
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid rgba(240, 240, 240, 1);

    background: #fff;
  }
  td {
    line-height: 48px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .zhang {
    color: #ff5941;
  }
  .die {
    color: #5196ff;
  }
}
#myChart {
  width: 100%;
  height: 320px;
}
</style>

