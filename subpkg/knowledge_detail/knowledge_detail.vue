<template>
  <view class="knowledge_detail_container">
    <text class="question">{{question}}</text>
    <text class="answer">{{answer}}</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        question: '',
        answer: ''
      };
    },
    async onLoad(options) {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('dataFromKnowledgePage',  await function({data: res}) {
        console.log(res);
        this.question = res.question
        this.answer = res.answer
      })
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
