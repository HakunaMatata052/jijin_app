<template>
  <div id="earnings">
    <div class="top" :style="'padding-top:'+ top +'px'">
      <van-row type="flex" justify="end" class="earningsTitle">
        <van-col span="5" @click="$router.push('/transactionrecords')">
          <van-icon class-prefix="icon" name="jiaoyichenggong" color="#fff" />
          <span>交易</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="total">
          <span>总资产</span>
          <van-icon
            name="eye-o"
            color="#fff"
            v-if="$store.state.moneyShow"
            size="23px"
            @click="$store.state.moneyShow = !$store.state.moneyShow"
          />
          <van-icon
            name="closed-eye"
            color="#fff"
            size="23px"
            v-else
            @click="$store.state.moneyShow = !$store.state.moneyShow"
          />
      </van-row>
      <h1 v-if="$store.state.moneyShow">{{data.zongyue}}</h1>
      <h1 v-else>******</h1>
    </div>
    <div class="receiptinfo">
      <dl @click="$router.push('/benefitanalysis/0')">
        <dt>{{data.zuorishouyi_time}}收益</dt>
        <dd>{{data.zuorishouyi}}</dd>
      </dl>
      <dl @click="$router.push('/benefitanalysis/2')">
        <dt>累计收益</dt>
        <dd>{{data.leijishouyi}}</dd>
      </dl>
    </div>
    <van-cell class="balance">
      <template slot="title">
        <span class="custom-title">账户余额</span>
        <span class="custom-num">{{data.zhanghuyue}}元</span>
      </template>
    </van-cell>
    <van-row type="flex">
      <van-col span="12">
        <van-cell class="van-hairline--bottom">
          <template slot="title">
            <span class="custom-title">基金</span>
            <span class="custom-num">{{data.jijin}}元</span>
          </template>
        </van-cell>
      </van-col>

      <van-col span="12">
        <van-cell to="/dayvalue" class="van-hairline--bottom">
          <template slot="title">
            <span class="custom-title">日收益</span>
            <span class="custom-num">{{data.rishouyi}}元</span>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-row type="flex">
      <van-col span="12">
        <van-cell>
          <template slot="title">
            <span class="custom-title">现金宝</span>
            <span class="custom-num">{{data.xianjinbao}}元</span>
          </template>
        </van-cell>
      </van-col>
      <van-col span="12">
        <van-cell>
          <template slot="title">
            <span class="custom-text">万元每日收益{{data.wanyuan_shouyi}}</span>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-cell
      class="balance"
      v-for="(item,index) in data.stock"
      :key="index"
      @click="$router.push('/buyfund/'+item.order_id)"
    >
      <h1>{{item.stock_name}}({{item.fund_code}})</h1>
      <template>
        <van-col span="12" class="text-title">资产</van-col>
        <van-col span="12" class="text-end text-title">{{item.zuoritime}}</van-col>
      </template>
      <template>
        <van-col span="12" class="zhang">{{item.residual_quantity}}</van-col>
        <van-col span="12" :class="item.rise == 0?'text-end die':'text-end zhang'">{{item.fee}}</van-col>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "earnings",
  components: {},
  data() {
    return {
      data: {},
      top:0
    };
  },
  created() {
    this.$SERVER.income().then(res => {
      this.data = res.data;
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
  }

};
</script>

<style lang="less" scoped>
.top {
  height: 251px;
  flex-direction: column;

  background: linear-gradient(
    -42deg,
    rgba(60, 137, 255, 1),
    rgba(103, 196, 255, 1)
  );
  .earningsTitle {
    padding-top: 10px;
    .icon {
      font-size: 15px;
    }
    span {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  .total {
    margin-top: 30px;
    display: flex;
    align-items: center;
    span {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-left: 5px;
    }
  }
  h1 {
    text-align: center;
    font-size: 45px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin-top: 13px;
  }
}
.receiptinfo {
  background: #fff;
  display: flex;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  margin: -35px 15px 0 15px;
  dl {
    flex: 1;
    text-align: center;
    dt {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin-top: 15px;
    }
    dd {
      font-size: 19px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.balance {
  margin-top: 15px;
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 16px 0 19px;
  }
  .text-title {
    margin-bottom: 11px;
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .zhang {
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 89, 65, 1);
  }
  .die {
    font-size: 20px;
    font-weight: bold;
    color: #5196ff;
  }
}
.custom-title {
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.custom-num {
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 14px;
}
.custom-text {
  font-size: 13px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 89, 65, 1);
}
.text-end {
  text-align: right;
}
</style>

