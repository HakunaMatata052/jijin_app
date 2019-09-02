<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="fundNav">
      <van-tabs
        class="title-tabs"
        v-model="activeType"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="getList(true)"
      >
        <van-tab title="全部" :name="1"></van-tab>
        <van-tab title="分红" :name="2"></van-tab>
      </van-tabs>
    </div>
    <div class="goldfund">
      <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
        <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="getList">
          <!-- <van-row class="goldfundM">
            <van-col span="12" class="goldfundML">
              <p>申购</p>
              <p>07-22 12:57</p>
            </van-col>
            <van-col span="12" class="goldfundMR">
              <p>100元</p>
              <p>预计07/23确认成功</p>
            </van-col>
          </van-row> -->

        </van-list>
      </van-pull-refresh>
    </div>
  </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "goldfund",
  components: {
    navBar
  },
  data() {
    return {
      activeType: 1,
      refreshLoading: false,
      finished: false,
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      hasNextPage: true
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.fundNav {
  .van-tab {
    flex-basis: 20% !important;
  }
}
.goldfund {
  margin-top: 15px;
  .goldfundM {
    padding-top: 16px;
    height: 51px;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #eee;
    .goldfundML {
      padding-left: 16px;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        margin-top: 5px;
      }
    }
    .goldfundMR {
      text-align: right;
      padding-right: 16px;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(81, 150, 255, 1);
        line-height: 18px;
        margin-top: 5px;
      }
    }
  }
}
</style>

