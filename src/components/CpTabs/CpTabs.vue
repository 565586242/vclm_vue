<template>
  <div class="tabs">
    <div v-for="(item,index) in tabs" :key="index" @click="tabClick(index)" :style="getFontColor(index)">
      {{item}}
      <span class="tabs-item-bottom" v-show="current == index"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: ['选项卡1','选项卡2']
    },
    current: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getFontColor(index){
      return this.current == index ? {color:'#fff'} : {color:'#C0C0CF'}
    },
    tabClick(index){
      if(this.current != index){
        this.$emit('tabClick',index)
      }
    }
  }
}
</script>

<style scoped>
.tabs{
  display: flex;
  height: 33px;
  font-size: 14px;
  text-align: center;
  line-height: 33px;
}
.tabs > div{
  position: relative;
  flex: 1;
}
.tabs-item-bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  width: 40px;
  background-color: #fff;
  margin: auto;
}
</style>