<template>
  <view>
    <!-- 病例列表 -->
    <view class="record_list" v-for="(item, index) in recordList" :key="index">
      <view class="record_item" @click="gotoRecordDetail(item.id)">
        <text class="title">{{item.disease}}</text>
        <text class="time">{{item.time.slice(0,10) + ' ' + item.time.slice(11,19)}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        recordList: []
      };
    },
    onLoad() {
      this.getRecordList()
    },
    methods: {
      async getRecordList(){
        const { data: res } = await uni.$http.get('/api/recordlist/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.recordList = res.data
      },
      gotoRecordDetail(id) {
        uni.navigateTo({
          url: `/subpkg/record_detail/record_detail?id=${id}`
        })
      }
    }
  }
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
  
  .record_list {
    padding: 0 30rpx;
    
    .record_item {
      position: relative;
      padding: 25rpx;
      background-color: #fff;
      margin: 30rpx 0;
      border-radius: 20rpx;
      
      .title {
        font-size: 24px;
        margin-left: 15px;
      }
      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 12px;
        color: gray;
      }
    }
  }
}
</style>
