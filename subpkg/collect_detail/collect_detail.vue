<template>
  <view>
    <my-actions :articleList="collect_list"></my-actions>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        collect_list: []
      };
    },
    onLoad() {
      this.getCollectList()
    },
    methods: {
      async getCollectList(){
        const { data: res } = await uni.$http.get('/api/collect/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.collect_list = res.data
      }
    }
  }
</script>

<style lang="scss">

</style>
