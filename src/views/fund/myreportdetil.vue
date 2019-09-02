<template>
  <div class="container">
    <navBar />
    <div class="main" ref="main">
      <div class="myreportdetil">
        <h1>{{info.title}}</h1>
        <div class="myreportdetilTip">
          <span>原创</span>
          <span>来源:{{info.source}}</span>
          <span>{{info.createtime}}</span>
        </div>
        <div class="myreportdetilContent" v-html="info.content"></div>
      </div>
      <div class="myreportdetilMore">
        <h1>相关文章</h1>
        <div
          class="myreportdetilMoreLi van-ellipsis"
          v-for="(item,index) in info.relevant"
          :key="index"
          @click="getDetail(item.id)"
        >
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "myreportdetil",
  components: {
    navBar
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    getDetail(id) {
      this.$SERVER
        .reportDetails({
          id: id
        })
        .then(res => {
          this.$refs.main.scrollTo(0, 0);
          this.info = res.data;
        });
    }
  }
};
</script>
<style lang="less">
.myreportdetilContent {
  margin-top: 26px;
  font-size: 13px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  p {
    // text-indent: 2em;
  margin: 10px 0;
  }
  img {
    max-width: 100%;
  }
}
</style>
<style lang="less" scoped>
.myreportdetil {
  background: #fff;
  margin: 16px 0 20px;
  padding: 0 20px 30px 20px;
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
    padding-top: 23px;
    padding-bottom: 16px;
  }
  .myreportdetilTip {
    display: flex;
    align-items: center;
    span:nth-child(1) {
      display: inline-block;
      width: 35px;
      height: 20px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 89, 65, 1);
      border-radius: 5px;
      font-size: 10px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255, 89, 65, 1);
      line-height: 20px;
      text-align: center;
    }
    span:nth-child(2) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(81, 150, 255, 1);
      line-height: 22px;
      margin: 0 22px 0 6px;
    }
    span:nth-child(3) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
  }
}
.myreportdetilMore {
  padding-top: 17px;
  background: #fff;
  margin-bottom: 20px;
  h1 {
    padding: 0 16px 19px 16px;
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
  .myreportdetilMoreLi {
    padding: 0 16px;
    height: 50px;
    position: relative;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 50px;
    span {
      padding-left: 21px;
    }
    span:after {
      position: absolute;
      top: 50%;
      left: 15px;
      margin-top: -4px;
      content: "";
      width: 7px;
      height: 7px;
      background: rgba(81, 150, 255, 1);
      border-radius: 50%;
    }
  }
  .myreportdetilMoreLi:nth-child(n) {
    background: rgba(250, 250, 250, 1);
  }
  .myreportdetilMoreLi:nth-child(2n) {
    background: #fff;
  }
}
</style>

