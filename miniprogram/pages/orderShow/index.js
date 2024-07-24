// pages/orderShow/index.js
const app = getApp();
const db = wx.cloud.database();
const openid = app.globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if (options && typeof options.orderId === 'string') {
      console.log('hhh', options.orderId);
      db.collection("orders").where({
          _id: options.orderId
        })
        .get()
        .then(res => {
          console.log('hah', res.data[0]);
          this.setData({
            name: res.data[0].name,
            address: res.data[0].address,
            chooseWay: res.data[0].chooseWay,
            quantity: res.data[0].quantity,
            guessPrice: res.data[0].guessPrice,
            price: res.data[0].price,
            object: res.data[0].object,
            mobile: res.data[0].mobile,
          })
        }).catch(res => {
          console.log("首页banners失败", res)
        })
      // this.setData({
      //   name: order.name,
      //   address: order.address,
      //   chooseWay:order.chooseWay,
      //   quantity:order.quantity,
      //   guessPrice: order.guessPrice,
      //   price: order.price,
      //   object:order.object,
      //   mobile: order.mobile,
      // })
    } else {
      console.log("未获取到值");
    }
    var address = wx.getStorageSync('addressList');
    console.log(address[0]);
    this.setData({
      address: address[0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})