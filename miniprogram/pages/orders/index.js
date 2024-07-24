const app = getApp();
const db = wx.cloud.database();
const openid = app.globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [ {
      name: '全部',
      index: 0
    }, {
      name: '待回收',
      index: 1
    },
    {
      name: '已完成',
      index: 2
    }
  ],
    items: [],
    item2: [],
    item1: [],
    item0: [],
    status: ['预约已取消',
      '预约成功',
      '预约完成'
    ],
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (openid) {
      db.collection('orders').where({
        _openid:openid
      }).get({
        success: res => {
          console.log("orders=="+res.data[4]._id);
          this.setData({
            items: res.data.reverse(),
            // 直接在这里设置数据到页面，省去orderShow中的处理

            waitPayOrder: res.data.filter(item => item.status === 1).reverse(),
            lostOrder: res.data.filter(item => item.status === 0).reverse(),
          });
        },
        fail: err => {
          console.log(err);
        }
      }) 
    }else{
      wx.showToast({ title: '请先登录呦', icon: 'none' });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
  },
  toOrderDetail:function(e){
    // let order1 = {
    //   name: e.currentTarget.dataset.name,
    //   address: e.currentTarget.dataset.address,
    //   quantity:e.currentTarget.dataset.quantity,
    //   chooseWay:e.currentTarget.dataset.chooseWay,
    //   guessPrice:e.currentTarget.dataset.guessPrice,
    //   price: e.currentTarget.dataset.price,
    //   object:e.currentTarget.dataset.object,
    //   mobile:e.currentTarget.dataset.mobile
    // };
    // console.log("order=="+order1.quantity);
    // var order = JSON.stringify(order1);
    // console.log("eee",order);
    let orderId = e.currentTarget.dataset.id;
    console.log("orderId=="+orderId);
    wx.navigateTo({
      url: '/pages/orderShow/index?orderId='+orderId
    });
  },
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    console.log("currtab=="+this.data.currtab);
  }
})