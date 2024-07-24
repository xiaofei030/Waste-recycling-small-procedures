const {
  envList
} = require('../../envList');
const db = wx.cloud.database();
const app = getApp();
const openid = app.globalData.openid;
// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    showUploadTip: false,
    nickname: '',
    avatar: ''
  },
  onLoad(options) {
        db.collection('users').where({
          _openid_1: openid
        }).get({
          success: res => {
            console.log(res.data[0].avatar)
            this.setData({
              nickname: res.data[0].nickname,
              avatar: res.data[0].avatar
            })
          }
        });
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
  toSetting() {
    this.setData({
      showUploadTip: true
    })
    this.getOpenId();
    console.log("你好");
  },
  myTask() {
    wx.navigateTo({
      url: `/pages/task/index`,
    });
  },
  getOpenId() {
    wx.showLoading({
      title: '',
    });
    db.collection('users').add({
      data: { // 注意这里添加了 data 属性来包含要添加的数据  
        _openid_1: openid,
      },
      success(res) {
        console.log('添加用户成功', res);
        wx.hideLoading();
      },
      fail(err) {
        console.error('添加用户失败', err);
        wx.hideLoading();
      }
    });
    wx.hideLoading();
  },
  //上传文件到云存储
  async uploadFile(cloudPath, filePath) {
    return await wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
    });
  },
  async myevent(e) {
    const {
      avatar,
      nickname
    } = e.detail;
    let cloudPath = "nickimg/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000) + '.png';
    const avatarUrl = await this.uploadFile(cloudPath, avatar);
    let userInfo = {
      avatar: avatarUrl.fileID,
      nickname: nickname
    }
    console.log("userInfo==" + userInfo.nickname);
    console.log(this.data.openId);
    db.collection('users').where({
      _openid_1: openid
    }).update({
      data: {
        ...userInfo
      }
    })
    console.log("users表更新成功");
    app.globalData.nickname = nickname;
    app.globalData.avatar = avatarUrl.fileID;
    this.setData({
      nickname: nickname,
      avatar: avatarUrl.fileID
    })
  },
  toWallet() {
    wx.navigateTo({
      url: `/pages/wallet/index`,
    });
  },
  toLocation() {
    wx.navigateTo({
      url: `/pages/location/index`,
    });
  },
  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },
});