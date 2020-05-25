<template>
  <div class="seePPT">
		<main-nav title="空中课堂" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="air-list" v-for="(item,index) in audioArr" :key="item.id">
      <div>
        <p class="air-title">{{item.title}}</p>
        <div class="progress">
          <div class="do-progress" :style="{'width': item.audioNowTime/item.audioTime*100 + '%'}"></div>
        </div>
        <p class="air-time">
          <span class="fl">{{item.audioNowTime}}s</span>
          <span class="fr">{{parseInt(item.audioTime || 0)}}s</span>
          <span class="clear"></span>
        </p>
      </div>
      <img v-if="index != isPlayIndex" src="~assets/img/ecology/icon_zanting_01@2x.png" alt="" @click="play(index)">
      <img v-else src="~assets/img/ecology/icon_kaishi@2x.png" alt="" @click="notPlay(index)">
    </div>
    <audio id="myAudio" style="display:none" :src="playSrc"></audio>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schoolaudio} from '@/request/api'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      audioArr: [],
      isPlayIndex: -1,  //播放的链接
      playTime: 0,
      interval: '',
      playSrc: ''  //播放的链接
    }
  },  
  methods: {
    play(index) {
      const _this = this
      //清除之前的时间
      if(this.isPlayIndex != -1){
        let item = _this.audioArr[this.isPlayIndex]
        item.audioNowTime = 0
        this.audioArr.splice(this.isPlayIndex,1,item)
        clearInterval(this.interval)
      }
      //开始新的时间
      this.isPlayIndex = index
      this.playSrc = this.audioArr[index].audioSrc
      document.getElementById('myAudio').play()
      this.interval = setInterval(() => {
        let item = _this.audioArr[index]
        item.audioNowTime++
        if(item.audioNowTime >= item.audioTime){
          _this.isPlayIndex = -1
          item.audioNowTime = 0
        }
        _this.audioArr.splice(index,1,item)
      },1000)
    },
    notPlay(index) {
      const _this = this
      this.isPlayIndex = -1
      document.getElementById('myAudio').pause()
      clearInterval(this.interval)
    },
    getAudioTime(index,src) {
      const audioElement = new Audio(src);
      const _this = this
      audioElement.addEventListener("loadedmetadata", function (_event) {
        _this.$set(_this.audioArr[index],'audioTime',audioElement.duration)
      });
    },
    schoolaudio() {
      const _this = this
      schoolaudio()
        .then((result) => {
          _this.audioArr = result.data
          _this.audioArr.forEach( (val,index) => {
            _this.audioArr[index]['audioSrc'] = imgHost.imgUrl + val.path
            _this.audioArr[index]['audioNowTime'] = 0
            _this.getAudioTime(index,imgHost.imgUrl + val.path)
          } )
        })
    }
  },
  created(){
    this.schoolaudio()
  },
  components: {MainNav}
}
</script>

<style scoped>
  .air-list{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 1.8667rem;
    padding: 0.3733rem 0.4rem 0.2933rem;
    margin: 0.2667rem 0.3467rem 0;
    background-color: #2C303E;
  }
  .air-list > div{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
  .air-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 7rem;
    font-size: 0.4rem;
    color: #fff;
  }
  .air-time span{
    font-size: 0.2667rem;
    color: rgba(255, 255, 255, .5)
  }
  .progress{
    width: 100%;
    height: 0.08rem;
    border-radius: 0.08rem;
    background-color: rgba(255, 255, 255, .3);
  }
  .do-progress{
    width: 50%;
    height: 100%;
    background-color: #7288C8;
  }
  .air-list img{
    width: 0.7733rem;
    height: 0.7733rem;
    margin-left: 0.6667rem;
  }
</style>