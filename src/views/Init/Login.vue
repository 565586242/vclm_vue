<template>
  <div class="cp-body">
    <div>
      <img class="login-logo" src="~assets/img/Init/login_logo@2x.png" />
      <div class="cp-input">
        <img class="cp-input-icon" src="~assets/img/Init/login_icon_shouji@2x.png" mode />
        <div class="cp-input-title">{{$t('init.phone')}}</div>
        <input class="cp-input-input" v-model="formData.user_phone" type="text" :placeholder="$t('init.placeholder_phone')" />
      </div>
      <div class="cp-input">
        <img class="cp-input-icon" src="~assets/img/Init/login_icon_mima@2x.png" mode />
        <div class="cp-input-title">{{$t('init.password')}}</div>
        <input class="cp-input-input" v-model="formData.password" type="password" :placeholder="$t('init.placeholder_password')" />
      </div>
      <div class="login-edit">
        <router-link to="/forgetPwd">{{$t('init.forget_password')}}</router-link>
        <router-link to="/registered">{{$t('init.registered_now')}}</router-link>
      </div>
      <div class="cp-btn" @click="homelogin">{{$t('init.login_now')}}</div>
    </div>
  </div>
</template>

<script>
import {homelogin} from '@/request/api'
import {Toast} from 'vant'
export default {
  data() {
    return {
      formData: {
        user_phone: '',
        password: ''
      }
    }
  },
	methods: {
    homelogin(){
      const _this = this;
      homelogin(this.formData)
        .then(res => {
          if(res.code == 200){
            Toast.success({
              message: res.msg,
              duration: 1000,
              onClose(){
                localStorage.setItem('loginUser',JSON.stringify(res.data.user))
                localStorage.setItem('loginToken',res.data.token)
                _this.$router.replace('/home')
              }
            })
          }else{
            Toast({
              message: res.msg,
              duration: 1000
            })
          }
        })
    }
  }
};
</script>

<style scoped>
.cp-body {
  background: no-repeat url("~assets/img/Init/login_bg@2x.png") center/cover;
}
.choose-language {
  position: absolute;
  z-index: 99;
  top: 1rem;
  right: 0.4rem;
}
/* logo */
.login-logo {
  display: block;
  height: 3.2rem;
  padding-top: 2rem;
  margin: 0 auto 2.1333333333333333rem;
}
/* 操作 */
.login-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 8rem;
  margin: 0.26666666666666666rem auto;
  color: #c0c0cf;
  font-size: 0.3466666666666667rem;
  line-height: 0.8rem;
}
.login-edit a{
	color: #fff;
}
</style>
