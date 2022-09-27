<template>
  <view class="my-userinfo-container">
  
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>
    
    <!-- 面板区域 -->
    <view class="pannel-list">
      <view class="pannel-item" @click="gotoLikeDetail">
        <uni-icons type="hand-up" size="30"></uni-icons>
        <text>点赞</text>
      </view>
      <view class="pannel-item" @click="gotocollectDetail">
        <uni-icons type="star" size="30"></uni-icons>
        <text>收藏</text>
      </view>
      <view class="pannel-item" @click="gotoFootDetail">
        <uni-icons type="flag" size="30"></uni-icons>
        <text>足迹</text>
      </view>
      <view class="pannel-item">
        <uni-icons custom-prefix="iconfont" type="icon-history" size="30"></uni-icons>
        <text>问诊记录</text>
      </view>
      <view class="pannel-item" @click="gotoSettingDetail">
        <uni-icons type="gear" size="30"></uni-icons>
        <text>设置</text>
      </view>
    </view>
    
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:"my-userinfo",
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    data() {
      return {
        
      };
    },
    methods: {
      gotoSettingDetail() {
        uni.navigateTo({
          url: '/subpkg/setting_detail/setting_detail'
        })
      },
      gotoLikeDetail() {
        uni.navigateTo({
          url: '/subpkg/like_detail/like_detail'
        })
      },
      gotocollectDetail() {
        uni.navigateTo({
          url: '/subpkg/collect_detail/collect_detail'
        })
      },
      gotoFootDetail() {
        uni.navigateTo({
          url: '/subpkg/foot_detail/foot_detail'
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;
  
    .top-box {
      height: 400rpx;
      background-color: #00c365;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 1px solid white;
      }
  
      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    
    .pannel-list {
      margin: 20rpx 20rpx 0;
      padding: 35rpx 20rpx 0;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
 
      .pannel-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 35rpx;
        
        text {
          font-size: 20rpx;
        }
      }
    }
  }
</style>