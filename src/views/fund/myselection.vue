<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="myselectionlist">

        <van-row class="myselectionlistM" v-for="(item,index) in hotList" :key="index" @click="$router.push('/fundDetail/'+item.fund_code)">
          <van-col span="17" class="myselectionlistL">
            <div>
              {{item.fund_name}}
              <span v-if="item.hot!=0">热</span>
            </div>
            <div>{{item.property}}</div>
          </van-col>
          <van-col span="7" class="myselectionlistR">
            <div>{{item.year_incratio}}</div>
            <div>年涨幅</div>
          </van-col>
        </van-row>

      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <van-grid :column-num="3">
          <van-grid-item v-for="(item,index) in gridlist" :key="index" @click="$router.push('/fund/0/'+item.id)">
            <template slot="text">
              <p class="myselectionlistTitle">{{item.name}}</p>
              <p class="myselectionlistT">
                <span>近一周</span>
                <span>{{item.updown}}</span>
              </p>
            </template>
          </van-grid-item>
        </van-grid>
      </van-list>
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
      hotList:[],
      gridlist: [],
      finished: false,
      loading: false,
      page: 1
    };
  },
  created(){
    this.$SERVER.fund_hot().then(res=>{
      this.hotList = res.data
    })
  },
  methods: {
    getList() {
      this.$SERVER
        .fundtheme({
          page: this.page
        })
        .then(res => {
          this.page++;
          this.loading = false;
          this.gridlist = [...this.gridlist, ...res.data];
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.myselectionlist {
  margin: 15px 0;
  .myselectionlistM {
    height: 75px;
    background: rgba(255, 255, 255, 1);
    padding: 0 20px;
    .myselectionlistL {
      padding-top: 18px;
      div {
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 15px;
      }
      div:nth-child(2) {
        padding-top: 14px;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      span {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 89, 65, 1);
        border-radius: 50%;
        font-size: 9px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
        line-height: 14px;
        text-align: center;
      }
    }
    .myselectionlistR {
      padding-top: 18px;
      text-align: right;
      div {
        font-size: 21px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
        line-height: 18px;
      }
      div:nth-child(2) {
        padding-top: 14px;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
    }
  }
}
.myselectionlistIcon {
  font-size: 30px;
  color: #5498ff;
  margin-bottom: 15px;
}
.myselectionlistTitle {
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 15px;
  margin-bottom: 12px;
}
.myselectionlistT {
  font-size: 13px;
  font-family: PingFang-SC-Medium;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
  span:nth-child(2) {
    color: #ff5941;
  }
}
</style>

