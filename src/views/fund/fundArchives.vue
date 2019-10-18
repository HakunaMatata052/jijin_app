<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell title="基金名称" :value="info.fund_name" />
        <van-cell title="基金代码" :value="info.fund_code" />
        <van-cell title="成立时间" :value="info.cl_time" />
        <van-cell title="基金类型" :value="info.type" />
        <van-cell title="基金规模" :value="info.jjgm" />
      </van-cell-group>
      
      <van-cell-group class="cell-group">
        <van-cell title="投资目标" :label="info.tzmb" />
      </van-cell-group>
      <van-cell-group class="cell-group">
        <van-cell title="风险收益" :label="info.fxsy" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "fundArchives",
  components: {
    navBar
  },
  data(){
      return {
          info:{}
      }
  },
  created(){
      this.$SERVER.stock_recode({
          fund_code: this.$route.params.id
      }).then(res=>{
          this.info = res.data
      })
  }
};
</script>
<style lang="less" scoped>
.cell-group {
    margin-top: 20px;
}
</style>