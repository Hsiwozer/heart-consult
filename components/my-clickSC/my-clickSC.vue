<template>
  <view>
    <view class="clickSC">
      <view class="like" @click="changeStarNum">
        <uni-icons type="hand-up" size="30" v-if="!isLiked"></uni-icons>
        <uni-icons type="hand-up-filled" size="30" color="#3c6ba3" v-else></uni-icons>
      </view>
      <view class="collect" @click="changeCollectNum">
        <uni-icons type="star" size="30" v-if="!isCollected"></uni-icons>
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
        isLiked: 0,
        isCollected: 0,
        id: 0,
        knowledge: this.kno
      };
    },
    props: ["kno"],
    methods: {
      changeStarNum() {
        this.isLiked = !this.isLiked
      },
      changeCollectNum() {
        this.isCollected = !this.isCollected
      }
    },
    watch: {
      kno: {
        handler: async function(newVal) {
          if (newVal === '') return
          this.id = newVal.id
        },
        deep: true
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