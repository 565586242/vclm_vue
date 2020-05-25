<template>
  <div class="cp-body">
    <main-nav title="FND" fontColor="#fff" bgColor="#2C303E" :backShow="true" borderBottom="#252935"></main-nav>
    <div id="echarts"></div>
    <div class="cp-title">{{$t('profile.moneyRecord')}}</div>
    <div class="proceeds-flex proceeds-title">
      <div>{{$t('home.currency')}}</div>
      <div>{{$t('home.number')}}</div>
      <div>{{$t('home.type')}}</div>
      <div>{{$t('home.time')}}</div>
    </div>
    <div class="proceeds-flex proceeds-list" v-for="(item,index) in walletLog" :key="index">
      <div>{{item.currency}}</div>
      <div>{{item.amount}}</div>
      <div>{{item.log_note}}</div>
      <div>{{item.addtime}}</div>
    </div>
    <div class="config">
      <div @click="$router.push('/profileChildren/moneyChildren/transferIn/'+$route.params.type)">
        <img src="~assets/img/profile/icon_zhuanru@2x.png" alt="">
        <span>转入</span>
      </div>
      <div @click="$router.push('/profileChildren/moneyChildren/transferOut/'+$route.params.type)">
        <img src="~assets/img/profile/icon_zhuanchu@2x.png" alt="">
        <span>转出</span>
      </div>
      <!-- <div @click="$router.push('/profileChildren/moneyChildren/flash/'+$route.params.type)">
        <img src="~assets/img/profile/icon_shandui@2x.png" alt="">
        <span>{{$t('profile.flash')}}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {tradRecord} from '@/request/api'
import echarts from 'echarts'
export default {
  data() {
    return {
      xData: {},
      verticalValue: {},
      walletLog: {}
    }
  },
  methods: {
    echarts() {
      var myChart = echarts.init(document.getElementById('echarts'));
      var option = {
        xAxis: {
          type: 'category',
          data: this.xData,
          splitLine:{show: true},
          axisTick:{
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          position: 'right',
          splitLine:{show: false},
          axisTick:{
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'#fff'
            }
          }
        },
        series: [{
          data: this.verticalValue,
          type: 'line',
          smooth: true
        }]
      };
      myChart.setOption(option);
    },
    tradRecord() {
      const _this = this
      tradRecord({currency:this.$route.params.type})
        .then((result) => {
          if(result.code == 200){
            _this.walletLog = result.data.walletLog
            _this.verticalValue = result.data.verticalValue
            _this.xData = result.data.date
            _this.$nextTick(() => {
              _this.echarts()
            })
          }
        })
    }
  },
  created() {
    this.tradRecord()
  },
  components: {MainNav}
}
</script>

<style scoped>
.cp-body{
  padding-bottom: 2.4rem;
}
#echarts{
  width: 9.3067rem;
  height: 4.8rem;
  margin: 0.2667rem auto;
  background-color: rgba(54,59,75,1);
  border-radius: 0.1333rem;
}
.proceeds-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 9.306666666666667rem;
  height: 0.8rem;
  margin: auto;
  font-size: 0.3466666666666667rem;
  text-align: center;
}
.proceeds-flex > div {
  flex: 1;
}
.proceeds-title {
  background-color: #363b4b;
  border-top-left-radius: 0.13333333333333333rem;
  border-top-right-radius: 0.13333333333333333rem;
  color: #c0c0cf;
}
.proceeds-list {
  padding: .1rem 0;
  background-color: #2c303e;
  color: #fff;
}
.config{
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 2rem;
  background-color: #252935;
  font-size: .48rem;
}
.config div{
  flex: 1;
  text-align: center;
}
.config img{
  width: 0.56rem;
  height: 0.56rem;
  vertical-align: bottom;
}
</style>