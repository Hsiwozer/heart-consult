<template>
  <view class="consult-container">
    <view class="startPage" v-if="isShowPage">
      <button type="primary" hover-class="button-hover" class="btnHandler">开始诊断</button>
    </view>
    
    <view class="consultPage" v-else>
      <uni-section title="温馨提示" type="line">
        <uni-card :is-shadow="false">
          <text class="uni-body">请在下列标中选择符合您现有病情的。</text>
        </uni-card>
      </uni-section>
      

      <view class="tagView" v-for="(item1, index1) in syndromeList" :key="index1" v-if="item1.id === page">
        <view class="tagItem" :class="isAcitveFn(item2)?'tagItem-active':''" :state="state" v-for="(item2, index2) in item1.elements" :key="index2" @click="stateChange(item2,item1)">{{item2}}</view>
      </view>
        
      <view class="btnBox">
        <button type="primary" class="btn" @click="btnHandlerPrevious" v-if="page !== 1">上一组</button>
        <button type="primary" class="btn" @click="btnHandlerNext" v-if="page !== 8">下一组</button>
        <button type="primary" class="btn" @click="commit" v-if="page === 8">提交并查看结果</button>
      </view>
    </view>
    
  </view>
</template>

<script>
  import { mapstate, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowPage: false,
        page: 1,
        selectedSyn: [],
        state: false
      };
    },
    computed: {
      ...mapGetters('m_syndromes', ['showSyndromeInLogic']),
      ...mapGetters('m_result', ['showResult']),
      syndromeList: state => state.showSyndromeInLogic,
    },
    onLoad() {
      this.$store.dispatch('m_syndromes/getSyndromes')
      this.$store.dispatch('m_result/getOrigin')
    },
    methods: {
      ...mapMutations('m_syndromes', ['updateSyndromes']),
      ...mapMutations('m_result', ['updateExistSyn']),
      btnHandlerPrevious() {
        if(this.page != 1) this.page -= 1
      },
      btnHandlerNext() {
        if(this.page < 8) this.page += 1
      },
      stateChange(item2, item1) {
        let isCheck = false
        let hasIndex = 0
        this.selectedSyn.forEach((el, index) => {
          if (el === item2) {
            isCheck = true
            hasIndex = index
          }
        })
        if (isCheck) {
          this.selectedSyn.splice(hasIndex, 1)
        } else {
          this.selectedSyn.unshift(item2)
        }
      },
      isAcitveFn(item2) {
        let flag = false
        this.selectedSyn.forEach(el => {
          if (item2 === el) {
            flag = true
          }
        })
        return flag
      },
      commit() {
        this.updateExistSyn(this.selectedSyn)
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  .tagItem {
    display: inline-block;
    border: 1px solid gray;
    border-radius: 50rpx;
    margin: 25rpx;
    padding: 10rpx 20rpx;
    font-size: 14px;
    font-weight: 400;
    color: gray;
  }
  .tagItem-active {
    display: inline-block;
    border: 1px solid #49a3f8;
    border-radius: 50rpx;
    margin: 25rpx;
    padding: 10rpx 20rpx;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    background-color: #49a3f8;
  }
  .consult-container {
    .startPage {}
    .consultPage {
      .tagView {
        width: 80%;
        margin: 0 auto;
        
      }
      .btnBox {
        width: 50%;
        position: fixed;
        bottom: 100rpx;
        left: calc(50%);
        transform: translateX(-50%);
        
        .btn {
          width: 100%;
          height: 48px;
          background: rgb(0,163,255);
          background: linear-gradient(90deg, rgba(0,165,255,1) 30%, rgba(0,105,255,1) 100%);
          border-radius: 10px;
          margin: 10px auto;
        }
      }
      
    }
  }
</style>
