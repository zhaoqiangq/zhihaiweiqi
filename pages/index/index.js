//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    inputValue: '',
    isshadow:false
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  isshadowbut:function(e){
    this.setData({
      isshadow: true
    })
  },
  closeshadowbut:function(){
    this.setData({
      isshadow: false
    })
  },
  bindSearch: function () {
    var that = this;
    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/active/check-code?openid=' + app.openid +'',
      method: 'post',
      data: {
        code: that.data.inputValue 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.info =='兑换码验证成功'){
          wx.showToast({
            title: res.data.info,
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/list/list?code=' + that.data.inputValue +''
            })
          }, 1000)
        }
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  setSearch: function () {
    var that = this;
    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/active/check-code?openid=' + app.openid + '',
      method: 'post',
      data: {
        code: that.data.inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.info == '兑换码验证成功') {
          wx.showToast({
            title: res.data.info,
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/list/list?code=' + that.data.inputValue + ''
            })
          }, 1000)
        }
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
   

})
