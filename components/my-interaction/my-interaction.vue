<template>
  <view>
    <!-- 首页点赞收藏模块 -->
    <view class="interaction">
      <view class="like">
        <uni-icons type="hand-up" size="15" v-if="!intSC[0]"></uni-icons>
        <uni-icons type="hand-up-filled" size="15" color="#3c6ba3" v-else></uni-icons>
        
      </view>
      <view class="collect">
        <uni-icons type="star" size="15" v-if="!intSC[1]"></uni-icons>
        <uni-icons type="star-filled" size="15" color="#ffdb00" v-else></uni-icons>
        
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:"my-interaction",
    data() {
      return {
        
      };
    },
    props: ["intSC"],
    computed: {
      ...mapState('m_knowledge', ['knowledgeList'])
    }
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