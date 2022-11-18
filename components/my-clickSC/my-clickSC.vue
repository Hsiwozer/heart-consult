<template>
  <view>
    <view class="clickSC">
      <view class="like" @click="changeStarStatus(intSC[0], intSC[2])">
        <uni-icons type="hand-up" size="30" v-if="!intSC[0]"></uni-icons>
        <uni-icons type="hand-up-filled" size="30" color="#3c6ba3" v-else></uni-icons>
      </view>
      <view class="collect" @click="changeCollectStatus(intSC[1], intSC[2])">
        <uni-icons type="star" size="30" v-if="!intSC[1]"></uni-icons>
        <uni-icons type="star-filled" size="30" color="#ffdb00" v-else></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-clickSC",
    data() {
      return {

      };
    },
    props: ["intSC"],
    methods: {
      async changeStarStatus(liked, id) {
        const dayjs = require("dayjs")
        let curDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const { data: res } = await uni.$http.post(`/api/interaction/like?liked=${liked}&footTime=${curDate}&id=${id}`)
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
      },
      async changeCollectStatus(collected, id) {
        const dayjs = require("dayjs")
        let curDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const { data: res } = await uni.$http.post(`/api/interaction/collect?collected=${collected}&footTime=${curDate}&id=${id}`)
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .clickSC {
    height: 135rpx;
    position: fixed;
    right: 30rpx;
    bottom: 50rpx;
    border-radius: 30rpx;
    box-shadow: 2px 2px 5px #eee;
    padding: 10rpx;
    
    &>view {
      border-radius: 50rpx;
      background-color: #fff;
    }
  }
</style>