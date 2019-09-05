<template>
<div class="container">
     <navBar />
  <div class="main">
    <div class="up">
      <div>
        <van-icon class-prefix="icon" name="wode1" class="wode1Icon" />
        <br />请上传您的身份证正面照
      </div>
      <van-uploader  class="upImg" />
    </div>
    <div class="up">
      <div>
        <van-icon class-prefix="icon" name="guohui" class="guohuiIcon" />
        <br />请上传您的身份证正面照
      </div>
      <van-uploader  class="upImg" />
    </div>
    <van-cell-group class="inforform">
      <van-field  label="您的姓名" placeholder="请输入您的姓名" />
      <van-field  label="身份证号" placeholder="请输入身份证号码" />
      <van-field  label="新手机号" placeholder="请输入新的手机号" />
      <van-field class="phone"  center clearable placeholder="请输入短信验证码">
        <template slot="label">
          <van-icon class-prefix="icon" name="anquan" class="anquanIcon" />
        </template>
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div  class="btn">确定</div>
  </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "accountappeal",
  components: {
    navBar
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.up {
  width: 290px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  margin: 29px auto;
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 15px;
    color: rgba(51, 51, 51, 1);
    .wode1Icon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 30px 0 15px 0;
    }
    .guohuiIcon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 20px 0;
    }
  }
  .upImg {
    opacity: 0;
  }
}
.van-cell {
  padding: 15px 40px;
}
.phone {
  .van-field__label {
    width: 35px;
  }
  .anquanIcon {
    font-size: 20px;
    color: rgba(173, 173, 173, 1);
  }
  .van-button--primary {
    background: rgba(81, 150, 255, 1);
    border: none;
    border-radius: 25px;
  }
}
.inforform{
  padding-bottom: 26px;
}
.btn{
 width:270px;
height:44px;
background:rgba(81,150,255,1);
border-radius:22px;
margin: 27px auto;
font-size:17px;
font-family:PingFang;
font-weight:bold;
color:rgba(255,255,255,1);
line-height: 44px;
text-align: center
}
</style>

