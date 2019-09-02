<template>
  <div class="container">
    <div class="searchNav" :style="'padding-top:'+ top +'px'">
      <van-icon
        name="arrow-left"
        size="23"
        color="#CCCCCC"
        slot="left"
        class="left"
        @click="onClickLeft"
      />
      <van-search
        placeholder="基金名称 / 代码"
        v-model="value"
        slot="title"
        shape="round"
        class="search"
        @blur="searchFn(value)"
      />
    </div>
    <div class="seach main">
      <div class="fundList" v-if="list.length!=0">
        <van-sticky :offset-top="54+top">
          <div class="fundListTitle">
            <div class="fundName">基金简称</div>
            <div class="addedValue">最新净值</div>
            <div class="sortingYear">
              <div class="sortingYearName">年涨幅</div>
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
                @click.stop="likeFn(item.fund_code,!item.like,index,'list')"
              >
                <van-icon class-prefix="icon" name="starred" class="starIcon" v-if="item.like" />
                <van-icon class-prefix="icon" name="shoucang" class="soucangIcon" v-else />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotSearch">
        <h1>热搜基金</h1>
        <div class="hotSearchList">
          <div class="hotSearchListM" v-for="(item,index) in hotList" :key="index" @click="$router.push('/fundDetail/'+item.fund_code)">
            <div class="hotSearchLeft">
              <!-- <span class="hotSearchLtip">指</span> -->
              <span class="hotSearchLTitle">{{item.fund_name}}</span>
              <span class="hotSearchLNum">({{item.fund_code}})</span>
            </div>
            <div class="hotSearchCenter">
              <span :class="item.rise==1?'zhang':'die'">{{item.year_incratio}}</span>
              <span>近一年涨幅</span>
            </div>
            <div class="hotSearchRight" @click.stop="likeFn(item.fund_code,!item.like,index,'hotList')">
              <van-icon class-prefix="icon" name="starred" class="starIcon" v-if="item.like" />
              <van-icon class-prefix="icon" name="shoucang" class="soucangIcon" v-else />
            </div>
          </div>
        </div>
      </div>
      <div class="history" v-if="searchHistory.length>0">
        <van-cell title="历史搜索" is-link>
          <template slot="right-icon">
            <van-icon class-prefix="icon" name="shanchu" class="shanchu" @click="delHistory" />
          </template>
        </van-cell>
        <div class="historyList">
          <van-col
            span="12"
            class="listContent"
            v-for="(item,index) in searchHistory"
            :key="index"
            v-if="index<10"
            @click="searchFn(item)"
          >
            <span class="van-ellipsis">{{item}}</span>
          </van-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBarSeach from "@/components/navbar/navbarseach.vue";
export default {
  name: "search",
  data() {
    return {
      list: [],
      top: 0,
      value: "",
      searchHistory: [],
      hotList: []
    };
  },
  props: {
    goback: {
      type: Boolean,
      default() {
        return true;
      },
      required: false
    }
  },
  components: {
    navBarSeach
  },
  created() {
    var searchHistory = this.$METHOD.getStore("searchHistory");
    if(!searchHistory) return
    this.searchHistory = JSON.parse(searchHistory);
    this.$SERVER.hotsearch().then(res => {
      this.hotList = res.data;
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
    onClickLeft() {
      this.$router.go(-1);
    },
    delHistory() {
      this.searchHistory = [];
      this.$METHOD.setStore("searchHistory", []);
    },
    searchFn(val) {
      var searchHistory = this.$METHOD.getStore("searchHistory");
      if (searchHistory) {
        searchHistory = JSON.parse(searchHistory);
        searchHistory.push(val);
        searchHistory = [...new Set(searchHistory)];
        this.$METHOD.setStore("searchHistory", searchHistory);
        this.searchHistory = searchHistory;
      } else {
        searchHistory = [];
        searchHistory.push(val);
        searchHistory = [...new Set(searchHistory)];
        this.$METHOD.setStore("searchHistory", searchHistory);
        this.searchHistory = searchHistory;
      }
      var json = {};
      if (/^-?[0-9]\d*$/.test(val)) {
        json.fund_code = val;
      } else {
        json.fund_name = val;
      }
      this.$SERVER.stock_list(json).then(res => {
        this.list = res.data;
      });
    },
    likeFn(id, type, index,list) {
      this[list][index].like = !this[list][index].like;
      this.$SERVER
        .stock_like_up({
          type: Number(type),
          pro_code: id
        })
        .catch(err => {
          this[list][index].like = !this[list][index].like;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.searchNav {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  flex-shrink: 0;
  .search {
    flex-grow: 1;
  }
  .kefu {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: rgba(153, 153, 153, 1);
  }
  .left {
    padding-left: 17px;
  }
}
.hotSearch {
  background: #fff;
  margin-top: 15px;
  h1 {
    font-size: 13px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    padding: 16px 0 12px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
  }
  .hotSearchListM {
    display: flex;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    padding: 15px 0;
    margin: 0 16px;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    .hotSearchLeft {
      flex: 1.5;
      .hotSearchLtip {
        font-size: 11px;
        color: #ff5941;
        border: 1px solid #ff5941;
        padding: 1px 2px;
        border-radius: 5px;
      }
      .hotSearchLTitle {
        color: #333333;
        line-height: 22px;
      }
      .hotSearchLNum {
        color: #999999;
        margin-top: 5px;
        font-size: 13px;
        display: block;
      }
      .hotSearchLeftHort {
        .remen {
          font-size: 14px;
          color: rgba(255, 89, 65, 1);
        }
      }
    }
    .hotSearchCenter {
      flex: 1;
      font-size: 15px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      line-height: 20px;
      text-align: center;
      span {
        display: block;
      }
      span:nth-child(1) {
        &.zhang {
          color: #ff5941;
        }
        &.die {
          color: #5196ff;
        }
      }
      span:nth-child(2) {
        font-size: 13px;
        color: #999999;
      }
    }
    .hotSearchRight {
      flex: 0.5;
      display: flex;
      justify-content: center;
      line-height: 35px;
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
.history {
  margin-top: 15px;
  background: #fff;
  .shanchu {
    margin-right: 16px;
    font-size: 20px;
    color: rgba(204, 204, 204, 1);
  }
  .historyList {
    background: #fff;
    .listContent {
      border-top: 1px solid rgba(240, 240, 240, 1);
      background: #fff;
      padding-left: 14px;
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      span {
        display: inline-block;
        height: 30px;
        margin: 10px 0;
        width: 99%;
        line-height: 30px;
        border-right: 1px solid rgba(240, 240, 240, 1);
      }
    }
    .listContent:nth-child(2n) {
      span {
        border-right: none;
      }
    }
  }
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


