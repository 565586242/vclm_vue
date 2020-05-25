<template>
  <div>
    <main-nav :title="$t('title.profile')" fontColor="#fff" bgColor="#2C303E" :backShow="false" borderBottom="#252935"></main-nav>
    <div class="main-top">
      <img class="main-head" v-lazy="userInfo.user_head?hostUrl + userInfo.user_head : require('@/assets/img/profile/my_img_touxiang@2x.png')">
      <div class="main-name">
        <div>{{userInfo.user_name}}</div>
        <div>{{userInfo.user_phone}}</div>
      </div>
      <div class="main-level">
        <img src="@/assets/img/profile/icon_dengji@2x.png" />{{userInfo.user_level}}
      </div>
    </div>
    <div class="main-money">
      <img class="main-icon" src="@/assets/img/profile/icon_qianbao@2x.png" />
      <router-link to="/profileChildren/myMoney">
        <div class="money-title">{{$t('profile.totalMoney')}}(FND)</div>
        <div class="money-number">{{Number(userInfo.fnd || 0).toFixed(4)}}</div>
      </router-link>
      <img class="cp-next" src="@/assets/img/profile/icon_xiayiye@2x.png" />
    </div>
    <div style="margin-bottom:68px">
      <cp-list :thumb="require('@/assets/img/profile/icon_ziliao@2x.png')" link="/profileChildren/userProfile" :title="$t('title.userProfile')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_myfenxiang@2x.png')" link="/profileChildren/myTeam" title="我的团队" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_yaoqing@2x.png')" link="/profileChildren/inviteFriends" :title="$t('title.inviteFriends')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_myfenxiang@2x.png')" link="/profileChildren/myShare" :title="$t('title.myShare')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_mima@2x.png')" link="/profileChildren/changePwd" :title="$t('title.changePwd')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_xiazai@2x.png')" link="/profileChildren/downloadUrl" :title="$t('title.downloadUrl')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/icon_lianxi@2x.png')" link="/profileChildren/contactUs" :title="$t('title.contactUs')" :right="true"></cp-list>
      <cp-list :thumb="require('@/assets/img/profile/checkout.png')" title="退出登录" :right="true" @click.native="checkout()"></cp-list>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav/MainNav'
import CpList from '@/components/CpList/CpList'
import hostUrl from 'assets/js/base'
import {Toast} from 'vant'
import {mine} from '@/request/api'
export default {
  data() {
    return {
      hostUrl: hostUrl.imgUrl,
      userInfo: {}
    };
  },
  methods: {
    mine() {
      const _this = this
      mine()
        .then((result) => {
          localStorage.setItem('loginUser',JSON.stringify(result.data))
          _this.userInfo = result.data
        })
    },
    checkout() {
      const _this = this
      Toast({
        message: '退出成功',
        duration: 1000,
        onClose() {
          localStorage.clear()
          _this.$router.replace('/')
        }
      })
    }
  },
  created() {
    this.mine()
  },
  components: {MainNav,CpList}
};
</script>

<style scoped>
.main-top {
  display: flex;
  box-sizing: border-box;
  height: 3.066666666666667rem;
  padding: 0.4rem 0 0 0.6266666666666667rem;
  background-color: #2c303e;
}
.main-head {
  width: 1.1733333333333333rem;
  height: 1.1733333333333333rem;
  border-radius: 50%;
  margin-right: 0.26666666666666666rem;
}
.main-name {
  display: flex;
  flex-direction: column;
  width: 3.466666666666667rem;
  font-size: 0.4rem;
  line-height: 0.6rem;
}
.main-level {
  font-size: 0.3466666666666667rem;
}
.main-level img {
  width: 0.4rem;
  height: 0.37333333333333335rem;
  margin-right: 0.13333333333333333rem;
  vertical-align: middle;
}
.main-name div:nth-child(2) {
  font-size: 0.3466666666666667rem;
  color: #c0c0cf;
}
.main-money {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2.1333333333333333rem;
  margin: -1.0666666666666667rem auto 0.26666666666666666rem;
  background-color: #363b4b;
  border-radius: 0.13333333333333333rem;
  box-shadow: 0 0 0.2rem 0.10666666666666667rem rgba(54, 59, 75, 0.5);
}
.main-money > a {
  width: 5.333333333333333rem;
  color: #fff;
}
.money-title {
  font-size: 0.29333333333333333rem;
  margin-bottom: 0.13333333333333333rem;
}
.money-number {
  font-size: 0.4rem;
}
.main-icon {
  width: 0.6933333333333334rem;
  height: 0.7066666666666667rem;
  margin-right: 0.26666666666666666rem;
}
</style>