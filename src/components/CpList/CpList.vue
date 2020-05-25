<template>
  <div class="list" :style="{borderBottom: `1px solid ${borderBottom}`}" @click="itemClick">
    <img class="icon" :src="thumb" alt="">
    <div class="title">{{title}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: {
    thumb: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    right: {
      type: Boolean,
      default: true
    },
    borderBottom: {
      type: String,
      default: '#2C303E'
    },
    link: String
  },
  methods: {
    itemClick(){
      this.$router.push(this.link)
    }
  }
}
</script>

<style scoped>
.list{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 1.3513513513513513rem;
  margin: 0 0.35135135135135137rem;
  font-size: 0.3783783783783784rem;
}
.icon{
  width: 0.35135135135135137rem;
  height: 0.35135135135135137rem;
  margin-right: 0.2702702702702703rem;
}
.title{
  flex: 1;
}
.right{
  width: 0.21621621621621623rem;
  height: 0.2972972972972973rem;
  background: no-repeat url('../../assets/img/profile/icon_xiayiye@2x.png') center/cover;
}
</style>