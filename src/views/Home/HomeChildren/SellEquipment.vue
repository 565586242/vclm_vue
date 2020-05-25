<template>
  <div>
    <main-nav :title="$t('title.sellReport')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="#2C303E" ></main-nav>
    <div class="cp-input" @click="pickerShow = true">
      <div class="cp-input-title">{{$t('home.currency')}}</div>
      <input class="cp-input-input" disabled type="text" v-model="formData.currency" :placeholder="$t('home.chooseCurrency')" />
      <button class="send-code">{{$t('home.choose')}}</button>
    </div>
    <div v-for="(item,index) in formData.list" :key="index">
			<div class="cp-input">
				<div class="cp-input-title">{{$t('home.orderNumber')}}{{index + 1}}</div>
				<input class="cp-input-input" type="number" :placeholder="$t('home.placeholder_order')" v-model="item[0]"/>
			</div>
			<div class="cp-input" style="margin-top: .2rem">
				<div class="cp-input-title">{{$t('home.number')}}</div>
				<input class="cp-input-input" type="number" :placeholder="$t('home.placeholder_number')" v-model="item[1]"/>
			</div>
			<div class="cp-input" style="margin-top: .2rem">
				<div class="cp-input-title">{{$t('home.price')}}</div>
				<input class="cp-input-input" type="number" :placeholder="$t('home.placeholder_price')" v-model="item[2]"/>
				<span class="cp-absolute cp-icon">￥</span>
			</div>
			<div class="add-order" v-if="formData.list.length != index+1" @click="removeOrder(index)">-</div>
			<div class="add-order" v-else @click="addOrder">+</div>
		</div>
    <div>
			<div class="cp-note">{{$t('home.nota1')}}{{reportData.breakeven1}}U~{{reportData.breakeven1}}U{{$t('home.nota2')}}</div>
			<div class="cp-btn" @click="confirmClick">{{$t('home.reportBtn')}}</div>
		</div>
    <van-picker
			v-show="pickerShow"
			show-toolbar
			:columns="columns"
			@cancel="onCancel"
			@confirm="onConfirm"
		/>
		<van-overlay :show="confirmBuy">
			<van-password-input
				:value="formData.password"
			/>
			<van-number-keyboard
				:show="confirmBuy"
				@blur="confirmBuy = false"
				@input="writePasword"
				@delete="removePassword"
			/>
		</van-overlay>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav/MainNav";
import {Toast} from 'vant'
import {report,doreport} from '@/request/api'
export default {
  data() {
    return {
      formData: {
				currency: '',
				type: '2',
				password: '',
				list: [['','','']],
			},
			reportData: {},  //报备信息
			pickerShow: false,  //选择币种
			confirmBuy: false,  //确认报备
			columns: ['SOT','FNT']
    };
  },
  methods: {
    //选择币种
		onConfirm(value, index) {
			this.formData.currency = value
			this.pickerShow = false
		},
		//添加订单
		addOrder() {
			this.formData.list.push(['','',''])
		},
		//移除订单号
		removeOrder(index){
			this.formData.list.splice(index,1)
    },
    //点击确认报备
		confirmClick() {
			const list = this.formData.list
			let result = true
			for (const key in list) {
				if(list[key][0] || list[key][1] || list[key][2]){
					if(!(list[key][0] && list[key][1] && list[key][2])){
						result = false
					}
				}
			}
			if(result && this.formData.currency){
				this.confirmBuy = true
				this.formData.password = ''
			}else{
				Toast({
					message: '请将订单填写完整!',
					duration: 1000
				})
			}
    },
    //输入密码
		writePasword(pwd) {
			this.formData.password += pwd;
			if(this.formData.password.length == 6){
				this.confirmBuy = false
				this.doreport()
			}
		},
		//移除密码
		removePassword() {
			this.formData.password = this.formData.password.substr(0,this.formData.password.length-1)
		},
		//取消
    onCancel() {
      this.pickerShow = false
		},
		//报备页面
		report() {
			const _this = this
			report()
				.then(res => {
					_this.reportData = res.data
				})
		},
		//确认报备
		doreport() {
			const list = this.formData.list
			for (const key in list) {
				if(list[key][0] || list[key][1] || list[key][2]){
					if(!(list[key][0] && list[key][1] && list[key][2])){
						Toast({
							message: '请将订单填写完整!',
							duration: 1000
						})
					}
				}
			}
			doreport(this.formData)
				.then(res => {
					console.log(res)
				})
		}
  },
  created(){
    this.report()
  },
  components: { MainNav }
};
</script>

<style scoped>
.cp-input {
  position: relative;
}
.cp-input-title {
  width: 1.6rem;
  margin: 0 0 0 0.26666666666666666rem;
}
.send-code {
  width: 1.6rem;
}
.cp-icon {
  right: -1rem;
  top: 0;
  bottom: 0;
  color: #fff;
  line-height: 1.0666666666666667rem;
}
.add-order{
	width: .6rem;
	height: .6rem;
	border: 1px solid #ccc;
	border-radius: 50%;
	margin: .2rem auto 0;
	font-size: .48rem;
	text-align: center;
	line-height: .6rem;
	color: #fff;
}
</style>
