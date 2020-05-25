<template>
  <div id="main-nav" :style="{backgroundColor:bgColor,borderBottom:`1px solid ${borderBottom}`}">
    <div class="left" @click="backClick()">
      <div class="back-icon" v-show="backShow"></div>
    </div>
    <div class="title" :style="{color:fontColor}">{{title}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    fontColor: {
      type: String,
      default: '#000'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    backShow: {
      type: Boolean,
      default: true
    },
    borderBottom: {
      type: String,
      default: 'none'
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  #main-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    left: 0;
    right: 0;
    height: 44px;
    padding: 20px 0 0;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
  }
  #main-nav .left,#main-nav .right{
    position: relative;
    width: 20px;
    height: 100%;
  }
  #main-nav .left{
    margin-left: 10px;
  }
  #main-nav .right{
    margin-right: 10px;
  }
  #main-nav .back-icon{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    margin: auto;
    background: no-repeat url('../../assets/img/icon_back_white.png') center/cover;
  }
  #main-nav .title{
    flex: 1;
  }
</style>