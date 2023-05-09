<template>
  <view class="function-container">
    <view class="function-list">
      <view class="function-item">
        <view class="title">·问诊</view>
        <text class="content">问诊功能是冠心病问诊小程序的核心功能之一，通过这个功能可以实现对症下药的医疗问诊服务。患者可以在问诊页面，通过选择现有标签，找到符合或匹配自己自身状况的标签，来判断冠心病的类型。给出的问诊结果会给出冠心病的类型、严重程度、治疗建议等信息。医生也可以借助该功能快速辅助判断患者的病情病因，基于患者症状描述以及治疗方案，提高工作的效率。医生在完成对用户的诊断之后，需要为用户生成诊断报告，该功能可以帮助医生快速生成标准的诊断报告，并将其保存到用户的病历记录中。</text>
      </view>
      <view class="function-item">
        <view class="title">·病历管理</view>
        <text class="content">用户在问诊过程中产生的病历需要进行管理，包括浏览等功能。用户可以通过病历管理功能方便地查看自己的病历记录，了解自己的健康状况，同时也可以与医生进行交流。病例中详细记录了用户历次的问诊记录，用户可以按照问诊的时间来查看对应一次的证候类型、临床表现、治法、方药、中成药等信息。</text>
      </view>
      <view class="function-item">
        <view class="title">·信息科普</view>
        <text class="content">用户可以在小程序的首页体验到信息科普的功能。该模块提供了冠心病的定义、病因、发病机制、症状、诊断方法和治疗方案等方面的科普知识，帮助用户更好地了解冠心病，并有助于早期预防和治疗。此外，还提供了一些健康提示，包括如何进行心脏保健、饮食健康、运动健身、生活方式等方面的建议，帮助用户控制冠心病的风险因素，改善生活方式。信息科普主要包含了视频科普、长图科普和文章科普三方面的科普内容。用户可以在视频科普中观看到专家对冠心病病因、症状、治疗等方面的讲解；长图科普中则详细说明了冠心病的来龙去脉；文章科普是信息科普的核心功能。在文章科普中，用户可以看到对于各种各样有关于冠心病文章的描述，其中，用户还可以对自己喜爱的文章进行点赞收藏的操作。</text>
      </view>
      <view class="function-item">
        <view class="title">·点赞收藏</view>
        <text class="content">点赞或收藏您喜欢的文章！</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  page,
  .function-container {
    background-color: #fff;
    
    .function-list {
      margin: 20rpx;
      padding: 0 10px;
      
      .function-item {
        padding: 20rpx 10rpx;
        margin: 20rpx 0;
        
        .title {
          font-weight: bold;
          font-size: 26px;
          margin-bottom: 5px;
        }
        .content {
          color: #333;
          line-height: 25px;
        }
        
      }
    }
  }
</style>
