<template>
  <div class="cp-body">
    <main-nav :title="$t('title.transferIn')" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="cp-title">{{$t('profile.transferIn')}}{{formData.currency}}</div>
    <div class="cp-input" style="margin-top:.1rem">
      <div class="cp-input-title">{{$t('profile.PaymentAddress')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.in_address" disabled />
    </div>
    <div class="cp-input" style="border-radius:0">
      <div class="cp-input-title">{{$t('profile.in_amount')}}</div>
      <input class="cp-input-input" type="text" :placeholder="$t('profile.placeholder_in_amount')" v-model="formData.num"/>
    </div>
    <div class="cp-title">支付凭证</div>
    <div id="add_pay_img">
      <label for="add_pay_file">
        <img class="add_icon" v-if="formData.voucher == ''" src="~assets/img/icon_shangchuan@2x.png" alt="">
        <img v-else :src="formData.voucher" alt="">
      </label>
      <input type="file" id="add_pay_file" @change="addPayChange" style="display:none;">
    </div>
    <div class="cp-btn" @click="formData.pay_password = '';pwdShow = !pwdShow">确认转入</div>
    <van-overlay :show="pwdShow">
			<van-password-input
				:value="formData.pay_password"
			/>
			<van-number-keyboard
				:show="pwdShow"
				@blur="pwdShow = false"
				@input="writePay"
				@delete="removePay"
			/>
		</van-overlay>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import hostUrl from 'assets/js/base'
import {Toast} from 'vant'
import {intoGet,intoPost} from '@/request/api'
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      formData: {
        /* currency: this.$route.params.type == 'sot'?'SOT':'FNT', */
        pay_password: '',
        in_address: '',
        num: '',
        voucher: ''
      },
      pwdShow: false  //输入密码弹窗
    }
  },
  methods: {
    intoGet(){
      const _this = this
      intoGet(this.formData)
        .then((result) => {
          _this.formData.in_address = result["msg"];
        })
    },
    intoPost() {
      const _this = this
      intoPost(this.formData)
        .then((result) => {
          if(result.code == 200){
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose(){
                _this.$router.back()
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
    writePay(pwd){
      this.formData.pay_password += pwd;
			if(this.formData.pay_password.length == 6){
        this.pwdShow = false
        this.intoPost()
			}
    },
    removePay(){
      this.formData.pay_password = this.formData.pay_password.substr(0,this.formData.pay_password.length-1)
    },
    addPayChange(e) {
      var _this = this;
      const inputFile = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(inputFile);
      reader.onload = function (e) { 
        _this.formData.voucher = this.result;
      }
    }
  },
  created() {
    this.intoGet()
  },
  components: {MainNav}
}
</script>

<style scoped>
.cp-input{
  position: relative;
  padding-left: .2rem;
}
.cp-input-title{
  width: 1.8rem;
}
.send-code-transfer{
  background-color: transparent;
  color: #7288C8;
}
/* 支付凭证 */
#add_pay_img{
  position: relative;
  width: 8rem;
  height: 5.6667rem;
  border: 1px solid #666;
  margin: auto;
}
#add_pay_img img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
}
#add_pay_img .add_icon{
  width: 3rem;
  height: 3rem;
}
</style>