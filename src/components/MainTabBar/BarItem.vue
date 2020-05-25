<template>
  <div id="bar-item" :class="isCenter" @click="barClick">
    <slot v-if="isActive" name="icon"></slot>
    <slot v-else name="iconActive"></slot>
    <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      required: false
    },
    link: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    isCenter(){
      return this.center ? 'is-center' : ''
    },
    isActive(){
      return this.$route.path.indexOf(this.link)
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    barClick(){
      if(this.$route.path != this.link){
        this.$router.replace(this.link)
      }
    }
  }
}
</script>

<style scoped>
#bar-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #fff;
}
#bar-item img{
  height: 30px;
  vertical-align: middle;
}
#bar-item img.shop{
  height: 40px;
}
#bar-item.is-center{
  flex: inherit;
  position: relative;
  bottom: 19px;
  width: 68px;
  height: 68px;
}
#bar-item.is-center img{
  width: 100%;
  height: 100%;
}
</style>