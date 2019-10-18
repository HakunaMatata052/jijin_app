<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <table class="table">
          <tr class="sticky">
                <th>日期</th>
                <th v-if="$route.params.type!='货币型'">单位净值</th>
                <th v-else>七日年化收益率</th>
                <th v-if="$route.params.type!='货币型'">累计净值</th>
                <th v-if="$route.params.type!='货币型'">日涨跌</th>
                <th v-else>万份收益</th>
              </tr>
              <tr v-for="(item,index) in list" :key="index">
                <td>{{item.fbrq}}</td>				
                <td v-if="$route.params.type!='货币型'">{{item.jjjz}}</td>
                <td v-else>{{item.networth}}%</td>
                <td v-if="$route.params.type!='货币型'">{{item.ljjz}}</td>
                <td v-if="$route.params.type!='货币型'">
                  <div :class="item.rise==0?'die':'zhang'"><span v-if="item.rise>0">+</span>{{item.networth}}%</div>
                </td>
				<td v-else>{{item.jjjz}}</td>	
              </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>       
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "historyvalue",
  components: {
    navBar
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    getList() {
      this.$SERVER
        .stock_jingzhi_list({
          page: this.page,
          pagesize: 20,
          fund_code: this.$route.params.id
        })
        .then(res => {
          this.loading = false;
          this.page++;
          this.list = [...this.list, ...res.data];
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
          return;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-top: 16px;
  text-align: center;
  background: #fff;
  width: 100%;
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
</style>

