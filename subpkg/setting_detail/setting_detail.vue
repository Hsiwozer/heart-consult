<template>
  <view class="setting-detail-container">
    <!-- logo、小程序名称区域 -->
    <view class="controduction">
      <view class="logo">
        <image src="../../static/logo/logo_heart.png" mode="widthFix"></image>
      </view>
      <text class="title">护心专家</text>
      <text class="slogan">放心交给我们</text>
    </view>
    <!-- 关于、联系 -->
    <view class="detail-list">
      <view class="detail-item">
        <text>意见反馈</text>
        <uni-icons type="right" size="15"></uni-icons>
      </view>
      <view class="detail-item">
        <text>关于「护心专家」</text>
        <uni-icons type="right" size="15"></uni-icons>
      </view>
    </view>
    <!-- 退出登录按钮 -->
    <view class="logout" @click="logout">退出登录</view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
      
        if (succ && succ.confirm) {
           this.updateUserInfo({})
           this.updateToken('')
        }
        uni.switchTab({
          url: '/pages/my/my'
        })
      }
    }
  }
</script>

<style lang="scss">
  page,
  .setting-detail-container {
    background-color: #f8f8f8;
    
    .controduction {
      height: 400rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .logo {
        width: 200rpx;
        height: 200rpx;
        border-radius: 100rpx;
        overflow: hidden;
        image {
          width: 200rpx;
        }
      }
      .title {
        font-size: 36rpx;
        margin: 20rpx 0 5rpx;
      }
      .slogan {
        font-size: 20rpx;
        color: #ccc;
      }
    }
    
    .detail-list {
      border-radius: 30rpx;
      overflow: hidden;
      margin: 0 20rpx;
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
        
        text {
          
        }
      }
    }
    
    .logout {
      height: 50rpx;
      border-radius: 50rpx;
      padding: 15rpx 0;
      margin: 50rpx 50rpx 0;
      color: #fff;
      text-align: center;
      line-height: 50rpx;
      background: rgb(192,0,0);
      background: linear-gradient(90deg, rgba(192,80,0,1) 30%, rgba(192,0,0,1) 100%);
    }
  }
</style>
