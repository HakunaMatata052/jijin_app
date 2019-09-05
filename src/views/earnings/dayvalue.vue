<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="rtansactionrecordsb">
          <div class="rtansactionrecordsM">
            <van-row class="rtansactionrecordsList">
              <van-col span="12" class="rtansactionrecords rtansactionrecordsL">日期</van-col>
              <van-col span="12" class="rtansactionrecords rtansactionrecordsR">收益</van-col>
            </van-row>
            <van-row
              class="rtansactionrecordsList rtansactionrecordsListM"
              v-for="(item,index) in list"
              :key="index"
            >
              <van-col span="12" class="rtansactionrecords rtansactionrecordsL">{{item.create_time}}</van-col>
              <van-col span="12" :class="item.rise==0?'rtansactionrecords downcolorper rtansactionrecordsR':'rtansactionrecords upcolorper rtansactionrecordsR'">{{item.fee}}</van-col>
            </van-row>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>       
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "rtansactionrecords",
  components: {
    navBar
  },
  data() {
    return {
      finished: false,
      loading: false,
      page: 1,
      list: []
    };
  },
  methods: {
    getList() {
      let order_id = ""
      if(this.$route.params.id) order_id = this.$route.params.id
      this.$SERVER
        .profit({
          page: this.page,
          order_id: order_id
        })
        .then(res => {
          this.page++;
          this.loading = false;
          this.list = [...this.list, ...res.data];
        }).catch(err=>{
          this.finished = true
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.rtansactionrecordsb {
  margin-top: 16px;
  .rtansactionrecordsList {
    height: 40px;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    background: #fff;
    background: rgba(255, 255, 255, 1);
    .rtansactionrecords {
      text-align: left;
    }
    .rtansactionrecordsL {
      padding-left: 15px;
    }
    .rtansactionrecordsR {
      padding-right: 15px;
      text-align: right;
    }
    .upcolorper {
      color: #ff5941;
    }
    .downcolorper {
      color: #5196ff;
    }
    &:nth-child(2n + 1) {
      background: rgba(250, 250, 250, 1);
    }
  }
}
</style>

