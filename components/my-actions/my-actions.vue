<template>
  <view>
    <view class="action_list" v-for="(item, index) in articleList" :key="index">
      <view class="action_item" @click="gotoKnowledgeDetail(item.id)">
        <text class="title">{{item.question}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-actions",
    data() {
      return {
        
      };
    },
    props: ['articleList'],
    methods: {
      gotoKnowledgeDetail(id){
        uni.navigateTo({
          url: `/subpkg/knowledge_detail/knowledge_detail?id=${id}`
        })
      },
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f8f8f8;
    
    .action_list {
      padding: 0 30rpx;
      
      .action_item {
        padding: 25rpx;
        background-color: #fff;
        margin: 30rpx 0;
        border-radius: 20rpx;
      }
    }
  }
</style>