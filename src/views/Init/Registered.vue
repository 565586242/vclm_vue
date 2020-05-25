<template>
  <div class="cp-body">
    <main-nav :title="$t('title.registered')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E">
			<div slot="right">
				<language></language>
			</div>
		</main-nav>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_yonghu@2x.png" mode />
      <div class="cp-input-title">{{$t('init.username')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.name" :placeholder="$t('init.placeholder_username')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_shouji@2x.png" mode />
      <div class="cp-input-title">{{$t('init.phone')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.phone" :placeholder="$t('init.placeholder_phone')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_yanzhengm@2x.png" mode />
      <div class="cp-input-title">{{$t('init.code')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.code" :placeholder="$t('init.placeholder_code')" />
      <button class="send-code" :disabled="sendCode" @click="getphonecode">{{sendCodeText || $t('init.send_text')}}</button>
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_mima@2x.png" mode />
      <div class="cp-input-title">{{$t('init.password')}}</div>
      <input class="cp-input-input" type="password" v-model="formData.password" :placeholder="$t('init.placeholder_password')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_mima@2x.png" mode />
      <div class="cp-input-title">{{$t('init.password')}}</div>
      <input class="cp-input-input" type="password" v-model="formData.repassword" :placeholder="$t('init.placeholder_repassword')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_yaoqing@2x.png" mode />
      <div class="cp-input-title">{{$t('init.invite')}}</div>
      <input class="cp-input-input" type="text" v-model="formData.recode" :placeholder="$t('init.placeholder_invite')" />
    </div>
    <div class="cp-input">
      <img class="cp-input-icon" src="~assets/img/Init/login_icon_shouji@2x.png" mode />
      <div class="cp-input-title">接点码</div>
      <input class="cp-input-input" type="number" v-model="formData.position_phone" placeholder="请输入接点码(接点手机号)" />
    </div>
    <div class="cp-btn" @click="homeregister">{{$t('init.registered_now_btn')}}</div>
  </div>
</template>

<script>
import language from "components/CpLanguage/index";
import MainNav from "components/MainNav/MainNav";
import {Toast} from 'vant'
import {getphonecode,homeregister} from '@/request/api'
export default {
  data() {
    return {
      sendCode: false,  //是否发送验证码
      sendCodeText: '', //验证码文字
      sendCodeInterval: '', //验证码定时器
      sendCodeTime: 30, //倒计时
      formData: {
        name: '',
        phone: '',
        code: '',
        password: '',
        repassword: '',
        recode: '',
        position_phone: ''
      }
    }
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
    homeregister(){
      const _this = this
      homeregister(this.formData)
        .then(res => {
          if(res.code != 200){
            Toast({
              message: res.msg,
              duration: 1000
            })
          }else{
            Toast.success({
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
  components: {language,MainNav}
};
</script>

<style scoped>
.cp-body {
  background: no-repeat url("~assets/img/Init/login_bg@2x.png") center/cover;
}
.choose-language{
	position: absolute;
  z-index: 99;
	right: 0.1333333rem;
	top: 0.133333rem;
}
.cp-input {
  position: relative;
}
.send-code {
  position: absolute;
  right: 0;
  top: 0;
  width: 2.2666666666666666rem;
  height: 1.0666666666666667rem;
  padding: 0;
  background-color: #7288c8;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0.13333333333333333rem;
  border-bottom-right-radius: 0.13333333333333333rem;
  color: #fff;
  text-align: center;
  line-height: 1.0666666666666667rem;
  font-size: 0.4rem;
}
/* 立即注册 */
.login-btn {
  width: 8rem;
  height: 1.3333333333333333rem;
  margin: 1.3333333333333333rem auto 0;
  background: no-repeat url("~assets/img/login_btn_bg@2x.png") center/cover;
  color: #fff;
  text-align: center;
  font-size: 0.48rem;
  line-height: 1.3333333333333333rem;
}
</style>
