<template>
  <div class="cp-body">
    <main-nav :title="$t('title.notesDetail')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E"></main-nav>
    <div class="content">
      <div class="detail-title">{{resultData.new_title}}</div>
      <div class="detail-time">{{resultData.send_time}}</div>
      <div class="detail-content" v-html="resultData.new_content"></div>
    </div>
  </div>
</template>

<script>
import MainNav from "components/MainNav/MainNav";
import {newsdetails} from '@/request/api'
export default {
  data() {
    return {
      formData: {
        id: this.$route.params.id
      },
      resultData: {}
    }
  },
  methods: {
    newsdetails(){
      const _this = this 
      newsdetails(this.formData)
        .then((result) => {
          _this.resultData = result.data
        })
    }
  },
  created(){
    this.newsdetails()
  },
  components: { MainNav }
};
</script>

<style scoped>
.content{
  padding: 0.38666666666666666rem;
  color: #fff;
}
.detail-title {
  font-size: 0.4rem;
  line-height: 0.466667rem;
}
.detail-time {
  font-size: 0.26666666666666666rem;
  color: #c0c0cf;
  line-height: 0.86666667rem;
}
.detail-content {
  font-size: 0.3466666666666667rem;
  line-height: 0.6666666666666666rem;
}
.detail-content div {
  text-indent: 0.6666666666666666rem;
}
</style>
