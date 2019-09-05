<template>
  <van-swipe indicator-color="white" class="swipe" :loop="false">
    <van-swipe-item v-for="(item,index) in img" :key="index" class="swipe-item" @click="change(index)">
      <img :src="item" class="img" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import launch1 from "@/assets/images/launch1.jpg";
import launch2 from "@/assets/images/launch2.jpg";
import launch3 from "@/assets/images/launch3.jpg";
export default {
  data() {
    return {
      img: [launch1, launch2, launch3]
    };
  },
  methods: {
      change(index){
          if(index==2){
              this.$METHOD.setStore('first',true)
              this.$emit('complete')
          } 
      }
  }
};
</script>

<style lang="less" scoped>
.swipe {
    height: 100%;
}
.swipe-item {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
}
</style>