import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import { Picker,Overlay,PasswordInput, NumberKeyboard,Lazyload,Uploader,NavBar,Search,Swipe,SwipeItem,Area,Tab,Tabs,Popup,ActionSheet } from 'vant';
Vue.use(PasswordInput)
	.use(NumberKeyboard)
	.use(Picker)
	.use(Overlay)
	.use(Lazyload)
	.use(Uploader)
	.use(NavBar)
	.use(Search)
	.use(Swipe).use(SwipeItem)
	.use(Area)
	.use(Tab).use(Tabs).use(Popup)
	.use(ActionSheet)

Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: localStorage.getItem('language') || 'zh',  //默认中文
	messages: {
		'zh': require('./langs/zh'),
		'en': require('./langs/en'),
		'ft': require('./langs/ft'),
	}
})

Vue.prototype._i18n = i18n

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
