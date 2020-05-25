<template>
  <nav-bar class="shop">
    <bar-item link="/shopChildren/shopIndex">
      <img class="shop" slot="icon" src="~assets/img/shop/tab_icon_shouye01@2x.png" alt="">
      <img class="shop" slot="iconActive" src="~assets/img/shop/tab_icon_shouye02@2x.png" alt="">
    </bar-item>
    <bar-item link="/shopChildren/shopCart">
      <img class="shop" slot="icon" src="~assets/img/shop/tab_icon_gouwuche01@2x.png" alt="">
      <img class="shop" slot="iconActive" src="~assets/img/shop/tab_icon_fenlei02@2x.png" alt="">
    </bar-item>
    <bar-item link="/shopChildren/shopAddress">
      <img class="shop" slot="icon" src="~assets/img/shop/tab_icon_dizi01@2x.png" alt="">
      <img class="shop" slot="iconActive" src="~assets/img/shop/tab_icon_tuandui02@2x.png" alt="">
    </bar-item>
    <bar-item link="/shopChildren/shopOrder">
      <img class="shop" slot="icon" src="~assets/img/shop/tab_icon_dingdan01@2x.png" alt="">
      <img class="shop" slot="iconActive" src="~assets/img/shop/tab_icon_my02@2x.png" alt="">
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