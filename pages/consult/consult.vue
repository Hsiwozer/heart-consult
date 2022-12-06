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
      
        <div class="tagView" v-for="(item1, index1) in syndromeList" :key="index1" v-if="item1.id === page">
          <uni-tag v-for="(item2, index2) in item1.elements" :key="index2" inverted="true" :text="item2" type="primary" circle="true" ref="utag" @click.stop="changeStatus(index2)" />
        </div>

      <button type="primary" class="btn" @click="btnHandler">下一组</button>
    </view>
    
  </view>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowPage: false,
        page: 1
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
      btnHandler() {
        if(this.page < 8) this.page += 1
      },
      changeStatus(index) {
        this.$refs.utag[index].inverted = !this.$refs.utag[index].inverted
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
      .tagView {
        width: 80%;
        margin: 0 auto;
        uni-tag {
          display: inline-block;
          margin: 25rpx;
        }
      }
      
      .btn {
        width: 50%;
        height: 48px;
        background: rgb(0,163,255);
        background: linear-gradient(90deg, rgba(0,165,255,1) 30%, rgba(0,105,255,1) 100%);
        border-radius: 10px;
        margin: 0 auto;
        position: fixed;
        bottom: 100rpx;
        left: calc(50%);
        transform: translateX(-50%);
      }
    }
  }
</style>
