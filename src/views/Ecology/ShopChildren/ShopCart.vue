<template>
  <div id="cart" ref="cart">
    <div id="status-nav">
      <van-nav-bar title="购物车" @click-left="locationBack" :border="false">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
        <span class="nav-bar-right" slot="right" v-if="!delBtn" @click="startDel">管理</span>
        <span class="nav-bar-right" slot="right" v-else @click="delBtn = false">取消</span>
      </van-nav-bar>
    </div>
    <div class="order_main_box" v-for="(item,index) in goods" :key="item.id">
      <div class="order_list">
        <div class="order_btn" v-if="!delBtn">
          <span class="radio-icon" :class="{'radio-checked':chooseAll}" @click="radioClick($event,index)"></span>
        </div>
        <div class="order_shop_img">
          <img :src="item.cover_image | imgUrl" alt="">
        </div>
        <div class="order_shop_text">
          <h6>{{item.goods_name}}</h6>
          <h4>
            <span>{{item.specifications}}</span>
          </h4>
          <div><span style="font-size: 0.213333rem;"></span>{{Number(item.price || 0).toFixed(2)}}FND
            <ul id="car">
              <li><button @click="removeNumber(index)">-</button></li>
              <li><input type="text" :value="item.number" readonly="readonly"></li>
              <li><button @click="addNumber(index)">+</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="del-btn" v-if="delBtn" @click="shopcartdel(item.id)">删除</div>
    </div>
    <div class="car_bottom">
      <ul>
        <li>
          <span class="radio-icon" :class="{'radio-checked':chooseAll}" style="margin-right: 0.133333rem;" @click="chooseAllClick()"></span>全部
        </li>
        <li>
          <span>合计:<b>{{Number(totalMoney).toFixed(2)}}FND</b></span>
          <a href="javascript:;" @click="confirmOrder">结算</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {shopcart,shopcartchange,shopcartdel} from '@/request/api'
import imgHost from 'assets/js/base'
import {Toast} from 'vant'
export default {
  data() {
    return {
      delBtn: false,  //删除界面
      goods: [],  //商品
      chooseGoods: [],  //选择的商品序号
      chooseAll: false,  //选择全部
      totalMoney: 0  //总金额
    }
  },
  methods: {
    shopcartdel(id) {
      shopcartdel({cart_ids: id})
        .then((result) => {
          window.location.reload()
        })
    },
    confirmOrder() {
      let bool = false,arr = []
      const _this = this
      this.chooseGoods.forEach((val,index) => {
        if(val){
          bool = true
          arr.push(_this.goods[index].id)
        }
      })
      if(bool){
        this.$router.push({
          path: '/shopChildren/confirmOrder',
          query: {
            cart_ids: JSON.stringify(arr)
          }
        })
      }else{
        Toast({
          message: '请选择购买商品',
          duration: 1000
        })
      }
    },
    /* 数量改变 */
    shopcartchange(id,type) {
      shopcartchange({cart_id:id,type:type})
    },
    shopcart() {
      const _this = this
      shopcart()
        .then((result) => {
          _this.goods = result.data
          _this.chooseGoods = _this.goods.length?Array(_this.goods.length).fill(''):[]
        })
    },
    //开始删除
    startDel() {
      this.delBtn = true
    },
    locationBack() {
      window.history.go(-1)
    },
    //-
    removeNumber(index){
      if(this.goods[index].number != 1){
        this.shopcartchange(this.goods[index].id,2)
        this.goods[index].number--
        if(this.chooseGoods[index]){
          this.totalMoney = this.totalMoney - Number(this.goods[index].price)
        }
      }
    },
    //+
    addNumber(index) {
      this.shopcartchange(this.goods[index].id,1)
      this.goods[index].number++
      if(this.chooseGoods[index]){
        this.totalMoney = this.totalMoney + Number(this.goods[index].price)
      }
    },
    //单选
    radioClick(e,index) {
      if(e.target.className.indexOf('checked') != -1){
        e.target.className = 'radio-icon'
        this.totalMoney = this.totalMoney - Number(this.goods[index].price) * this.goods[index].number
        if(this.totalMoney == 0){this.chooseAll = false}
      }else{
        e.target.className = 'radio-icon radio-checked'
        this.totalMoney = this.totalMoney + Number(this.goods[index].price) * this.goods[index].number
        let money = 0
        this.goods.forEach(value => money += (Number(value.price) * value.number))
        if(this.totalMoney == money){this.chooseAll = true}
      }
      this.chooseGoods[index] = !this.chooseGoods[index]
    },
    //全选
    chooseAllClick() {
      let money = 0
      this.chooseAll = !this.chooseAll
      if(this.chooseAll){
        this.goods.forEach(value => money += (Number(value.price) * value.number))
      }
      this.totalMoney = money
    }
  },
  filters: {
    imgUrl(val) {
      return imgHost.imgUrl + val
    }
  },
  created() {
    this.shopcart()
  }
}
</script>

<style scoped>
#status-nav{
  background-color: #fff;
}
#cart{
	padding-bottom: 1.2rem;
	border-top: 65px solid transparent;
  border-bottom: 49px solid transparent;
}
.nav-bar-left{
  height: 26px;
  vertical-align: middle;
}
.nav-bar-right{
  color: #f33;
}
.order_main_box {
  display: flex;
	background: #fff;
	margin: 0.2667rem 0.3467rem;
	border-radius: 5px;
	box-shadow: 1px 1px 2px 1px #eee;
}
.order_list{
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.2667rem;
}
.order_shop_img {
	flex: 1;
	-webkit-flex: 1;
	width: 2.6rem;
	min-width: 2.6rem;
	max-width: 2.6rem;
	text-align: left;
}

.order_shop_img img {
	width: 2.3rem;
  height: 2.35rem;
  object-fit: contain;
}

.order_shop_text {
	position: relative;
	flex: 3;
	-webkit-flex: 3;
}

.order_shop_text h6 {
	height: 1.066666rem;
	color: #333;
	font-size: .36rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 0.533333rem;
	padding-right: 0.1rem;
}

.order_shop_text h4 {
	height: .5rem;
	line-height: .5rem;
	font-size: .32rem;
	font-weight: normal;
	margin-top: .1rem;
}

.order_shop_text h4 span {
	position: relative;
	display: inline-block;
	background: #F6F6F6;
	color: #ACACAC;
	font-size: .3rem;
	padding: 0 .15rem;
	border-radius: 3px;
	margin-right: .1rem;
	height: .5rem;
	line-height: .5rem;
}

.order_shop_text div {
	color: red;
	font-size: .36rem;
	padding-right: .2rem;
	margin-top: .32rem;
	position: relative;
	height: .55rem;
	line-height: .55rem;
}

#car {
	position: absolute;
	right: 0.2rem;
	bottom: 0;
}

#car li {
	float: left;
}

#car li button {
	padding: 0;
	border: 0;
	height: .55rem;
	width: .55rem;
	background: #F1F1F1;
	font-weight: 600;
	font-size: .38rem;
	color: #ACACAC;
}

#car li input {
	padding: 0;
	height: .55rem;
	margin: 0;
	background: #F1F1F1;
	font-weight: 600;
	font-size: .38rem;
	width: .6rem;
	text-align: center;
	border: none;
	margin: 0 1px;
	color: #333;
}

.order_shop_text p i {
	font-style: normal;
	font-size: .3rem;
}
/* 结算 */
.car_bottom {
	position: fixed;
	bottom: 49px;
	left: 0;
	width: 100%;
	height: 1.2rem;
	background: #ffffff;
}

.car_bottom ul {
	display: flex;
	display: -webkit-flex;
	align-items: center;
	height: 1.2rem;
	line-height: 1.2rem;
	padding: 0 .3rem;
}

.car_bottom ul li {
	display: flex;
	align-items: center;
	flex: 1;
	-webkit-flex: 1;
	font-size: .38rem;
	color: #444;
}

.cart_btn {
	top: 0.65rem !important;
	margin-right: .1rem !important;
	float: left;
	margin-top: 0 !important;
}

.car_bottom ul li span {
	margin-left: .1rem;
	color: #333;
	font-size: .36rem;
}

.car_bottom ul li:nth-child(2) {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex: 2.5;
	-webkit-flex: 2.5;
	text-align: right;
}

.car_bottom ul li:nth-child(2) span {
	color: #000;
	margin-left: 0;
}

.car_bottom ul li:nth-child(2) span b {
	font-size: .38rem;
	color: red;
	font-weight: normal;
}

.car_bottom ul li:nth-child(2) a {
	display: block;
	height: .8rem;
	line-height: .8rem;
	text-align: center;
	width: 2.5rem;
	color: #fff;
	background: #e60012;
	font-size: .36rem;
	border-radius: 25px;
	margin-left: .2rem;
}

.car_bottom ul li:nth-child(3) {
	text-align: right;
}

.car_bottom ul li:nth-child(3) button {
	height: .8rem;
	line-height: .8rem;
	width: 2.5rem;
	padding: 0;
	text-align: center;
	margin-top: 0.2rem;
	color: #e60012;
	border: 1px solid #e60012;
	font-size: .38rem;
	border-radius: 25px;
}

.radio-icon {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
  background: no-repeat url('~assets/img/shop/btn_xuan_no@2x.png') center/cover
}

.radio-checked {
	background: no-repeat url('~assets/img/shop/btn_xuan_yes@2x.png') center/cover
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
	bottom: 1.3rem;
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
	color: #444;
	margin-bottom: 0.2rem;
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
	color: #282828;
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
	background: url('') no-repeat 98% center;
	background-size: 0.45rem;
	color: #333;
}

.confirm_pay input {
	position: absolute;
	height: 0.9rem;
	width: 96%;
	left: 2%;
	bottom: 0.2rem;
	background: #1B8606;
	color: #fff;
	border-radius: 0.45rem;
	border: none;
	font-size: 0.38rem;
}

.container a {
	text-align: center;
	color: #1B8606;
	display: block;
	width: 100%;
	font-size: 0.37rem;
}

.pay_password {
	background: #fff;
	position: absolute;
	bottom: 1.3rem;
	width: 100%;
	height: 70vh;
	border-radius: 5px 5px 0 0;
}

section {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
	background: rgba(0, 0, 0, 0.6);
}

.container {
	position: absolute;
	top: 0;
	background: #fff;
	border-radius: 5px;
	margin: 0;
	padding-bottom: 0.266667rem;
}

.pay_title {
	position: relative;
	font-size: 0.4rem;
	text-align: center;
	color: #282828;
	height: 1.2rem;
	line-height: 1.2rem;
	border-bottom: 1px solid #eee;
}

.pay_title img {
	position: absolute;
	right: 0.2rem;
	height: 0.6rem;
	top: 0.25rem;
}

.pay_content {
	border-bottom: 1px solid #acacac;
	border-top: 1px solid #acacac;
	border-right: 1px solid #acacac;
	margin: 0.4rem 0.3rem 0.2rem 0.3rem;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
}

.ipt_pay {
	width: 100%;
	height: 1.2rem;
	border-left: 1px solid #acacac;
}

.ipt_pay input {
	border: 0;
	height: 100%;
	width: 100%;
	text-align: center;
	font-size: 0.88rem;
	background: #fff;
	margin: 0;
}

footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	font-weight: 600;
}

.pay_btn {
	background: #acacac;
}

.pay_btn li {
	width: 31.3333%;
	float: left;
	height: 1.1rem;
	line-height: 1.1rem;
	text-align: center;
	background: #fff;
	font-size: 0.55rem;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	margin: 0.1rem 1%;
	border-radius: 5px;
	font-weight: normal;
	color: #000;
}

.pay_btn li:active {
	background: #c2c2c2;
}

.b9:active {
	background: #c2c2c2 !important;
	border: none !important;
}

.b9 {
	background: none !important;
	border: none !important;
}

.b9 img {
	height: 0.5rem;
	display: block;
	margin: 0.25rem auto;
}

.confir_bottom {
	height: 1.2rem;
	line-height: 1.2rem;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	background: #fff;
	text-align: right;
	font-size: 0.36rem;
	color: #acacac;
}

.confir_bottom span {
	color: #000;
	margin-left: 0.2rem;
}

.confir_bottom b {
	color: red;
	font-weight: normal;
	font-size: 0.38rem;
}

.confir_bottom input {
	height: 0.9rem;
	background: #1B8606;
	color: #fff;
	border-radius: 25px;
	margin: 0.15rem 0.2rem;
	padding: 0 0.5rem;
	font-size: 0.37rem;
	border: none;
}
/* 删除按钮 */
.del-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  border-top-right-radius: 0.1333rem;
  border-bottom-right-radius: 0.1333rem;
  background-color: #e60012;
  font-size: 0.3467rem;
  text-align: center;
}
</style>