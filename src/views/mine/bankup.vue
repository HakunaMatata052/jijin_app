<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group :border="false" class="cell-group">
        <van-field
          v-model="bank.bank_name"
          required
          clearable
          label="银行名称"
          placeholder="请选择银行名称"
          readonly
          @click="popupShow = true"
        />
        <van-field
          v-model="bank.bank_card_number"
          required
          clearable
          label="银行卡号"
          placeholder="请输入银行卡号"
          type="tel"
        />
        <van-field
          v-model="bank.bank_province_city"
          required
          clearable
          label="开户支行"
          placeholder="请输入开户支行"
        />
        <van-field
          v-model="bank.bank_user_name"
          required
          clearable
          label="开户人名称"
          placeholder="请输入开户人名称"
        />
      </van-cell-group>
      <div class="submit">
        <van-button type="danger" size="large" round @click="submit" class="btn">提交</van-button>
      </div>
    </div>
    <van-popup v-model="popupShow" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="popupShow = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "bankup",
  components: {
    navBar
  },
  data() {
    return {
      bank: {},
      popupShow: false,
      columns: [        
        "工商银行",        
        "中国银行",
        "农业银行",
        "建设银行",
        "交通银行",
        "招商银行",
        "民生银行",
        "平安银行",
        "光大银行",
        "浦发银行",
        "兴业银行",
        "中信银行",
        "华夏银行"
      ]
    };
  },
  created() {
      this.bank = this.$store.state.userInfo
  },
  methods: {
    onConfirm(value, index) {
      this.bank.bank_name = value;
      this.popupShow = false;
    },
    submit() {
      if (!/^([1-9]{1})(\d{14,18})$/.test(this.bank.bank_card_number)) {
        this.$toast.fail("银行卡号不正确");
        return;
      }
      if (!this.bank.bank_name || this.bank.bank_name == "") {
        this.$toast.fail("请选择银行");
        return;
      }
      if (!this.bank.bank_province_city || this.bank.bank_province_city == "") {
        this.$toast.fail("请填写开户行");
        return;
      }
      if (!this.bank.bank_user_name || this.bank.bank_user_name == "") {
        this.$toast.fail("请填写开户姓名");
        return;
      }
      this.$SERVER.bankup(this.bank).then(res => {        
        this.$METHOD.updateLocalUserInfo('bank_card_number',this.bank.bank_card_number)
        this.$METHOD.updateLocalUserInfo('bank_name',this.bank.bank_name)
        this.$METHOD.updateLocalUserInfo('bank_province_city',this.bank.bank_province_city)
        this.$METHOD.updateLocalUserInfo('bank_user_name',this.bank.bank_user_name)
        
        this.$toast.success(res.msg);
        this.$router.go(-1);
      });
    }
  },
  activated() {}
};
</script>

<style lang="less" scoped>
.cell-group {
  margin-top: 20px;
}
.submit {
  margin: 20px;
  padding: 15px;
  .btn {
    background: #5196ff;
    border: 0;
  }
}
</style>

