<template>
  <div class="seePPT">
		<main-nav title="PPT课件" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="ppt-list" v-for="item in pptArr" :key="item.id" @click="seePPt(item.path)">
      <img src="~assets/img/ecology/img_02@2x.png" alt="">
      <div class="ppt-content">
        <h6>{{item.title}}</h6>
        <p>{{item.intro}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {schoolppt} from '@/request/api'
import MainNav from 'components/MainNav/MainNav'
import imgHost from 'assets/js/base'
export default {
  name: 'PPT',
  data() {
    return {
      pptArr: []
    }
  },
  methods: {
    seePPt(url) {
      localStorage.setItem('pptSrc',imgHost.imgUrl + url)
      this.$router.push('/collegeChildren/seePPt')
    },
    schoolppt() {
      const _this = this 
      schoolppt() 
        .then((result) => {
          _this.pptArr = result.data
        })
    }
  },
  created(){
    this.schoolppt()
    localStorage.removeItem('pptSrc')
  },
  components: {MainNav}
}
</script>

<style scoped>
  .ppt-list{
    display: flex;
    align-items: center;
    height: 1.8667rem;
    box-sizing: border-box;
    padding: 0.32rem;
    background-color: rgb(44, 48, 62);
    border-radius: 0.1333rem;
    margin: 0.2933rem 0.3467rem 0;
  }
  .ppt-list img{
    width: 1.28rem;
    height: 1.2267rem;
    margin-right: 0.2667rem;
  }
  .ppt-list div{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
  .ppt-content h6{
    width: 7rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.4rem;
    font-weight: normal;
  }
  .ppt-content p{
    width: 7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.2933rem;
  }
</style>