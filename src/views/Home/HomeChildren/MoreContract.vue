<template>
  <div>
    <main-nav :title="$t('title.moreContract')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <div class="proceeds-flex proceeds-title">
      <div>仓位</div>
      <div>利率</div>
      <div>到期时间</div>
      <div>当前收益</div>
    </div>
    <div class="proceeds-flex proceeds-list" v-for="(item,index) in listData" :key="index">
      <div>{{item.contract_number}}</div>
      <div>{{item.contract_rate}}</div>
      <div>{{item.due_time}}</div>
      <div>{{item.total_profit}}</div>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import {Toast} from 'vant'
import {morecontract} from '@/request/api'
export default {
  data() {
    return {
      listData: []
    };
  },
  methods: {
    morecontract(){
      const _this = this
      morecontract() 
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
    this.morecontract()
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
