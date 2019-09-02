<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="myreportdetil">
        <div class="tradingknowCenter">
          <h1>申购费率</h1>
          <table class="table">
            <tr>
              <th width="50%">申购金额 (M)</th>
              <th width="50%">申购费率</th>
            </tr>
            <tr v-for="(item,index) in tableList" :key="index" v-if="item.type==1">
              <td>
                {{item.range}}
              </td>
              <td>
                {{item.rate}}
              </td>
            </tr>
          </table>
          <h2>*申购费=申购金额-申购金额/(1+申购费率)</h2>
        </div>

        <div class="tradingknowCenter">
          <h1>赎回费率</h1>
          <table class="table">
            <tr>
              <th width="50%">赎回金额 (M)</th>
              <th width="50%">赎回费率</th>
            </tr>
            <tr v-for="(item,index) in tableList" :key="index" v-if="item.type==2">
              <td>
                {{item.range}}
              </td>
              <td>
                {{item.rate}}
              </td>
            </tr>
          </table>
          <h2>*赎回费=赎回金额-赎回金额/(1+赎回费率)</h2>
        </div>
      </div>
    </div>
  </div>
</template>       
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "interchangefees",
  components: {
    navBar
  },
  data() {
    return {
      tableList: [
      ]
    };
  },
  created() {
    this.$SERVER
      .rate({
        fund_code: this.$route.params.id
      })
      .then(res => {
        this.tableList = res.data
      });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.tradingknowCenter {
  background: #fff;
  padding: 18px 15px 1px 15px;
  margin-top: 15px;
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
    padding: 0 0 18px 6px;
  }
  h2 {
    font-size: 11px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 45px;
    padding-top: 1px;
  }
  .table {
    font-size: 13px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    width: 100%;
    line-height:45px;
    border:1px solid rgba(235,235,235,1);
    text-align: center;
    th {
      background: rgba(81, 150, 255, 0.04);
       border:1px solid rgba(235,235,235,1);
    }
    td {
      border:1px solid rgba(235,235,235,1);
    }
  }
}
</style>

