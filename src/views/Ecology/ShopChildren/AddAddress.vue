<template>
  <div id="address">
    <div id="status-nav">
      <van-nav-bar :title="$route.query.id?'修改地址':'添加地址'" @click-left="locationBack">
        <img class="nav-bar-left" slot="left" src="~assets/img/shop/icon_fanhui_02@2x.png" />
      </van-nav-bar>
    </div>
    <div class="address-list" style="margin-top: 0.2667rem;">
      <div class="address-title">收货人姓名</div>
      <input class="list-div-input" type="text" v-model="formData.user_name" placeholder="请输入收货人姓名" />
    </div>
    <div class="address-list">
      <div class="address-title">收货手机号</div>
      <input
        class="list-div-input"
        type="number"
        v-model="formData.user_phone"
        placeholder="请输入收货人手机号"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
    </div>
    <div class="address-list" @click="chooseCity = true">
      <div class="address-title">选择省份</div>
      <input
        class="list-div-input"
        type="text"
        readonly
        v-model="formData.address[0]"
        placeholder="请选择省份"
      />
      <div class="adress-right">></div>
    </div>
    <div class="address-list" @click="chooseCity = true">
      <div class="address-title">选择城市</div>
      <input
        class="list-div-input"
        type="text"
        readonly
        v-model="formData.address[1]"
        placeholder="请选择城市"
      />
      <div class="adress-right">></div>
    </div>
    <div class="address-list" @click="chooseCity = true">
      <div class="address-title">选择区/县</div>
      <input
        class="list-div-input"
        type="text"
        readonly
        v-model="formData.address[2]"
        placeholder="请选择区/县"
      />
      <div class="adress-right">></div>
    </div>
    <div class="address-list">
      <div class="address-title">详细地址</div>
      <input class="list-div-input" type="text" v-model="formData.street" placeholder="请输入详细地址" />
    </div>
    <div
      class="radio-input-div"
      style="padding-left: 0.266666rem;font-size: 0.346666rem;"
      @click="checkboxClick"
    >
      <i class="radio-icon" :class="formData.is_default == 2?'radio-icon-checked':''"></i>
      <label>设为默认地址</label>
    </div>
    <div class="cp-btn" style="margin-top: 1.333333rem;" @click="addressdoadd">保存地址</div>

    <van-overlay :show="chooseCity">
      <van-area
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        title="选择地址"
        @confirm="success"
        @cancel="chooseCity = false"
      />
    </van-overlay>
  </div>
</template>

<script>
import {addressdoadd,addressedit,addressupdate} from '@/request/api'
import {area} from 'assets/js/area'
import {Toast} from 'vant'
export default {
  data() {
    return {
      chooseCity: false,
      areaList: area,
      formData: {
        user_name: '',  //收货人姓名
        user_phone: '',  //收货人手机号
        is_default: 1,  //默认,
        address: ["","",""],   //地址
        street: ''  //详细地址
      }
    };
  },
  methods: {
    addressdoadd() {
      if(this.$route.query.id){
        this.formData.id = this.$route.query.id
        addressupdate(this.formData)
          .then((result) => {
            if(result.code == 200){
              Toast.success({
                message: result.msg,
                duration: 1000,
                onClose() {
                  window.history.go(-1)
                }
              })
            }else{
              Toast({
                message: result.msg,
                duration: 1000
              })
            }
          })
      }else{
        addressdoadd(this.formData)
          .then((result) => {
            if(result.code == 200){
              Toast.success({
                message: result.msg,
                duration: 1000,
                onClose() {
                  window.history.go(-1)
                }
              })
            }else{
              Toast({
                message: result.msg,
                duration: 1000
              })
            }
          })
        }
    },
    addressedit(id) {
      const _this = this
      addressedit({id: id})
        .then((result) => {
          if(result.data.addressInfo){
            _this.formData.user_name = result.data.addressInfo.user_name
            _this.formData.user_phone = result.data.addressInfo.user_phone
            _this.formData.is_default = result.data.addressInfo.is_default
            _this.formData.address = [result.data.addressInfo.province,result.data.addressInfo.city,result.data.addressInfo.area]
            _this.formData.street = result.data.addressInfo.street
          }
        })
    },
    locationBack() {
      window.history.go(-1);
    },
    checkboxClick() {
      this.formData.is_default = this.formData.is_default == 2 ? 1 : 2;
    },
    success(val) {
      for (const key in val) {
        if (val[key]) {
          this.formData.address[key] = val[key].name || "";
        } else {
          this.formData.address[key] = "";
        }
      }
      this.chooseCity = false;
    }
  },
  created(){
    if(this.$route.query.id){
      this.addressedit(this.$route.query.id)
    }
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
.address-list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 1.066666rem;
  padding: 0 0.266666rem;
  border-bottom: 1px solid #f1f1f1;
  background-color: #fff;
  font-size: 0.346666rem;
  color: #4c4c4c;
}
.list-div-input {
	flex: 1;
	height: 100%;
	text-indent: .32rem;
  font-size: 0.373333rem;
  border: none;
}
.address-title {
  width: 2.4rem;
}
.adress-right {
  color: #acacac;
}
.cp-btn{
  background-color: rgb(230, 2, 19);
  background-image: none;
  border-radius: 0.4rem;
}
/* 单选按钮 */
.radio-radio-flex {
	display: flex;
	flex-wrap: wrap;
}
.radio-input-div {
	display: flex;
	align-items: center;
	width: 50%;
  height: 0.666666rem;
  color: #282828;
}
.radio-input-div label {
	text-indent: 0.1333rem;
}
.radio-icon {
	display: inline-block;
	width: 0.346666rem;
	height: 0.346666rem;
	background: no-repeat url('~assets/img/shop/btn_xuan_no@2x.png') center/cover;
	vertical-align: center;
}
.radio-icon-checked {
	background: no-repeat url('~assets/img/shop/btn_xuan_yes@2x.png') center/cover;
}
</style>