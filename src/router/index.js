import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/Init/Login.vue') //登录
const Registered = () => import('../views/Init/Registered.vue') //注册
const ForgetPwd = () => import('../views/Init/ForgetPwd.vue') //忘记密码

const Home = () => import('../views/Home/Home.vue')  //首页
const HomeChildren = () => import('../views/Home/HomeChildren/HomeChildren.vue')  //首页子级
const MoreContract = () => import('../views/Home/HomeChildren/MoreContract.vue')  //更多收益
const BuyEquipment = () => import('../views/Home/HomeChildren/BuyEquipment.vue')  //买入报备
const SellEquipment = () => import('../views/Home/HomeChildren/SellEquipment.vue')  //卖出报备
const SettlementProceeds = () => import('../views/Home/HomeChildren/SettlementProceeds.vue')  //卖出报备
const ProceedsDetail = () => import('../views/Home/HomeChildren/ProceedsDetail.vue')  //收益明细

const Quotes = () => import('../views/Quotes/Quotes.vue')  //行情

const Notes = () => import('../views/Notes/Notes.vue')  //资讯
const NotesDetail = () => import('../views/Notes/NotesDetail.vue')  //资讯详情

const Ecology = () => import('../views/Ecology/Ecology.vue')  //生态
const EcologyChildren = () => import('../views/Ecology/EcologyChildren/EcologyChildren.vue')  //生态子级
const College = () => import('../views/Ecology/EcologyChildren/College.vue')  //商学院
const App = () => import('../views/Ecology/EcologyChildren/App.vue')  //应用
const Contract = () => import('../views/Ecology/EcologyChildren/Contract.vue')  //合约
//const Game = () => import('../views/Ecology/EcologyChildren/Game.vue')  //游戏
//const BiGu = () => import('../views/Ecology/EcologyChildren/BiGu.vue')  //币股
const CollegeChildren = () => import('../views/Ecology/CollegeChildren/CollegeChildren.vue')  //商学院子级
const PPT = () => import('../views/Ecology/CollegeChildren/PPT.vue')  //PPT
const SeePPT = () => import('../views/Ecology/CollegeChildren/SeePPT.vue')  //SeePPT
const AirClass = () => import('../views/Ecology/CollegeChildren/AirClass.vue')  //空中课堂
const Advertisement = () => import('../views/Ecology/CollegeChildren/Advertisement.vue')  //宣传广告
const AdvertisementDetail = () => import('../views/Ecology/CollegeChildren/AdvertisementDetail.vue')  //宣传广告详情
const OfficialLink = () => import('../views/Ecology/CollegeChildren/OfficialLink.vue')  //官方链接
const DisplayBanner = () => import('../views/Ecology/CollegeChildren/DisplayBanner.vue')  //展架横幅
const Video = () => import('../views/Ecology/CollegeChildren/Video.vue')  //视频

const AppChildren = () => import('../views/Ecology/AppChildren/AppChildren.vue')  //App子级
const HuaFei = () => import('../views/Ecology/AppChildren/HuaFei.vue')  //话费
const LiuLiang = () => import('../views/Ecology/AppChildren/LiuLiang.vue')  //流量充值
const YouKa = () => import('../views/Ecology/AppChildren/YouKa.vue')  //油卡充值

const ContractChildren = () => import('../views/Ecology/ContractChildren/ContractChildren.vue')  //合约子级
const GainDetail = () => import('../views/Ecology/ContractChildren/GainDetail.vue')  //收益详情

const ShopChildren = () => import('../views/Ecology/ShopChildren/ShopChildren.vue')  //商城子级
const ShopIndex = () => import('../views/Ecology/ShopChildren/ShopIndex.vue')  //商城首页
const ShopDetail = () => import('../views/Ecology/ShopChildren/ShopDetail.vue')  //商品详情
const ShopCart = () => import('../views/Ecology/ShopChildren/ShopCart.vue')  //购物车
const ConfirmOrder = () => import('../views/Ecology/ShopChildren/ConfirmOrder.vue')  //确认订单（购物车）
const ConfirmOrderBuy = () => import('../views/Ecology/ShopChildren/ConfirmOrderBuy.vue')  //确认订单（立即购买）
const ShopAddress = () => import('../views/Ecology/ShopChildren/ShopAddress.vue')  //地址
const AddAddress = () => import('../views/Ecology/ShopChildren/AddAddress.vue')  //添加地址
const ShopOrder = () => import('../views/Ecology/ShopChildren/ShopOrder.vue')  //订单
const OrderDetail = () => import('../views/Ecology/ShopChildren/OrderDetail.vue')  //订单详情



const Profile = () => import('../views/Profile/Profile.vue')  //我的
const ProfileChildren = () => import('../views/Profile/ProfileChildren/ProfileChildren.vue')  //我的子级
const UserProfile = () => import('../views/Profile/ProfileChildren/UserProfile.vue')  //我的资料
const MyTeam = () => import('../views/Profile/ProfileChildren/MyTeam.vue')  //我的团队
const MyMoney = () => import('../views/Profile/ProfileChildren/MyMoney.vue')  //我的余额
const MoneyChildren = () => import('../views/Profile/ProfileChildren/MoneyChildren/MoneyChildren.vue')  //我的余额
const InviteFriends = () => import('../views/Profile/ProfileChildren/InviteFriends.vue')  //邀请好友
const MyShare = () => import('../views/Profile/ProfileChildren/MyShare.vue')  //我的分享
const ChangePwd = () => import('../views/Profile/ProfileChildren/ChangePwd.vue')  //修改密码
const DownloadUrl = () => import('../views/Profile/ProfileChildren/DownloadUrl.vue')  //下载地址
const ContactUs = () => import('../views/Profile/ProfileChildren/ContactUs.vue')  //联系我们
const MoneyDetail = () => import('../views/Profile/ProfileChildren/MoneyChildren/MoneyDetail.vue')  //余额详情
const TransferIn = () => import('../views/Profile/ProfileChildren/MoneyChildren/TransferIn.vue')  //余额转入
const TransferOut = () => import('../views/Profile/ProfileChildren/MoneyChildren/TransferOut.vue')  //余额转出
const Flash = () => import('../views/Profile/ProfileChildren/MoneyChildren/Flash.vue')  //闪兑

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/registered',
      component: Registered
    },
    {
      path: '/forgetPwd',
      component: ForgetPwd
    },
    /* 首页 */
    {
      path: '/home',
      component: Home
    },
    {
      path: '/homeChildren',
      component: HomeChildren,
      children: [
        {
          path: 'moreContract',
          component: MoreContract
        },
        {
          path: 'buyEquipment',
          component: BuyEquipment
        },
        {
          path: 'sellEquipment',
          component: SellEquipment
        },
        {
          path: 'settlementProceeds',
          component: SettlementProceeds
        },
        {
          path: 'proceedsDetail',
          component: ProceedsDetail
        }
      ]
    },
    /* 行情 */
    {
      path: '/quotes',
      component: Quotes
    },
    /* 资讯 */
    {
      path: '/notes',
      component: Notes
    },
    {
      path: '/notesDetail/:id',
      component: NotesDetail
    },
    /* 我的 */
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/profileChildren',
      component: ProfileChildren,
      children: [
        {
          path: 'myMoney',
          component: MyMoney,
        },
        {
          path: 'moneyChildren',
          component: MoneyChildren,
          children: [
            {
              path: 'moneyDetail/:type',
              component: MoneyDetail
            },
            {
              path: 'transferIn/:type',
              component: TransferIn
            },
            {
              path: 'transferOut/:type',
              component: TransferOut
            },
            {
              path: 'flash/:type',
              component: Flash
            }
          ]
        },
        {
          path: 'userProfile',
          component: UserProfile
        },
        {
          path: "myTeam",
          component: MyTeam
        },
        {
          path: 'inviteFriends',
          component: InviteFriends
        },
        {
          path: 'myShare',
          component: MyShare
        },
        {
          path: 'changePwd',
          component: ChangePwd
        },
        {
          path: 'downloadUrl',
          component: DownloadUrl
        },
        {
          path: 'contactUs',
          component: ContactUs
        }
      ]
    },
    /* 生态 */
    {
      path: '/ecology',
      component: Ecology
    },
    {
      path: '/ecologyChildren',
      component: EcologyChildren,
      children: [
        {
          path: 'app',
          component: App
        },
        {
          path: 'college',
          component: College
        },
        {
          path: 'contract',
          component: Contract
        },
        /* {
          path: '/game',
          component: Game
        },
        {
          path: '/bigu',
          component: BiGu
        }*/
      ]
    },
    {
      path: '/appChildren',
      component: AppChildren,
      children: [
        {
          path: 'huafei',
          component: HuaFei
        },
        {
          path: 'liuliang',
          component: LiuLiang
        },
        {
          path: 'youka',
          component: YouKa
        }
      ]
    },
    {
      path: '/collegeChildren',
      component: CollegeChildren,
      children: [
        {
          path: 'ppt',
          component: PPT
        },
        {
          path: 'seePPT',
          component: SeePPT
        },
        {
          path: 'airClass',
          component: AirClass
        },
        {
          path: 'advertisement',
          component: Advertisement
        },
        {
          path: 'advertisementDetail',
          component: AdvertisementDetail
        },
        {
          path: 'officialLink',
          component: OfficialLink
        },
        {
          path: 'displayBanner',
          component: DisplayBanner
        },
        {
          path: 'video',
          component: Video
        }
      ]
    },
    {
      path: '/contractChildren',
      component: ContractChildren,
      children: [
        {
          path: 'gainDetail',
          component: GainDetail
        }
      ]
    },
    {
      path: '/shopChildren',
      component: ShopChildren,
      children: [
        {
          path: 'shopIndex',
          component: ShopIndex
        },
        {
          path: 'shopDetail',
          component: ShopDetail
        },
        {
          path: 'shopCart',
          component: ShopCart
        },
        {
          path: 'confirmOrder',
          component: ConfirmOrder
        },
        {
          path: 'confirmOrderBuy',
          component: ConfirmOrderBuy
        },
        {
          path: 'shopAddress',
          component: ShopAddress
        },
        {
          path: 'addAddress',
          component: AddAddress
        },
        {
          path: 'shopOrder',
          component: ShopOrder
        },
        {
          path: 'orderDetail',
          component: OrderDetail
        }
      ]
    }
  ]
})
