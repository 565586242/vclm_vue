<template>
  <div class="seeRouter">
    <router-view v-if="hasPageObj[$route.path]"></router-view>
    <div v-else>
      <main-nav title="" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
      <div class="webview" :style="pptStyle">
        <iframe class="iframe" :src="$route.query.url"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
export default {
  data() {
    return {
      hasPageObj: {
        '/appChildren/huafei': true,
        '/appChildren/liuliang': true,
        '/appChildren/youka': true
      }
    }
  },
  computed: {
    pptStyle() {
      return { height: document.body.clientHeight - 65 + "px" };
    }
  },
  components: {MainNav}
}
</script>

<style scoped>
.seeRouter {
  box-sizing: border-box;
  min-height: 100vh;
}
.webview {
  width: 100%;
  height: 100%;
}
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>