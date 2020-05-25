<template>
  <div class="cp-body">
    <main-nav :title="$t('title.transferOut')" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="cp-title">{{currency}}{{$t('profile.transferOut')}}</div>
    <div class="cp-input" style="margin-top:.1rem">
      <div class="cp-input-title">{{$t('profile.PaymentAddress')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.out_address" :placeholder="$t('profile.placeholder_payment')" />
    </div>
    <div class="cp-input" style="border-radius:0">
      <div class="cp-input-title">{{$t('profile.WithdrawalAmount')}}</div>
      <input class="cp-input-input" type="text" :placeholder="$t('profile.placeholder_amount')" v-model="formData.num"/>
    </div>
    <div class="cp-input" style="margin-top:0;border-radius:0">
      <div class="cp-input-title">{{$t('profile.ConfirmWithdrawal')}}</div>
      <input class="cp-input-input" type="text" v-model="totalMoney" disabled value="0.0000" />
      <input class="send-code send-code-transfer" :value="$t('profile.TransferAll')" readonly @click="formData.num = totalMoney">
    </div>
    <div class="cp-title" style="padding-left:.6rem;">{{$t('profile.HandlingFee')}}: {{feeResult}}</div>
    <div class="cp-title" style="padding-left:.6rem;">实际到账金额: {{formData.num - feeResult}}</div>
    <div class="cp-btn" @click="btnClick">{{$t('profile.ConfirmWithdrawal')}}</div>
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
import {Toast} from 'vant'
import {rollOutGet,rollOutPost} from '@/request/api'
export default {
  data() {
    return {
      formData: {
        currency: this.$route.params.type,
        pay_password: '',
        out_address: '',
        num: '',
        fee: 0
      },
      pwdShow: false,
      totalMoney: 0,  //总共money
      fee: 0
    }
  },
  computed: {
    currency() {
      return this.$route.params.type == 'fnd'?'FND':'FNT'
    },
    feeResult() {
      return (this.formData.num * this.fee).toFixed(4)
    }
  },
  methods: {
    btnClick() {
      if(this.totalMoney < this.formData.num){
        Toast({
          message: "转出金额不足",
          duration: 1000
        })
      }
      this.formData.pay_password = '';
      this.pwdShow = !this.pwdShow
    },
    rollOutPost() {
      const _this = this
      this.formData.fee = this.feeResult
      rollOutPost(this.formData)
        .then((result) => {
          if(result.code == 200){
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose(){
                _this.$router.back()
                /* _this.$router.replace('/profileChildren/moneyChildren/moneyDetail/'+_this.$route.params.type) */
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
        this.rollOutPost()
			}
    },
    removePay(){
      this.formData.pay_password = this.formData.pay_password.substr(0,this.formData.pay_password.length-1)
    },
    rollOutGet(){
      const _this = this
      rollOutGet({currency: this.$route.params.type})
        .then((result) => {
          _this.totalMoney = result.data.balanceOf
          _this.fee = result.data.fee
        })
    }
  },
  created() {
    this.rollOutGet()
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
</style>