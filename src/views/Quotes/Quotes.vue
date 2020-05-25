<template>
  <div class="cp-body">
    <main-nav :title="$t('title.quotes')" fontColor="#fff" bgColor="transparent" :backShow="false" borderBottom="none"></main-nav>
    <div class="market-title">
      <div style="flex: 1;">{{$t('quotes.name')}}</div>
      <div style="width: 2rem;">{{$t('quotes.price')}}</div>
      <div style="width: 2rem">{{$t('quotes.increase')}}</div>
    </div>
    <div class="market-item" v-for="(item,index) in resultData" :key="index">
      <div class="market-left">
        <img class="market-money" :src="item.logo" mode />
        <div>
          <div class="marker-platform">
            {{index}}平台
          </div>
          <div class="market-remark">{{(item.total_supply/100000000).toFixed(2)}}亿{{index}}/{{(item.total_usdt/100000000).toFixed(2)}}亿USDT</div>
        </div>
      </div>
      <div class="market-price">{{item.price}}</div>
      <div>
        <span class="show-gains" :class="item.zf < 0?'show-down':'show-up'">{{item.zf.toFixed(4)}}%</span>
      </div>
    </div>
  </div>
</template>
<script>
import MainNav from 'components/MainNav/MainNav'
import {hangqing} from '../../request/api';
export default {
  data() {
    return {
      resultData: {},
      intervalTime: null
    };
  },
  methods: {
    hangqing() {
      const _this = this;
      hangqing()
        .then((result) => {
          _this.resultData = result.data;
        })
    }
  },
  created() {
    const _this = this;
    this.hangqing()
    this.intervalTime = setInterval(function(){
      _this.hangqing()
    },5000)
  },
  beforeDestroy() {
    clearInterval(this.intervalTime);
    this.intervalTime = null;
  },
  components: {MainNav}
};
</script>

<style scoped>
.market-title {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  background-color: #2c303e;
  margin: 0 0.1333rem;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.32rem;
}
.market-title > div {
  text-align: center;
}
.market-title > div:first-child {
  width: 3.7333333333333334rem;
}
.market-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.1333rem;
}
.market-left {
  display: flex;
  align-items: center;
  flex: 1;
}
.market-money {
  width: 0.6666666666666666rem;
  height: 0.6666666666666666rem;
  object-fit: contain;
  margin: 0.26666666666666666rem 0.26666666666666666rem 0.26666666666666666rem 0;
}
.marker-platform {
  font-size: 0.29333333333333333rem;
  color: #a9a9bb;
}
.marker-platform span {
  padding-right: 0.26666666666666666rem;
  color: #fff;
  font-size: 0.4rem;
}
.market-remark {
  font-size: 0.24rem;
  color: #c0c0cf;
}
.market-price {
  width: 2rem;
  color: #fff;
  font-size: 0.4266666666666667rem;
  text-align: center;
}
.show-gains {
  display: inline-block;
  min-width: 2rem;
  height: 0.6666666666666666rem;
  border-radius: 0.08rem;
  font-size: 0.3466666666666667rem;
  line-height: 0.6666666666666666rem;
  color: #fff;
  text-align: center;
}
.show-up {
  background-color: #3eb271;
}
.show-down {
  background-color: #dd2a2a;
}
</style>