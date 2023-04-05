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
          <!-- 点赞收藏状态显示模块 -->
          <my-interaction :intSC="[item.liked, item.collected]" :key="new Date().getTime()"></my-interaction>
          
          <view class="browser" v-if="item.footTime">{{item.footTime.slice(0,10)}} 浏览过</view>
          <view class="browser" v-else>未浏览</view>
        </view>
      </view>
    </view>
    
    
    <!-- 返回顶部按钮 -->
    <uni-icons type="top" size="30" class="backToTop" v-if="isShow" @click="goTop"></uni-icons>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isLoading: false,
        isShow:false,
      };
    },
    computed: {
      ...mapGetters('m_knowledge', ['showKnowledgeList']),
      knowledgeList: {
        get() {
          return this.showKnowledgeList
        },
        set(){}
      }
    },
    onLoad() {
      this.getKnowledgeList()
    },
    methods: {
      ...mapMutations('m_knowledge', ['updateKnowledgeList', 'clearKnowledgeList']),
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
        const dayjs = require("dayjs")
        let curDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        uni.$http.post(`/api/interaction/foot?id=${id}&footTime=${curDate}`)
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
        this.clearKnowledgeList()
        this.getKnowledgeList(() => {
          uni.stopPullDownRefresh()
        })
      },
      onPageScroll(e) {
        if (e.scrollTop >= 500) this.isShow = true
        else this.isShow = false
      },
      goTop() {
        uni.pageScrollTo({
        	scrollTop: 0,
        	duration: 300
        })
      }
    }
  }
</script>

<style lang="scss">
  .knowledge-container {
    height: 100%;
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
        position: relative;
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
        
        .browser {
          position: absolute;
          left: 15px;
          bottom: 15px;
          font-size: 12px;
          color: gray;
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
  
  .backToTop {
    position: fixed;
    bottom: 20px;
    right: 10px;
    border-radius: 30rpx;
    box-shadow: 2px 2px 5px #eee;
    padding: 10rpx;
  }
</style>
