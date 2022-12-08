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
      
        <view class="tagView" v-for="(item1, index1) in syndromeList" :key="index1" v-if="item1.id === page">
          <uni-tag v-for="(item2, index2) in item1.elements" :key="index2" :inverted="true" :text="item2" type="primary" circle="true" ref="utag" @click="setInverted(index2)" />
        </view>
        
      <view class="btnBox">
        <button type="primary" class="btn" @click="btnHandlerPrevious" v-if="page !== 1">上一组</button>
        <button type="primary" class="btn" @click="btnHandlerNext" v-if="page !== 8">下一组</button>
        <button type="primary" class="btn" v-if="page === 8">完成</button>
      </view>
    </view>
    
  </view>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowPage: false,
        page: 1,
      };
    },
    computed: {
      ...mapGetters('m_syndromes', ['showSyndromeInLogic']),
      syndromeList: state => state.showSyndromeInLogic
    },
    onLoad() {
      this.$store.dispatch('m_syndromes/getSyndromes')
    },
    methods: {
      ...mapMutations('m_syndromes', ['updateSyndromes']),
      btnHandlerPrevious() {
        if(this.page != 1) this.page -= 1
      },
      btnHandlerNext() {
        if(this.page < 8) this.page += 1
      },
      setInverted(i) {
        this.$refs.utag[i].inverted = !this.$refs.utag[i].inverted
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
      .tagView {
        width: 80%;
        margin: 0 auto;
        uni-tag {
          display: inline-block;
          margin: 25rpx;
        }
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
