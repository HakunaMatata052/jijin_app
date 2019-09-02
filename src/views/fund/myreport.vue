<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="listFund">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
          <div class="newsListModel" @click="$router.push('/myreportdetil/'+item.id)" v-for="(item,index) in list" :key="index">
            <h1>{{item.title}}</h1>
            <div
              class="newsListModelContent"
            >{{item.explain}}...</div>
            <div class="newsListModelB">
              <span>{{item.source}}</span>
              <span>{{item.createtime}}</span>
            </div>
          </div>
          
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "myreport",
  components: {
    navBar
  },
  data() {
    return {
      activeType: 1,
      finished: false,
      loading: false,
      page: 1,
      list: []
    };
  },

  methods: {
    getList() {
      this.$SERVER
        .report({
          page: this.page
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
.newsListModel {
  padding: 18px 21px 18px 16px;
  background: #fff;
  margin: 15px 0;
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
  .newsListModelContent {
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    margin: 10px 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .newsListModelB {
    span:nth-child(1) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(81, 150, 255, 1);
      line-height: 22px;
    }
    span:nth-child(2) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
      margin-left: 19px;
    }
  }
}
</style>

