<template>
  <view>
    <!-- 病例详情 -->
    <view class="record_box" v-for="(item, index) in recordDetail" :key="index">
      <view class="disease">{{item.disease}}</view>
      <view class="record-detail">
        <view class="title">【临床表现】</view>
        <view class="content">{{item.clinical}}</view>
      </view>
      <view class="record-detail">
        <view class="title">【治法】</view>
        <view class="content">{{item.therapy}}</view>
      </view>
      <view class="record-detail">
        <view class="title">【方药】</view>
        <view class="content">{{item.prescription}}</view>
      </view>
      <view class="record-detail">
        <view class="title">【中成药】</view>
        <view class="content">{{item.medicine}}</view>
      </view>
      <view class="time">{{item.time.slice(0,10) + ' ' + item.time.slice(11,19)}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        recordDetail: []
      };
    },
    onLoad(options) {
      this.getRecordDetail(options.id)
    },
    methods: {
      async getRecordDetail(id) {
        const { data: res } = await uni.$http.get(`/api/record_detail/get?id=${id}`)
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.recordDetail = res.data
      }
    }
  }
</script>

<style lang="scss">
  .record_box {
    padding: 20px;
    
    .disease {
      margin-left: 20px;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    
    .record-detail {
      margin: 10px;
      .title {
        font-size: 20px;
        margin-bottom: 5px;
      }
      
      .content {
        font-size: 16px;
        margin-left: 10px;
        margin-bottom: 20px;
        color: #bdbdbd;
      }
    }
    
    .time {
      font-size: 12px;
      color: gray;
      margin-left: 20px;
    }
  }
</style>
