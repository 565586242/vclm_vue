<template>
  <div>
		<main-nav title="收益详情" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <div class="heyue-top">
      <img class="heyue-top-img" src="~assets/img/ecology/img_heyue_02@2x.png" mode />
      <div class="heyue-top-div">
        <div class="cp-card">
          <div class="card-top">
            <div class="card-top-title">累计收益(FND)</div>
            <div class="card-top-price">{{totalProfit.toFixed(2)}}</div>
          </div>
          <div class="card-bottom">
            <div>
              <div class="card-botom-title">今日收益(FND)</div>
              <div class="card-bottom-price">{{todayProfig.toFixed(2)}}</div>
            </div>
            <div>
              <div class="card-botom-title">总投入(FND)</div>
              <div class="card-bottom-price">{{totalIn.toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="heyue-bottom-div">
        <div class="cp-title">收益说明</div>
        <div class="bottom-div">
          <div class="bottom-title">
            <div>{{contract_number.contract_day1}}天日收益率</div>
            <div>{{contract_number.contract_day2}}天日收益率</div>
            <div>{{contract_number.contract_day3}}天日收益率</div>
          </div>
          <div class="bottom-list">
            <div>{{contract_number.contract_rate1}}‰</div>
            <div>{{contract_number.contract_rate2}}‰</div>
            <div>{{contract_number.contract_rate3}}‰</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cp-title">合约明细</div>
    <div class="proceeds-flex proceeds-title">
      <div>仓位</div>
      <div>日收益率</div>
      <div>到期时间</div>
      <div>总收益</div>
    </div>
    <div class="proceeds-flex proceeds-list" v-for="(item,index) in list" :key="index">
      <div>{{item.contract_number}}FND</div>
      <div>{{item.contract_rate}}‰</div>
      <div>{{item.due_time}}</div>
      <div>{{item.total_profit}}</div>
    </div>
    <van-tabs animated @click="TabClick">
      <van-tab title="全部">
        <div v-for="(item,index) in profitList" :key="index" class="tab-list">
          <div>
            <p>{{item.type}}</p>
            <p>{{item.add_time}}</p>
          </div>
          <span>{{item.amount}}FND</span>
        </div>
      </van-tab>
      <van-tab title="直推奖">
        <div v-for="(item,index) in profitList" :key="index" class="tab-list">
          <div>
            <p>{{item.type}}</p>
            <p>{{item.add_time}}</p>
          </div>
          <span>{{item.amount}}FND</span>
        </div>
      </van-tab>
      <van-tab title="团队奖">
        <div v-for="(item,index) in profitList" :key="index" class="tab-list">
          <div>
            <p>{{item.type}}</p>
            <p>{{item.add_time}}</p>
          </div>
          <span>{{item.amount}}FND</span>
        </div>
      </van-tab>
      <van-tab title="静态收益">
        <div v-for="(item,index) in profitList" :key="index" class="tab-list">
          <div>
            <p>{{item.type}}</p>
            <p>{{item.add_time}}</p>
          </div>
          <span>{{item.amount}}FND</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {Toast} from 'vant'
import {contractDetail} from '@/request/api'
export default {
  data() {
    return {
      contract_number: [],  //收益说明
      todayProfig: 0,  //今日收益
      totalIn: 0,  //总投入
      totalProfit: 0,  //累计收益
      list: [],  //合约明细
      profitList: [],   //收益明细
    };
  },
  methods: {
    contractDetail(index) {
      const _this = this
      contractDetail({
        type: index || 0
      })
        .then((result) => {
          if(result.code == 200){
            _this.contract_number = result.data.contract_number
            _this.todayProfig = result.data.todayProfig
            _this.totalIn = result.data.totalIn
            _this.totalProfit = result.data.totalProfit

            _this.list = result.data.list 
            _this.profitList = result.data.profitList 
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    },
    TabClick(name, title) {
      this.contractDetail(name);
    }
  },
  created() {
    this.contractDetail()
  },
	components: {MainNav}
};
</script>

<style scoped>
.heyue-top {
  position: relative;
  display: block;
  width: 9.306666666666667rem;
  height: 9.053333333333333rem;
  margin: 0.13333333333333333rem auto;
}
.heyue-top-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.heyue-top-div {
  position: absolute;
  top: 0;
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
.heyue-bottom-div {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 9.306666666666667rem;
  height: 5.333333333333333rem;
  padding: 0 0.26666666666666666rem;
}
.bottom-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  font-size: 0.26666666666666666rem;
  color: #c0c0cf;
  text-align: center;
}
.bottom-title > div {
  flex: 1;
}
.bottom-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  text-align: center;
  font-size: 0.37333333333333335rem;
}
.bottom-list > div {
  flex: 1;
}
/* 交易明细 */
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
  margin-top: 0.26666666666666666rem;
  background-color: #363b4b;
  border-top-left-radius: 0.13333333333333333rem;
  border-top-right-radius: 0.13333333333333333rem;
  color: #c0c0cf;
}
.proceeds-list {
  padding: .2rem 0;
  background-color: #2c303e;
  color: #fff;
}

.tab-list{
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 1rem;
  margin: .2rem 0.3467rem 0 0.3467rem;
}
.tab-list > div{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.tab-list > div p{
  flex: 1;
  font-size: 0.38rem;
}
.tab-list > div p:last-child{
  font-size: 0.3rem;
  color: #ccc;
}
.tab-list span{
  font-size: 0.42rem;
}
.van-tabs >>> .van-tab{
  color: #fff;
}
.van-tabs >>> .van-tab__pane{
  overflow-y: scroll;
  height: 10rem;
}
.van-tabs >>> .van-tabs__nav{
  background-color: transparent;
}
.van-tabs >>> [class*=van-hairline]::after{
  border: none;
}
.van-tabs >>> .van-tabs__line{
  background-color: #ccc;
}
</style>
