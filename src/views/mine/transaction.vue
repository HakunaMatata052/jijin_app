<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="transaction">
        <h1>请输入交易密码</h1>
        <van-password-input :value="value" :length="6" @focus="showKeyboard = true" />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "transaction",
  components: {
    navBar
  },
  watch: {
    value(val) {
      if (val.length == 6) {
        this.$toast('请再次输入密码')
        if (this.pwd.length != 0) {
          if (this.pwd == val) {
            // 提交
            this.submit(val)
          } else {
            this.$toast.fail('两次密码不一致，请重新输入')
            this.pwd = "";
            this.value = "";
          }
        } else {
          this.pwd = val;
          this.value = "";
        }
      }
    }
  },
  data() {
    return {
      pwd: "",
      value: "",
      showKeyboard: true
    };
  },
  created() {},
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    submit(val){
      this.$SERVER.tradepwdup({
        newtradepwdup: val
      }).then(res=>{
        this.$toast.success('密码设置成功！')
        this.$router.push('/mine')
      }).catch(err=>{
        this.$toast.fail('密码设置失败！')
        this.$router.push('/setPayPassword')
      })
    }
  }
};
</script>

<style lang="less" scoped>
.transaction {
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 111px 0 43px 0;
    text-align: center;
  }
}
</style>

