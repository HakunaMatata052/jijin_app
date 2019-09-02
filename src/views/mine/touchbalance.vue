<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="rtansactionrecordsb">
        <div class="rtansactionrecordsbT">
          <div class="rtansactionrecordsbTC">
            <span>账户余额</span>
            <span>{{account}}</span>
          </div>
          <div class="rtansactionrecordsbTBtn">
            <div>充值</div>
            <div>提现</div>
          </div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getCapitalFlow"
        >
          <div class="rtansactionrecordsM">
            <van-row class="rtansactionrecordsList th">
              <van-col span="6" class="rtansactionrecords">日期</van-col>
              <van-col span="5" class="rtansactionrecords">时间</van-col>
              <van-col span="5" class="rtansactionrecords">金额</van-col>
              <van-col span="7" class="rtansactionrecords">操作</van-col>
            </van-row>
            <van-row class="rtansactionrecordsList" v-for="(item,index) in list" :key="index">
              <van-col span="6" class="rtansactionrecords">{{item.mon}}</van-col>
              <van-col span="5" class="rtansactionrecords">{{item.time}}</van-col>
              <van-col
                span="5"
                :class="item.rise==0?'rtansactionrecords downcolorper':'rtansactionrecords upcolorper'"
              >{{item.fee}}</van-col>
              <van-col span="7" class="rtansactionrecords">{{item.cost_type}}</van-col>
            </van-row>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>       
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "touchbalance",
  components: {
    navBar
  },
  data() {
    return {
      account: "",
      list: [],
      page: 1,
      loading: false,
      finished: false
    };
  },
  methods: {
    getCapitalFlow() {
      this.$SERVER
        .my_money({
          page: this.page
        })
        .then(res => {
          this.page++;
          this.loading = false;
          this.account = res.data.account;
          this.list = [...this.list, ...res.data.stock_log];
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
.rtansactionrecordsb {
  margin-top: 16px;
  .rtansactionrecordsbT {
    margin-bottom: 15px;
    background: #fff;
    padding-bottom: 17px;
    .rtansactionrecordsbTC {
      padding: 22px 0;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      line-height: 18px;
      span:nth-child(1) {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
      }
      span:nth-child(2) {
        font-size: 20px;
        color: rgba(255, 89, 65, 1);
      }
    }
    .rtansactionrecordsbTBtn {
      display: flex;
      justify-content: space-between;
      padding: 0 25px;
      div {
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
      }
      div:nth-child(1) {
        background: rgba(81, 150, 255, 1);
        color: rgba(255, 255, 255, 1);
      }
      div:nth-child(2) {
        border: 1px solid rgba(81, 150, 255, 1);
        color: rgba(81, 150, 255, 1);
      }
    }
  }
  .rtansactionrecordsList {
    &.th {
      font-size: 15px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    height: 40px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    padding: 0 15px;
    text-align: center;
    background: rgba(250, 250, 250, 1);
    .upcolorper {
      color: #ff5941;
    }
    .downcolorper {
      color: #5196ff;
    }
    &:nth-child(2n + 1) {
      background: #fff;
    }
  }
}
</style>

