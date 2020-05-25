<template>
  <div>
		<main-nav title="商学院" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="index-top">
      <video class="video-play" :src="videoUrl" controls="controls" poster="~assets/img/ecology/img_shangxuey@2x.png">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="cp-title">官方资料</div>
    <div class="video-div">
      <div class="video" @click="routerChildren('video')">
        <img src="~assets/img/ecology/icon_shiping@2x.png" mode />
        <div>视频</div>
      </div>
      <div class="video-right">
        <div class="ppt" @click="routerChildren('ppt')">
          <img src="~assets/img/ecology/icon_ppt@2x.png" mode />
          <div>PPT课件</div>
        </div>
        <div class="class" @click="routerChildren('airClass')">
          <img src="~assets/img/ecology/icon_ketang@2x.png" mode />
          <div>空中课堂</div>
        </div>
      </div>
    </div>
    <div class="unit-types">
      <div @click="schooltrailer">
        <img class="xuanchuan" src="~assets/img/ecology/icon_xuanchuan@2x.png" mode />
        <div>宣传片</div>
      </div>
      <div @click="routerChildren('advertisement')">
        <img class="guanggao" src="~assets/img/ecology/icon_guanggao@2x.png" mode />
        <div>宣传广告</div>
      </div>
      <div @click="routerChildren('officialLink')">
        <img class="link" src="~assets/img/ecology/icon_lianjie@2x.png" mode />
        <div>官方链接</div>
      </div>
      <div @click="routerChildren('displayBanner')">
        <img class="zhanfu" src="~assets/img/ecology/icon_zhanjian@2x.png" mode />
        <div>展架横幅</div>
      </div>
    </div>
    <div class="cp-title">发展动态</div>
    <div class="develop">
      <div>活动回顾 》</div>
      <div>活动预告 》</div>
    </div>

    <van-overlay :show="!!schooltrailerVideo" @click="schooltrailerVideo = false">
      <video class="schooltrailerVideo" :src="schooltrailerVideo" controls="controls"></video>
    </van-overlay>
  </div>
</template>

<script>
import {schoolindex,schooltrailer} from '@/request/api'
import MainNav from 'components/MainNav/MainNav'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      videoUrl: '',
      schooltrailerVideo: '' //宣传片
    }
  },
  methods: {
    schoolindex() {
      const _this = this
      schoolindex()
        .then((result) => {
          _this.videoUrl = imgHost.imgUrl + result.msg
        })
    },
    routerChildren(type) {
      this.$router.push('/collegeChildren/'+type)
    },
    schooltrailer() {
      const _this = this
      schooltrailer()
        .then((result) => {
          _this.schooltrailerVideo = imgHost.imgUrl + result.msg
        })
    }
  },
  created() {
    this.schoolindex()
  },
	components: {MainNav}
};


</script>

<style scoped>
.schooltrailerVideo{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  margin: auto;
}
.video-play{
  width: 100%;
  height: 100%;
}
.index-top {
  position: relative;
  width: 9.306666666666667rem;
  height: 4.8rem;
  margin: 0 auto;
}
.index-top img {
  width: 100%;
  height: 100%;
}
.index-top .stop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 1.04rem;
  height: 1.04rem;
  margin: auto;
}
.video-div {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  width: 9.306666666666667rem;
  height: 3.7333333333333334rem;
  margin: 0.13333333333333333rem auto;
}
.video {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4.4rem;
  height: 3.7333333333333334rem;
  background: rgba(44, 48, 62, 1);
  border-radius: 0.13333333333333333rem;
  box-shadow: 0 0 0.13333333333333333rem 0.06666666666666667rem
    rgba(44, 48, 62, 0.5);
  font-size: 0.37333333333333335rem;
}
.video img {
  width: 1.3066666666666666rem;
  height: 1.4533333333333334rem;
  margin-bottom: 0.4rem;
}
.video div {
  width: 0.9333333333333333rem;
  text-align-last: justify;
}
.video-right {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  width: 4.4rem;
  height: 100%;
}
.video-right > div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 4.4rem;
  height: 1.7333333333333334rem;
  background: rgba(44, 48, 62, 1);
  border-radius: 0.13333333333333333rem;
  box-shadow: 0 0 0.13333333333333333rem 0.06666666666666667rem
    rgba(44, 48, 62, 0.5);
  font-size: 0.37333333333333335rem;
}
.video-right .ppt img {
  width: 0.9066666666666666rem;
  height: 0.9066666666666666rem;
}
.video-right .class img {
  width: 0.8933333333333333rem;
  height: 0.7733333333333333rem;
}
/* 其他 */
.unit-types {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2.6666666666666665rem;
  width: 9.306666666666667rem;
  margin: 0.26666666666666666rem auto;
  background: rgba(44, 48, 62, 1);
  border-radius: 0.13333333333333333rem;
  box-shadow: 0 0 0.13333333333333333rem 0.06666666666666667rem
    rgba(44, 48, 62, 0.5);
}
.unit-types > div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 25%;
  text-align: center;
  font-size: 0.37333333333333335rem;
}
.unit-types img {
  margin-bottom: 0.26666666666666666rem;
}
.unit-types .zhanfu {
  width: 0.7466666666666667rem;
  height: 0.9866666666666667rem;
}
.unit-types .xuanchuan {
  width: 0.9066666666666666rem;
  height: 0.9066666666666666rem;
}
.unit-types .guanggao {
  width: 0.9333333333333333rem;
  height: 0.84rem;
}
.unit-types .link {
  width: 0.8533333333333334rem;
  height: 0.8533333333333334rem;
}
/* 发展动态 */
.develop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 9.306666666666667rem;
  height: 1.3333333333333333rem;
  margin: 0.26666666666666666rem auto 0;
  font-size: 0.37333333333333335rem;
  text-align: center;
  line-height: 1.3333333333333333rem;
}
.develop > div {
  width: 4.266666666666667rem;
  height: 1.3333333333333333rem;
  background-color: #2c303e;
  border-radius: 0.13333333333333333rem;
  box-shadow: 0 0 0.13333333333333333rem 0.06666666666666667rem
    rgba(44, 48, 62, 0.5);
}
</style>
