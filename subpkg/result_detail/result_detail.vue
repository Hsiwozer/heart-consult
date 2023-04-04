<template>
  <view>
    <view class="result" v-for="(item1, index) in resultList" :key="index">
      <view class="result-title">{{item1.main}}</view>
      <view class="result-level" style="color: #fffe00" v-if="item1.score >= 8 && item1.score <= 13">轻度</view>
      <view class="result-level" style="color: #fd9b00" v-else-if="item1.score >= 14 && item1.score <= 19">中度</view>
      <view class="result-level" style="color: #db2522" v-else>重度</view>
      
      <view class="treatment-box" v-for="(item2, index) in treatmentList" :key="index" v-if="item1.main === item2.disease">
        <view class="treatment-detail">
          <view class="title">临床表现</view>
          <view class="content">{{item2.clinical}}</view>
        </view>
        <view class="treatment-detail">
          <view class="title">治法</view>
          <view class="content">{{item2.therapy}}</view>
        </view>
        <view class="treatment-detail">
          <view class="title">方药</view>
          <view class="content">{{item2.prescription}}</view>
        </view>
        <view class="treatment-detail">
          <view class="title">中成药</view>
          <view class="content">{{item2.medicine}}</view>
        </view>
      </view>
    </view>
    
    <view class="healthy" v-if="this.treatmentList.length === 0">您很健康！</view>
    <view class="btn" @click="goBack($event ,treatmentList)">知道了</view>
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        treatmentList: []
      }
    },
    beforeMount(){
      for (let i = 0; i < this.resultList.length; i++) {
        this.getTreatmentList(this.resultList[i].main)
      }
    },
    computed: {
      ...mapGetters('m_result', ['showResult']),
      resultList: state => state.showResult,
    },
    methods: {
      async getTreatmentList(disease) {
        const { data: res } = await uni.$http.get(`/api/treatment/get?disease=${disease}`)
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.treatmentList = [...this.treatmentList, ...res.data]
      },
      // 将问诊结果写入数据库，并返回consult主页面
      async goBack(e, treatment) {
        uni.switchTab({
          url: '/pages/consult/consult'
        })
        if (treatment.length === 0) return
        const dayjs = require("dayjs")
        let curDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        // console.log(treatment);
        for (let i = 0; i < treatment.length; i++) {
          const query = {
            disease: treatment[i].disease,
            clinical: treatment[i].clinical,
            therapy: treatment[i].therapy,
            prescription: treatment[i].prescription,
            medicine: treatment[i].medicine,
            time: curDate
          }
          const { data: res } = await uni.$http.post('/api/record', query)
          if(res.status !== 0) {
            return uni.showToast({
              title: '数据请求失败！',
              duration: 1500,
              icon: 'none'
            })
          }
        }
      }
    }
  }
</script>

<style  lang="scss">
  html, body {
    height: 100%;
  }
  
  .result-title {
    font-size: 88rpx;
    text-align: center;
    font-weight: 700;
    margin-top: 35rpx;
    color: #f5c060;
  }
  .result-level {
    font-size: 50rpx;
    text-align: right;
    font-weight: 500;
    margin-top: 15rpx;
    margin-right: 50rpx;
  }

  .btn {
    width: 144px;
    height: 48px;
    background: rgb(0,163,255);
    background: linear-gradient(90deg, rgba(0,165,255,1) 30%, rgba(0,105,255,1) 100%);
    border-radius: 10px;
    margin: 30px auto;
    color: #fff;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    line-height: 48px;
  }
</style>