<template>
  <div class="seePPT">
    <main-nav title="PPT课件" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="ppt" :style="pptStyle">
      <iframe class="ppt-frame" :src="pptSrc"></iframe>
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
export default {
  data() {
    return {
      pptSrc: ''
    }
  },
  methods: {
    fileSrc(src) {
      let fileSrc = encodeURIComponent(src).replace(/\./g, "%2E");
      this.pptSrc =  `https://view.officeapps.live.com/op/embed.aspx?src=${fileSrc}&amp;wdAr=1.3333333333333333`;
    }
  },
  computed: {
    pptStyle() {
      return { height: document.body.clientHeight - 65 + "px" };
    }
  },
  created() {
    this.fileSrc(localStorage.getItem('pptSrc'))
  },
  components: {MainNav}
};
</script>

<style scoped>
.seePPT {
  box-sizing: border-box;
  height: 100vh;
}
.ppt {
  width: 100%;
  height: 100%;
}
.ppt-frame {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>