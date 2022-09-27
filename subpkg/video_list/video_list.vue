<template>
  <view class="video_list_container">
    <view class="video_item" v-for="(item, index) in videoList" :key="index">
      <video :src="item.video_address" :poster="item.pic_address" play-btn-position="center" object-fit="fill" show-mute-btn enable-play-gesture controls></video>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        videoList: [],
        play: true
      };
    },
    onLoad() {
      this.getVideoList()
    },
    methods: {
      async getVideoList() {
        const { data: res } = await uni.$http.get('/api/video_list/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.videoList = res.data
      }
    }
  }
</script>

<style lang="scss">
  .video_list_container {
    padding: 15px;
    background-color: #f8f8f8;
  }
  
  .video_item {
    height: 360rpx;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    position: relative;
    
    video {
      width: 100%;
      height: 100%;
    }
  }
</style>
