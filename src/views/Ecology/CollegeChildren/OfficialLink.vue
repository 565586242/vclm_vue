<template>
  <div class="seePPT">
		<main-nav title="官方链接" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div v-for="(item,index) in resultData" :key="item.id">
      <p class="cp-title">官方链接{{index+1}}</p>
      <div class="link-list">
        <input type="text" disabled v-model="item.link">
        <button v-clipboard:copy="item.link"
          v-clipboard:success="onCopy">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schoollink} from '@/request/api'
import {Toast} from 'vant'
export default {
  name: 'PPT',
  data() {
    return {
      resultData: [],
    }
  },
  methods: {
    schoollink() {
      const _this = this
      schoollink()
        .then((result) => {
          _this.resultData = result.data
        })
    },
    onCopy(e) {
      Toast.success({
        message: '复制成功',
        duration: 1000
      })
    }
  },
  created() {
    this.schoollink()
  },
  components: {MainNav}
}
</script>

<style scoped>
  .link-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    background-color: #2C303E;
    margin: 0.2667rem 0.3467rem;
    border-radius: 0.0667rem;
  }
  .link-list input{
    flex: 1;
    width: 2.6667rem;
    background-color: transparent;
    height: 100%;
    border: none;
    border-top-left-radius: 0.0667rem;
    border-bottom-left-radius: 0.0667rem;
    font-size: 0.3733rem;
    text-indent: 0.2667rem;
  }
  .link-list button{
    width: 1.3333rem;
    height: 100%;
    padding: 0;
    background-color: #7288C8;
    border: none;
    border-top-right-radius: 0.0667rem;
    border-bottom-right-radius: 0.0667rem;
    text-align: center;
    font-size: 0.4rem;
    letter-spacing: 0.0667rem;
    text-indent: 0.0667rem;
  }

</style>