<template>
  <van-popup v-model="show" position="bottom" class="popup">
    <van-nav-bar @click-right="onClickRight">
      <van-icon name="cross" slot="right" />
    </van-nav-bar>
    <iframe :src="url" frameborder="0" id="iframe"></iframe>
  </van-popup>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "browser",
  components: {
    navBar
  },
  data() {
    return {
      url:"",
      show:false
    };
  },
  methods:{
      open(url){
          this.url = url
          this.show = true
      },
      onClickRight(){
          this.show = false;
          setTimeout(() => {
              this.url = ""
          }, 500);
      }
  }
};
</script>

<style lang="less" scoped>
.popup {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
}
#iframe {
  width: 100%;
  border: 0;
  flex-grow: 1;
}
</style>