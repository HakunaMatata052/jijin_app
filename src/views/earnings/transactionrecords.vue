<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="rtansactionrecords">
        <div
          class="rtansactionrecordsM"
          :ref="'item'+index"
          v-for="(value, key,index) in  list"
          :key="index"
        >
          <van-sticky :container="$refs['item'+index]" :offset-top="46">
            <div class="data">{{key}}</div>
          </van-sticky>
          <div class="rtansactionrecordsList" v-for="(item,i) in value" :key="i" @click="$router.push('/transactionDetail/'+item.order_id)">
            <div class="rtansactionrecordsL">
              <p>{{item.status}}</p>
            </div>
            <div class="rtansactionrecordsC">
              <p>{{item.stock_name}}</p>
              <p>{{item.createtime}}</p>
            </div>
            <div class="rtansactionrecordsR">
              <p>{{item.liquidation_amount}}元</p>
              <p>{{item.yuji}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>       
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "transactionrecords",
  components: {
    navBar
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    console.log(this.$refs);
  },
  methods: {
    getList() {
      this.$SERVER.deallog().then(res=>{
        this.list = res.data
      });
    }
  }
};
</script>

<style lang="less" scoped>
.rtansactionrecordsM {
  margin-top: 15px;
  background: rgba(255, 255, 255, 1);
  .data {
    background: rgba(255, 255, 255, 1);
    width: 375px;
    height: 50px;
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 50px;
    padding: 0 16px;
  }
  .rtansactionrecordsList {
    display: flex;
    align-items: center;
    height: 70px;
    border-top: 1px solid rgba(242, 242, 242, 1);
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    padding: 0 16px;
    .rtansactionrecordsL {
      flex-shrink: 0;
      margin-right: 6px;
      p {
        width: 30px;
        height: 30px;
        background: rgba(255, 89, 65, 1);
        border-radius: 50%;
        font-size: 10px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        text-align: center;
      }
    }
    .rtansactionrecordsC {
      flex-grow: 1;
      overflow: hidden;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 10px 0 5px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
    }
    .rtansactionrecordsR {
      flex-shrink: 0;
      p:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        text-align: right;
        margin: 10px 0 5px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(81, 150, 255, 1);
        line-height: 18px;
        text-align: right;
      }
    }
  }
}
</style>

