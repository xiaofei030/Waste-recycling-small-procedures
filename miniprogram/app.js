App({
  globalData: {
    openid: null,
  },
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-8gyjnoot0293e18d', //云开发环境id
      traceUser: true,
    })
    this.getOpenid()
  },
 // 获取用户openid
 getOpenid: function () {
    var app = this;
    var openidStor = wx.getStorageSync('openid');
    if (openidStor) {
      console.log('本地获取openid成功：', openidStor);
      app.globalData.openid = openidStor;
    } else {
      wx.cloud.callFunction({
        name: 'getOpenid',
        success(res) {
          console.log('云函数获取openid成功：', res.result)
          var openid = res.result.openid;
          wx.setStorageSync('openid', openid)
          app.globalData.openid = openid;
        },
        fail(res) {
          console.log('云函数获取失败', res)
        }
      })
    }
  },
})