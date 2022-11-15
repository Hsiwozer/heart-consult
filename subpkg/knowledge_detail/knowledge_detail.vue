<template>
  <view class="knowledge_detail_container">
    <text class="question">{{knowledge.question}}</text>
    <text class="answer">{{knowledge.answer}}</text>
    <!-- 点赞收藏按钮 -->
    <my-clickSC :kno="knowledge"></my-clickSC>
  </view>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    }
  }
</script>

<style lang="scss">
  .knowledge_detail_container {
    padding: 30rpx;
    
    .question {
      font-size: 40rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 20rpx;
    }
    .answer {
      font-size: 26rpx;
    }
  }
</style>
