// pages/moodstatistics/moodstatistics.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var timeslot = ['今日','本周','本月','今年','全部']
var all_name = ['狂喜', '开心', '放松', '平静', '低落', '焦虑', '生气']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    timeslot:timeslot,
    categoryres:{}
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var that = this;
    console.log(that.data.index)
    wx.request({
      url: 'https://40525433.fudan-mini-program.com/cgi-bin/MoodCategory',
      data: {
        openid: app.globalData.openid,
        time_type: parseInt(that.data.index)+1,
      },
      method: 'POST',
      success: function (res) {
        console.log("返回的心情分类");
        console.log(res);
        that.setData({
          categoryres: res.data
        });
        if(res.data.mood_id_num == 0)
        {
          //显示此时间段无心情记录
          wx.showToast({
            title: timeslot[that.data.index]+'无记录',
          })
        }
        else that.showCategory();
      },
      fail: function(res){
      }
    })
  },
  showCategory: function(e){
    var total_moodrecord = 0;
    var category_list = this.data.categoryres.moods;
    var category_table = []
    for(var i = 0; i < category_list.length; i++)
    {
      console.log(category_list[i].check_num)
      category_table.push({
        name: all_name[category_list[i].mood_id],
        data: category_list[i].check_num
      })
    }
    console.log(category_table)
    var pieChart = new wxCharts({
      animation: true,
      disablePieStroke: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: category_table,

      width: app.globalData.windowWidth * 0.8,
      height: 300,
      dataLabel: true,
    });
  },
  textChange: function (e) {
    this.setData({
      text: e.detail.value
    });
    console.log(this.data.text);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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