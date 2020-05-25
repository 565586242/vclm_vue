<template>
  <div class="seePPT">
		<main-nav title="视频" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="video">
      <div class="list" v-for="item in videoArr" :key="item.id" @click="videoPlay(item.path)">
        <img v-if="item.cover_img" :src="imgHost + item.cover_img" alt="">
        <div v-else style="height: 2.5333rem;"></div>
        <h6>{{item.title}}</h6>
        <p>{{item.intro}}</p>
      </div>
    </div>
    <van-overlay :show="!!playSrc" @click="playSrc = false">
      <video class="video-play" :src="playSrc" controls="controls"></video>
    </van-overlay>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schoolvideo} from '@/request/api'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      imgHost: imgHost.imgUrl,
      videoArr: [],
      playSrc: '' //播放视频的链接
    }
  },
  methods: {
    videoPlay(path) {
      this.playSrc = imgHost.imgUrl + path
    },
    schoolvideo() {
      const _this = this
      schoolvideo()
        .then((result) => {
          _this.videoArr = result.data
        })
    }
  },
  created() {
    this.schoolvideo()
  },
  components: {MainNav}
}
</script>

<style scoped>
.video-play{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  margin: auto;
}
  .video{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.3467rem;
  }
  .list{
    box-sizing: border-box;
    width: 49%;
    height: 4rem;
    background-color: #2C303E;
    border-radius: 0.1333rem;
    box-shadow:0px 4px 12px 0px rgba(40,40,43,0.13);
  }
  .list img{
    width: 100%;
    height: 2.5333rem;
    object-fit: cover;
    vertical-align: middle;
  }
  .list h6{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.4rem;
    font-weight: normal;
    text-indent: 0.1333rem;
    line-height: .8rem;
  }
  .list p{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.2933rem;
    text-indent: 0.1333rem;
  }
</style>