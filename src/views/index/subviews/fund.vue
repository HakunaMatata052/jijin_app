<template>
  <div class="container">
    <navBarSeach />
    <div class="fundNav">
      <van-tabs
        class="title-tabs"
        v-model="activeType"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="getList(true)"
      >
        <van-tab title="全部" name></van-tab>
        <van-tab
          :title="item.type2_id_desc"
          :name="item.type2_id_desc"
          v-for="(item,index) in tabList"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
    <div class="main">
      <div class="listFund">
        <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
            <div class="fundList">
              <van-sticky :offset-top="50+44+top">
                <div class="fundListTitle">
                  <div class="fundName">基金简称</div>
                  <div class="addedValue" v-if="activeType=='货币型'">万分收益</div>
                  <div class="addedValue" v-else>最新净值</div>
                  <div class="sortingYear" @click="orderbyFn">
                    <div class="sortingYearName">年涨幅</div>
                    <div class="sortingYearBtn">
                      <van-icon
                        class-prefix="icon"
                        :color="orderby == 'desc' ? '#FF5941' : ''"
                        name="sanjiao_up"
                        class="sortingBtn"
                      />
                      <van-icon
                        class-prefix="icon"
                        :color="orderby == 'asc' ? '#FF5941' : ''"
                        name="sanjiao_down"
                        class="sortingBtn"
                      />
                    </div>
                  </div>
                </div>
              </van-sticky>
              <div class="fundListContent">
                <div
                  class="fundListContentModel"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="$router.push('/fundDetail/'+item.fund_code)"
                >
                  <div class="fundListContentModelLeft">
                    <div class="fundListContentModelLeftT">
                      <span>{{index+1}}</span>
                      <span>{{item.fund_name}}</span>
                    </div>
                    <div class="fundListContentModelLeftB">{{item.fund_code}}</div>
                  </div>
                  <div class="fundListContentModelCenter">
                    <div class="fundListContentModelCenterT">{{item.netvalue}}</div>
                    <div class="fundListContentModelCenterB">{{item.update_time}}</div>
                  </div>
                  <div class="fundListContentModelRight">
                    <div
                      :class="item.rise == 0 ?'fundListContentModelRightL blue':'fundListContentModelRightL'"
                    >{{item.year_incratio}}</div>
                    <div
                      class="fundListContentModelRightR"
                      @click.stop="likeFn(item.fund_code,!item.like,index)"
                    >
                      <van-icon
                        class-prefix="icon"
                        name="starred"
                        class="starIcon"
                        v-if="item.like"
                      />
                      <van-icon class-prefix="icon" name="shoucang" class="soucangIcon" v-else />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import navBarSeach from "@/components/navbar/navbarseach.vue";
export default {
  name: "fund",
  components: {
    navBarSeach
  },
  data() {
    return {
      activeType: "",
      top: 0,
      theme: "",
      refreshLoading: false,
      finished: false,
      loading: false,
      page: 1,
      tabList: [],
      list: [],
      orderby: "desc"
    };
  },
  created() {
    this.$SERVER.stock_type_list().then(res => {
      this.tabList = res.data;
      if (this.$route.params.name) {
        this.activeType = this.$route.params.name;
      }
    });
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
    }
  },
  methods: {
    getList(isClear) {
      if (isClear) {
        this.list = [];
        this.page = 1;
      }
      this.$SERVER
        .stock_list({
          page: this.page,
          orderby: this.orderby,
          fund_type: this.activeType,
          theme:  this.$route.params.theme || this.theme
        })
        .then(res => {
          this.refreshLoading = false;
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    },
    orderbyFn() {
      if (this.orderby == "desc") {
        this.orderby = "asc";
      } else {
        this.orderby = "desc";
      }
      this.getList(true);
    },
    likeFn(id, type, index) {
      this.list[index].like = !this.list[index].like;
      this.$SERVER
        .stock_like_up({
          type: Number(type),
          pro_code: id
        })
        .catch(err => {
          this.list[index].like = !this.list[index].like;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.fundNav {
  .van-tab {
    flex-basis: 20% !important;
  }
}
.listFund {
  margin-top: 16px;
}
.fundListTitle {
  height: 40px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  padding: 0 30px;
  line-height: 40px;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  .fundName {
    flex: 2;
  }
  .addedValue {
    flex: 1.5;
  }
  .sortingYear {
    flex: 1.5;
    display: flex;
    .sortingYearBtn {
      display: flex;
      flex-direction: column;
      margin: -2px 0 0 5px;
      .sortingBtn {
        width: 9px;
        height: 6px;
        font-size: 9px;
      }
    }
  }
}
.fundListContent {
  .fundListContentModel {
    display: flex;
    padding: 13px 19px 13px 13px;
    height: 40px;
    .fundListContentModelLeft {
      flex: 2;
      .fundListContentModelLeftT {
        font-size: 15px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: flex;
        span:nth-child(1) {
          color: #999999;
          margin-right: 5px;
          font-size: 15px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        span:nth-child(2) {
          flex: 1;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .fundListContentModelLeftB {
        margin-left: 14px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .fundListContentModelCenter {
      flex: 1.5;
      text-align: center;
      .fundListContentModelCenterT {
        font-size: 15px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .fundListContentModelCenterB {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .fundListContentModelRight {
      flex: 1.5;
      display: flex;
      text-align: center;
      .fundListContentModelRightL {
        font-size: 18px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
        flex: 1;
        text-align: left;
      }
      .fundListContentModelRightR {
        .starIcon {
          font-size: 16px;
          color: rgba(255, 210, 0, 1);
          margin-left: 15px;
        }
        .soucangIcon {
          font-size: 16px;
          margin-left: 15px;
          color: rgba(204, 204, 204, 1);
        }
      }
    }
  }

  .fundListContentModel:nth-child(1),
  .fundListContentModel:nth-child(2),
  .fundListContentModel:nth-child(3) {
    .fundListContentModelLeftT:nth-child(1) {
      span:nth-child(1) {
        color: #ff5941;
      }
    }
  }

  .fundListContentModel:nth-child(n) {
    background: rgba(250, 250, 250, 1);
  }
  .fundListContentModel:nth-child(2n) {
    background: rgba(255, 255, 255, 1);
  }
}
.blue {
  color: #5196ff !important;
}
</style>

