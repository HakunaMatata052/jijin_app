<template>
  <van-popup v-model="show" position="bottom">
    <!-- 密码输入框 -->
    <p>请输入交易密码</p>
    <van-password-input :value="password" :length="maxlength" />
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="password" class="number-keyboard" :maxlength="maxlength" :show="true" title="安全键盘"/>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      maxlength: 6,
      password: ""
    };
  },
  watch:{
    password(val){
      if(val.length==this.maxlength){
        this.$emit('onSuccess',val)
      }
    }
  },
  methods: {
    showFn() {
      this.show = true;
    },
    clearFn(){
      this.password = ""
    }
  }
};
</script>
<style lang="less" scoped>
p {
  font-size: 15px;
  text-align: center;
  padding: 10px 0;
  color: #999;
  font-weight: 500;
}
.number-keyboard {
  position: relative;
  margin-top: 10px;
}
</style>
