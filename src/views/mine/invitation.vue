<template>
<div class="container">
   <navBar />
  <div class="main">   
    <div class="toptip">
      <van-grid :column-num="3">
        <van-grid-item v-for="value in chartNav" :key="value">
          <template slot="text">
            <p>{{value.title}}</p>
            <p>{{value.per}}</p>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="bottom">
        <p>邀请用户注册赢取体验金</p>
        <p>扫描下载APP</p>
        <div class="wxcode"></div>
        <div class="sharbtn">
          <div>保存二维码</div>
          <div>复制推广链接</div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "invitation",
  components: {
    navBar
  },
  data() {
    return {
      chartNav: [
        {
          title: "我的会员人数",
          per: "20"
        },
        {
          title: "我的累计收益",
          per: "2,000"
        },
        {
          title: "本月收益",
          per: "2,000"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.toptip {
  margin-top: 16px;
  .van-grid-item__content--center {
    p:nth-child(1) {
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
    }
    p:nth-child(2) {
      font-size: 17px;
      margin-top: 3px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .bottom {
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: center;
    p:nth-child(1) {
      font-size: 25px;
      color: rgba(81, 150, 255, 1);
      margin: 50px 0;
    }
    p:nth-child(2) {
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
      margin-bottom: 19px;
    }
    .wxcode {
      width: 200px;
      height: 200px;
      background: #fff;
      margin: 0 auto 30px auto;
    }
    .sharbtn {
      display: flex;
      justify-content: space-between;
      margin: 0 55px;
      div {
        width: 115px;
        height: 30px;
        background: rgba(245, 245, 245, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 2px;
        line-height: 30px;
        text-align: center;
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>

