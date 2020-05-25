<template>
  <div id="nav-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted() {
    
  }
}
</script>

<style scoped>
#nav-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  height: 49px;
  background-color: #21242F;
}
#nav-bar.shop{
  background-color: #f6f6f6;
}
</style>