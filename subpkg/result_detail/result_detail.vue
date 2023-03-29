<template>
  <view>
    <view class="result" v-for="(item, index) in resultList" :key="index">
      <view class="result-title">{{item.main}}</view>
      <view class="result-level" style="color: #fffe00" v-if="item.score >= 8 && item.score <= 13">轻度</view>
      <view class="result-level" style="color: #fd9b00" v-else-if="item.score >= 14 && item.score <= 19">中度</view>
      <view class="result-level" style="color: #db2522" v-else>重度</view>
    </view>
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('m_result', ['showResult']),
      resultList: state => state.showResult,
    },
    methods: {
      
    }
  }
</script>

<style  lang="scss">
  .result-title {
    font-size: 88rpx;
    text-align: center;
    font-weight: 700;
    margin-top: 35rpx;
    color: #f5c060;
  }
  .result-level {
    font-size: 50rpx;
    text-align: right;
    font-weight: 500;
    margin-top: 15rpx;
    margin-right: 50rpx;
  }

</style>
