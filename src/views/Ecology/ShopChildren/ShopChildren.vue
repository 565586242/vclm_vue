<template>
  <div id="shop">
    <router-view></router-view>
    <shop-tab-bar v-if="showMainBar"></shop-tab-bar>
  </div>
</template>

<script>
import ShopTabBar from 'components/MainTabBar/ShopTabBar'
//显示底部导航
const showMainBar = {
  '/shopChildren/shopIndex': true,
  '/shopChildren/shopCart': true,
  '/shopChildren/shopAddress': true,
  '/shopChildren/shopOrder': true
}

export default {
  data() {
    return {
      
    }
  },
  computed: {
    showMainBar(){
      return showMainBar[this.$route.path] || false
    }
  },
  components: {ShopTabBar}
}
</script>

<style>
#status-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
	height: 64px;
  background-color: rgba(255, 255, 255, 0.6);
}
.van-nav-bar{
  position: absolute;
  bottom: 0;
  width: 100%;
}
.nav-bar-left{
  height: 26px;
  vertical-align: middle;
}
.van-toast{
  background-color: rgba(0, 0, 0, 0.7) !important;
  color: #fff !important;
}
.van-dialog{
  color: #282828 !important;
}
</style>

<style scoped>
#shop{
  min-height: 100%;
  background-color: #f6f6f6;
}
</style>