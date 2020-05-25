<template>
  <div>
    <main-nav :title="$t('title.incomeDetail')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <div class="proceeds-flex proceeds-title">
      <div>{{$t('home.currency')}}</div>
      <div>{{$t('home.type')}}</div>
      <div>{{$t('home.income')}}</div>
      <div>{{$t('home.time')}}</div>
    </div>
    <div class="proceeds-flex proceeds-list" v-for="(item,index) in listData" :key="index">
      <div>{{item.currency}}</div>
      <div>{{item.type | typeTitle}}</div>
      <div>{{item.amount}}</div>
      <div>{{item.add_time}}</div>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {reportprofit} from '@/request/api'
export default {
  data() {
    return {
      listData: []
    };
  },
  filters: {
    typeTitle(val) {
      if(val == 1){
        return '静态奖'
      }else if(val == 2){
        return '动态奖'
      }else if(val == 3){
        return '级差奖'
      }else if(val == 4){
        return '平级奖'
      }else if(val == 5){
        return '加权分红奖'
      }else if(val == 6){
        return '保本结算'
      }
    }
  },
  methods: {
    reportprofit(){
      const _this = this
      reportprofit() 
        .then((result) => {
          if(result.code == 200){
            _this.listData = result.data
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    }
  },
  created(){
    this.reportprofit()
  },
	components: {MainNav}
};
</script>

<style scoped>
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
</style>
