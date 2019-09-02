<template>
  <div class="searchNav" :style="'padding-top:'+ top +'px'">
    <div class="minePicture">
      <img :src="$store.state.userInfo.user_img || user_img" />
    </div>
    <van-search
      placeholder="基金名称 / 代码"
      v-model="value"
      slot="title"
      shape="round"
      class="search"
      @click="$router.push('/search')"
      readonly
    />
    <van-icon
      class-prefix="icon"
      name="kefu"
      class="kefu"
      @click="$router.push('/chat')"
    />
  </div>
</template>
<script>
import user_img from "@/assets/images/default.png";
export default {
  name: "searchBar",
  components: {},
  data() {
    return {
      value: "",
      top: 0,
      user_img: user_img
    };
  },
  created() {},
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
.searchNav {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  flex-shrink: 0;
  .search {
    flex-grow: 1;
  }
  .kefu {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: rgba(153, 153, 153, 1);
    margin-right: 17px;
  }
  .minePicture {
    padding-left: 17px;
    width: 33px;
    height: 33px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>