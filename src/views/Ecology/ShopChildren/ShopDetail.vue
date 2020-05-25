<template>
  <div>
    <div id="status-nav">
      <van-nav-bar title="商品详情" @click-left="locationBack" :border="false">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
        <img @click="$router.push('/shopChildren/shopCart')" class="nav-bar-right" slot="right" src="~assets/img/shop/tab_icon_gouwu01@2x.png" alt="">
      </van-nav-bar>
    </div>
    <van-swipe :autoplay="1500" indicator-color="white" style="height:13.3067rem;">
      <van-swipe-item v-for="item in bannerImage" :key="item.id">
        <img class="shop-img" :src="item | imgUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="shop-detail">
      <p class="shop-money">{{Number(goodsInfo.price || 0).toFixed(2)}}<span style="font-size: 0.32rem;">FND</span></p>
      <p class="shop-top-title">{{goodsInfo.title}}</p>
    </div>
    <div class="shop-detail-size">
      <div class="shop-send-out">
        <div>
          <span>规格</span>
          <p style="width: 6.666666rem;">{{goodsInfo.specifications}}</p>
          <span>销量{{goodsInfo.sale_num}}</span>
        </div>
      </div>
    </div>
    <div class="shop-more-introduce">
      <p class="baby-detail">宝贝详情</p>
      <img v-for="item in detailImage" :key="item.id" :src="item | imgUrl" alt="">
    </div>
    <div class="details_footer">
      <div class="details_car">
        <input type="button" @click="buyShow = true" value="加入购物车"> 
        <input type="button" @click="buyShow = true" value="立即购买">
      </div>
    </div>
    <!-- 购买弹窗 -->
    <van-overlay :show="buyShow">
      <div class="buy-shop-div">
        <div class="buy-shop-bottom">
          <img class="buy-image" :src="coverImage | imgUrl" alt="">
          <div class="buy-detail">
            <p style="color: #f33;font-size: 0.4rem;">{{Number(goodsInfo.price || 0).toFixed(2)}}<span style="font-size: 0.28rem;">FND</span></p>
            <p style="color: #282828;font-size: 0.32rem;">规格:{{goodsInfo.specifications}}</p>
          </div>
          <img class="buy-shop-close" src="~assets/img/shop/close_icon.png" @click="buyShow = false">
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 1.333333rem;">
          <p class="cp-title">购买数量</p>
          <div class="buy-number-edit">
            <p style="color: #acacac;" @click="formData.number != 1?formData.number--:formData.number">-</p>
            <p class="change-number">{{formData.number}}</p>
            <p style="color: #acacac;" @click="formData.number++">+</p>
          </div>
        </div>
        <div class="details_footer">
          <div class="details_car" style="width: 9rem;">
            <input type="button" @click="addtocart" value="加入购物车"> 
            <input type="button" @click="buyBtnClick" value="立即购买">
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { shopdetail,addtocart } from "@/request/api";
import hostUrl from 'assets/js/base'
import {Toast} from 'vant'
export default {
  data() {
    return {
      buyShow: false,  //购买弹窗
      bannerImage: [],  //轮播图片
      coverImage: '', //主图
      detailImage: [],  //详情图片
      goodsInfo: {},  //商品信息
      formData: {
        number: 1,
        goods_id: this.$route.query.id
      }
    };
  },
  filters: {
    imgUrl(val) {
      return hostUrl.imgUrl + val
    }
  },
  methods: {
    buyBtnClick() {
      this.$router.push({
        path: '/shopChildren/confirmOrderBuy',
        query: {
          goods_id: this.formData.goods_id,
          number: this.formData.number
        }
      })
    },
    shopdetail() {
      const _this = this;
      shopdetail({ goods_id: this.$route.query.id })
        .then(result => {
          _this.coverImage = result.data.coverImage
          _this.bannerImage = result.data.bannerImage
          _this.detailImage = result.data.detailImage
          _this.goodsInfo = result.data.goodsInfo
        });
    },
    addtocart() {
      const _this = this
      addtocart(this.formData)
        .then((result) => {
          if(result.code == 200){
            _this.buyShow = false
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose(){
                _this.locationBack()
              }
            })
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    },
    locationBack() {
      window.history.go(-1);
    }
  },
  created() {
    this.shopdetail();
  }
};
</script>

<style scoped>
.nav-bar-right{
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.van-nav-bar {
  background-color: transparent;
}
.van-nav-bar__title {
  color: #282828;
}
#app {
  background-color: #f6f6f6;
}
.mobile-top {
  position: fixed;
  top: 0;
  left: 0;
}
.shop-img {
  width: 100%;
  height: 13.3067rem;
  object-fit: cover;
}
.shop-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  height: 2rem;
  padding: 0.266666rem 0.36rem;
  background-color: #fff;
}
.shop-money {
  font-size: 0.48rem;
  color: #f33;
}
.shop-top-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #282828;
  font-size: 0.346666rem;
}
.shop-detail-size {
  margin-top: 0.266666rem;
  background-color: #fff;
}
.shop-send-out {
  font-size: 0.293333rem;
  color: #282828;
}
.shop-send-out > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
}
.shop-send-out span {
  padding: 0 0.346666rem;
  color: #acacac;
}
.shop-send-out img {
  width: 0.24rem;
  height: 0.293333rem;
}
/* 宝贝详情 */
.shop-more-introduce {
  font-size: 0;
  margin-top: 0.533333rem;
  margin-bottom: 1.2rem;
}
.shop-more-introduce img {
  width: 100%;
}
.baby-detail {
  position: relative;
  margin-bottom: 0.3467rem;
  text-align: center;
  color: #4c4c4c;
  font-size: 0.32rem;
}
.baby-detail:before {
  position: absolute;
  top: 0.233333rem;
  left: 3rem;
  display: inline-block;
  content: "";
  width: 1.066666rem;
  height: 1px;
  background-color: #acacac;
}
.baby-detail:after {
  position: absolute;
  top: 0.233333rem;
  right: 3rem;
  display: inline-block;
  content: "";
  width: 1.066666rem;
  height: 1px;
  background-color: #acacac;
}
/* 加入购物车，立即购买 */
.details_footer {
	position: fixed;
	width: 100%;
	height: 1.2rem;
	background: #fff;
	bottom: 0;
	left: 0;
	z-index: 1;
}
.details_car {
	position: absolute;
	bottom: 0;
	right: 0.4rem;
	width: 6rem;
	display: flex;
	display: -webkit-flex;
	height: 1.2rem;
}
.details_car input {
	flex: 1;
	-webkit-flex: 1;
	text-align: center;
	height: 0.9rem;
	line-height: 0.9rem;
	margin-top: 0.15rem;
	padding: 0;
	border: none;
	font-size: 0.36rem;
	color: #fff;
}
.details_car input:first-child {
	background: linear-gradient(to right, rgb(255,149,158), rgb(255,123,132));
	border-radius: .45rem 0 0 .45rem;
}
.details_car input:last-child {
	background: linear-gradient(to right, rgb(247,49,65), rgb(230,1,18));
	border-radius: 0 .45rem .45rem 0;
}
/* 购买弹窗 */
.buy-shop-div{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  width: 100%;
  height: 75vh;
  background-color: #fff;
  padding: 0.266666rem;
  border-top-left-radius: 0.133333rem;
  border-top-right-radius: 0.133333rem;
}
.buy-shop-bottom{
  position: relative;
  display: flex;
}
.buy-image{
  width: 2.533333rem;
  height: 3.36rem;
  margin: 0 0.8rem;
  object-fit: contain;
}
.cp-title{
  color: #282828;
}
.buy-shop-bottom .buy-shop-close{
  position: absolute;
  right: 0.0667rem;
  top: 0.0667rem;
  width: 0.506666rem;
  height: 0.506666rem;
}
.buy-detail{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 5.666666rem;
  line-height: 0.6rem;
}
.buy-number-edit{
  display: flex;
  font-size: 0.32rem;
  color: #282828;
  font-weight: bold;
}
.buy-number-edit > p{
  line-height: 0.533333rem;
  padding: 0.066666rem 0.266666rem;
  margin: 0 0.066666rem;
  background-color: #f1f1f1;
}
.buy-shop-div .transfer-yes{
  position: absolute;
  bottom: 0.266666rem;
  width: 9.306666rem;
  border-radius: 0.666666rem;
  margin: 0;
}
.buy-btn{
  position: absolute;
  bottom: 0.0667rem;
  left: 0;
  right: 0;
  width: 95%;
  border-radius: 0.5333rem;
  font-size: 0.3467rem;
}
</style>