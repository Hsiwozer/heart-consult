<template>
  <view>
    <!-- 点赞收藏模块 -->
    <view class="interaction">
      <view class="like">
        <uni-icons type="hand-up" size="15"></uni-icons>
        <!-- <uni-icons type="hand-up-filled" size="15"></uni-icons> -->
        <text>{{knowledge.starnum}}</text>
      </view>
      <view class="collect">
        <uni-icons type="star" size="15"></uni-icons>
        <!-- <uni-icons type="star-filled" size="15"></uni-icons> -->
        <text>{{knowledge.collectnum}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-interaction",
    data() {
      return {
        
      };
    },
    props: ['knowledge']
  }
</script>

<style lang="scss">
  .interaction {
    display: flex;
    justify-content: flex-end;
    margin-top: 15rpx;
    
    &>view {
      margin: 0 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      text {
        font-size: 15rpx;
      }
    }
  }
</style>