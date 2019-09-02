<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="aboutus">
     {{detiljson.content}}
    </div>
   </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "aboutus",
  components: {
    navBar
  },
  data() {
    return {
      detiljson: {
        content:
          "8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板。8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板8月8日上市的科创板股票晶晨股份、柏楚电子表现再度超出机构预期：开盘价均涨超200%，高于此前25只科创板。"
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.aboutus {
    margin-top: 26px;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
    text-indent: 30px;
    background:#fff;
    padding:20px  16px
  }
</style>

