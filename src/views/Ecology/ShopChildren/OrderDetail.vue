<template>
  <div id="detail">
    <div id="status-nav">
      <van-nav-bar title="订单详情" @click-left="locationBack">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
      </van-nav-bar>
    </div>
    <div class="order_details">
			<div class="change_password_box">
				<div class="express_box">
					<div class="address_list express" v-if="orderInfo.send_company">
						<div class="address_list_left">
							<h5>{{orderInfo.send_company}}<span>{{orderInfo.send_time}}</span></h5>
							<p>{{orderInfo.send_number}}</p>
						</div>
					</div>
					<div class="address_list">
						<div class="address_list_left">
							<h5>{{address.user_name}}<span>{{address.user_phone}}</span></h5>
							<p>{{address.all_address}}</p>
						</div>
					</div>
				</div>
				<div class="order_main_box">
					<div class="order_main">
						<div class="order_shop">
							<div class="order_shop_img"><img :src="orderInfo.cover_image | imgUrl" alt=""></div>
							<div class="order_shop_text">
								<h6>{{orderInfo.goods_name}}</h6>
								<h4><span>{{orderInfo.specifications}}</span></h4>
								<p>{{orderInfo.price}}<span>X{{orderInfo.number}}</span>FND</p>
							</div>
						</div>
					</div>
					<div class="order_moner">
						<p>实付款:<i>{{orderInfo.all_money}}FND</i></p>
					</div>
				</div>
				<div class="order_information">
					<h5>订单信息</h5>
					<p>订单编号<span>{{orderInfo.order_number}}</span></p>
					<p>创建时间<span>{{orderInfo.add_time}}</span></p>
					<p>付款时间<span>{{orderInfo.add_time}}</span></p>
					<p>发货时间<span>{{orderInfo.send_time}}</span></p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import imgHost from "assets/js/base";
import { orderdetail } from "@/request/api";
export default {
  data() {
    return {
      address: {},
      orderInfo: {}
    }
  },
  methods: {
    orderdetail(id) {
      const _this = this
      orderdetail({id}) 
        .then((result) => {
          _this.address = result.data.address
          _this.orderInfo = result.data.orderInfo
        })
    },
    locationBack() {
      window.history.go(-1)
    }
  },
  filters: {
    imgUrl(val) {
      if(val){
        return imgHost.imgUrl + val
      }
    }
  },
  created() {
    this.orderdetail(this.$route.query.id)
  }
}
</script>

<style scoped>
#status-nav {
  background-color: #fff;
}
#detail {
  border-top: 64px solid transparent;
}
.change_password_box {
	margin: 0.2rem 0.3rem 0;
}

.express_box {
	border-radius: 5px;
	box-shadow: 1px 1px 2px #eee;
	overflow: hidden;
}

.address_list {
	background: url('~assets/img/shop/icon_dizhi02@2x.png') 0.2rem center #fff no-repeat;
	background-size: 0.7rem;
	padding: 0.2rem;
	display: flex;
	display: -webkit-flex;
}

.express {
	background: url('~assets/img/shop/icon_kuaidi@2x.png') 0.2rem center #fff no-repeat !important;
	background-size: 0.8rem !important;
	border-bottom: 1px solid #eee;
}

.address_list_left {
	flex: 4;
	-webkit-flex: 4;
	padding-left: 1rem;
	padding-right: 0.2rem;
}

.address_list_left h5 {
	font-size: 0.36rem;
	color: #282828;
	margin-top: 0.1rem;
  font-weight: normal;
}

.address_list_left h5 span {
	color: #acacac;
	margin-left: 0.2rem;
}

.address_list_left p {
	font-size: 0.34rem;
	color: #282828;
	margin-top: 0.15rem;
}

.order_main_box,
.order_information {
	background: #fff;
	margin-top: 0.2rem;
	border-radius: 5px;
	box-shadow: 1px 1px 2px 1px #eee;
	padding-bottom: 0.1rem;
}

.order_information h5 {
	font-size: 0.38rem;
	height: 0.8rem;
	line-height: 0.8rem;
	border-bottom: 1px solid #eee;
	padding: 0 0.2rem;
	color: #333;
	margin-bottom: 0.2rem;
}

.order_information p {
	padding: 0 0.2rem;
	height: 0.65rem;
	line-height: 0.65rem;
	color: #333;
	font-size: 0.35rem;
}

.order_information p span {
	margin-left: 0.6rem;
}

.order_shop {
	display: flex;
	display: -webkit-flex;
	padding: 0.2rem 0;
}

.order_shop_img {
	flex: 1;
	-webkit-flex: 1;
	width: 2.8rem;
	min-width: 2.8rem;
	max-width: 2.8rem;
	text-align: center;
}

.order_shop_img img {
	width: 2.3rem;
	height: 2.35rem;
}

.order_shop_text {
	flex: 3;
	-webkit-flex: 3;
}

.order_shop_text h6 {
	color: #333;
	font-size: 0.36rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 0.5rem;
	padding-right: 0.1rem;
}

.order_shop_text h4 {
	height: 0.5rem;
	line-height: 0.5rem;
	font-size: 0.32rem;
	font-weight: normal;
	margin-top: 0.1rem;
}

.order_shop_text h4 span {
	display: inline-block;
	background: #f6f6f6;
	color: #acacac;
	padding: 0 0.15rem;
	border-radius: 3px;
	margin-right: 0.2rem;
	height: 0.5rem;
	line-height: 0.5rem;
}

.order_shop_text p {
	color: red;
	font-size: 0.36rem;
	padding-right: 0.2rem;
	margin-top: 0.32rem;
}

.order_moner p button {
	position: absolute;
	left: 2.4rem;
	top: 0;
	border-radius: 25px;
	height: 0.6rem;
	line-height: 0.6rem;
	font-size: 0.32rem;
	padding: 0 0.3rem;
	margin-top: 0.1rem;
}

.order_shop_text p i {
	font-style: normal;
	font-size: 0.3rem;
}

.order_shop_text p span {
	float: right;
	color: #acacac;
	font-size: 0.32rem;
}

.order_moner {
	margin-top: 0.2rem;
	padding: 0 0.2rem;
}

.order_moner p {
	height: 0.7rem;
	line-height: 0.7rem;
	font-size: 0.34rem;
	position: relative;
	color: #333;
}

.order_moner p span {
	float: right;
}

.order_moner p i {
	font-style: normal;
	color: red;
	float: right;
}
</style>