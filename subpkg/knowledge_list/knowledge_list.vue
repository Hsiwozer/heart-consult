<template>
  <view class="knowledge_list_container">
    <view class="know_card">
      <view class="know_item" v-for="(item, index) in knowledgeListWantadd" :key="index" @click="gotoKnowledgeDetail(item.id)">
        <view class="ask">{{item.question}}</view>
        <view class="answer">{{item.answer}}</view>
        <my-interaction :knowledge="item"></my-interaction>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        isLoading: false,
        // knowledgeList: []
      };
    },
    computed: {
      ...mapState('m_knowledge', ['knowledgeListWantadd'])
    },
    onLoad() {
      this.getKnowledgeList()
    },
    methods: {
      ...mapMutations('m_knowledge', ['updateKnowledgeListWantadd']),
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
        this.updateKnowledgeListWantadd(res.data.message)
        // this.updateKnowledgeList([...knowledgeList, ...res.data.message])
        // this.knowledgeList = [...this.knowledgeList, ...res.data.message]
      },
      gotoKnowledgeDetail(id) {
        uni.navigateTo({
          url: `/subpkg/knowledge_detail/knowledge_detail?id=${id}`
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
  page {
    background-color: #f8f8f8;
  }
  .knowledge_list_container {
    margin-top: 15px;
    padding: 0 10px;
    background-color: #f8f8f8;
    background-color: #f8f8f8;
    
   .know_card {
     margin-top: 10px;
     
     .know_item {
       height: 220rpx;
       background-color: #fff;
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
