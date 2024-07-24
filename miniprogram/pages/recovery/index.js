// pages/recovery/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftActiveNum:'0',
    menuArr:[]
  },
  leftClickFn:function(event){
    // var leftActiveNum = event.currentTarget.dataset.myid;
    this.setData({
      leftActiveNum:event.currentTarget.dataset.myid
    })
    console.log(event.currentTarget.dataset.myid);
  },
  evaluate:function(event){
    var goods={
      name:event.currentTarget.dataset.name,
      price:event.currentTarget.dataset.price,
      rule:event.currentTarget.dataset.rule
    }
    var goodsStr = JSON.stringify(goods);
    wx.navigateTo({
      url: '/pages/evaluate/index?goods='+goodsStr
    });    
  },
  /**
   * 生命周期函数--监听页面加载
   */
//这里用async await 获取一下 集合中记录的总数 ，这样比较方便。。。
onLoad: async function () {
  let that = this  //建议小白以后都这样做，不然真的会出现一些弱智的问题，懂得都懂。。
  const db = wx.cloud.database();
  const c = db.collection("goods"); //获取集合中记录的总数
  const total = await (await c.count()).total
  const batchTimes = Math.ceil(total / 20)
  console.log(batchTimes) //计算需要获取几次  比如你有36条数据就要获取两次 第一次20条第二次16条
  let arraypro = [] // 定义空数组 用来存储每一次获取到的记录 
  let x = 0 //这是一个标识每次循环就+1 当x等于batchTimes 说明已经到了最后一次获取数据的时候
  //没错，循环查询，看着就觉得很影响性能，但是么的办法。
  for (let i = 0; i < batchTimes; i++) {
  //分组获取
    db.collection("goods").skip(i * 20).get({
      success: function (res) {
        x += 1
        // 20个20个的获取 最后一次不够20 那就是剩下的
        for (let j = 0; j < res.data.length; j++) {
          arraypro.push(res.data[j])
        }
        //判断是否是最后一次，如果是说明已经不用再继续获取了，这时候就可以赋值了
        if (x == batchTimes) {
          console.log(arraypro)
          const groupedByTitle = arraypro.reduce((acc, current) => {  
            // 如果累加器（acc）中还没有当前title的数组，则创建一个新数组  
            if (!acc[current.title]) {  
              acc[current.title] = [];  
            }  
            // 将当前对象添加到对应title的数组中  
            acc[current.title].push(current);  
            // 返回更新后的累加器  
            return acc;  
          }, {});  
            
          // 如果你想将结果转换回数组（如果每个title的数组作为一个元素），可以这样做：  
          const groupedArray = Object.values(groupedByTitle);  
          groupedArray.sort((a, b) => {  
            // 假设我们基于每个数组的第一个元素的listId来排序  
            return a[0].listId - b[0].listId;  
          }); 
          console.log(groupedArray); 
          that.setData({
            daan0: groupedArray
          })
        }
      }
    })
  }
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