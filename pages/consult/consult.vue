<template>
  <view class="consult-container">
    <view class="startPage" v-if="isShow">
      <view class="explainWord">这是一个小测试，请尽量在5分钟之内完成。</view>
      <view class="startBtn" @click="stratTestHandler">开始测试</view>
    </view>
    <view class="testPage" v-else>
      <form @submit="formSubmit" @reset="formReset">
      		<view class="basicInfo" v-if="!showScales">
            <view class="title">姓名</view>
            <view class="nameInp">
              <input v-if="isText" type="text" placeholder="请输入您的姓名" />
              <input v-else  type="text"  placeholder="请输入您的姓名" />
            </view>
            <view class="title">性别</view>
            <radio-group name="radio" class="sexInp">
              <label>
                <radio value="radio1" /><text>男</text>
              </label>
              <label>
                <radio value="radio2" /><text>女</text>
              </label>
            </radio-group>
            <view class="title">年龄</view>
            <view class="ageInp">
              <input v-if="isText" type="text" placeholder="请输入您的年龄" />
              <input v-else  type="text"  placeholder="请输入您的年龄" />
            </view>
            <view class="nextPage" @click="showScalesHandler">继续测试</view>
          </view>
          
          <my-scales :scaleLists="scales_list" v-else></my-scales>
      </form>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true,
        showScales: false,
        scales_list: []
      };
    },
    onLoad() {
      this.getScalesList()
    },
    methods: {
      stratTestHandler() {
        this.isShow = !this.isShow
      },
      showScalesHandler() {
        this.showScales = !this.showScales
      },
      async getScalesList() {
        const { data: res } = await uni.$http.get('/api/scales/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.scales_list = res.data
      },
    }
  }
</script>

<style lang="scss">
  page,
  .consult-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
  }
  .startPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .explainWord {
      
    }
    
    .startBtn {
      width: 300rpx;
      height: 80rpx;
      background-color: #58c06f;
      border-radius: 80rpx;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
      font-weight: bold;
      font-size: 36rpx;
      margin-top: 20px;
    }
  }
  
  .testPage {
    position: relative;
    width: 700rpx;
    height: 95%;
    background-color: #fff;
    border-radius: 60rpx;
    overflow-y: scroll;
    
    .basicInfo {
      padding: 50rpx;
      font-size: 30rpx;
      
      .title {
        // font-size: 26rpx;
        font-weight: bold;
        margin: 30rpx 0;
      }
      
      input {
        width: 90%;
        height: 60rpx;
        border: 1px solid #ccc;
        padding: 10rpx;
      }
      
      label {
        margin-right: 20rpx;
      }
      
    }
    
    .nextPage {
      position: absolute;
      bottom: 50rpx;
      left: 0;
      transform: translateX(20%);
      width: 500rpx;
      height: 80rpx;
      background-color: #58c06f;
      color: #fff;
      text-align: center;
      line-height: 80rpx;
      border-radius: 30rpx;
    }
  }
</style>
