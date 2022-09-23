<template>
  <view class="video_list_container">
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic1.jpg"></image>
    </view>
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic2.jpg"></image>
    </view>
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic3.jpg"></image>
    </view>
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic4.jpg"></image>
    </view>
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic5.jpg"></image>
    </view>
    <view class="video_item">
      <view class="play">
        <image src="../../static/play.png"></image>
      </view>
      <image src="/static/video_list/pic6.jpg"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .video_list_container {
    padding: 15px;
  }
  
  .video_item {
    height: 360rpx;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    position: relative;
    
    .play {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    image {
      width: 100%;
      height: 100%;
    }
  }
</style>
