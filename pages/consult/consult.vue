<template>
  <view class="consult-container">
    <view class="startPage" v-if="isShowPage">
      <button type="primary" hover-class="button-hover" class="btnHandler">开始诊断</button>
    </view>
    
    <view class="consultPage" v-else>
      <uni-section title="温馨提示" type="line">
        <uni-card :is-shadow="false">
          <text class="uni-body">请在下列标中选择符合您现有病情的。（若出现重复标签也请确认后选中）</text>
        </uni-card>
      </uni-section>
      
      <view class="tagGroup">
        <uni-tag v-for="(item, index) in this.showSyndromeInLogic" :key="index" inverted="true" :text="item[0].mainSyn" type="primary" circle="true" />
      </view>

      <button type="primary" class="btn" @click="btnHandler">下一组</button>
    </view>
    
  </view>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowPage: false
      };
    },
    computed: {
      ...mapGetters('m_syndromes', ['showSyndromeInLogic']),
    },
    onLoad() {
      this.getSyndromes()
    },
    methods: {
      ...mapMutations('m_syndromes', ['updateSyndromes']),
      async getSyndromes() {
        const { data: res } = await uni.$http.get('/api/syndrome/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.updateSyndromes(res.data)
      },
      btnHandler() {
        console.log(this.showSyndromeInLogic);
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  .consult-container {
    .startPage {}
    .consultPage {
      .tagGroup {
        display: flex;
        flex-wrap: wrap;
        padding: 20rpx;
        uni-tag {
          margin: 20rpx;
        }
      }
      
      .btn {
        width: 50%;
        height: 48px;
        background: rgb(0,163,255);
        background: linear-gradient(90deg, rgba(0,165,255,1) 30%, rgba(0,105,255,1) 100%);
        border-radius: 10px;
        transform: translateY(400rpx);
      }
    }
  }
</style>
