<template>
  <view class="userinfo-container">
    <view class="detail-list">
      <view class="detail-item">
        <text>昵称</text>
        <text>{{showUserInfo.nickName}}</text>
      </view>
      <view class="detail-item">
        <text>性别</text>
        <text v-if="showUserInfo.gender == 0">未知</text>
        <text v-else-if="showUserInfo.gender == 1">男</text>
        <text v-else>女</text>
      </view>
      <view class="detail-item">
        <text>语言</text>
        <text v-if="showUserInfo.language === 'zh_CN'">简体中文</text>
        <text v-else-if="showUserInfo.language === 'zh_TW'">繁体中文</text>
        <text v-else>英文</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('m_user', ['showUserInfo']),
      userinfo: state => state.showUserInfo,
    },
  }
</script>

<style lang="scss">
  page,
  .userinfo-container {
    background-color: #f8f8f8;
    
    .detail-list {
      border-radius: 30rpx;
      overflow: hidden;
      margin: 20rpx 20rpx 0;
      padding: 0 20px;
      background-color: #fff;
      
      .detail-item {
        padding: 20rpx 10rpx;
        height: 50rpx;
        border-bottom: 1px solid #ffefff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        &:last-child {
          border: 0px;
        }
        
      }
    }
  }
</style>
