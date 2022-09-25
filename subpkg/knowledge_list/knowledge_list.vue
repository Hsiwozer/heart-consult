<template>
  <view class="knowledge_list_container">
    <view class="know_card">
      <view class="know_item" v-for="(item, index) in knowledgeList" :key="index" @click="gotoKnowledgeDetail">
        <view class="ask">{{item.question}}</view>
        <view class="answer">{{item.answer}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        knowledgeList: []
      };
    },
    onLoad() {
      this.getKnowledgeList()
    },
    methods: {
      async getKnowledgeList(cb) {
        this.isloading = true
        const { data: res } = await uni.$http.get('/api/knowledge_list/get?pagenum=1&pagesize=6')
        this.isloading = false
        cb && cb()
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.knowledgeList = [...this.knowledgeList, ...res.data.message]
      },
      gotoKnowledgeDetail() {
        uni.navigateTo({
          url: '/subpkg/knowledge_detail/knowledge_detail'
        })
      }
    },
    onReachBottom() {
      if (this.isloading) return
      this.getKnowledgeList()
    },
    onPullDownRefresh() {
      this.isloading = false
      this.knowledgeList = []
      this.getKnowledgeList(() => {
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  .knowledge_list_container {
    margin-top: 15px;
    padding: 0 10px;
    
   .know_card {
     margin-top: 10px;
     
     .know_item {
       height: 220rpx;
       background-color: #e5fdf0;
       margin-bottom: 5px;
       padding: 15px;
       border-radius: 8px;
       
       .ask {
         font-size: 30rpx;
         font-weight: bold;
         margin-bottom: 10px;
       }
       
       .answer {
         font-size: 26rpx;
         color: #333;
         -webkit-line-clamp: 3;
         display: -webkit-box;
         -webkit-box-orient: vertical;
         overflow: hidden;
         text-overflow: ellipsis;
       }
     }
   } 
  }
</style>
