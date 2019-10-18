<template>
  <div class="searchNav" :style="'padding-top:'+ top +'px'">
    <div class="minePicture" @click="$router.push('/mine')">
      <img :src="$store.state.userInfo.user_img || user_img" v-if="$METHOD.getStore('token')"/>
      <img :src="user_img2" v-else/>
    </div>
    <van-search
      placeholder="基金名称 / 代码"
      v-model="value"
      slot="title"
      shape="round"
      class="search"
      @click="searchFn"
      readonly
    />
    <van-icon class-prefix="icon" name="kefu" class="kefu" @click="$router.push('/chat/10000')" />
  </div>
</template>
<script>
import user_img from "@/assets/images/default.png";
import user_img2 from "@/assets/images/3a7a761104c3aa5bf21ef1a3a286de5.png";
export default {
  name: "searchBar",
  components: {},
  data() {
    return {
      value: "",
      top: 0,
      user_img: user_img,
      user_img2:user_img2
    };
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
    }
  },
  methods: {
    searchFn() {
      this.$store.state.searchClear = true;
      this.$router.push("/search");
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
    line-height: 33px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>