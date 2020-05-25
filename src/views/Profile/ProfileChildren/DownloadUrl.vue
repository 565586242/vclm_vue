<template>
  <div class="cp-body">
    <main-nav :title="$t('title.downloadUrl')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E"></main-nav>
    <div class="app-logo"></div>
    <div class="download-div">
      <div class="ios-div">
        <div class="cp-title">IOS{{$t('profile.downAddress')}}:</div>
        <img class="qrcode" @click="show = true,downloadUrl = ios_address" :src="hostUrl + ios_address" />
      </div>
      <div class="anroid-div">
        <div class="cp-title">{{$t('profile.anroidDownAddress')}}:</div>
        <img class="qrcode" @click="show = true,downloadUrl = android_address" :src="hostUrl + android_address"/>
      </div>
    </div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {downloadAddress} from '@/request/api'
import hostUrl from 'assets/js/base'
import { Toast } from "vant"
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      android_address: '',
      ios_address: '',
      show: false,  //是否显示下载图片
      downloadUrl: '',  //保存图片地址
      actions: [
        { name: '保存图片' },
      ]
    };
  },
  methods: {
    downloadAddress(){
      const _this = this
      downloadAddress()
        .then((result) => {
          _this.android_address = result.data.android_address
          _this.ios_address = result.data.ios_address
        })
    },
    onSelect() {
      var that = this;
      if(!window.plus) return;
      plus.gallery.save(this.hostUrl + this.downloadUrl, function () {
        that.show = false;
        Toast({
          message: '保存成功!',
          duration: 1000
        })
      },function(){
        Toast({
          message: '保存失败，请重试!',
          duration: 1000
        })
      });
    }
  },
  created() {
    this.downloadAddress()
  },
  components: {MainNav}
};
</script>

<style scoped>
.app-logo {
  display: block;
  width: 4.986666666666666rem;
  height: 3.2rem;
  margin: 0.6266666666666667rem auto 0;
  background: no-repeat url("~assets/img/profile/login_logo@2x.png")
    center/cover;
}
.download-div {
  position: relative;
  width: 8rem;
  height: 10.64rem;
  margin: 0.8rem auto 0;
  background: no-repeat url("~assets/img/profile/img_xiazai_bg@2x.png")
    center/cover;
}
.ios-div {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  height: 5.2rem;
  padding: 0 0.26666666666666666rem;
}
.anroid-div {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  height: 5.2rem;
  width: 100%;
  padding: 0 0.26666666666666666rem;
}
.qrcode {
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 auto;
}
</style>
