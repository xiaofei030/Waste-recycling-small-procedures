const {
  envList
} = require('../../envList');
const db = wx.cloud.database();
const app = getApp();
const openid = app.globalData.openid;
Page({
  data: {
    // knowledgePoints: QuickStartPoints,
    // steps: QuickStartSteps,
    imageIndex:0,
    openid: '',
    notice:'',
    list:[],
    guide:[{
      text:'选择报价',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/选择.jpg'
    },
    {
      text:'提交订单',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/订单.jpg'
    },
    {
      text:'电话确认',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/电话.jpg'
    },
    {
      text:'上门回收',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/上门.jpg'
    }],
    categoryContents:[{
      text:'组装电视',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/电视.jpg'
    },
    {
      text:'原装电视',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/原装电视.jpg'
    },
    {
      text:'液晶电视',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/液晶电视.JPG'
    },
    {
      text:'双缸洗衣机',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/双缸洗衣机.jpg'
    },
    {
      text:'滚筒洗衣机',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/滚筒洗衣机.jpg'
    },
    {
      text:'冰箱',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/冰箱.jpg'
    },
    {
      text:'空调',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/空调.jpg'
    },
    {
      text:'其他',
      imgsrc:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/index/其他.jpg'
    },
  ]
  },
  async onLoad() {
   db.collection("banners")
    .get()
    .then(res => {
      console.log('hah',res);
        this.setData({
          list:res.data
        })
        console.log(this.data.products);
    }).catch(res => {
      console.log("首页banners失败", res)
    })
  },
  onShareTimeline: function () {
    return {
      title: '约球球来啦！！！',
      query: 'userId=' + Constant.userId + '&storeId=' + Constant.curStoreId + '&share=true',
    }
  },
  onShareAppMessage: function () {
    return {
      title: '约球球等你来！！！',
      path: 'pages/index/index', // 分享后打开的页面路径，可以带参数  
      success: function (res) {
        // 用户点击了分享后执行的回调函数  
        console.log('分享成功', res);
      },
      fail: function (err) {
        // 分享失败的回调函数  
        console.log('分享失败', err);
      }
    }
  },
  clickShow() {
    wx.showModal({
      title: '说明',
      content: '选择报价 -> 提交订单 -> 电话确认 -> 上门回收',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  },
  copyCode(e) {
    const code = e.target?.dataset?.code || '';
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({
          title: '已复制',
        })
      },
      fail: (err) => {
        console.error('复制失败-----', err);
      }
    })
  },
  onDefaultButtonClick(){
    wx.navigateTo({
      url: '/pages/evaluate/index'
    });
  },
  navigateTo() {
    if (!openid) {
      // 如果 openid 为空或未定义，导航到用户中心页面 
      wx.showModal({
        title: '提示',
        content: '请先登录呢',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定');
            wx.switchTab({
              url: '/pages/user-center/index',
              success: function () {
                // 可以在这里添加一些成功的回调逻辑，例如显示一个消息提示用户需要登录  
              },
              fail: function (error) {
                // 处理可能的错误，例如目标页面不存在  
                console.error('Navigate to user-center failed:', error);
              }
            });
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 如果 openid 存在
      if (app.globalData.blacklist=='yes') {
        wx.showToast({ title: '你在黑名单中，无法预约，请及时联系管理员呦', icon: 'none' });
      }else{
        wx.navigateTo({
          url: '/pages/recovery/index'
        });
      }
    }
  },
  favClick_fy() {
    if (!openid) {
      // 如果 openid 为空或未定义，导航到用户中心页面 
      wx.showModal({
        title: '提示',
        content: '请先登录呢',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定');
            wx.switchTab({
              url: '/pages/user-center/index',
              success: function () {
                // 可以在这里添加一些成功的回调逻辑，例如显示一个消息提示用户需要登录  
              },
              fail: function (error) {
                // 处理可能的错误，例如目标页面不存在  
                console.error('Navigate to user-center failed:', error);
              }
            });
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 如果 openid 存在，导航到羽毛球页面  
      if (app.globalData.blacklist=='yes') {
        wx.showToast({ title: '你在黑名单中，无法预约，请及时联系管理员呦', icon: 'none' });
      }else{
      wx.navigateTo({
        url: '/pages/fyBasketball/fyBasketball'
      })
     }
    }
  }
});