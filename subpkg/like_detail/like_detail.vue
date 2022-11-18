<template>
  <view>
    <my-actions :articleList="like_list"></my-actions>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        like_list: []
      };
    },
    onLoad() {
      this.getLikeList()
    },
    methods: {
      async getLikeList(){
        const { data: res } = await uni.$http.get('/api/like/get')
        if(res.status !== 0) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.like_list = res.data
      }
    }
  }
</script>

<style lang="scss">
  
</style>
