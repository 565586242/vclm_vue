<template>
  <div class="cp-body">
    <main-nav :title="$t('title.myShare')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <div class="index_top">
      <div>
        <div>直推人数</div>
        <div>{{teamNum}}</div>
      </div>
      <div>
        <div>直推业绩</div>
        <div>{{teamResults}}</div>
      </div>
    </div>
    <div class="cp-title">{{$t('profile.teamDetail')}}</div>
    <div class="proceeds-flex proceeds-title">
      <div>{{$t('profile.nickName')}}</div>
      <div>{{$t('profile.phone')}}</div>
      <div>{{$t('profile.performance')}}</div>
    </div>
    <div class="proceeds-flex proceeds-list" v-for="(item,index) in myDirectInfo" :key="index">
      <div>{{item.user_name}}</div>
      <div>{{item.user_phone}}</div>
      <div>{{item.my_result}}</div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav/MainNav";
import {Toast} from 'vant'
import {myShare} from '@/request/api'
export default {
  data() {
    return {
      myDirectInfo: [],
      teamNum: 0,
      teamResults: 0
    }
  },
  methods: {
    myShare() {
      const _this = this
      myShare()
        .then((result) => {
          _this.myDirectInfo = result.data.myDirectInfo
          _this.teamNum = result.data.teamNum
          _this.teamResults = result.data.teamResults
        })
    }
  },
  created(){
    this.myShare()
  },
  components: { MainNav }
};
</script>

<style scoped>
.index_top {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 2.4rem;
  background: no-repeat url("~assets/img/profile/img_jiesuansy_bg@2x.png")
    center/cover;
  margin: auto 0.3467rem;
  border-radius: 0.13333333333333333rem;
}
.index_top > div {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 1.3333333333333333rem;
}
.index_top > div:first-child:after {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  content: "";
  width: 0.02666666666666667rem;
  height: 0.6666666666666666rem;
  background: no-repeat url("~assets/img/profile/img_fengexian@2x.png")
    center/cover;
  margin: auto;
}
.index_top > div div {
  color: #fff;
  font-size: 0.29333333333333333rem;
}
.index_top > div div:last-child {
  font-size: 0.4rem;
}
.index_top > div:last-child {
  border-right: none;
}
/* 团队明细 */
.proceeds-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  margin: auto 0.3467rem;
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
  background-color: #2c303e;
  color: #fff;
}
</style>
