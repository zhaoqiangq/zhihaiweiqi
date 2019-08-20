// pages/orderlist/orderlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: '',
    isnull: false,
    page: 1,
    ismore: false,
    code:'',
    isshowimg:false,
    imglist:[],
    max_day:''
  },
  tabshowimg:function(e){
    this.setData({
      isshowimg:true,
      imglist: this.data.datalist[e.currentTarget.dataset.index].images
    })
  },
  rmshowimg:function(){
    this.setData({
      isshowimg: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
    var that = this;
    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/active/goods?openid=' + app.openid + '',
      data: {
        page: that.data.page,
        code: that.data.code
      },
      success(res) {
        if (res.data.data.data.length == 0) {
          that.setData({
            isnull: true
          })
          return;
        }
        that.setData({
          datalist: res.data.data.data,
          max_day: res.data.data.max_day
        })

      }
    })
  },
  onShow:function(){
    this.setData({
      isshowimg: false
    })
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/active/goods?openid=' + app.openid + '',
      data: {
        page: that.data.page,
        code: that.data.code
      },
      success(res) {
        if (res.data.data.data.length == 0) {
          that.setData({
            ismore: true
          })
          return;
        }
        var concatdata = that.data.datalist.concat(res.data.data.data)
        that.setData({
          datalist: concatdata
        })
      }
    })
  },
})