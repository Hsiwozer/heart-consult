<template>
  <view class="knowledge-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item>
        <view class="swiper-item">
          <image src="../../static/banner/banner1.png"></image>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <image src="../../static/banner/banner2.png"></image>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <image src="../../static/banner/banner3.png"></image>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 热门推荐区域 -->
    <view class="hotcommand">
      <!-- 标题 -->
      <text>热门推荐</text>
      <!-- 热门推荐 -->
      <view class="command">
        <!-- 视频学习区域 -->
        <view class="command-item" @click="gotoVideoList">
          <image src="../../static/hotcommand/command1.png"></image>
        </view>
        <!-- 长图学习区域 -->
        <view class="command-item"  @click="gotoLongPic">
          <image src="../../static/hotcommand/command2.png"></image>
        </view>
      </view>
    </view>
    
    <!-- 知识广场区域 -->
    <view class="square">
      <!-- 标题 -->
      <text>知识广场</text>
      <!-- 知识卡片 -->
      <view class="know_card">
        <view class="know_item" v-for="(item, index) in knowledgeList" :key="index" @click="gotoKnowledgeDetail(item.id)">
          <view class="ask">{{item.question}}</view>
          <view class="answer">{{item.answer}}</view>
          <my-interaction></my-interaction>
        </view>
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
      ...mapState('m_knowledge', ['knowledgeList'])
    },
    // computed: {
    //   knowledgeList: {
    //     get() {
    //       return this.$store.knowledgeList
    //     },
    //     set(){}
    //   }
    // },
    onLoad() {
      this.getKnowledgeList()
    },
    methods: {
      ...mapMutations('m_knowledge', ['updateKnowledgeList']),
      gotoVideoList() {
        uni.navigateTo({
          url: '/subpkg/video_list/video_list'
        })
      },
      gotoLongPic() {
        uni.navigateTo({
          url: '/subpkg/longpic_detail/longpic_detail'
        })
      },
      gotoKnowledgeDetail(id){
        uni.navigateTo({
          url: `/subpkg/knowledge_detail/knowledge_detail?id=${id}`
        })
      },
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
        this.updateKnowledgeList(res.data.message)
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
  }
</script>

<style lang="scss">
  .knowledge-container {
    padding-bottom: 5px;
    background-color: #f8f8f8;
  }
  
  .swiper-item {
    height: 330rpx;
    
    image {
      width: 100%;
      height: 100%;
    }
  }
  
  .hotcommand{
    margin-top: 15px;
    padding: 0 10px;
    
    text {
      font-size: 40rpx;
      font-weight: bold;
    }
    
    .command {
      display: flex;
      justify-content: space-between;
      height: 180rpx;
      margin-top: 10px;
      
      .command-item {
        width: 48%;
        background-color: pink;
        border-radius: 8px;
        overflow: hidden;
        
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
  .square {
    margin-top: 15px;
    padding: 0 10px;
    
    text {
      font-size: 40rpx;
      font-weight: bold;
    }
    
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
    
    .morecard {
      height: 80rpx;
      background-color: #60ba77;
      border-radius: 20px;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
    }
  }
</style>
