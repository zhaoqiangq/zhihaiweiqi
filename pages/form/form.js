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
      istime:false,
      isshadow: false,
      startdate:'2019-08',
      startdates:'',
      enddate:'2019-12',
      enddates:'',
      daysclor:[],
      cant_send:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      title: options.title,
      description: options.description,
      code: options.code,
      goods_id: options.goods_id,
      cant_send: options.cant_send.split(',')
    });
    // 转化 yyyy-mm-dd
    function getNowFormatDate() {
      var char = "-";
      var nowDate = new Date();
      var day = nowDate.getDate();
      var month = nowDate.getMonth() + 1;//注意月份需要+1
      var year = nowDate.getFullYear();
      //补全0，并拼接
      var currentdate = year + char + (month < 10 ? "0" + month : month) + char + (day < 10 ? "0" + day : day);
      return currentdate;
    }

    // yyyy-mm-dd 加天数
    function getNewDay(date, days) {
      if (days == undefined || days == '') {
        days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var mm = "'" + month + "'";
      var dd = "'" + day + "'";

      //单位数前面加0
      if (mm.length == 3) {
        month = "0" + month;
      }
      if (dd.length == 3) {
        day = "0" + day;
      }

      var time = date.getFullYear() + "-" + month + "-" + day
      return time;
    }


    // 获取当前日期
    var myDate = new Date();
    var mytime = getNowFormatDate(myDate);
    // 获取该商品的预售时间
    var preselltime = options.startdates.substr(0, 10);
    // 开始月份
    var startdate = mytime
    if (preselltime > mytime) {
      startdate = preselltime;
    }
    // 全局结束天数
    var days = parseInt(options.max_day);
    // 结束时间
    var enddate = getNewDay(startdate, days);
    that.setData({
      startdates: startdate,
      startdate: startdate.substr(0,7),
      enddates: enddate,
      enddate: enddate.substr(0,7)
    })
    
  },
  newdatas: function (month){
    var that = this;
    var startdate = that.data.startdates;
    var enddate = that.data.enddates;
    // 某日超出发货量
    var cant_send = that.data.cant_send;
    var sendcant = [];
    for (var i = 0; i < cant_send.length;i++){
      if (cant_send[i].substr(0, 7) == month){
        sendcant.push(cant_send[i].substr(8,10));
      }
    }

    var sendnocant = [];
    for (var i = 0;i<sendcant.length;i++){
      sendnocant.push({
        month: 'current',
        day: sendcant[i],
        color: '#ccc',
        background: '#fff'
      })
    }

    // 当月开始不能选择的时间
    var samemonth = [];
    if (month == startdate.substr(0, 7)){
      for (var i = 0; i < startdate.substr(8); i++) {
        samemonth[i] = {
          month: 'current',
          day: i,
          color: '#ccc',
          background: '#fff'
        }
      }
    }
    // 当月结束不能选择的时间
    var endmonth = [];
    if (month == enddate.substr(0, 7)) {
      for (var i = 0; i < 37; i++) {
        if (i >= enddate.substr(8)) {
          endmonth.push({
            month: 'current',
            day: i,
            color: '#ccc',
            background: '#fff'
          })
        }
      }
    }
    var daysclor = samemonth.concat(endmonth);
    that.setData({
      daysclor: daysclor.concat(sendnocant)
    })
  },
  next: function (event) {
    var currentMonth = event.detail.currentMonth;
    if (currentMonth<10){
      currentMonth = '0' + currentMonth
    }
    this.newdatas(event.detail.currentYear + '-' + currentMonth);
  },
  prev:function(event){
    var currentMonth = event.detail.currentMonth;
    if (currentMonth < 10) {
      currentMonth = '0' + currentMonth
    }
    this.newdatas(event.detail.currentYear + '-' + currentMonth);
  },
  dayClick: function (event) {
    if (event.detail.color == "#4a4f74" ){
      this.setData({
        date: event.detail.year+'-'+event.detail.month+'-'+event.detail.day,
        colordate: true,
        istime:false
      })
    }

  },
  bindRegionChange:function(e){
    if (e.detail.value[0] == '内蒙古自治区' || e.detail.value[0] == '广西壮族自治区' || e.detail.value[0] == '海南省' || e.detail.value[0] == '贵州省' || e.detail.value[0] == '云南省' || e.detail.value[0] == '西藏自治区' || e.detail.value[0] == '甘肃省' || e.detail.value[0] == '青海省' || e.detail.value[0] == '宁夏回族自治区' || e.detail.value[0] == '新疆维吾尔自治区' || e.detail.value[0] == '台湾省' || e.detail.value[0] == '香港特别行政区' || e.detail.value[0] == '澳门特别行政区'){
      wx.showToast({
        title: '此地区还未开放海鲜物流体系，尽情期待',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    this.setData({
      region: e.detail.value,
      coloractive:true
    })
  },
  toyouzan: function () {
    wx.navigateToMiniProgram({
      appId: 'wx8ca8e8798925b4f1', // 要跳转的小程序的appid
      success(res) {
        // 打开成功  
        console.log(res);
      }
    })
  },
  bindDateChange: function () {
    this.setData({
      istime:true
    })
    this.newdatas(this.data.startdates.substr(0, 7));
  },
  rmistime:function(){
    this.setData({
      istime: false
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
        send_time: that.data.date
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