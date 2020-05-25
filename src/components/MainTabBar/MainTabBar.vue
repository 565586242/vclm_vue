<template>
  <nav-bar>
    <bar-item link="/home">
      <img slot="icon" src="~assets/img/mainTabBar/tab_icon_shouye01@2x.png" alt="">
      <img slot="iconActive" src="~assets/img/mainTabBar/tab_icon_shouye02@2x.png" alt="">
      <p slot="text">首页</p>
    </bar-item>
    <bar-item link="/quotes">
      <img slot="icon" src="~assets/img/mainTabBar/tab_icon_hangqing01@2x.png" alt="">
      <img slot="iconActive" src="~assets/img/mainTabBar/tab_icon_hangqing02@2x.png" alt="">
      <p slot="text">行情</p>
    </bar-item>
    <bar-item link="/ecology" :center="true">
      <img slot="icon" src="~assets/img/mainTabBar/tab_icon_zidong@2x.png" alt="">
      <img slot="iconActive" src="~assets/img/mainTabBar/tab_icon_zidong@2x.png" alt="">
    </bar-item>
    <bar-item link="/notes">
      <img slot="icon" src="~assets/img/mainTabBar/tab_icon_zixun01@2x.png" alt="">
      <img slot="iconActive" src="~assets/img/mainTabBar/tab_icon_zixun02@2x.png" alt="">
      <p slot="text">资讯</p>
    </bar-item>
    <bar-item link="/profile">
      <img slot="icon" src="~assets/img/mainTabBar/tab_icon_my01@2x.png" alt="">
      <img slot="iconActive" src="~assets/img/mainTabBar/tab_icon_my02@2x.png" alt="">
      <p slot="text">我的</p>
    </bar-item>
  </nav-bar>
</template>

<script>
import NavBar from './NavBar'
import BarItem from './BarItem'
export default {
  components: {NavBar,BarItem}
}
</script>

<style scoped>

</style>