<template>
  <div id="confirm">
    <div id="status-nav" style="background-color: #fff;">
      <van-nav-bar title="确认订单" @click-left="locationBack">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
      </van-nav-bar>
    </div>
    <div class="order-detail" v-if="address" @click="chooseAddress()">
      <div class="order-list">
        <img
          style="width: 0.666666rem;height: 0.8rem;"
          src="~assets/img/shop/icon_dizhi02@2x.png"
          alt
        />
        <div style="flex: 1">
          <p>
            {{goChooseAddress.user_name || address.user_name}}
            <span class="order-time">{{goChooseAddress.user_phone || address.user_phone}}</span>
          </p>
          <p class="address">{{goChooseAddress.all_address || address.all_address}}</p>
        </div>
        <div class="right-icon">></div>
      </div>
    </div>
    <div class="order-detail" v-else @click="chooseAddress()">
      <div class="order-list">
        <p class="add-address">暂无地址,快去添加吧！</p>
        <div class="right-icon">></div>
      </div>
    </div>
    <div class="shop-detail" v-for="(item,index) in list" :key="item.id">
      <div class="shop-list">
        <img :src="item.cover_image | imgUrl" alt />
        <div class="shop-list-detail" style="width:6.6rem">
          <p class="shop-head">{{item.title}}</p>
          <p class="shop-size">{{item.specifications}}</p>
          <div class="shop-money-div">
            <p class="shop-money">{{item.price}}FND</p>
            <p class="shop-number">x1</p>
          </div>
        </div>
      </div>
      <div class="size-list">
        <p class="buy-number">购买数量</p>
        <div class="buy-number-edit">
          <p style="color: #acacac;" @click="removeNumber(index)">-</p>
          <p class="change-number">{{item.number}}</p>
          <p style="color: #acacac;" @click="addNumber(index)">+</p>
        </div>
      </div>
      <div class="size-list">
        <p class="buy-number">订单备注</p>
        <textarea class="textarea" v-model="markList[index]" placeholder="选填，请先和商家协商一致"></textarea>
      </div>
      <p
        style="margin-top: 0.266666rem;padding-right: 0.266666rem;text-align: right;font-size: 0.32rem;"
      >
        <span style="color: #ACACAC;font-size: 0.32rem;" class="sum">共{{item.number}}件</span>
        小计:
        <span
          style="color: #f33;font-size: 0.32rem;"
          class="totalPrice"
        >￥{{Number(item.number * item.price).toFixed(2)}}</span>
      </p>
    </div>
    <div class="confirm-bottom">
      <span
        style="padding-right: 0.266666rem;color: #ACACAC;font-size: 0.32rem;"
        class="sum"
      >共{{totalNumber}}件</span>
      <span style="font-size: 0.32rem;color: #282828;">合计:</span>
      <span
        style="padding-right: 0.266666rem;color: #f33;font-size: 0.4rem;"
        class="totalPrice"
      >￥{{totalPrice}}</span>
      <div class="upload-order" @click="orderClick">提交订单</div>
    </div>
    <!-- 确认付款 -->
    <div class="confirm_pay_tan confirm_pay_model" v-show="confirmPay">
      <div class="confirm_pay">
        <h3>确认付款<img src="~assets/img/shop/close_icon.png" alt="" @click="confirmPay = false"></h3>
        <h2>{{totalPrice}}<span>FND</span></h2>
        <input type="button" value="确定" @click="showPay()">
      </div>
    </div>
    <!-- 确认付款 -->
    <van-popup v-model="isShowPay">
      <div class="van_confirm_pay">
        <h3>确认付款<img src="~assets/img/shop/close_icon.png" alt="" @click="isShowPay = false"></h3>
        <h2 id="totalPrice">{{Number(totalPrice).toFixed(4)}}</h2>
        <div>
          <van-password-input :value="formData.pay_password" />
        </div>
        <van-number-keyboard :show="isShowPay" @blur="isShowPay = false" @input="onInput" @delete="onDelete" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { cartconfirmorder, cartordersubmit } from "@/request/api";
import imgHost from "assets/js/base";
import { Toast } from "vant";
export default {
  data() {
    return {
      cart_ids: this.$route.query.cart_ids ? JSON.parse(this.$route.query.cart_ids) : "",
      goChooseAddress: {}, //去地址页面选择的地址
      card_ids: [], //购物车id
      markList: [], //备注列表
      address: "",
      list: [], //商品列表(购物车)
      fnt_rate: '',
      sot_rate: '',
      confirmPay: false,  //确认付款弹窗
      choosePayType: false, //是否显示选择支付方式
      isShowPay: false, //是否显示弹窗
      formData: {
        pay_password: "", //支付密码
        address_id: '', //收货地址id
        list: [], //数组(包括cart_id购物车id,number数量,note备注)
      }
    };
  },
  methods: {
    /* 提交 */
    cartordersubmit() {
      cartordersubmit(this.formData)
        .then(result => {
          if(result.code == 200){
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose() {
                window.history.go()
              }
            })
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        });
    },
    /* 最后输入密码弹窗 */
    showPay() {
      this.confirmPay = false;
      this.choosePayType = false;
      this.isShowPay = true;
      this.formData.pay_password = "";
      this.formData.address_id = this.address.id;
      this.formData.list = this.getShopInfo();
    },
    //获取商品信息
    getShopInfo() {
      let arr = []
      const _this = this
      for (const index in this.cart_ids) {
        arr.push({
          cart_id: _this.cart_ids[index],
          number: _this.list[index].number,
          note: _this.markList[index]
        })
      }
      return arr
    },
    /* 输入密码 */
    onInput(key) {
      this.formData.pay_password = (this.formData.pay_password + key).slice(0, 6);
      if(this.formData.pay_password.length == 6){
        this.isShowPay = false
        this.cartordersubmit()
      }
    },
    onDelete() {
      this.formData.pay_password = this.formData.pay_password.slice(0, this.formData.pay_password.length - 1);
    },
    orderClick() {
      this.address?this.confirmPay = true:Toast({message: '请选择地址'})
    },
    chooseAddress() {
      localStorage.setItem("confirmOrder", "/shopChildren/confirmOrder"),
        this.$router.push("/shopChildren/shopAddress");
    },
    cartconfirmorder() {
      const _this = this;
      cartconfirmorder({ cart_ids: this.cart_ids }).then(result => {
        _this.address = result.data.address;
        _this.list = result.data.list;
        _this.markList = Array(result.data.list.length).fill('')
      });
    },
    locationBack() {
      window.history.go(-1);
    },
    addNumber(index) {
      this.list[index].number++;
    },
    removeNumber(index) {
      this.list[index].number == 1 ? this.list[index].number : this.list[index].number--;
    }
  },
  computed: {
    totalNumber() {
      let number = 0;
      this.list.forEach(val => (number += val.number));
      return number;
    },
    totalPrice() {
      let price = 0;
      this.list.forEach(val => (price += val.price * val.number));
      return Number(price).toFixed(2);
    }
  },
  filters: {
    imgUrl(val) {
      return imgHost.imgUrl + val;
    }
  },
  created() {
    this.cartconfirmorder();
    if (localStorage.getItem("confirmOrder")) {
      this.goChooseAddress = localStorage.getItem("chooseAddress")
        ? JSON.parse(localStorage.getItem("chooseAddress"))
        : {};
      localStorage.removeItem("confirmOrder");
      localStorage.removeItem("chooseAddress");
    }
  }
};
</script>


<style scoped>
.van-password-input{
  bottom: auto;
}
#confirm {
  border-top: 64px solid transparent;
  border-bottom: 1.4rem solid transparent;
  color: #282828;
}
.nav-bar-left {
  height: 26px;
  vertical-align: middle;
}

.order-detail {
  display: flex;
  align-items: center;
  width: 9.306666rem;
  height: 2rem;
  background-color: #fff;
  border-radius: 0.133333rem;
  margin: 0.266666rem auto 0;
}

.order-list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0.166666rem;
}

.order-list .add-address {
  flex: 1;
  text-indent: 1.3333rem;
  font-size: 0.293333rem;
  color: #282828;
}

.order-list > div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  box-sizing: border-box;
  padding: 0 0.266666rem;
  color: #282828;
  font-size: 0.346666rem;
}

.order-time {
  padding-left: 0.533333rem;
  font-size: 0.293333rem;
  color: #acacac;
}

.address {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 0.293333rem;
}

.right-icon {
  width: 0.213333rem;
  height: 0.213333rem;
  color: #acacac;
  text-align: center;
  line-height: 0.213333rem;
}

.shop-detail {
  width: 9.306666rem;
  min-height: 8.066666rem;
  border-radius: 0.2667rem;
  background-color: #fff;
  margin: 0.266666rem auto 0;
  color: #282828;
}

.buy-number-edit {
  display: flex;
  font-size: 0.32rem;
  color: #282828;
  font-weight: bold;
}

.buy-number-edit > p {
  padding: 0 0.266666rem;
  margin: 0 0.066666rem;
  background-color: #f1f1f1;
}

.size-list {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.2666rem 0.266666rem 0;
  font-size: 0.32rem;
  line-height: 0.8rem;
}

.textarea {
  width: 7rem;
  height: 2.666666rem;
  border: 1px solid #acacac;
  font-size: 0.32rem;
}

.confirm-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 1.306666rem;
  padding: 0 0.266666rem;
  background-color: #fff;
}

.upload-order {
  width: 2.666666rem;
  height: 0.933333rem;
  background-color: rgb(231, 0, 18);
  border-radius: 0.466666rem;
  text-align: center;
  color: #fff;
  line-height: 0.933333rem;
  font-size: 0.346666rem;
}

/* 支付 */
.van-popup {
  transform: none;
}
.pay-title {
  margin: 0 26px;
  border-bottom: 1px solid #f1f1f1;
  text-align: center;
  font-size: 18px;
  line-height: 45px;
}
.close-pay {
  position: absolute;
  right: 0.1333rem;
  top: 0.1333rem;
  width: 26px;
  height: 26px;
}
.pay_password {
  background: #fafafa;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 63%;
}
.password_input {
  position: fixed;
  left: 0;
  bottom: 250px;
  width: 100%;
}
.shop-list {
  display: flex;
  box-sizing: border-box;
  padding: 0.133333rem 0.266666rem;
}

.shop-list > img {
  width: 2.533333rem;
  height: 2.666666rem;
  margin-right: 0.266666rem;
  object-fit: cover;
}

.shop-list-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.shop-head {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.346666rem;
  color: #282828;
}

.shop-size {
  width: 1.6rem;
  height: 0.533333rem;
  background-color: #f6f6f6;
  border-radius: 0.133333rem;
  font-size: 0.266666rem;
  color: #acacac;
  text-align: center;
  line-height: 0.533333rem;
}

.shop-money-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.533333rem;
}

.shop-money {
  color: #f33;
  font-size: 0.213333rem;
}

.shop-number {
  color: #acacac;
  font-size: 0.32rem;
}
.confirm_pay_tan {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgb(0, 0, 0, 0.4);
	top: 0;
	left: 0;
	z-index: 99;
}

.confirm_pay {
	background: #fff;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 70vh;
	border-radius: 5px 5px 0 0;
}

.confirm_pay h3 {
	text-align: center;
	height: 1.2rem;
	line-height: 1.2rem;
	font-size: 0.4rem;
	color: #282828;
	font-weight: normal;
	border-bottom: 1px solid #eee;
	position: relative;
}

.confirm_pay h3 img {
	position: absolute;
	right: 0.2rem;
	height: 0.6rem;
	top: 0.25rem;
}

.confirm_pay h2 {
	text-align: center;
	font-size: 1rem;
	color: #444;
	font-weight: normal;
	margin: 1rem 0;
}

.confirm_pay h2 span {
	font-size: 0.4rem;
}

.confirm_pay h5 {
	padding: 0 0.2rem;
	font-size: 0.38rem;
	color: #282828;
	margin-bottom: 0.2rem;
  font-weight: normal;
}

.confirm_pay p {
	height: 1rem;
	line-height: 1rem;
	padding: 0 0.3rem;
	border-bottom: 1px solid #eee;
	font-size: 0.36rem;
}

.confirm_pay p.choose-pay-type {
	float: right;
	height: auto;
	line-height: inherit;
	border: none;
}

.confirm_pay p.choose-pay-type span {
	padding-left: 0.266666rem;
}

.confirm_pay p img {
	height: 0.6rem;
	vertical-align: middle;
	margin-right: 0.4rem;
}

.active {
	background: url('~assets/img/shop/icon_gouxuan@2x.png') no-repeat 98% center;
	background-size: 0.45rem;
	color: #333;
}

.confirm_pay input {
	position: absolute;
	height: 0.9rem;
	width: 96%;
	left: 2%;
	bottom: 0.2rem;
	background: rgb(231, 0, 18);
	color: #fff;
	border-radius: 0.45rem;
	border: none;
	font-size: 0.38rem;
}

.van_confirm_pay {
	background: #fff;
  position: fixed;
  left: 0;
  right: 0;
	bottom: 0;
	height: 70vh;
	border-radius: 5px 5px 0 0;
}

.van_confirm_pay h3 {
	position: relative;
  margin: 0 0.3467rem;
	height: 1.2rem;
	border-bottom: 1px solid #eee;
	text-align: center;
	line-height: 1.2rem;
	font-size: 0.4rem;
	color: #282828;
	font-weight: normal;
}

.van_confirm_pay h3 img {
	position: absolute;
	right: 0;
	top: 50%;
  height: 0.6rem;
  margin-top: -0.3rem;
}

.van_confirm_pay h2 {
	text-align: center;
	font-size: 1rem;
	color: #444;
	font-weight: normal;
	margin: .8rem 0;
}

.van_confirm_pay h2 span {
	font-size: 0.4rem;
}

.van-password-input__security li{
  background-color: #fff;
}
.van-password-input__security i{
  background-color: #000;
}
.van-number-keyboard{
  background-color: #fff;
}
.van-number-keyboard >>> .van-key{
  background-color: #fff;
}
.van-number-keyboard >>> .van-key--gray{
  background-color: #ebedf0;
}
</style>