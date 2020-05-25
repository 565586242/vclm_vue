<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <img src="~assets/img/shop/banner@2x.png">
      </swiper-slide>
    </swiper>
    <van-nav-bar :border="false" @click-left="locationBack">
      <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui@2x.png" />
      <van-search slot="title" v-model="search" placeholder="请输入搜索关键词" show-action shape="round">
        <div slot="action" @click="shopindex(category_id,search)">搜索</div>
      </van-search>
    </van-nav-bar>
    <swiper class="swiper-type" :options="swiperOptionType">
      <swiper-slide v-for="item in goodsCategory" :key="item.id">
        <div :class="{'type-active': item.id == category_id}" @click="shopindex(item.id,search)">{{item.name}}</div>
      </swiper-slide>
    </swiper>
    <ul class="shop-div"> 
      <li class="list" v-for="item in goodsList" :key="item.id" @click="$router.push('/shopChildren/shopDetail?id='+item.id)">
        <img :src="item.cover_img | imgUrl" alt="">
        <div class="shopInfo">
          <div class="shopName">{{item.title}}</div>
          <div class="shopBottom">
            <div class="shopPirce"><span>{{Number(item.price || 0).toFixed(2)}}</span></div>
            <div class="shopNum">{{item.sale_num}}人付款</div>
          </div>
        </div>
      </li>
      <li class="clear"></li>
    </ul>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import MainNav from "@/components/MainNav/MainNav";
import {shopindex} from '@/request/api'
import imgHost from 'assets/js/base'
export default {
  data() {
    return {
      search: '',  //搜索内容
      category_id: '',  //选中的id
      goodsList: [],  //商品列表
      goodsCategory: [], //分类列表
      shopBanner: [],  //轮播图列表
      swiperOption: {
        loop: true
      },
      swiperOptionType: {
        slidesPerView: 4,
        loop: false
      }
    }
  },
  filters: {
    imgUrl(val){
      return imgHost.imgUrl + val
    }
  },
  methods: {
    shopindex(category_id,search) {
      const _this = this
      shopindex({category_id,search})
        .then((result) => {
          _this.category_id = result.data.category_id
          _this.goodsList = result.data.goodsList
          _this.goodsCategory = result.data.goodsCategory
          _this.shopBanner = result.data.shopBanner
        })
    },
    locationBack(){
      window.history.go(-1)
    },
    onSearch() {

    }
  },
  created(){
    this.shopindex(this.category_id,this.search)
  },
  components: { MainNav, swiper, swiperSlide }
}
</script>

<style scoped>
/* 搜索栏 */
.van-nav-bar{
  position: absolute;
  top: 0.7333rem;
  width: 100%;
  height: 46px;
  background-color: transparent;
}
.nav-bar-left{
  height: 26px;
  vertical-align: middle;
}
.van-nav-bar__title {
  position: relative;
  left: 15px;
  max-width: 88% !important;
}
.van-search {
  padding: 6px;
  background-color: transparent !important;
}
.van-search__content {
  background-color: #fff;
}
.van-search__content--round {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.van-search__action {
  width: 60px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: rgb(255, 122, 132);
  color: #fff;
}
/* 轮播图 */
.swiper img{
  width: 100%;
  height: 6rem;
  object-fit: cover;
}
.swiper-type{
  font-size: 0.3467rem;
}
.swiper-type .swiper-slide{
  text-align: center;
  color: #282828;
}
.swiper-type .swiper-slide .type-active{
  color: #f33;
}
/* 商品卡片 */
.shop-div{
  margin: 0.3467rem 0.3467rem 49px;
}
.shop-div .list {
	display: flex;
	flex-direction: column;
	width: 49%;
	border-radius: 0.133333rem;
	margin-bottom: 0.266666rem;
	background-color: #fff;
}
.shop-div .list img {
	width: 100%;
  height: 5.7333rem;
  border-top-left-radius: 0.1333rem;
  border-top-right-radius: 0.1333rem;
	object-fit: cover;
}
.shop-div .list:nth-child(2n-1){
  float: left;
}
.shop-div .list:nth-child(2n){
  float: right;
}
.list:first-child{
  height: 6.6667rem;
}
.list:first-child img {
	height: 4.4rem;
}
.shop-div .list .shopInfo {
  box-sizing: border-box;
	padding: 0.2667rem 0.266666rem;
	font-size: 0.346666rem;
}

.shop-div .list .shopInfo .shopName {
	height: 0.8rem;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	margin-bottom: 0.266666rem;
	color: #282828;
	line-height: 0.4rem;
}

.shop-div .shopBottom {
	display: flex;
	justify-content: space-between;
	height: .6rem;
	line-height: .6rem;
}

.shop-div .list .shopInfo .shopPirce {
	font-size: 0.613333rem;
	color: #FF3333;
}

.shop-div .list .shopInfo .shopPirce span:nth-child(2) {
	font-size: 0.32rem;
}

.shop-div .list .shopInfo .shopNum {
	color: #ACACAC;
	font-size: 0.32rem;
}
</style>