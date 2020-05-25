<template>
  <div id="order">
    <div id="status-nav">
      <van-nav-bar title="订单管理" @click-left="locationBack">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
      </van-nav-bar>
    </div>
    <van-tabs animated>
      <van-tab title="全部">
        <div class="shop-div" v-for="item in list" :key="item.id" @click="orderDetail(item.id)">
          <div class="shop-title">
            <p>订单号:{{item.order_number}}</p>
            <p style="color: #008DF0;">{{item.status | statusTitle}}</p>
          </div>
          <div class="shop-list">
            <img :src="item.cover_image | imgUrl" alt />
            <div class="shop-list-detail">
              <p class="shop-head">{{item.goods_name}}</p>
              <p class="shop-size">{{item.specifications}}</p>
              <div class="shop-money-div">
                <p class="shop-money">{{Number(item.price || 0).toFixed(2)}}FND</p>
                <p class="shop-number">x1</p>
              </div>
            </div>
          </div>
          <div class="shop-list-bottom">
            <div class="shop-del-btn" v-if="item.status == 2" @click="confirmreceipt(item.id)">确认收货</div>
            <div class="shop-del-btn" v-if="item.status == 3" @click="delorder(item.id)">删除订单</div>
            <div class="money-all">
              <span class="number-all">共{{item.number}}件</span>
              小计:
              <p class="shop-money-all">
                {{Number(item.all_money || 0).toFixed(2)}}FND
              </p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div v-for="item in list" :key="item.id" @click="orderDetail(item.id)">
          <div class="shop-div" v-if="item.status == 1">
            <div class="shop-title">
              <p>订单号:{{item.order_number}}</p>
              <p style="color: #008DF0;">{{item.status | statusTitle}}</p>
            </div>
            <div class="shop-list">
              <img :src="item.cover_image | imgUrl" alt />
              <div class="shop-list-detail">
                <p class="shop-head">{{item.goods_name}}</p>
                <p class="shop-size">{{item.specifications}}</p>
                <div class="shop-money-div">
                  <p class="shop-money">{{Number(item.price || 0).toFixed(2)}}FND</p>
                  <p class="shop-number">x1</p>
                </div>
              </div>
            </div>
            <div class="shop-list-bottom">
              <div class="money-all">
                <span class="number-all">共{{item.number}}件</span>
                小计:
                <p class="shop-money-all">
                  {{Number(item.all_money || 0).toFixed(2)}}FND
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div v-for="item in list" :key="item.id" @click="orderDetail(item.id)">
          <div class="shop-div" v-if="item.status == 2">
            <div class="shop-title">
              <p>订单号:{{item.order_number}}</p>
              <p style="color: #008DF0;">{{item.status | statusTitle}}</p>
            </div>
            <div class="shop-list">
              <img :src="item.cover_image | imgUrl" alt />
              <div class="shop-list-detail">
                <p class="shop-head">{{item.goods_name}}</p>
                <p class="shop-size">{{item.specifications}}</p>
                <div class="shop-money-div">
                  <p class="shop-money">{{Number(item.price || 0).toFixed(2)}}FND</p>
                  <p class="shop-number">x1</p>
                </div>
              </div>
            </div>
            <div class="shop-list-bottom">
              <div class="shop-del-btn" @click="confirmreceipt(item.id)">确认收货</div>
              <div class="money-all">
                <span class="number-all">共{{item.number}}件</span>
                小计:
                <p class="shop-money-all">
                  {{Number(item.all_money || 0).toFixed(2)}}FND
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div v-for="item in list" :key="item.id" @click="orderDetail(item.id)">
          <div class="shop-div" v-if="item.status == 3">
            <div class="shop-title">
              <p>订单号:{{item.order_number}}</p>
              <p style="color: #008DF0;">{{item.status | statusTitle}}</p>
            </div>
            <div class="shop-list">
              <img :src="item.cover_image | imgUrl" alt />
              <div class="shop-list-detail">
                <p class="shop-head">{{item.goods_name}}</p>
                <p class="shop-size">{{item.specifications}}</p>
                <div class="shop-money-div">
                  <p class="shop-money">{{Number(item.price || 0).toFixed(2)}}FND</p>
                  <p class="shop-number">x1</p>
                </div>
              </div>
            </div>
            <div class="shop-list-bottom">
              <div class="shop-del-btn" @click="delorder(item.id)">删除订单</div>
              <div class="money-all">
                <span class="number-all">共{{item.number}}件</span>
                小计:
                <p class="shop-money-all">
                  {{Number(item.all_money || 0).toFixed(2)}}FND
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { shoporder,delorder,confirmreceipt } from "@/request/api";
import imgHost from "assets/js/base";
import { Toast,Dialog } from "vant";
export default {
  data() {
    return {
      list: []
    };
  },
  filters: {
    statusTitle(val){
      if(val == 1){
        return '待发货'
      }else if(val == 2){
        return '待收货'
      }else{
        return '已完成'
      }
    },
    imgUrl(val) {
      return imgHost.imgUrl + val
    }
  },
  methods: {
    orderDetail(id) {
      this.$router.push('/shopChildren/orderDetail?id='+id)
    },
    confirmreceipt(id) {
      Dialog.confirm({
        title: '确认收货',
        message: '确认已经收到商品了吗？'
      }).then((result) => {
        confirmreceipt({id})
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
    delorder(id) {
      Dialog.confirm({
        title: '删除订单',
        message: '确认删除订单吗？'
      }).then((result) => {
        delorder({id})
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
    shoporder(type) {
      const _this = this
      shoporder({type})
        .then((result) => {
          if(result.code == 200){
            _this.list = result.data
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    },
    locationBack() {
      window.history.go(-1);
    }
  },
  created() {
    this.shoporder(1)
  }
};
</script>
<style>
.van-tabs__nav {
  background-color: #f6f6f6;
}
.van-tab--active {
  color: #ee0a24;
}
</style>
<style scoped>
#status-nav {
  background-color: #fff;
}
#order {
  border-top: 64px solid transparent;
  border-bottom: 49px solid transparent;
}
/* 商品卡片 */
.shop-div {
  width: 9.306666rem;
  border-radius: 0.133333rem;
  background-color: #fff;
  margin: 0.066666rem auto 0.266666rem;
  border-radius: 0.1333rem;
  -webkit-border-radius: 0.1333rem;
  -moz-border-radius: 0.1333rem;
  -ms-border-radius: 0.1333rem;
  -o-border-radius: 0.1333rem;
}

.shop-title {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.266666rem;
  border-bottom: 1px solid #f1f1f1;
  color: #282828;
  font-size: 0.346666rem;
  line-height: 0.8rem;
}

.shop-list {
  display: flex;
  box-sizing: border-box;
  padding: 0.133333rem 0.266666rem;
}

.shop-list > img {
  width: 2.533333rem;
  height: 2.666666rem;
  margin-right: 0.266666rem;
  object-fit: cover;
}

.shop-list-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
}

.shop-head {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.346666rem;
  color: #282828;
}

.shop-size {
  height: 0.533333rem;
  border-radius: 0.133333rem;
  font-size: 0.266666rem;
  color: #acacac;
  text-align: left;
  line-height: 0.533333rem;
}

.shop-money-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.533333rem;
}

.shop-money {
  color: #f33;
  font-size: 0.213333rem;
}

.shop-number {
  color: #acacac;
  font-size: 0.32rem;
}

.shop-list-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 0.8rem;
  margin-top: 0.266666rem;
}

.shop-del-btn {
  width: 1.6rem;
  height: 0.533333rem;
  border: 1px solid #acacac;
  border-radius: 0.266666rem;
  text-align: center;
  line-height: 0.533333rem;
  font-size: 0.266666rem;
  color: #4c4c4c;
}

.money-all {
  display: flex;
  font-size: 0.266666rem;
  color: #282828;
}

.number-all {
  display: inline-block;
  width: 1.4rem;
  padding-right: 0.133333rem;
  text-align: right;
  font-size: 0.266666rem;
  color: #acacac;
}

.shop-money-all {
  padding-right: 0.266666rem;
  color: #f33;
  font-size: 0.266666rem;
}

.shop-money-all span {
  font-size: 0.213333rem;
}
</style>