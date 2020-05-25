<template>
  <div>
		<main-nav :title="$t('title.oilRecharge')" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="phone-div">
      <img src="~assets/img/ecology/app/icon_yonghu@2x.png" mode />
      <div class="phone-input">
        <input type="text" :placeholder="$t('ecology.app.placeholder_oilRecharge')" v-model="formData.card_num" />
      </div>
      <!-- <div class="phone-adress">{{phoneAdress}}</div> -->
      <div class="phone-sizes">
        <div @click="moneyClick(100)">
          <div class="size-title">100元</div>
        </div>
        <div @click="moneyClick(200)">
          <div class="size-title">200元</div>
        </div>
        <div @click="moneyClick(500)">
          <div class="size-title">500元</div>
        </div>
        <div @click="moneyClick(1000)">
          <div class="size-title">1000元</div>
        </div>
        <div @click="moneyClick(1500)">
          <div class="size-title">1500元</div>
        </div>
        <div @click="moneyClick(2000)">
          <div class="size-title">2000元</div>
        </div>
      </div>
    </div>
    <div class="model-bg" v-show="modelShow">
      <div class="pop-model">
        <div class="model-title">
          {{$t('ecology.choosePay')}}
          <div class="model-closed" @click="modelShow = !modelShow"></div>
        </div>
        <div class="model-div">
          <div class="model-list" @click="formData.currency = 'FNT'">
            <div>FNT支付≈{{fntMoney}} FNT</div>
            <img v-if="formData.currency == 'FNT'" src="~assets/img/login_icon_xuanzhong@2x.png" mode />
          </div>
          <div class="cp-btn" @click="startPay">{{$t('ecology.confirmPay')}}</div>
        </div>
      </div>
    </div>
    <!-- 确认付款 -->
    <van-popup v-model="isShowPay">
      <div class="van_confirm_pay">
        <h3>确认付款<img src="~assets/img/shop/close_icon.png" alt="" @click="isShowPay = false"></h3>
        <h2 id="totalPrice">￥{{formData.currency == 'SOT'?sotMoney:fntMoney}}</h2>
        <div>
          <van-password-input :value="formData.pay_password" />
        </div>
        <van-number-keyboard :show="isShowPay" @blur="isShowPay = false" @input="onInput" @delete="onDelete" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import {anyrechargeGet,anyrechargePost} from '@/request/api'
import MainNav from 'components/MainNav/MainNav'
import { Toast } from "vant";
export default {
  data() {
    return {
      modelShow: false, //弹窗是否显示
      isShowPay: false, //支付弹窗
      resultData: {
        fnt_rate: '',
      },
      fntMoney: 0,
      formData: {
        type: 3,
        pay_password: '', //密码
        card_num: '',  //手机号，油卡号
        currency: 'FNT', //币种
        number: '',  //充值数量
      }
    };
  },
  methods: {
    anyrechargePost() {
      const _this = this
      anyrechargePost(this.formData)
        .then((result) => {
          if(result.code == 200){
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose() {
                window.history.go(-1)
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
    anyrechargeGet() {
      const _this = this
      anyrechargeGet({type:3})
        .then((result) => {
          _this.resultData.fnt_rate = result.data.fnt_rate
        })
    },
    startPay() {
      if(!this.formData.card_num){
        Toast({
          message: '请填写手机号',
          duration: 1000
        })
      }else{
        this.isShowPay = true
        this.formData.pay_password = ''
      }
    },
    moneyClick(number) {
      this.fntMoney = Number(number / this.resultData.fnt_rate).toFixed(4)
      this.formData.number = number
      this.modelShow = true
    },
    /* 输入密码 */
    onInput(key) {
      this.formData.pay_password = (this.formData.pay_password + key).slice(0, 6);
      if(this.formData.pay_password.length == 6){
        this.isShowPay = false
        this.anyrechargePost()
      }
    },
    onDelete() {
      this.formData.pay_password = this.formData.pay_password.slice(0, this.formData.pay_password.length - 1);
    }
  },
  created() {
    this.anyrechargeGet()
  },
	components: {MainNav}
};
</script>

<style scoped>
.phone-div {
  position: relative;
  width: 8rem;
  margin: 1.0666666666666667rem auto 0;
}
.phone-div > img {
  position: absolute;
  right: 0;
  top: 0;
  width: 0.4666666666666667rem;
  height: 0.5333333333333333rem;
}
.phone-input {
  height: 0.8rem;
  line-height: 0.8rem;
}
.phone-input input{
	display: block;
  width: 100%;
	border: none;
	background-color: transparent;
	outline: none;
	color: #fff;
  font-size: .48rem;
}
.phone-adress {
  border-bottom: 0.013333333333333334rem solid #363b4b;
  font-size: 0.32rem;
  line-height: 0.4rem;
}
.phone-sizes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.6666666666666666rem;
}
.phone-sizes > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 1.3333333333333333rem;
  border: 1px solid #3eb271;
  border-radius: 0.05333333333333334rem;
  margin-bottom: 0.4rem;
  color: #3eb271;
  text-align: center;
}
.size-title {
  font-size: 0.48rem;
}
.size-price {
  font-size: 0.32rem;
}
/* 弹窗 */
.model-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}
.pop-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 8rem;
  height: 4rem;
  margin: auto;
  border-radius: 0.13333333333333333rem;
  background-color: #2c303e;
  box-shadow: 0 0 0.26666666666666666rem 0.13333333333333333rem
    rgba(44, 46, 62, 0.4);
}
.model-title {
  position: relative;
  height: 0.9333333333333333rem;
  margin: 0 0.13333333333333333rem;
  text-align: center;
  font-size: 0.37333333333333335rem;
  line-height: 0.9333333333333333rem;
  border-bottom: 0.013333333333333334rem solid #262934;
}
.model-closed {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.26666666666666666rem;
  width: 0.3466666666666667rem;
  height: 0.3466666666666667rem;
  margin: auto;
  background: no-repeat url('~assets/img/icon_guanbi@2x.png') center/cover;
}
.model-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 1.0666666666666667rem;
  padding: 0 0.9333333333333333rem;
  font-size: 0.37333333333333335rem;
  text-align: center;
}
.model-list img {
  width: 0.29333333333333333rem;
  height: 0.28rem;
}
.cp-btn {
  width: 4rem;
  height: 0.9333333333333333rem;
  margin-top: 0.5333333333333333rem;
  background-image: url('~assets/img/btn_anniu_02@2x.png');
  line-height: 0.9333333333333333rem;
  font-size: 0.4rem;
}
.van-popup {
  transform: none;
}
.van-password-input{
  bottom: auto;
}
.van_confirm_pay {
  position: fixed;
  left: 0;
  right: 0;
	bottom: 0;
	height: 70vh;
	background: #000;
	border-radius: 5px 5px 0 0;
}
.van_confirm_pay h3 {
	position: relative;
  margin: 0 0.3467rem;
	height: 1.2rem;
	border-bottom: 1px solid #333;
	text-align: center;
	line-height: 1.2rem;
	font-size: 0.4rem;
	color: #ddd;
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
	color: #fff;
	font-weight: normal;
	margin: .8rem 0;
}
.van_confirm_pay h2 span {
	font-size: 0.4rem;
}
</style>
