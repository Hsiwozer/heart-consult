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
      
      <view class="tagGroup" v-if="isShowGroup">
        <view class="tag-view" v-for="(item, index) in syndromes" :key="index">
          <uni-tag :inverted="true" :text="item.element" type="primary" circle />
        </view>
      </view>
      
      <button type="primary" hover-class="button-hover" class="btnHandler">下一组</button>
    </view>
    
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowPage: false,
        isShowGroup: true,
      };
    },
    onLoad() {
      this.getSyndromes()
    },
    computed: {
      ...mapState('m_syndromes', ['syndromes']),
      ...mapGetters('m_syndromes', ['showMainSyndrome']),
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
        padding: 20rpx;
        
        .tag-view {
          display: inline-block;
          margin: 30rpx;
        }
      }
      
      .btnHandler {
        width: 50%;
        transform: translateY(400rpx);
      }
    }
  }
</style>
