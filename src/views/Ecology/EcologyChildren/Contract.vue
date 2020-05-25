<template>
  <div class="cp-body">
    <main-nav title="合约" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
    <div class="heyue-top">
      <img class="heyue-top-img" src="~assets/img/ecology/img_heyue@2x.png" mode />
      <div class="heyue-top-div">
        <div class="top-title">阿尔法星智能量化合约1号</div>
        <div class="top-title-two">
          <span>一起玩量化</span>
          <span>收益多重享</span>
        </div>
        <div class="top-sizes">
          <div>
            <img src="~assets/img/ecology/icon_lingfx@2x.png" mode />
            <span>零风险</span>
          </div>
          <div>
            <img src="~assets/img/ecology/icon_qigou@2x.png" mode />
            <span>100FNT起购</span>
          </div>
          <div>
            <img class="eye" src="~assets/img/ecology/icon_tianyan@2x.png" mode />
            <span>独创天眼系统</span>
          </div>
        </div>
        <router-link class="top-url" to="/contractChildren/gainDetail">收益详情&nbsp;></router-link>
      </div>
      <div class="heyue-bottom-div">
        <div class="cp-title">仓位配置</div>
        <div class="bottom-div">
          <div class="bottom-config">
            <div>
              <span>仓位</span>
              <span class="choose_contract" @click="contractNumberShow = !contractNumberShow">
                {{chooseResult.contract_number ? chooseResult.contract_number+'U' : '去选择 >'}}
              </span>
            </div>
            <div>
              <span>策略</span>
              <span>{{config.contract_tactics}}</span>
            </div>
            <div>
              <span>交易所</span>
              <span>{{config.contract_exchange}}</span>
            </div>
            <div>
              <span>交易对</span>
              <span>{{config.contract_pair}}</span>
            </div>
          </div>
          <div class="start-choose" @click="chooseDayClick">
            <div>
              {{chooseResult.contract_day ? chooseResult.contract_day+'天' : '去选择 >'}}
            </div>
          </div>
        </div>
        <div class="cp-btn" @click="docontract">开启量化交易</div>
      </div>
    </div>
    <div class="prominent-week">
      <div class="prominent-title">
        <img src="~assets/img/home/home_img_fengyunb@2x.png" />
      </div>
      <div class="prominent-item" v-for="(item,index) in leaval" :key="index">
        <img class="pop-img" :src="item" />
        <div>{{rankingList[index]?rankingList[index].user_name:'暂无'}}</div>
        <div>业绩：{{rankingList[index]?rankingList[index].total_amount:'0'}} USDT</div>
      </div>
    </div>
    <!-- 仓位 -->
    <div class="model-bg" v-show="contractNumberShow">
      <div class="pop-model">
        <div class="model-title">
          选择仓位
          <div class="model-closed" @click="contractNumberShow = !contractNumberShow"></div>
        </div>
        <div class="model-div">
          <div class="model-list" v-for="(item,index) in contractNumberObj" :key="index" @click="chooseContract(item[0].contract_number)">
            <div>{{item[0].contract_number}}U</div>
            <div>{{item[0].contract_rate}}‰-{{item[item.length - 1].contract_rate}}‰</div>
            <div>
              <img src="~assets/img/login_icon_xuanzhong@2x.png" v-show="chooseResult.contract_number == item[0].contract_number"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择天数 -->
    <div class="model-bg" v-show="contractDayShow">
      <div class="pop-model">
        <div class="model-title">
          选择托管天数
          <div class="model-closed" @click="contractDayShow = !contractDayShow"></div>
        </div>
        <div class="model-div">
          <div class="model-list" v-for="(item,index) in contractDayObj" :key="index" @click="chooseDay(item.contract_day)">
            <div>托管{{item.contract_day}}天</div>
            <div>{{item.contract_rate}}</div>
            <div>
              <img src="~assets/img/login_icon_xuanzhong@2x.png" v-show="chooseResult.contract_day == item.contract_day" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from 'components/MainNav/MainNav'
import {homecontract,docontract} from '@/request/api'
import {Toast} from 'vant'
export default {
  data() {
    return {
      leaval: [
        require("assets/img/home/pop_img_no.1@2x.png"),
        require("assets/img/home/pop_img_no.2@2x.png"),
        require("assets/img/home/pop_img_no.3@2x.png"),
        require("assets/img/home/pop_img_no.4@2x.png"),
        require("assets/img/home/pop_img_no.5@2x.png"),
        require("assets/img/home/pop_img_no.6@2x.png"),
        require("assets/img/home/pop_img_no.7@2x.png"),
        require("assets/img/home/pop_img_no.8@2x.png"),
        require("assets/img/home/pop_img_no.9@2x.png"),
        require("assets/img/home/pop_img_no.10@2x.png")
      ],
      currency_config: {},
      rankingList: [],
      time_config: {},
      total_number: 0,
      /* 合约 */
      contractNumberShow: false, //选择仓位是否显示
      contractDayShow: false,  
      /* 选择结果 */
      chooseResult: {
        contract_number: '',  //仓位 
        contract_day: ''  //天数
      },
      config: {},
      contract: [],  //仓位天数利率
    };
  },
  methods: {
    /* 选择仓位 */
    chooseContract(contract_number) {
      this.chooseResult.contract_number = contract_number
      this.contractNumberShow = false
    },
    chooseDayClick(){
      if(!this.chooseResult.contract_number){
        Toast({
          message: '请先选择仓位'
        })
      }else{
        this.contractDayShow = true
      }
    },
    /* 选择天数 */
    chooseDay(day) {
      this.chooseResult.contract_day = day
      this.contractDayShow = false
    },
    /* 开启量化交易 */
    docontract() {
      const _this = this
      if(this.chooseResult.contract_number && this.chooseResult.contract_day) {
        docontract({id: this.chooseId})
          .then(result => {
            if(result.code == 200){
              Toast.success({
                message: result.msg,
                duration: 1000,
                onClose(){
                  _this.$router.replace('/ecology')
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
        Toast({
          message: '请选择仓位和托管天数!',
          duration: 1000
        })
      }
    },
    /* 首页合约 */
    homecontract() {
      const _this = this
      homecontract()
        .then((result) => {
          if(result.code == 200){
            _this.config = result.data.config  //仓位
            _this.contract = result.data.contract  //仓位配置
            /* _this.list = result.data.list */   //托管明细
          }else{
            Toast({
              message: result.msg,
              duration: 1000
            })
          }
        })
    }
  },
  computed: {
    //仓位
    contractNumberObj(){
      let arr = {}
      for (const item of this.contract) {
        arr[item.contract_number] ? arr[item.contract_number].push(item) : arr[item.contract_number] = [item]
      }
      return arr
    },
    //天数
    contractDayObj(){
      let arr = []
      for (const item of this.contract) {
        item.contract_number == this.chooseResult.contract_number ? arr.push(item) : {}
      }
      return arr
    },
    /* 最后的id */
    chooseId() {
      for (const item of this.contract) {
        if(item.contract_day == this.chooseResult.contract_day && item.contract_number == this.chooseResult.contract_number){
          return item.id
        }
      }
    }
  },
  created() {
    this.homecontract();
  },
	components: {MainNav}
};
</script>

<style scoped>
.heyue-top {
  position: relative;
  display: block;
  width: 9.306666666666667rem;
  height: 9.986666666666666rem;
  margin: 0.13333333333333333rem auto;
}
.heyue-top-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.heyue-top-div {
  position: absolute;
  top: 0.4rem;
  text-align: center;
}
.top-title {
  font-size: 0.48rem;
  line-height: 0.8rem;
  font-family: PingFang SC;
}
.top-title-two {
  display: flex;
  justify-content: space-between;
  width: 4.08rem;
  margin: 0 auto;
  font-size: 0.37333333333333335rem;
  font-family: PingFang SC;
}
.top-sizes {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 9.306666666666667rem;
  padding: 0 0.26666666666666666rem;
  margin: 0.26666666666666666rem auto;
  color: #c0c0cf;
  font-size: 0.26666666666666666rem;
}
.top-sizes img {
  width: 0.3333333333333333rem;
  height: 0.3333333333333333rem;
  margin-right: 0.13333333333333333rem;
  object-fit: contain;
}
.top-sizes img.eye {
  width: 0.37333333333333335rem;
  height: 0.24rem;
}
.top-url {
	display: block;
	text-align: center;
  color: #c0c0cf;
  font-size: 0.26666666666666666rem;
}
.heyue-bottom-div {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 9.306666666666667rem;
  height: 6.266666666666667rem;
  padding: 0 0.26666666666666666rem;
}
.bottom-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.26666666666666666rem;
}
.bottom-config {
  position: relative;
  width: 6.666666666666667rem;
}
.bottom-config:after {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  content: "";
  width: 0.02666666666666667rem;
  height: 2rem;
  margin: auto;
  background: no-repeat url('~assets/img/profile/img_fengexian@2x.png') center/cover;
}
.bottom-config > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 0.6rem;
  padding: 0 0.5333333333333333rem;
  font-size: 0.32rem;
}
.bottom-config > div text:first-child {
  width: 50%;
  color: #c0c0cf;
  text-align: left;
}
.bottom-config > div text:last-child {
  color: #fff;
}
.start-choose {
  flex: 1;
  color: #7288c8;
  font-size: 0.32rem;
  text-align: center;
}
.cp-btn {
	display: block;
  margin-top: 0.6666666666666666rem;
  background-image: url('~assets/img/login_btn_bg@2x.png');
}
/* 弹窗 */
.model-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}
.pop-model {
  width: 8rem;
  min-height: 4.266666666666667rem;
  margin: auto;
  background: no-repeat url('~assets/img/ecology/pop_tanc@2x.png') center/cover;
}
.model-title {
  position: relative;
  height: 0.9333333333333333rem;
  margin: 0 0.13333333333333333rem;
  text-align: center;
  font-size: 0.37333333333333335rem;
  line-height: 0.9333333333333333rem;
  border-bottom: 0.013333333333333334rem solid #262934;
}
.model-closed {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.4rem;
  width: 0.3466666666666667rem;
  height: 0.3466666666666667rem;
  margin: auto;
  background: no-repeat url('~assets/img/icon_guanbi@2x.png') center/cover;
}
.model-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 1.0666666666666667rem;
  padding: 0 0.9333333333333333rem 0 0.6666666666666666rem;
  font-size: 0.37333333333333335rem;
}
.model-list > div:nth-child(1) {
  width: 2rem;
}
.model-list > div:nth-child(2) {
  flex: 1;
  text-align: center;
}
.model-list > div:nth-child(3) {
  width: 1rem;
  text-align: right;
}
.model-list img {
  width: 0.29333333333333333rem;
  height: 0.28rem;
}
.choose_contract{
  color: #7288c8;
}
/* 每周风云榜 */
.prominent-week {
  background-color: #2c303e;
  margin: 0.2702702702702703rem 0.3467rem;
  border-radius: 0.1333rem;
  color: #fff;
  font-size: 0.35135135135135137rem;
  line-height: 1.0810810810810811rem;
}
.prominent-title {
  width: 2.4594594594594597rem;
  height: 0.4864864864864865rem;
  padding-top: 0.2702702702702703rem;
  margin: 0 auto 0.5405405405405406rem;
}
.prominent-title img {
  width: 100%;
  height: 100%;
}
.prominent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0 0.40540540540540543rem 0 1.3513513513513513rem;
  line-height: 1.0810810810810811rem;
}
.pop-img {
  position: absolute;
  left: 0.2702702702702703rem;
  top: 0;
  bottom: 0;
  width: 0.8378378378378378rem;
  height: 0.6756756756756757rem;
  margin: auto;
  object-fit: contain;
}
</style>
