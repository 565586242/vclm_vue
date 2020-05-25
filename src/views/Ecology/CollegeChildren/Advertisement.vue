<template>
  <div class="seePPT">
		<main-nav title="宣传广告" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="air-list" v-for="item in list" :key="item.id" @click="$router.push('/collegeChildren/advertisementDetail?id='+item.id)">
      <div>
        <p class="air-title">{{item.title}}</p>
        <p>{{item.intro}}</p>
      </div>
      <img :src="item.cover_img | imgUrl" alt="">
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schoolads} from '@/request/api'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    schoolads() {
      const _this = this
      schoolads()
        .then((result) => {
          _this.list = result.data
        })
    }
  },
  filters: {
    imgUrl(val) {
      return imgHost.imgUrl + val
    }
  },
  created(){
    this.schoolads()
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
    padding: 0.1333rem 0.1333rem 0.1333rem 0.2667rem;
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
  .air-list p{
    width: 6.7rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.2933rem;
    color: rgba(255, 255, 255, .5)
  }
  .air-list .air-title{
    font-size: 0.4rem;
    color: #fff;
  }

  .air-list img{
    width: 2.4rem;
    height: 1.6rem;
    margin-left: 0.2667rem;
  }
</style>