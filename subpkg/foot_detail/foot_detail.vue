<template>
  <view class="foot_detail_container">
    <my-actions :articleList="foot_list"></my-actions>
    <uni-icons type="trash" size="30" @click="clearAll"></uni-icons>
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
      },
      clearAll() {
        let that = this
        uni.showModal({
        		title: '提示',
        		content: '确认清空所有浏览记录吗？',
            confirmColor:'red',
        		success: function(res) {
        		if (res.confirm) {
              if (that.foot_list.length !== 0) {
                uni.$http.get('/api/foot/clear')
                that.foot_list = []
                uni.showToast({
                  title: '已全部清空',
                  icon: 'success',
                  duration: 2000
                })
              }else {
                uni.showToast({
                title: '浏览足迹为空！',
                icon: 'none',
                duration: 2000
              })
              }
        		}
        	}
        })
      },
    }
  }
</script>

<style lang="scss">
  .foot_detail_container {
    position: relative;
  }
  
  .uni-icons {
    position: fixed;
    bottom: 20px;
    right: 10px;
    border-radius: 30rpx;
    box-shadow: 2px 2px 5px #eee;
    padding: 10rpx;
  }
</style>
