<template>
  <div class="invite">
    <main-nav :title="$t('title.inviteFriends')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <swiper class="swiper" ref="mySwiper">
      <swiper-slide>
        <div class="swiper-item" @click="saveImage(1)" ref="save1">
          <img src="~assets/img/profile/img_yaoqing_01@2x.png" alt="">
					<img class="qrcode" :src="hostUrl + invitation_img">
          <p>{{invitation_code}}</p>
				</div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item" @click="saveImage(2)" ref="save2">
          <img src="~assets/img/profile/img_yaoqing_02@2x.png" alt="">
					<img class="qrcode" :src="hostUrl + invitation_img">
          <p>{{invitation_code}}</p>
				</div>
      </swiper-slide>
    </swiper>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="savePicture"
    />
  </div>
</template>

<script>
import html2canvas from "html2canvas"
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import MainNav from "@/components/MainNav/MainNav";
import {homeinvite,savePicture} from '@/request/api'
import hostUrl from 'assets/js/base'
import { Toast } from "vant"
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      invitation_code: '',
      invitation_img: '',
      show: false,
      activeIndex: 0,
      actions: [
        { name: '保存图片' },
      ]
    };
  },
  computed: {
    qrcodeImage() {
      var qrcode_img = this.hostUrl + this.invitation_img;
      this.getBase64(qrcode_img);
    }
  },
  methods: {
    homeinvite() {
      const _this = this
      homeinvite()
        .then((result) => {
          _this.invitation_code = result.data.invitation_code
          _this.invitation_img = result.data.invitation_img
        })
    },
    saveImage(index){
      this.activeIndex = index;
      this.show = true;
    },
    savePicture() {
      let that = this;
      savePicture({
        "type": that.activeIndex
      })
        .then( result => {
          var imgUrl = that.hostUrl + result["msg"];
          console.log(imgUrl);
          
          if(!window.plus) return;
          plus.gallery.save(imgUrl, function () {
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
        })
    },
  },
  created() {
    this.homeinvite();
  },
  components: { MainNav, swiper, swiperSlide }
};
</script>

<style scoped>
.swiper{
  height: 15.4667rem;
  margin: 0.2667rem auto;
}
.swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-item{
  height: 15.4667rem;
  margin: 0 0.2667rem;
}
.swiper-item img{
  width: 100%;
  height: 100%;
}
.swiper-item .qrcode{
  position: absolute;
  bottom: 0.4rem;
  right: 0.32rem;
  width: 2.5867rem;
  height: 2.5867rem;
}
.swiper-item p{
  position: absolute;
  right: 0;
  bottom: .1rem;
  width: 2.5867rem;
  padding: 0 0.2667rem;
  color: #000;
  font-size: 0.32rem;
  text-align: center;
}
</style>