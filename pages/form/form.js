// pages/form/form.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      description:'',
      code:'',
      goods_id:'',
      region: ['请选择省', '市', '区'],
      coloractive:false ,
      corlordate:false,
      date: '请选择发货时间',
      isshadow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      description: options.description,
      code: options.code,
      goods_id: options.goods_id
    })
  },
  bindRegionChange:function(e){
    this.setData({
      region: e.detail.value,
      coloractive:true
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      colordate: true
    })
  },
  closeshadowbut: function () {
    this.setData({
      isshadow: false
    })
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.name==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!that.data.colordate) {
      wx.showToast({
        title: '请选择发货时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!that.data.coloractive) {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.address == '') {
      wx.showToast({
        title: '请收入详细地址',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    wx.request({
      url: 'https://www.zhaoxiaoqiang.com/active/submit?openid=' + app.openid + '',
      method: 'post',
      data: {
        code: that.data.code,
        goods_id: that.data.goods_id,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        province: e.detail.value.city[0],
        city: e.detail.value.city[1],
        area: e.detail.value.city[2],
        address: e.detail.value.address,
        send_time: e.detail.value.date
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.status==1){
          that.setData({
            isshadow: true
          })
        }else{
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000
          })
        }
       
      }
    })
  },

})