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
        <view class="know_item">
          <view class="ask">冠状动脉粥样硬化性心脏病的饮食禁忌</view>
          <view class="answer">冠状动脉粥样硬化性心脏病，简称冠心病。建议患者应该避免大量进食高能量、高脂肪的食物，如肥肉、黄油、莜麦面、核桃等。大量进食油腻的食物，会增加血栓形成的风险，对冠心病患者有不好的影响。同时蛋白质的摄入也应该适量，不可过度的摄入，以免加重心脏的负担。此外，平时的饮食应该清淡，不建议大量进食生冷、辛辣刺激的食物，尤其是烈酒等。需要注意的是，饮食调理仅仅只是滨病治疗的一个环节，日常生活中如有不适建议积极就医咨询。医生会根据您的具体情况，制定恰当的治疗方案，同时给予您合理的饮食建议。</view>
        </view>
        <view class="know_item">
          <view class="ask">冠状动脉粥样硬化性心脏病的饮食禁忌</view>
          <view class="answer">冠状动脉粥样硬化性心脏病，简称冠心病。建议患者应该避免大量进食高能量、高脂肪的食物，如肥肉、黄油、莜麦面、核桃等。大量进食油腻的食物，会增加血栓形成的风险，对冠心病患者有不好的影响。同时蛋白质的摄入也应该适量，不可过度的摄入，以免加重心脏的负担。此外，平时的饮食应该清淡，不建议大量进食生冷、辛辣刺激的食物，尤其是烈酒等。需要注意的是，饮食调理仅仅只是滨病治疗的一个环节，日常生活中如有不适建议积极就医咨询。医生会根据您的具体情况，制定恰当的治疗方案，同时给予您合理的饮食建议。</view>
        </view>
        <view class="know_item">
          <view class="ask">冠状动脉粥样硬化性心脏病的饮食禁忌</view>
          <view class="answer">冠状动脉粥样硬化性心脏病，简称冠心病。建议患者应该避免大量进食高能量、高脂肪的食物，如肥肉、黄油、莜麦面、核桃等。大量进食油腻的食物，会增加血栓形成的风险，对冠心病患者有不好的影响。同时蛋白质的摄入也应该适量，不可过度的摄入，以免加重心脏的负担。此外，平时的饮食应该清淡，不建议大量进食生冷、辛辣刺激的食物，尤其是烈酒等。需要注意的是，饮食调理仅仅只是滨病治疗的一个环节，日常生活中如有不适建议积极就医咨询。医生会根据您的具体情况，制定恰当的治疗方案，同时给予您合理的饮食建议。</view>
        </view>
        <view class="know_item">
          <view class="ask">冠状动脉粥样硬化性心脏病的饮食禁忌</view>
          <view class="answer">冠状动脉粥样硬化性心脏病，简称冠心病。建议患者应该避免大量进食高能量、高脂肪的食物，如肥肉、黄油、莜麦面、核桃等。大量进食油腻的食物，会增加血栓形成的风险，对冠心病患者有不好的影响。同时蛋白质的摄入也应该适量，不可过度的摄入，以免加重心脏的负担。此外，平时的饮食应该清淡，不建议大量进食生冷、辛辣刺激的食物，尤其是烈酒等。需要注意的是，饮食调理仅仅只是滨病治疗的一个环节，日常生活中如有不适建议积极就医咨询。医生会根据您的具体情况，制定恰当的治疗方案，同时给予您合理的饮食建议。</view>
        </view>
      </view>
      <!-- 查看更多知识卡片按钮 -->
      <view class="morecard" @click="gotoKnowledgeList">查看更多</view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        videoList: []
      };
    },
    onLoad() {
      this.getVideoList()
    },
    methods: {
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
      gotoKnowledgeList() {
        uni.navigateTo({
          url: '/subpkg/knowledge_list/knowledge_list'
        })
      },
      async getVideoList() {
        const {data: res} = await uni.request({
          url: 'http://localhost:8080/api/video_list/get'
        })
        this.videoList = res.data
        console.log(videoList);
      }
    }
  }
</script>

<style lang="scss">
  .knowledge-container {
    padding-bottom: 5px;
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
    
    .morecard {
      height: 80rpx;
      background-color: pink;
      border-radius: 20px;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
    }
  }
</style>
