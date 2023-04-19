<template>
  <view class="knowledge_detail_container">
    <view class="remind">
      <uni-icons type="info" size="12" color="#acaba9"></uni-icons>
      <text>提示：本文内容仅作参考，不能代替面诊，如有不适请尽快线下就医！</text>
    </view>
    <text class="question">{{knowledge.question}}</text>
    <text class="answer">{{knowledge.answer}}</text>
    <!-- 点赞收藏按钮 -->
    <!-- <my-clickSC :intSC="[knowledge.liked, knowledge.collected, knowledge.id]"></my-clickSC> -->
    
    <view class="clickSC">
      <view class="like" @click="changeStarStatus(knowledge.liked, knowledge.id)">
        <uni-icons type="hand-up" size="30" v-if="!knowledge.liked"></uni-icons>
        <uni-icons type="hand-up-filled" size="30" color="#3c6ba3" v-else></uni-icons>
      </view>
      <view class="collect" @click="changeCollectStatus(knowledge.collected, knowledge.id)">
        <uni-icons type="star" size="30" v-if="!knowledge.collected"></uni-icons>
        <uni-icons type="star-filled" size="30" color="#ffdb00" v-else></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        knowledge: [],
      };
    },
    onLoad(options) {
      // console.log(options.id);
      this.getKnowledgeDetail(options.id)
    },
    methods: {
      async getKnowledgeDetail(id) {
        const { data: res } = await uni.$http.get(`/api/knowledge_detail/get?id=${id}`)
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.knowledge = res.data[0]
        this.id = id
      },
      async changeStarStatus(liked, id) {
        if (!uni.getStorageSync('token')) {
          uni.switchTab({
            url: '/pages/my/my'
          })
          uni.$showMsg('请先登录');
        }else {
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
          this.knowledge.liked = !this.knowledge.liked
        } 
      },
      async changeCollectStatus(collected, id) {
        if (!uni.getStorageSync('token')) {
          uni.switchTab({
            url: '/pages/my/my'
          })
          uni.$showMsg('请先登录');
        }else {
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
          this.knowledge.collected = !this.knowledge.collected
        }

      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  .knowledge_detail_container {
    position: relative;
    padding: 30rpx;
    
    .remind {
      margin-bottom: 10px;
      
      text {
        font-size: 24rpx;
        color: #acaba9;
      }
    }
    
    .question {
      color: #1d1e22;
      font-size: 44rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
    }
    .answer {
      color: #485767;
      font-size: 30rpx;
      line-height: 200%;
    }
  }
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
