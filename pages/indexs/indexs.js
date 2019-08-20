// pages/indexs/indexs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    bottomulr:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  toaccounts:function(e){
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + e.currentTarget.dataset.url,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '指海为期 Forever Sea',
      path: '/page/indexs/indexs'
    }
  },
  toyouzan:function(){
    wx.navigateToMiniProgram({
      appId: 'wx8ca8e8798925b4f1', // 要跳转的小程序的appid
      success(res) {
        // 打开成功  
        console.log(res);
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/site/ad',
      success(res) {
        that.setData({
          imgUrls: res.data.data['index-banner'],
          bottomulr: res.data.data['index-bottom']
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})