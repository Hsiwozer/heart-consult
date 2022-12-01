<template>
  <view class="knowledge_detail_container">
    <view class="remind">
      <uni-icons type="info" size="12" color="#acaba9"></uni-icons>
      <text>提示：本文内容仅作参考，不能代替面诊，如有不适请尽快线下就医！</text>
    </view>
    <text class="question">{{knowledge.question}}</text>
    <text class="answer">{{knowledge.answer}}</text>
    <!-- 点赞收藏按钮 -->
    <my-clickSC :intSC="[knowledge.liked, knowledge.collected, knowledge.id]"></my-clickSC>
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
      }
    }
  }
</script>

<style lang="scss">
  .knowledge_detail_container {
    padding: 30rpx;
    
    .remind {
      margin-bottom: 10px;
      
      text {
        font-size: 24rpx;
        color: #acaba9;
      }
    }
    
    .question {
      font-size: 40rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
    }
    .answer {
      font-size: 30rpx;
      line-height: 200%;
    }
  }
</style>
