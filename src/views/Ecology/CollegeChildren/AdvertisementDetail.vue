<template>
  <div>
		<main-nav title="宣传广告详情" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="content">
      <div class="detail-title">{{resultData.title}}</div>
      <div class="detail-time">{{resultData.add_time}}</div>
      <div class="detail-content" v-html="resultData.content"></div>
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {schooladdetail} from '@/request/api'
export default {
  data() {
    return {
      resultData: ''
    }
  },
  methods: {
    schooladdetail(id) {
      const _this = this
      schooladdetail({id})
        .then((result) => {
          _this.resultData = result.data
        })
    }
  },
  created() {
    this.schooladdetail(this.$route.query.id)
  },
  components: {MainNav}
}
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