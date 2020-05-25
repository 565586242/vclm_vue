<template>
  <div class="ecology" :style="{'background-image': 'url('+shengtaiBg+')'}">
    <main-nav :title="$t('title.ecology')" fontColor="#fff" bgColor="transparent" :backShow="false"></main-nav>
    <div class="zoology-content">
      <div class="zoology-content-img" :style="{'background-image': 'url('+shengtai+')'}">
        <router-link to="/shopChildren/shopIndex" class="shop"></router-link>
        <router-link to="/ecologyChildren/app" class="app"></router-link>
        <!-- <router-link to="/ecologyChildren/game" class="game"></router-link> -->
        <router-link to="/ecologyChildren/college" class="college"></router-link>
        <!-- <router-link to="/ecologyChildren/bigu" class="bigu"></router-link> -->
        <router-link to="/home" class="contract"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import shengtaiBg from "assets/img/ecology/img_shengtai_bg@2x.png";
import shengtai from 'assets/img/ecology/img_shengtai@2x.png';
import MainNav from 'components/MainNav/MainNav'
export default {
  data() {
    return {
      shengtaiBg: shengtaiBg,
      shengtai: shengtai
    };
  },
  components: {MainNav}
};
</script>

<style scoped>
.ecology{
  box-sizing: border-box;
  min-height: 100vh;
  background: no-repeat center/cover;
}
.zoology-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
}
.zoology-content-img{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 8.426666666666666rem;
  height: 9.666666666666666rem;
  margin: auto;
  background: no-repeat center/cover;
}
.shop {
  position: absolute;
  top: 0.32rem;
  right: 2.833333rem;
  width: 1.8666666666666667rem;
  height: 1.8666666666666667rem;
  border-radius: 50%;
}
.app {
  position: absolute;
  top: 2.826667rem;
  left: 0.266667rem;
  width: 1.7333333333333334rem;
  height: 1.7333333333333334rem;
  border-radius: 50%;
}
.game {
  position: absolute;
  top: 3.786667rem;
  right: 0.346667rem;
  width: 1.4266666666666667rem;
  height: 1.4266666666666667rem;
  border-radius: 50%;
}
.contract {
  position: absolute;
  top: 3.893333rem;
  right: 3.2rem;
  width: 2.1333333333333333rem;
  height: 2.1333333333333333rem;
  border-radius: 50%;
}
.bigu {
  position: absolute;
  bottom: 0.746667rem;
  left: 0.96rem;
  width: 1.6533333333333333rem;
  height: 1.6533333333333333rem;
  border-radius: 50%;
}
.college {
  position: absolute;
  bottom: 0.32rem;
  right: 1.366667rem;
  width: 2.066666666666667rem;
  height: 2.066666666666667rem;
  border-radius: 50%;
}
</style>