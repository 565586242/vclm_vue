<template>
  <div class="cp-body">
    <main-nav :title="$t('title.Flash')" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>

    <div class="cp-input" style="border-bottom-left-radius: 0;border-bottom-right-radius: 0">
      <img class="cp-input-icon" :src="useCurrencyImg" mode />
      <div class="cp-input-title">{{useCurrency}}</div>
      <input class="cp-input-input" type="text" v-model="formData.num" :placeholder="$t('profile.placeholder_flash')" />
    </div>
    
    <div class="cp-input" style="margin-top: 0;border-top-left-radius: 0;border-top-right-radius: 0" >
      <!-- @click="formData.currency != 'usdt'?{}:modelShow = true" -->
      <img class="cp-input-icon" :src="lastCurrencyImg" mode />
      <div class="cp-input-title">{{lastCurrency}}</div>
      <div class="cp-input-input">
        <img class="cp-next" src="~assets/img/profile/icon_xiayiye@2x.png" alt="">
      </div>
    </div>
    <div class="cp-title">{{useCurrency}}{{$t('profile.over')}}：{{balanceOf}}</div>

    <div class="cp-title" style="padding-top:0" v-if="useCurrency != 'FNT'">
      1 {{useCurrency}} = {{Number(rate).toFixed(4)}} {{lastCurrency}}
    </div>
    <div v-else>
      <p class="cp-title">{{exchangeRate.exchange_rate1}}</p>
      <p class="cp-title">{{exchangeRate.exchange_rate2}}</p>
      <p class="cp-title">{{exchangeRate.exchange_rate3}}</p>
    </div>

    <div class="cp-btn" @click="flashAgainstPost">{{$t('profile.confirmFlash')}}</div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {flashAgainstGet,flashAgainstPost} from '@/request/api'
export default {
  data() {
    return {
      balanceOf: '',  //余额
      rate: '',  //比例
      exchangeRate: {},  //fnt的兑换信息
      defaultType: '',  //准备兑换的币种
      modelShow: false,
      formData: {
        currency: this.$route.params.type,
        num: '',
      }
    }
  },
  methods: {
    flashAgainstPost(){
      const _this = this
      flashAgainstPost(this.formData)
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
    flashAgainstGet() {
      const _this = this
      flashAgainstGet({currency: this.$route.params.type})
        .then((result) => {
          _this.balanceOf = result.data.balanceOf
          _this.rate = result.data.rate
          _this.exchangeRate = result.data.exchangeRate
        })
    }
  },
  computed: {
    useCurrency(){
      const type = this.$route.params.type
      if(type == 'fnt'){
        return 'FNT'
      }else{
        return 'FND'
      }
    },
    useCurrencyImg(){
      return require(`assets/img/money-icon/img_${this.$route.params.type}@2x.png`)
    },
    lastCurrency() {
      const type = this.$route.params.type
      if(type == 'fnt'){
        return 'FND'
      }else{
        return 'FNT'
      }
    },
    lastCurrencyImg(){
      const type = this.$route.params.type
      if(type == 'fnt'){
        return require('assets/img/money-icon/img_fnd@2x.png')
      }else{
        return require('assets/img/money-icon/img_fnt@2x.png')
      }
      
    }
  },
  created() {
    this.flashAgainstGet()
  },
  components: {MainNav}
}
</script>

<style scoped>
.cp-input{
  box-sizing: border-box;
  width: 8.5333rem;
  height: 1.6rem;
  padding: 0 .2rem;
}
.cp-input-icon{
  width: 0.64rem;
  height: 0.64rem;
  object-fit: cover;
  border-radius: 50%;
}
.cp-input-input{
  text-align: right;
}
.cp-title{
  box-sizing: border-box;
  padding-left: .4rem;
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
  height: 3.333333333333333rem;
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
.model-bg .cp-btn {
  width: 4rem;
  height: 0.9333333333333333rem;
  margin-top: 0.5333333333333333rem;
  background-image: url('~assets/img/btn_anniu_02@2x.png');
  line-height: 0.9333333333333333rem;
  font-size: 0.4rem;
}
</style>