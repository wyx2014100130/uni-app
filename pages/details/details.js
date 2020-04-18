const {http}=require("../../utils/util")
const api=require("../../api/index")
Page({

  data: {
    static_data:{},
    time:''
  },

  onLoad: function (options) {
    let {id}=options;
    //1、获取详情信息
    this.getDetailsInfo(id)
  },
  getDetailsInfo(id){
    http({
      method:"get",
      url:api.details.goodsDetails,
      data:{
        schedular_id: '109538',
        version:'6.1.1',
        referer: 2
      }
    }).then(this.getDetailsInfoSucc.bind(this))
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getDetailsInfoSucc(data){
      this.setData({
        static_data:data.data.data,
        time:data.data.data.static_data.custom_show_time.split('(')[0]
      })
  },
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