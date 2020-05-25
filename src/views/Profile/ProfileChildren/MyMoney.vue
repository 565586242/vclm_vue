<template>
  <div class="cp-body">
    <main-nav :title="$t('title.myMoney')" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div class="container-top">
      <div class="main-money">
        <img class="main-icon" src="~assets/img/profile/icon_qianbao@2x.png" />
        <div>
          <div class="money-title">{{$t('profile.totalMoney')}}</div>
          <div class="money-number">{{Number(resultData.fnd || 0).toFixed(4)}}</div>
        </div>
      </div>
    </div>
    <div class="moneys">
      <!-- <div class="money-list" @click="currenyDetail('fnt')">
        <img class="money-icon" src="~assets/img/money-icon/img_fnt@2x.png" alt="">
        <span>FNT</span>
        <div>
          <p>{{resultData.FNT || 0}}</p>
        </div>
        <img class="cp-next" src="~assets/img/profile/icon_xiayiye@2x.png" />
      </div> -->
      <div class="money-list" @click="currenyDetail('fnd')">
        <img class="money-icon" src="~assets/img/money-icon/img_fnd@2x.png" alt="">
        <span>FND</span>
        <div>
          <p>{{Number(resultData.fnd || 0).toFixed(4)}}</p>
        </div>
        <img class="cp-next" src="~assets/img/profile/icon_xiayiye@2x.png" />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {myWallet} from '@/request/api'
export default {
  data() {
    return {
      resultData: {}
    }
  },
  methods: {
    currenyDetail(type) {
      this.$router.push('/profileChildren/moneyChildren/moneyDetail/'+type)
    },
    transferOut(type){
      this.$router.push('/profileChildren/moneyChildren/transferOut/'+type)
    },
    myWallet() {
      const _this = this
      myWallet()
        .then((result) => {
          _this.resultData = result.data
        })
    }
  },
  created() {
    this.myWallet()
  },
  components: {MainNav}
}
</script>

<style scoped>
.container-top{
  height: 3.36rem;
  background-color: #2C303E;
}
.main-money {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  padding-top: 1rem;
  margin: auto;
  text-align: center;
}
.main-icon {
  width: 0.6933333333333334rem;
  height: 0.7066666666666667rem;
  margin-right: 0.48rem;
}
.money-title {
  font-size: 0.29333333333333333rem;
  margin-bottom: 0.13333333333333333rem;
}
.money-number {
  font-size: 0.4rem;
}
.moneys{
  position: relative;
  top: -0.7333rem;
  width: 8.5333rem;
  padding-bottom: 1.4rem;
  background-color: #252935;
  margin: auto;
  border-radius: 0.1333rem;
  box-shadow: 0 0 0.2rem 0.0267rem rgba(255, 255, 255, .1);
}
.money-list{
  display: flex;
  align-items: center;
  width: 7.7333rem;
  margin: 0 auto;
  height: 1.8667rem;
  border-bottom: 1px solid #363B4B;
}
.money-list:last-child{
  border-bottom: none;
}
.money-list span{
  flex: 1;
  font-size: .48rem;
  padding: 0 .4rem;
}
.money-list > div{
  width: 4rem;
  margin-right: 0.2667rem; 
  font-size: 0.3467rem;
  text-align: right;
  color: #C0C0CF;
}
.money-icon{
  width: 0.9067rem;
  height: 0.9067rem;
  object-fit: cover;
  border-radius: 50%;
}
</style>