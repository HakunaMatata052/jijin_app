<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="aboutus">
     {{data}}
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
      data: {}
    };
  },
  created() {
    this.$SERVER.Publiccon().then(res=>{
      this.data = res.data[0].content
    })
  },
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

