<template>
  <div id="app">
    <router-view />
    <main-tab-bar v-if="showMainBar"></main-tab-bar>
  </div>
</template>


<script>
import MainTabBar from 'components/MainTabBar/MainTabBar'
//显示底部导航
const showMainBar = {
  '/home': true,
  '/quotes': true,
  '/ecology': true,
  '/notes': true,
  '/profile': true
}

export default {
  name: 'App',
  computed: {
    showMainBar(){
      return showMainBar[this.$route.path] || false
    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import url('./assets/css/base.css');
  #app{
    width: 100%;
    height: 100%;
  }
  [v-cloak]{
    display: none;
  }
  .van-toast{
    color: #000 !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }
  /* 下拉选择框 */
  .van-picker{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  /* 密码输入框 */
  .van-password-input{
    position: fixed;
    bottom: 300px;
    left: 0;
    right: 0;
  }
  .van-number-keyboard__sidebar{
    height: 227px;
  }
  .van-key--big{
    height: 113.5px;
  }
  .van-overlay{
    z-index: 1000 !important;
  }
  /*  更改支付颜色主题 */
  #app >>> .van-number-keyboard__body{
    display: flex;
    justify-content: space-between;
  }
  .van-password-input__security i{
    background-color: #fff;
  }
  .van-password-input__security li{
    background-color: #000;
  }
  .van-number-keyboard{
    background-color: #000;
  }
  .van-number-keyboard .van-key{
    background-color: #000;
  }
</style>
