<template>
	<div>
		<main-nav :title="$t('title.appCenter')" fontColor="#fff" bgColor="#252935" :backShow="true" borderBottom="none"></main-nav>
		<div class="cp-title">{{$t('ecology.app.RechargeToken')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_huafei@2x.png')" :text="$t('ecology.app.phoneRecharge')" link="/appChildren/huafei"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_liuliang@2x.png')" :text="$t('ecology.app.flowRecharge')" link="/appChildren/liuliang"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_youka@2x.png')" :text="$t('ecology.app.oilRecharge')" link="/appChildren/youka"></tabItem>
		</cpTable>
		<div class="cp-title">{{$t('ecology.app.FinancialToken')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_yinhang@2x.png')" :text="$t('ecology.app.bankPass')" link="/appChildren?url=https://creditcard.cmbc.com.cn/home/cn/wap/index/index.shtml"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_shipingt@2x.png')" :text="$t('ecology.app.videoPass')" link="/appChildren?url=https://m.iqiyi.com/"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_chaxun@2x.png')" :text="$t('ecology.app.onChainQuery')" link="/appChildren?url=https://lianchacha.com/index/Chain/index/"></tabItem>
		</cpTable>
		<div class="cp-title">USDT{{$t('ecology.app.Travel')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jiudian@2x.png')" :text="$t('ecology.app.hotelPass')" link="/appChildren?url=https://m.ctrip.com/webapp/hotel/?secondwakeup=true&dpclickjump=true&allianceid=4897&sid=182042&sourceid=497&from=https%3A%2F%2Fm.ctrip.com%2Fhtml5%2F"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_gnjipiao@2x.png')" :text="$t('ecology.app.domesticAirTickets')" link="/appChildren?url=https://m.ctrip.com/html5/flight/swift/index?secondwakeup=true&dpclickjump=true&allianceid=4897&sid=182042&sourceid=497&from=https%3A%2F%2Fm.ctrip.com%2Fhtml5%2F"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_gjjipiao@2x.png')" :text="$t('ecology.app.InternationalAirTickets')" link="/appChildren?url=https://m.ctrip.com/html5/flight/swift/index?secondwakeup=true&dpclickjump=true&allianceid=4897&sid=182042&sourceid=497&from=https%3A%2F%2Fm.ctrip.com%2Fhtml5%2F"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jingdian@2x.png')" :text="$t('ecology.app.attractionsPass')" link="/appChildren?url=https://m.ctrip.com/webapp/ticket/ticket?from=https://m.ctrip.com/webapp/vacations/tour/vacations&isHideNavBar=YES"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_chepiao@2x.png')" :text="$t('ecology.app.ticketPass')" link="/appChildren?url=https://m.ctrip.com/webapp/bus/?from=http%3A%2F%2Fm.ctrip.com%2Fhtml5%2F%3Fss%3D100000001000000000000000000"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_chuanpiao@2x.png')" :text="$t('ecology.app.ferryPass')" link="/appChildren?url=https://m.ctrip.com/webapp/ship?utmSource=busindex"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_youlun@2x.png')" :text="$t('ecology.app.cruisePass')" link="/appChildren?url=https://m.ctrip.com/webapp/cruise/index?ctm_ref=C_vac_cruise&secondwakeup=true&dpclickjump=true&allianceid=4897&sid=182042&sourceid=497&from=http%3A%2F%2Fm.ctrip.com%2Fhtml5%2F%3Fss%3D100000001000000000000000000"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_qianzheng@2x.png')" :text="$t('ecology.app.visaPass')" link="/appChildren?url=https://m.ctrip.com/webapp/vacations/visa/index?_version=a&isHideNavBar=yes&airCoutry=undefined&from=entry"></tabItem>
		</cpTable>
		<div class="cp-title">{{$t('ecology.app.passCenter')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_yingshitong@2x.png')" :text="$t('ecology.app.movieToken')" link="/appChildren?url=https://m.v.qq.com/x/m/channel/figure/movie"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_yinyue@2x.png')" :text="$t('ecology.app.musicToken')" link="/appChildren?url=http://m.music.migu.cn/v3"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_canyin@2x.png')" :text="$t('ecology.app.cateringPass')" link="/appChildren?url=https://m.dianping.com/beijing/ch10/d1?from=m_nav_1_meishi"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jiankang@2x.png')" :text="$t('ecology.app.fitnessPass')" link="/appChildren?url=https://m.dianping.com/fitness/node/html/dpindex.html?from=m_nav_15_yundongjianshen"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_dajiankang@2x.png')" :text="$t('ecology.app.healthPass')" link="/appChildren?url=https://m.dianping.com/easylife/node/html/medical/dpindex.html?from=m_nav_19_yiliaojiankang"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_meiye@2x.png')" :text="$t('ecology.app.americanToken')" link="/appChildren?url=https://m.dianping.com/beauty/node/html/dpindex.html?cityid=2&from=m_nav_7_liren"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_sheying@2x.png')" :text="$t('ecology.app.photographyPass')" link="/appChildren?url=https://m.dianping.com/wed/dp/index?from=m_nav_11_hunshasheying"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jiaoyu@2x.png')" :text="$t('ecology.app.educationPass')" link="/appChildren?url=https://m.dianping.com/edu/app/channel?notitlebar=1&from=m_nav_18_xuexipeixun"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_xinwen@2x.png')" :text="$t('ecology.app.headlines')" link="/appChildren?url=https://m.toutiao.com/?W2atIF=1"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_weixin@2x.png')" :text="$t('ecology.app.weChatPicks')" link="/appChildren?url=https://m.chinanews.com/wap/home"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_xiaohua@2x.png')" :text="$t('ecology.app.joke')" link="/appChildren?url=https://m.zol.com.cn/xiaohua/"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_waihui@2x.png')" :text="$t('ecology.app.exchangeToken')" link="/appChildren?url=https://wap.eastmoney.com/Info/List/1/129"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_gupiao@2x.png')" :text="$t('ecology.app.stockToken')" link="/appChildren?url=https://wap.eastmoney.com/Info/List/9/406"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jijin@2x.png')" :text="$t('ecology.app.fundToken')" link="/appChildren?url=https://m.1234567.com.cn/"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_huangjin@2x.png')" :text="$t('ecology.app.goldToken')" link="/appChildren?url=https://wap.eastmoney.com/Info/List/11/569"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_caipiao@2x.png')" :text="$t('ecology.app.lotteryCenter')" link="/appChildren?url=https://lotto.sina.cn/trend/#/"></tabItem>
		</cpTable>
		<!-- <div class="cp-title">{{$t('ecology.app.Exchange')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_okex@2x.png')" text="OKEX" link="/appChildren?url=https://www.okex.com/"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_zb_02@2x.png')" text="ZB" link="/appChildren?url=https://www.zb.live/"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_bian@2x.png')" :text="$t('ecology.app.Binance')" link="/appChildren?url=https://www.binance-cn.com/en"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_huobi@2x.png')" :text="$t('ecology.app.Huobi')" link="/appChildren?url=https://www.huobi.vc/zh-cn/"></tabItem>
		</cpTable> -->
		<div class="cp-title">{{$t('ecology.app.waitPass')}}</div>
		<cpTable>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jiaoyis@2x.png')" :text="$t('ecology.app.Exchange')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_jiedian@2x.png')" :text="$t('ecology.app.DistributedNode')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_shuzisc@2x.png')" :text="$t('ecology.app.DigitalMall')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_kuajingzz@2x.png')" :text="$t('ecology.app.CrossborderTransfer')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_aiybb@2x.png')" :text="$t('ecology.app.AImoney')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_youx@2x.png')" :text="$t('ecology.app.GamePass')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_guquan@2x.png')" :text="$t('ecology.app.EquityToken')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_shequ@2x.png')" :text="$t('ecology.app.CommunityToken')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_nongye@2x.png')" :text="$t('ecology.app.AgriculturalPass')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_lianshu@2x.png')" :text="$t('ecology.app.ChainToken')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_lingshou@2x.png')" :text="$t('ecology.app.NewRetailToken')"></tabItem>
			<tabItem :imgUrl="require('assets/img/ecology/app/icon_wulian@2x.png')" :text="$t('ecology.app.IOTtoken')"></tabItem>
		</cpTable>
	</div>
</template>

<script>
	import MainNav from 'components/MainNav/MainNav'
	import cpTable from 'components/CpTable/CpTable'
	import tabItem from 'components/CpTable/TabItem'
	export default {
		components:{cpTable,tabItem,MainNav}
	}
</script>

<style scoped>
</style>
