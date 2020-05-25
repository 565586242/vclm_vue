<template>
  <div id="address">
    <div id="status-nav">
      <van-nav-bar title="收货地址" @click-left="locationBack">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
        <div
          slot="right"
          style="color: #f33;"
          @click="$router.push('/shopChildren/addAddress')"
        >添加地址</div>
      </van-nav-bar>
    </div>
    <div class="no-address" v-if="noAddress"></div>
    <div class="address-list" v-for="item in addressList" :key="item.id" @click="chooseAddress(item)">
      <img class="address-icon" src="~assets/img/shop/icon_dizhi02@2x.png" alt />
      <a style="color:black;" >
        <div class="address-content">
          <p class="address-name">
            {{item.user_name}}<span class="address-tel">{{item.user_phone}}</span>
          </p>
          <p>
            <span class="adress-more" v-if="item.is_default == 2">默认</span>{{item.all_address}}
          </p>
        </div>
      </a>
      <div class="adress-edit">
        <div @click.stop="$router.push('/shopChildren/addAddress?id='+item.id)">
          <img src="~assets/img/shop/icon_xiugai@2x.png" alt />修改
        </div>
        <div @click.stop="addressdel(item.id)">
          <img src="~assets/img/shop/icon_delete@2x.png" alt />删除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addersslist,addressdel } from "@/request/api";
import { Toast,Dialog } from "vant";
export default {
  data() {
    return {
      noAddress: true,  //无地址
      addressList: [],  //列表
      historyPage: ''  //前一个页面
    };
  },
  methods: {
    addressdel(id) {
      Dialog.confirm({
        title: '删除地址',
        message: '确认删除该地址吗?'
      }).then(() => {
        addressdel({id})
          .then((result) => {
            if(result.code == 200){
              Toast.success({
                message: result.msg,
                duration: 1000,
                onClose() {
                  location.reload()
                }
              })
            }else{
              Toast({
                message: result.msg,
                duration: 1000
              })
            }
          })
      }).catch(() => {})
    },
    chooseAddress(address) {
      if(this.historyPage){
        localStorage.setItem('chooseAddress',JSON.stringify(address))
        window.history.go(-1)
      }
    },
    addersslist() {
      const _this = this
      addersslist()
        .then(result => {
          if(result.data.addressList.length) {
            _this.addressList = result.data.addressList
            _this.noAddress = false
          }
        });
    },
    locationBack() {
      window.history.go(-1);
    }
  },
  created() {
    this.historyPage = localStorage.getItem('confirmOrder') || ''
    this.addersslist();
  }
};
</script>

<style scoped>
#status-nav {
  background-color: #fff;
}
#address {
  border-top: 65px solid transparent;
  border-bottom: 49px solid transparent;
}
.no-address {
  width: 3.6rem;
  height: 2.4rem;
  margin: 3.333333rem auto 0;
  background: no-repeat url("~assets/img/shop/icon_zanwudizhi@2x.png")
    center/cover;
}
.address-list {
  display: flex;
  align-items: center;
  width: 9.306666rem;
  height: 2rem;
  margin: 0.266666rem auto 0;
  background-color: #fff;
}
.address-icon {
  width: 0.666666rem;
  height: 0.8rem;
  margin: 0 0.266666rem;
}
.address-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.293333rem;
  width: 6rem;
  height: 1.633333rem;
  margin-right: 0.533333rem;
}
.address-name {
  line-height: 0.533333rem;
  font-size: 0.346666rem;
}
.address-tel {
  padding-left: 0.266666rem;
  color: #acacac;
  font-size: 0.293333rem;
  line-height: 0.533333rem;
}
.adress-more {
  color: #f33;
}
.adress-edit {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.633333rem;
  font-size: 0.266666rem;
  line-height: 0.533333rem;
  color: #282828;
}
.adress-edit img {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.266666rem;
  vertical-align: middle;
}
</style>