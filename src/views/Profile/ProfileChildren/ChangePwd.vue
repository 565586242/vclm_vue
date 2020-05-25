<template>
  <div class="cp-body">
    <main-nav
      :title="$t('title.changePwd')"
      fontColor="#fff"
      bgColor="#252935"
      :backShow="true"
      borderBottom="#2C303E"
    ></main-nav>
    <cp-tabs :tabs="$t('profile.changePwdArr')" bordercolor="#fff" :current="current" @tabClick="tabClick"></cp-tabs>
    <div>
      <div v-if="current == 0">
        <div class="cp-input">
          <div class="cp-input-title">{{$t('profile.oldPwd')}}</div>
          <input class="cp-input-input" type="password" v-model="formDataPwd.password" :placeholder="$t('profile.placeholder_oldPwd')" />
        </div>
        <div class="cp-input">
          <div class="cp-input-title">{{$t('profile.phone')}}</div>
          <input class="cp-input-input" type="text" v-model="formDataPwd.phone" :placeholder="$t('profile.placeholder_phone')" />
        </div>
        <div class="cp-input">
          <div class="cp-input-title">{{$t('profile.code')}}</div>
          <input class="cp-input-input" type="text" v-model="formDataPwd.code" :placeholder="$t('profile.placeholder_code')" />
          <button class="send-code" :disabled="!!pwdText" @click="SendCode('pwd')">{{ pwdText || $t('profile.send_text')}}</button>
        </div>
        <div class="cp-input">
          <div class="cp-input-title">确认密码</div>
          <input class="cp-input-input" type="password" v-model="formDataPwd.new_password" :placeholder="$t('profile.placeholder_newPwd')" />
        </div>
        <div class="cp-input">
          <div class="cp-input-title">确认密码</div>
          <input class="cp-input-input" type="password" v-model="formDataPwd.renew_password" :placeholder="$t('profile.placeholder_confirmNewPwd')" />
        </div>
        <div class="cp-btn" @click="saveChange('pwd')">{{$t('profile.saveChange')}}</div>
      </div>
      <div v-else>
        <div class="cp-input">
          <div class="cp-input-title">{{$t('profile.phone')}}</div>
          <input class="cp-input-input" type="text" v-model="formDataPay.phone" :placeholder="$t('profile.placeholder_phone')" />
        </div>
        <div class="cp-input">
          <div class="cp-input-title">{{$t('profile.code')}}</div>
          <input class="cp-input-input" type="text" v-model="formDataPay.code" :placeholder="$t('profile.placeholder_code')" />
          <button class="send-code" :disabled="!!payText" @click="SendCode('pay')">{{ payText || $t('profile.send_text')}}</button>
        </div>
        <div class="cp-input">
          <div class="cp-input-title">确认密码</div>
          <input class="cp-input-input" readonly type="password" v-model="formDataPay.new_password" 
          :placeholder="$t('profile.placeholder_newPay')" @click="payClick('new_password')"/>
        </div>
        <div class="cp-input">
          <div class="cp-input-title">确认密码</div>
          <input class="cp-input-input" readonly type="password" v-model="formDataPay.renew_password" 
            :placeholder="$t('profile.placeholder_confirmNewPay')" @click="payClick('renew_password')"/>
        </div>
        <div class="cp-btn" @click="saveChange('pay')">{{$t('profile.saveChange')}}</div>
      </div>
    </div>

    <van-overlay :show="oldPayShow">
			<van-password-input
				:value="formDataPay.password"
			/>
			<van-number-keyboard
				:show="oldPayShow"
				@blur="oldPayShow = false"
				@input="writeOldPay"
				@delete="removeOldPay"
			/>
		</van-overlay>

    <van-overlay :show="payShow">
			<van-password-input
				:value="formDataPay.new_password"
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
				:value="formDataPay.renew_password"
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
import CpTabs from "@/components/CpTabs/CpTabs";
import MainNav from "@/components/MainNav/MainNav";
import {Toast} from 'vant'
import {getphonecode,changepassword} from '@/request/api'
export default {
  data() {
    return {
      current: 0, //当前选择的第几个tab
      pwdText: '',  //登录密码发送验证码文字
      payText: '',  //支付密码发送验证码文字
      pwdInterval: '',
      pwdTime: 60,
      payInterval: '',
      payTime: 60,
      formDataPwd: {
        password: '',
        new_password: '',
        renew_password: '',
        type: 1,
        phone: '',
        code: ''
      },
      oldPayShow: false, //原密码
      payShow: false,
      repayShow: false,
      formDataPay: {
        password: '',
        new_password: '',
        renew_password: '',
        type: 2,
        phone: '',
        code: ''
      }
    };
  },
  methods: {
    tabClick(index) {
      this.current = index;
      this.formDataPwd.password = ''
      this.formDataPwd.new_password = ''
      this.formDataPwd.renew_password = ''
      this.formDataPwd.phone = ''
      this.formDataPwd.code = ''
      this.formDataPay.password = ''
      this.formDataPay.new_password = ''
      this.formDataPay.renew_password = ''
      this.formDataPay.phone = ''
      this.formDataPay.code = ''
    },
    SendCode(type){
      if(type == 'pwd') {
        this.getphonecode('pwd',this.formDataPwd.phone)
      }else{
        this.getphonecode('pay',this.formDataPay.phone)
      }
    },
    //获取验证码
    getphonecode(type,phone){
      const _this = this
      getphonecode({phone})
        .then((result) => {
          if(result.code != 200){
            Toast({
              message: result.msg,
              duration: 1000
            })
          }else{
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose(){
                if(type == 'pwd'){
                  _this.pwdTime-=1
                  _this.pwdInterval = setInterval(function(){
                    _this.pwdTime-=1
                    _this.pwdText = _this.pwdTime + 's'
                    if(_this.pwdTime == 0){_this.pwdTime = 30,_this.pwdText = ''}
                  },1000)
                }else{
                  _this.payTime-=1
                  _this.payInterval = setInterval(function(){
                    _this.payTime-=1
                    _this.payText = _this.payTime + 's'
                    if(_this.payTime == 0){_this.payTime = 30,_this.payText = ''}
                  },1000)
                }
              }
            })
          }
        })
    },
    /* 保存密码 */
    saveChange(type){
      const _this = this
      if(type == 'pwd'){
        changepassword(this.formDataPwd)
          .then((result) => {
            _this.doResult(result)
          })
      }else{
        changepassword(this.formDataPay)
          .then((result) => {
            _this.doResult(result)
          })
      }
    },
    //处理返回结果
    doResult(result){
      const _this = this
      if(result.code == 200){
        Toast.success({
          message: result.msg,
          duration: 1000,
          onClose(){
            _this.$router.replace('/login')
          }
        })
      }else{
        Toast({
          message: result.msg,
          duration: 1000,
          /* onClose(){
            _this.tabClick(_this.current)
          } */
        })
      }
    },
    payClick(type){
      if(type == 'new_password'){
        this.formDataPay.new_password = ''
        this.payShow = true
      }else if(type == 'oldPay'){
        this.formDataPay.password = ''
        this.oldPayShow = true
      }else{
        this.formDataPay.renew_password = ''
        this.repayShow = true
      }
    },
    writeOldPay(pwd) {
      this.formDataPay.password += pwd;
			if(this.formDataPay.password.length == 6){
				this.oldPayShow = false
			}
    },
    removeOldPay() {
      this.formDataPay.password = this.formDataPay.password.substr(0,this.formDataPay.password.length-1)
    },
    writePay(pwd) {
      this.formDataPay.new_password += pwd;
			if(this.formDataPay.new_password.length == 6){
				this.payShow = false
			}
    },
    removePay() {
      this.formDataPay.new_password = this.formDataPay.new_password.substr(0,this.formDataPay.new_password.length-1)
    },
    writeRepay(pwd) {
      this.formDataPay.renew_password += pwd;
      if(this.formDataPay.renew_password.length == 6){
        this.repayShow = false
      }
    },
    removeRepay(){
      this.formDataPay.renew_password = this.formDataPay.renew_password.substr(0,this.formDataPay.renew_password.length-1)
    }
  },
  components: { MainNav, CpTabs }
};
</script>

<style scoped>
.cp-input {
  position: relative;
  left: 0;
  right: 0;
  width: initial;
  margin: 0.2667rem 0.3467rem 0;
}
 .cp-input-title {
  margin-left: 0.26666666666666666rem;
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
</style>
