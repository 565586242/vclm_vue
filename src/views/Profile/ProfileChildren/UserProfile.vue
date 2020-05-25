<template>
  <div class="cp-body">    
    <main-nav :title="$t('title.userProfile')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E"></main-nav>
    <div class="mine-head">
      <van-uploader :after-read="afterRead">
        <img v-lazy="user_head? user_head:require('@/assets/img/profile/my_img_touxiang@2x.png')" />
        <div class="change-img">{{$t('profile.changeHead')}}</div>
      </van-uploader>
      <div class="cp-list">
        <div>{{$t('profile.username')}}</div>
        <input type="text" v-model="formData.user_name" :disabled="is_modify" :placeholder="$t('profile.placeholder_username')" value />
      </div>
      <div class="cp-list">
        <div>{{$t('profile.phone')}}</div>
        <input type="text" v-model="userInfo.user_phone" disabled :placeholder="$t('profile.placeholder_phone')" value />
      </div>
    </div>
    <div class="password-div">
      <div class="cp-list">
        <div>{{$t('profile.payPwd')}}</div>
        <input type="password" maxlength="6" :disabled="is_modify" @click="payClick('password')" v-model="formData.pay_password" :placeholder="$t('profile.placeholder_payPwd')" />
      </div>
      <div class="cp-list">
        <div>{{$t('profile.confirmPwd')}}</div>
        <input type="password" maxlength="6" :disabled="is_modify" @click="payClick('repassword')" v-model="formData.repassword" :placeholder="$t('profile.placeholder_confirmPwd')" />
      </div>
    </div>
    <div class="cp-btn" v-if="!is_modify" @click="homeinfo">{{$t('profile.saveProfile')}}</div>
    
		<van-overlay :show="payShow">
			<van-password-input
				:value="formData.pay_password"
			/>
			<van-number-keyboard
				:show="payShow"
				@blur="payShow = false"
				@input="writePay"
				@delete="removePay"
			/>
		</van-overlay>

    <van-overlay :show="repayShow">
			<van-password-input
				:value="formData.repassword"
			/>
			<van-number-keyboard
				:show="repayShow"
				@blur="repayShow = false"
				@input="writeRepay"
				@delete="removeRepay"
			/>
		</van-overlay>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav/MainNav";
import hostUrl from '@/assets/js/base'
import {Toast} from 'vant'
import {mine,homeinfo,editHead} from '@/request/api'
export default {
  data() {
    return {
      userInfo: {},
      user_head: '',  //头像
      hostUrl: hostUrl.imgUrl,
      is_modify: true,  //是否修改过
      payShow: false,
      repayShow: false,
      formData: {
        user_name: '',
        pay_password: '',
        repassword: '',
      }
    }
  },
  methods: {
    afterRead(file) {
      var _this = this;
      editHead({
        "user_head": file.content
      })
        .then(result => {
          if(result.code == 200){
            Toast({
              message: result.msg,
              duration: 1000
            })
            _this.user_head = file.content
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    },
    payClick(type){
      if(type == 'password'){
        this.formData.pay_password = ''
        this.payShow = true
      }else{
        this.formData.repassword = ''
        this.repayShow = true
      }
    },
    writePay(pwd) {
      this.formData.pay_password += pwd;
			if(this.formData.pay_password.length == 6){
				this.payShow = false
			}
    },
    removePay() {
      this.formData.pay_password = this.formData.pay_password.substr(0,this.formData.pay_password.length-1)
    },
    writeRepay(pwd) {
      this.formData.repassword += pwd;
      if(this.formData.repassword.length == 6){
        this.repayShow = false
      }
    },
    removeRepay(){
      this.formData.repassword = this.formData.repassword.substr(0,this.formData.repassword.length-1)
    },
    mine(){
      const _this = this
      mine()
        .then((result) => {
          localStorage.setItem('loginUser',JSON.stringify(result.data))
          _this.userInfo = result.data
          this.formData.user_name = result.data.user_name
          this.user_head = result.data.user_head?_this.hostUrl + result.data.user_head:''
          if(result.data.is_modify){
            this.is_modify = true
            this.formData.pay_password = '123456'
            this.formData.repassword = '123456'
          }else{
            this.is_modify = false
            this.formData.pay_password = ''
            this.formData.repassword = ''
          }
        })
    },
    homeinfo() {
      const _this = this
      homeinfo(this.formData)
        .then((result) => {
          if(result.code != 200){
            Toast({
              message: result.msg,
              duration: 1000
            })
          }else{
            Toast({
              message: result.msg,
              duration: 1000,
              onClose(){
                _this.$router.replace('/profile')
              }
            })
          }
        })
    }
  },
  created() {
    this.mine()
  },
  components: { MainNav }
};
</script>

<style scoped>
.mine-head {
  height: 4.933333333333334rem;
  background-color: #2C303E;
  text-align: center;
  font-size: 0.3466666666666667rem;
}
.mine-head img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-top: 0.26666666666666666rem;
}
.change-img {
  margin-bottom: 0.26666666666666666rem;
}
.cp-list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 1.1733333333333333rem;
  border-bottom: 0.013333333333333334rem solid #252935;
  margin: 0 0.3466666666666667rem;
}
.cp-list > div {
  width: 1.6rem;
  margin: 0 0.26666666666666666rem;
  text-align-last: justify;
  font-size: 0.4rem;
}
.cp-list input {
  flex: 1;
  text-indent: 0.4rem;
  font-size: 0.4rem;
  outline: none;
  border: none;
  color: #fff;
  text-align: left;
  background-color: transparent;
}
input::-webkit-input-placeholder{
  color: #C0C0CF;
}
.password-div {
  margin-top: 0.26666666666666666rem;
  background-color: #2c303e;
}
.cp-btn {
  background-image: url("~assets/img/login_btn_bg@2x.png");
}
</style>
