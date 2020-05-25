<template>
  <div class="cp-body">
    <div class="earth-div" :style="{'background-image':'url('+zixunPng+')'}">
      <div class="earth-message">
        <img src="~assets/img/notes/earth.gif" class="earth" />
        <div>
          <div>{{$t('notes.globalNode')}}</div>
          <div>{{global}}个</div>
        </div>
      </div>
      <div class="earth-detail">
        <swiper class="swiper" :options="swiperOption" v-if="countrys.length > 0">
          <swiper-slide class="swiper-item" v-for="(item,index) in countrys" :key="index">
            <div>
              <p>{{item.country}}</p>
              <p>{{item.node}}个</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <router-link class="message-list" :to="'/notesDetail/'+ item.id" v-for="(item,index) in news" :key="index">
      <div>
        <div class="message-title">{{item.new_title}}</div>
        <div class="message-time">{{item.send_time}}</div>
      </div>
      <img class="message-img" v-lazy="hostUrl + item.new_cover" mode />
    </router-link>
  </div>
</template>

<script>
import img_zixun_bg from 'assets/img/notes/img_zixun_bg@2x.png';
import {homenews} from '@/request/api'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import hostUrl from 'assets/js/base'
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      zixunPng: img_zixun_bg,
      countrys: [],
      global: 0,
      news: [],
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true,
        on: {
          setTranslate: function () {
            var slides = this.slides
            for(let i = 0; i< slides.length; i++){
              var slide = slides[i]
              var progress = slides[i].progress
              //初始化样式
              slide.style.opacity = ''
              slide.style.background = ''
              slide.style.transform = ''
              //设置样式
              slide.style.opacity = 1 - Math.abs(progress) / 3
              var height = 2.5 + Math.abs(progress) * -1
              slide.style.transform = 'translateY('+ height+'rem) rotate(' + progress * 60 + 'deg)'
            }
          }
        }
      }
    };
  },
  methods: {
    homenews(){
      const _this = this
      homenews()
        .then( res => {
          _this.countrys = res.data.countrys
          _this.global = res.data.global
          _this.news = res.data.news
        })
    }
  },
  created(){
    this.homenews()
  },
  components: { swiper, swiperSlide }
};
</script>

<style scoped>
.earth-div {
  position: relative;
  width: 100%;
  height: 7.2rem;
  background: no-repeat center/cover;
}
.earth-message {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.8rem;
  width: 6.666666666666667rem;
  height: 5.493333333333333rem;
  margin: auto;
}
.earth-message .earth {
  width: 100%;
  height: 100%;
}
.earth-message > div {
  position: absolute;
  text-align: center;
  font-size: 0.3466666666666667rem;
  color: #fff;
  line-height: 0.6933333333333334rem;
}
.earth-message > div div:first-child {
  display: inline-block;
  border-bottom: 0.013333333333333334rem solid #fff;
}
.swiper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 6.6rem;
  height: 6.6rem;
  border-radius: 50%;
  margin: auto;
}
.swiper-item{
  height: 1rem;
  margin-top: 3rem;
  line-height: .5rem;
}
.earth-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 7.2rem;
  margin: 0 auto;
  color: #fff;
  font-size: 0.26666666666666666rem;
  text-align: center;
}
/* 新闻 */
.message-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 2.1333333333333333rem;
  padding: 0.38666666666666666rem 0.3466666666666667rem 0.25333333333333335rem;
  border-bottom: 1px solid #2C303E;
}
.message-img {
  width: 2.6666666666666665rem;
  height: 1.3333333333333333rem;
}
.message-list > div:first-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  padding-right: .4rem;
}
.message-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.32rem;
  color: #fff;
}
.message-time {
  font-size: 0.26666666666666666rem;
  color: #c0c0cf;
}
</style>