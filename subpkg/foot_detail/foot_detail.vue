<template>
  <view>
    <my-actions :articleList="foot_list"></my-actions>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        foot_list: []
      };
    },
    onLoad() {
      this.getFootList()
    },
    methods: {
      async getFootList(){
        const { data: res } = await uni.$http.get('/api/foot/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.foot_list = res.data
      }
    }
  }
</script>

<style lang="scss">

</style>
