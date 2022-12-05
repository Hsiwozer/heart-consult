<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      getUserProfile() {
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res) => {
            // console.log(res);
            this.updateUserInfo(res.userInfo)
            // uni.$showMsg('登录成功！');
            // console.log(res);
            this.getToken(res)
          },
          fail: (res) => {
            uni.$showMsg('登录授权失败！');
          }
        })
      },
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
      
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // console.log(query);
      
        // 换取 token
        const { data: loginResult } = await uni.$http.post('/api/users/wxlogin', query)
        // console.log(loginResult);
        if (loginResult.status !== 0) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功')
        this.updateToken(loginResult.token)
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;
  
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }
  
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background: rgb(88,192,125);
      background: linear-gradient(90deg, rgba(88,212,111,1) 30%, rgba(88,192,111,1) 100%);
    }
  
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>