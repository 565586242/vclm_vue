<template>
  <div class="cp-body">    
    <main-nav :title="$t('title.contactUs')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E"></main-nav>
    <div class="app-logo"></div>
    <div class="contact-div">
      <img :src="hostUrl + imgUrl" />
      <div class="contact-text">微信扫描二维码,获取联系方式</div>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import hostUrl from 'assets/js/base'
import {contactUs} from '@/request/api'
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      imgUrl: ''
    }
  },
  methods: {
    contactUs(){
      const _this = this
      contactUs()
        .then((result) => {
          _this.imgUrl = result.msg
        })
    }
  },
  created() {
    this.contactUs()
  },
  components:{MainNav}
};
</script>

<style scoped>
.app-logo {
  display: block;
  width: 4.986666666666666rem;
  height: 3.2rem;
  margin: 0.6266666666666667rem auto 0;
  background: no-repeat url('~assets/img/profile/login_logo@2x.png') center/cover;
}
.contact-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 9.6rem;
  margin: 0.8rem auto 0;
  background: no-repeat url('~assets/img/profile/img_lianxi_bg@2x.png') center/cover;
}
.contact-div img {
  width: 6.08rem;
  height: 6.08rem;
}
.contact-text {
  font-weight: 800;
  font-size: 0.4rem;
  line-height: 0.96rem;
}
</style>