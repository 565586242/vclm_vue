<template>
  <div class="tab-item" @click="itemClick()">
    <img class="item-img" :src="imgUrl" />
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.link)
    }
  }
};
</script>

<style scoped>
.tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.493333333333333rem;
  height: 1.8666666666666667rem;
}
.item-img {
  width: 0.6666666666666666rem;
  height: 0.6666666666666666rem;
  margin: 0.13333333333333333rem auto;
  object-fit: contain;
}
.text {
  text-align: center;
  color: #fff;
  font-size: 0.29333333333333333rem;
}
</style>
