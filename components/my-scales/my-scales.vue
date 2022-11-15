<template>
  <view class="scales-container">
    <view class="uni-list" v-for="(item, index) in scaleLists" :key="index">
      <view class="question">{{item.id}}. {{item.question}}</view>
      <radio-group name="radio" class="radioGroup">
        <label>
            <radio  value="radio1"/><text>{{item.options1}}</text>
        </label>
        <label>
            <radio  value="radio2"/><text>{{item.options2}}</text>
        </label>
        <label>
            <radio  value="radio3"/><text>{{item.options3}}</text>
        </label>
        <label>
            <radio  value="radio4"/><text>{{item.options4}}</text>
        </label>
        <label>
            <radio  value="radio5"/><text>{{item.options5}}</text>
        </label>
        <label v-if="item.options6 !== null">
            <radio  value="radio6"/><text>{{item.options6}}</text>
        </label>
      </radio-group>
    </view>
    <view class="completeTest">完成测试</view>
  </view>
</template>

<script>
  export default {
    name:"my-scales",
    data() {
      return {
        
      };
    },
    props: ['scaleLists']
  }
</script>

<style lang="scss">
  .uni-list {
    padding: 50rpx 50rpx 0;
    
    .question {
      
    }
    
    .radioGroup {
      display: flex;
      flex-direction: column;
      
      label {
        margin: 10rpx 0;
      }
    }
  }
  
  .completeTest {
    position: relative;
    // bottom: 50rpx;
    left: 0;
    transform: translateX(15%);
    width: 500rpx;
    height: 80rpx;
    background-color: #58c06f;
    color: #fff;
    text-align: center;
    line-height: 80rpx;
    border-radius: 30rpx;
    margin: 30rpx;
  }
</style>