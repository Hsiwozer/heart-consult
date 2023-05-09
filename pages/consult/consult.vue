<template>
  <view class="consult-container">
    <view class="startPage" @click="gotoConsultDetail">开始问诊</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      gotoConsultDetail() {
        if (!uni.getStorageSync('token')) {
          uni.switchTab({
            url: '/pages/my/my'
          })
          uni.$showMsg('请先登录');
        }else {
          uni.navigateTo({
          url: '/subpkg/consult_detail/consult_detail'
        })
        }
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  .consult-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .startPage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300rpx;
    height: 300rpx;
    background-color: #18bc37;
    color: #fff;
    font-size: 25px;
    line-height: 300rpx;
    text-align: center;
    border-radius: 300rpx;
  }
</style>
