<template>
  <div class="cp-body">
    <main-nav :title="$t('title.forget_password')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E"></main-nav>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_shouji@2x.png" mode />
      <div class="cp-input-title">{{$t('init.phone')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.phone" :placeholder="$t('init.placeholder_phone')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_yanzhengm@2x.png" mode />
      <div class="cp-input-title">{{$t('init.code')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.code" :placeholder="$t('init.placeholder_code')" />
      <button class="send-code" :disabled="sendCode" @click="getphonecode">{{ sendCodeText || $t('init.send_text') }}</button>
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_mima@2x.png" mode />
      <div class="cp-input-title">{{$t('init.password')}}</div>
      <input class="cp-input-input" type="password" v-model="formData.password" :placeholder="$t('init.placeholder_password')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_mima@2x.png" mode />
      <div class="cp-input-title">{{$t('init.password')}}</div>
      <input class="cp-input-input" type="password" v-model="formData.repassword" :placeholder="$t('init.placeholder_password')" />
    </div>
    <div class="cp-btn" @click="homeresetpass">{{$t('init.change_now')}}</div>
  </div>
</template>

<script>
import language from 'components/CpLanguage/index';
import MainNav from 'components/MainNav/MainNav'
import {Toast} from 'vant'
import {homeresetpass,getphonecode} from '@/request/api'
export default {
  data() {
    return {
      sendCode: false,  //是否发送验证码
      sendCodeText: '', //验证码文字
      sendCodeInterval: '', //验证码定时器
      sendCodeTime: 30, //倒计时
      formData: {
        phone: '',
        code: '',
        password: '',
        repassword: ''
      }
    };
  },
  methods: {
    //获取手机号验证码
    getphonecode(){
      const _this = this
      this.sendCode = true
      getphonecode({phone: this.formData.phone})
        .then(res => {
          if(res.code != 200){
            _this.sendCode = false
            Toast({
              message: res.msg,
              duration: 1000
            })
          }else{
            Toast({
              message: res.msg,
              duration: 1000
            })
            _this.sendCodeInterval = setInterval(function(){
              _this.sendCodeTime-=1
              _this.sendCodeText = _this.sendCodeTime + 's'
              if(_this.sendCodeTime == 0){
                _this.sendCodeText = ''
                _this.sendCode = false
                _this.sendCodeTime = 30
                clearInterval(_this.sendCodeInterval)
              }
            },1000)
          }
        })
    },
    //修改密码
    homeresetpass(){
      const _this = this
      homeresetpass(this.formData)
        .then(res => {
          if(res.code != 200){
            Toast({
              message: res.msg,
              duration: 1000
            })
          }else{
            Toast({
              message: res.msg,
              duration: 1000,
              onClose(){
                _this.$router.push('/login')
              }
            })
          }
        })
    }
  },
  components: {
    language,MainNav
  }
};
</script>

<style scoped>
.cp-body {
  background: no-repeat url('~assets/img/Init/login_bg@2x.png') center/cover;
}
.choose-language {
  position: absolute;
  top: 0.13333333333333333rem;
  right: 0.13333333333333333rem;
}
.cp-input {
  position: relative;
}
/* 立即注册 */
.login-btn {
  width: 8rem;
  height: 1.3333333333333333rem;
  margin: 1.3333333333333333rem auto 0;
  background: no-repeat url('~assets/img/login_btn_bg@2x.png') center/cover;
  color: #fff;
  text-align: center;
  font-size: 0.48rem;
  line-height: 1.3333333333333333rem;
}
</style>
