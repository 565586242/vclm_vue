<template>
  <div class="cp-body">
    <main-nav :title="$t('title.settlemenIncome')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none">
      <span slot="right" class="nav-right" @click="$router.push('/homeChildren/proceedsDetail')">{{$t('title.incomeDetail')}}</span>
    </main-nav>
    <div class="cp-card">
      <div class="card-top">
        <div class="card-top-title">{{$t('home.cumulativeIncome')}}</div>
        <div class="card-top-price">{{Number(totalAmount || 0).toFixed(4)}}</div>
      </div>
      <div class="card-bottom">
        <div>
          <div class="card-botom-title">{{$t('home.todayIncome')}}</div>
          <div class="card-bottom-price">{{Number(todayAmount || 0).toFixed(4)}}</div>
        </div>
        <div>
          <div class="card-botom-title">{{$t('home.availableIncome')}}</div>
          <div class="card-bottom-price">{{Number(lastAmount || 0).toFixed(4)}}</div>
        </div>
      </div>
    </div>
    <div class="cp-title">{{$t('home.orderIncome')}}</div>
    <div class="cp-relative cp-list" v-for="(item,index) in reportList" :key="index">
      <div class="cp-list-order">{{$t('home.singleNumber')}}:{{item.order_number}}</div>
      <div :class="item.type == 1 ? 'cp-color-green': 'cp-color-red'">{{item.type == 1 ? '买入' : '卖出'}}</div>
      <div class="send-code" v-if="item.type == 2" @click="formData.order_number = item.order_number;pickerShow = true">{{$t('home.settlement')}}</div>
    </div>

    <van-picker
			v-show="pickerShow"
			show-toolbar
			:columns="columns"
			@cancel="pickerShow = false"
			@confirm="onConfirm"
		/>
    
    <van-overlay :show="payShow">
			<van-password-input
				:value="formData.password"
			/>
			<van-number-keyboard
				:show="payShow"
				@blur="payShow = false"
				@input="writePasword"
				@delete="removePassword"
			/>
		</van-overlay>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {settlement,dosettlement} from '@/request/api'
export default {
  data() {
    return {
      lastAmount: 0,
      reportList: [],
      todayAmount: 0,
      totalAmount: 0,
      pickerShow: false,
      columns: ['保本结算','正常结算'],
      payShow: false,
      formData: {
        order_number: '',
        type: '',
        password: ''
      }
    };
  },
  methods: {
    //结算类型的点击
		onConfirm(value, index) {
      this.pickerShow = false
      this.formData.type = index == 0 ? 1 : 2
      this.formData.password = ''
      this.payShow = true
    },
    dosettlement(){
      const _this = this
      dosettlement(this.formData)
        .then((result) => {
          if(result.code == 200){
            Toast.success({
              message: result.msg,
              duration: 1000,
              onClose(){
                _this.$router.replace('/home')
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
    //输入密码
		writePasword(pwd) {
			this.formData.password += pwd;
			if(this.formData.password.length == 6){
				this.payShow = false
				this.dosettlement()
			}
		},
		//移除密码
		removePassword() {
			this.formData.password = this.formData.password.substr(0,this.formData.password.length-1)
		},
    settlement() {
      const _this = this
      settlement()
        .then((res) => {
          _this.lastAmount = res.data.lastAmount
          _this.reportList = res.data.reportList
          _this.todayAmount = res.data.todayAmount
          _this.totalAmount = res.data.totalAmount
        })
    }
  },
  created(){
    this.settlement()
  },
	components: {MainNav}
};
</script>

<style scoped>
.nav-right{
	position: absolute;
	right: 0;
	top: 0;
	width: 70px;
	font-size: 14px;
}
 
.proceeds-detail {
  margin-right: 0.26666666666666666rem;
  font-size: 0.26666666666666666rem;
}
/* 卡片效果 */
.cp-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  width: 9.306666666666667rem;
  height: 3.2rem;
  margin: 0.13333333333333333rem auto;
  background: no-repeat url('~assets/img/home/img_jiesuansy_bg@2x.png')
    center/cover;
  text-align: center;
  color: #fff;
  line-height: 0.5333333333333333rem;
}
.card-top-title {
  font-size: 0.32rem;
}
.card-top-price {
  font-size: 0.4266666666666667rem;
}
.card-botom-title {
  font-size: 0.29333333333333333rem;
}
.card-bottom-price {
  font-size: 0.37333333333333335rem;
}
.card-bottom {
  display: flex;
}
.card-bottom > div {
  width: 50%;
}
.card-bottom > div:first-child {
  position: relative;
}
.card-bottom > div:first-child:after {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  content: "";
  width: 0.02666666666666667rem;
  height: 0.4rem;
  background: no-repeat url();
  margin: auto;
}
.cp-list {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 9.306666666666667rem;
  height: 1.0666666666666667rem;
  border-radius: 0.13333333333333333rem;
  background-color: #2c303e;
  margin: 0.26666666666666666rem auto;
  line-height: 1.0666666666666667rem;
  color: #fff;
  font-size: 0.37333333333333335rem;
}
.cp-list-order {
  width: 5rem;
  text-align: left;
  text-indent: 0.26666666666666666rem;
}
</style>
