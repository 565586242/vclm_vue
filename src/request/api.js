import {get,post} from './https'

//登录
export const homelogin = p => post('/homelogin', p)
//注册
export const homeregister  = p => post('/homeregister', p)
//忘记密码
export const homeresetpass  = p => post('/homeresetpass', p)
//检测token
export const checktoken  = p => post('/checktoken', p)
//退出账户
export const homelogout  = p => post('/homelogout', p)
//获取手机验证码
export const getphonecode  = p => post('/getphonecode', p)


//报备页面
export const homeindex = p => get('/homeindex', p)
//报备页面
export const report = p => get('/report', p)
//报备提交
export const doreport = p => post('/doreport', p)
//结算收益界面
export const settlement = p => get('/settlement', p)
//结算收益提交
export const dosettlement = p => post('/dosettlement', p)
//收益明细
export const reportprofit = p => get('/reportprofit', p)

export const hangqing = p => get('/hangqing')

//合约首页
export const homecontract = p => get('/homecontract', p)
//更多收益
export const morecontract = p => get('/morecontract', p)
//收益详情
export const contractDetail = p => get('/contractDetail', p)
//合约提交
export const docontract = p => post('/docontract', p)
//APP充值
export const anyrechargeGet = p => get('/anyrecharge', p)
export const anyrechargePost = p => post('/anyrecharge', p)


//商城首页
export const shopindex = p => get('/shopindex', p)
//商品详情
export const shopdetail = p => get('/shopdetail', p)
//加入购物车
export const addtocart = p => post('/addtocart', p)
//购物车页面
export const shopcart = p => get('/shopcart', p)
//购物车页商品数量增减
export const shopcartchange = p => post('/shopcartchange', p)
//购物车删除
export const shopcartdel = p => post('/shopcartdel', p)
//确认订单页(购物车)
export const cartconfirmorder = p => get('/cartconfirmorder', p)
//提交订单(购物车)
export const cartordersubmit = p => post('/cartordersubmit', p)
//确认订单页(立即购买)
export const confirmorder = p => get('/confirmorder', p)
//提交订单(立即购买)
export const ordersubmit = p => post('/ordersubmit', p)
//收货地址
export const addersslist = p => get('/addersslist', p)
//添加地址
export const addressdoadd = p => post('/addressdoadd', p)
//修改地址页
export const addressedit = p => get('/addressedit', p)
//修改地址
export const addressupdate = p => post('/addressupdate', p)
//删除地址
export const addressdel = p => post('/addressdel', p)
//商城订单
export const shoporder = p => get('/shoporder', p)
//删除订单
export const delorder = p => post('/delorder', p)
//确认收货
export const confirmreceipt = p => post('/confirmreceipt', p)
//订单详情
export const orderdetail = p => get('/orderdetail', p)
//商学院首页
export const schoolindex = p => get('/schoolindex', p)
//视频
export const schoolvideo = p => get('/schoolvideo', p)
//PPT
export const schoolppt = p => get('/schoolppt', p)
//空中课堂
export const schoolaudio = p => get('/schoolaudio', p)
//宣传片
export const schooltrailer = p => get('/schooltrailer', p)
//宣传广告
export const schoolads = p => get('/schoolads', p)
//广告详情
export const schooladdetail = p => get('/schooladdetail', p)
//官方链接
export const schoollink = p => get('/schoollink', p)
//展架横幅
export const schoolposter = p => get('/schoolposter', p)



//资讯首页
export const homenews  = p => get('/homenews', p)
//咨询详情
export const newsdetails  = p => get('/newsdetails', p)

//我的首页接口信息
export const mine = p => get('/mine', p)
//个人资料接口
export const homeinfo = p => post('/homeinfo', p)
//修改头像
export const editHead = p => post("/editHead", p)
//我的余额
export const myWallet = p => get('/myWallet', p)
//币种交易记录
export const tradRecord = p => get('/tradRecord', p)
//转入
export const intoGet = p => get('/into', p)
export const intoPost = p => post('/into', p)
//转出
export const rollOutGet = p => get('/rollOut', p)
export const rollOutPost = p => post('/rollOut', p)
//闪兑
export const flashAgainstGet = p => get('/flashAgainst', p)
export const flashAgainstPost = p => post('/flashAgainst', p)
//我的团队
export const myTeam = p => get('/myTeam', p)
//我的分享
export const myShare = p => get('/myShare', p)
//修改密码
export const changepassword = p => post('/changepassword', p)
//下载地址
export const downloadAddress = p => get('/downloadAddress', p)
//联系我们
export const contactUs = p => get('/contactUs', p)
//邀请好友
export const homeinvite = p => post('/homeinvite', p)
//合成图片
export const savePicture = p => post('/savePicture',p)
//用户关系图
export const userInfoTree = () => get('/userInfoTree')
