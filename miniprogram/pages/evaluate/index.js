// pages/shoppingCart/index.js
const db = wx.cloud.database();
const app = getApp();
const openid = app.globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '', //选中的下标
    selectedObject: {}, // 用于存储选中的对象
    chooseWay: [{
        id: 0,
        name: '上门(费用5元)',
        price: -5
      },
      {
        id: 1,
        name: '到店（免费）',
        price: 0
      }
    ],
    address:{},
    formData: {}
  },
  onLoad(options) {
    if (options && typeof options.goods === 'string') {
      var goods = JSON.parse(options.goods);
      console.log("goods==" + goods.rule);
      this.setData({
        name: goods.name,
        price: goods.price,
        rule:goods.rule
      })
    }else{
      console.log("未获取到值");
    }
    var address = wx.getStorageSync('addressList');
    console.log(address[0]);
    this.setData({
      address:address[0]
    })
  },
  chooseGoods() {
    wx.navigateTo({
      url: '/pages/recovery/index'
    });
  },
  // 表单提交的
  formSubmit(e) {
    var formData = e.detail.value;
    if(formData.chooseWay=='1'){
      formData.chooseWay='到店'
    }else{
      formData.chooseWay='上门'
    }
    console.log(formData);
    var guessPrice = formData.price * formData.quantity;
    wx.showLoading({
      title: '',
    });
    db.collection('orders').add({
      data: { // 注意这里添加了 data 属性来包含要添加的数据  
        _openid_1: openid,
        guessPrice:guessPrice,
        status:1,
        ...formData
      },
      success(res) {
        console.log('添加订单成功', res);
        wx.hideLoading();
        wx.switchTab({
          url: '/pages/index/index',
          success: function () {
            console.log("跳转成功！！！"); 
            wx.showToast({ title: '提交订单成功！', icon: 'none' });
          },
          fail: function (error) {
            // 处理可能的错误，例如目标页面不存在  
            console.error('Navigate to user-center failed:', error);
          }
        });
      },
      fail(err) {
        console.error('添加订单失败', err);
        wx.hideLoading();
      }
    });
    wx.hideLoading();
  },
  // 选择器选择的
  bindPickerChange(e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
      selectedObject: this.data.chooseWay
      [e.detail.value]
    })
    console.log(this.data.selectedObject, '选中的数据')
  },
  clickRule() {
    wx.showModal({
      title: '规则',
      content: this.data.rule,
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  }
})