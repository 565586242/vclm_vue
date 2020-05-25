<template>
  <div class="seePPT">
		<main-nav title="展架横幅" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="banner">
      <img :style="{'opacity': item.path?1:0 }" :src="item.path | imgUrl" v-for="item in resultData" :key="item.id">
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schoolposter} from '@/request/api'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      resultData: []
    }
  },
  methods: {
    schoolposter() {
      const _this = this
      schoolposter()
        .then((result) => {
          _this.resultData = result.data
          if(result.data.length % 3 != 0){
            for (let index = 0; index < 3 - (result.data.length % 3); index++) {
              _this.resultData.push({});
            }
          }
        })
    }
  },
  filters: {
    imgUrl(val) {
      if(val){
        return imgHost.imgUrl + val
      }else{
        return null
      }
      
    }
  },
  created() {
    this.schoolposter()
  },
  components: {MainNav}
}
</script>

<style scoped>
  .banner{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.3467rem 0.2667rem;
  }
  .banner img{
    width: 32%;
    height: 4rem;
    margin-bottom: 0.2667rem;
    object-fit: contain;
  }
</style>