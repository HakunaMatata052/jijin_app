<template>
  <div class="container" id="home">
    <navBarSeach />
    <div class="main">
      <!-- <div class="topTitle">
        <div class="shenzhengIcon">
          <van-icon class-prefix="icon" name="shuju" class="shenIcon" />
        </div>
        <div class="shenzhengText">深证指数</div>
        <div class="shenzhengNum">
          <span v-for="(item, index) in shenzhengNum" :key="index">{{item}}</span>
        </div>
      </div>-->
      <div class="mainnav">
        <van-grid clickable :border="false">
          <van-grid-item v-for="(item, index) in homeNav" :key="index" :to="item.path" class="menu">
            <span slot="text">{{item.title}}</span>
            <template slot="icon">
              <svg-icon :icon-class="item.icon" class="homeNav"></svg-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item,i) in buy_frist" :key="i" >
          <div class="recommended">
            <div class="recommendedLeft">
              <div
                class="recommendedLeftT"
              >{{item.phone}} 申购{{buy_frist.item}} {{item.liquidation_amount}}元</div>
              <div class="recommendedLeftB">
                {{item.fund_name}}：净值
                <span>{{item.netvalue}}</span>
              </div>
              <div class="recommendedLeftB">
                年收益
                <span>{{item.year_incratio}}</span>
              </div>
              <van-button
                round
                type="info"
                size="small"
                @click="$router.push('/fundDetail/'+item.fund_code)"
                class="btn"
              >马上申购</van-button>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="selectProject">
        <div class="selectProjectTop">
          <div class="selectProjectTopLeft">精选产品</div>
          <div class="selectProjectTopRight" @click="$router.push('/fund')">
            <span>
              更多精选产品
              <van-icon class-prefix="icon" name="you" class="youIcon" />
            </span>
          </div>
        </div>
        <div class="selectProjectBottom" @click="$router.push('/fundDetail/'+jingxuan.fund_code)">
          <div class="selectProjectBottomLeft">
            <img src="../../../assets/images/indexchart.png" />
          </div>
          <div class="selectProjectBottomCenter">
            <div class="selectProjectBottomCenterT">{{jingxuan.year_incratio}}</div>
            <div class="selectProjectBottomCenterB">年收益</div>
          </div>
          <div class="selectProjectBottomRight">
            <div class="selectProjectBottomRightT van-ellipsis">{{jingxuan.fund_name}}</div>
            <div class="selectProjectBottomRightB">{{jingxuan.property}}</div>
          </div>
        </div>
      </div>
      <div class="type">
        <div class="typeModel" v-for="(value, key,index) in list" :key="index">
          <div class="typeModelTitle">
            <div class="typeModelTitleText">{{key}}</div>
            <div class="typeModelTitleMore" @click="$router.push('/fund/'+key)">
              更多精选产品
              <van-icon class-prefix="icon" name="you" class="youIcon" />
            </div>
          </div>
          <div class="typeModelData">
            <div
              class="typeModelDataModel"
              @click="$router.push('/fundDetail/'+item.fund_code)"
              v-for="(item,index) in value"
              :key="index"
            >
              <div class="typeModelDataModelLeft">
                <div class="typeModelDataModelLeftT">{{item.year_incratio}}</div>
                <div class="typeModelDataModelLeftB">年收益</div>
              </div>
              <div class="typeModelDataModelRight">
                <div class="typeModelDataModelRightT">{{item.fund_name}}</div>
                <div class="typeModelDataModelRightB">{{item.property}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBarSeach from "@/components/navbar/navbarseach.vue";
export default {
  name: "home",
  data() {
    return {
      shenzhengNum: ["10000.00", "+20.00", "+0.49%"],
      homeNav: [
        {
          title: "我的收益",
          path: "/earnings",
          icon: "dingdan"
        },
        {
          title: "基金收藏",
          path: "/mycollection",
          icon: "aixin"
        },
        {
          title: "邀请有礼",
          path: "/invitation",
          icon: "liwu"
        },
        {
          title: "我的账户",
          path: "/touchbalance",
          icon: "wode"
        },
        {
          title: "市场研报",
          path: "/myreport",
          icon: "xiangji"
        },
        {
          title: "热销基金",
          path: "/fund",
          icon: "remen"
        },
        {
          title: "主题选基",
          path: "/myselection",
          icon: "zuanshi"
        },
        {
          title: "现金宝",
          path: "/mytreasure",
          icon: "xunzhang"
        }
      ],
      list: {},
      jingxuan: {},
      buy_frist: {}
    };
  },
  components: {
    navBarSeach
  },
  created() {
    this.stock_index();
  },
  deactivated() {},
  methods: {
    stock_index() {
      this.$SERVER.stock_index().then(res => {
        this.list = res.data.stock_list;
        this.jingxuan = res.data.stock_jingxuan[0];
        this.buy_frist = res.data.buy_frist;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.youIcon {
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  margin-left: 5px;
}
.topTitle {
  height: 18px;
  line-height: 18px;
  display: flex;
  padding: 20px 0;
  background: #fff;
  .shenzhengIcon {
    width: 17px;
    height: 17px;
    margin-left: 15px;
    .shenIcon {
      font-size: 16px;
      color: rgba(81, 150, 255, 1);
    }
  }
  .shenzhengText {
    font-size: 16px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 0 15px 0 5px;
  }
  .shenzhengNum {
    display: flex;
    flex: 1;
    margin-right: 21px;
    span {
      flex: 1;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 94, 71, 1);
      text-align: right;
    }
  }
}
.mainnav {
  margin: 15px 0;
  background: #fff;
  border-radius: 5px;
  color: rgba(51, 51, 51, 1);
  padding: 5px 10px;
  .homeNav {
    width: 30px;
    height: 30px;
  }
  .menu {
    span {
      font-size: 13px;
      color: rgba(51, 51, 51, 1);
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.recommended {
  border-radius: 5px;
  display: flex;
  padding: 0 15px;
  background: #fff url(../../../assets/images/bg1.png) no-repeat center top;
  background-size: cover;
  .recommendedLeft {
    flex: 1;
    text-align: center;
    padding: 20px 0;
    .btn {
      width: 200px;
      margin-top: 10px;
    }
  }
  .recommendedLeftT {
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
  }
  .recommendedLeftB {
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    &:nth-child(3) {
      color: rgba(255, 89, 65, 1);
      font-size: 18px;
    }
  }
  .recommendedRight {
    width: 100%;
    height: 30px;
    margin: 10px auto;
    background: rgba(81, 150, 255, 1);
    border-radius: 15px;
    font-size: 13px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
    text-align: center;
  }
}
.selectProject {
  width: 375px;
  height: 120px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1),
    rgba(223, 235, 255, 1)
  );
  border-radius: 5px;
  margin-top: 16px;
  .selectProjectTop {
    height: 39px;
    line-height: 39px;
    position: relative;
    display: flex;
    justify-content: space-between;
    .selectProjectTopLeft {
      margin-left: 19px;
      font-size: 17px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(81, 150, 255, 1);
    }
    .selectProjectTopRight {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-right: 18px;
    }
  }
  .selectProjectTop:after {
    position: absolute;
    content: "";
    width: 3px;
    height: 39px;
    background: rgba(81, 150, 255, 1);
    border-radius: 5px;
  }
  .selectProjectBottom {
    margin: 0 17px;
    display: flex;
    justify-content: space-between;
    .selectProjectBottomLeft {
      width: 45px;
      height: 45px;
      margin-top: 11px;
      img {
        width: 100%;
        height: 100%;
        margin-top: 10px;
      }
    }
    .selectProjectBottomCenter {
      .selectProjectBottomCenterT {
        font-size: 20px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 89, 65, 1);
        line-height: 18px;
        margin-top: 18px;
      }
      .selectProjectBottomCenterB {
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        margin-top: 12px;
      }
    }
    .selectProjectBottomRight {
      .selectProjectBottomRightT {
        font-size: 16px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        margin-top: 18px;
        display: block;
      }
      .selectProjectBottomRightB {
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        margin-top: 12px;
      }
    }
  }
}
.type {
  margin-bottom: 18px;
  .typeModel {
    .typeModelTitle {
      padding: 0 20px;
      height: 48px;
      line-height: 55px;
      display: flex;
      justify-content: space-between;
      .typeModelTitleText {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .typeModelTitleMore {
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .typeModelData {
      padding: 0 20px;
      background: #fff;
      .typeModelDataModel {
        height: 80px;
        display: flex;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        .typeModelDataModelLeft {
          flex: 1;
        }
        .typeModelDataModelRight {
          flex: 2;
        }
        .typeModelDataModelLeftT,
        .typeModelDataModelRightT {
          font-size: 21px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 89, 65, 1);
          line-height: 18px;
          padding-top: 23px;
        }

        .typeModelDataModelLeftB,
        .typeModelDataModelRightB {
          font-size: 13px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
          margin-top: 10px;
        }
        .typeModelDataModelRightT {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
        }
      }
      .typeModelDataModel:nth-last-child(1) {
        border: none;
      }
    }
  }
}
</style>

