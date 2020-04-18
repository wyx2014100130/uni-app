// pages/city/city.js
const {http}=require("../../utils/util")
const api=require("../../api/index")

Page({

  data: {
    hot_city_List:wx.getStorageSync('hot_city_List') || [],
    city_all:wx.getStorageSync('city_all')|| {},
    target:'',
    activeTag:''
  },
  onLoad(){
    //1、获取热门城市列表
    this.getHotList();
    //2、获取全国城市列表
    this.getCityList();
    //3、城市定位
  },
  getHotList(){
    if(!wx.getStorageSync('hot_city_List')){
      http({
        method:"get",
        url:api.city.hotListApi,
        data:{
          version:' 6.1.1',
          referer: 2,
        }
      }).then(this.getHotListSucc.bind(this))
    }  
  },
  getHotListSucc(data){
    wx.setStorage({
      data: data.data.data.hot_city_List,
      key: 'hot_city_List',
    })
  },
  getCityList(){
    if(!wx.getStorageSync('city_all')){
      http({
        method:"get",
        url:api.city.allCityApi,
        data:{
          version: '6.1.1',
          referer: 2
        }
      }).then(this.getCityAllSucc.bind(this))
    }
  },
  getCityAllSucc(data){
    wx.setStorage({
      data: data.data.data,
      key: 'city_all',
    })
  },
  handleBack(e){
    let c_id=e.target.dataset.id;
    let c_name=e.target.dataset.name;
    let c_abbreviation=e.target.dataset.abbreviation;
    wx.navigateTo({
      url: "/pages/index/index?id="+c_id+"&name="+c_name+"&simple="+c_abbreviation,
    })
  },
  handleTouchStart(e){
    this.setData({
      target:e.target.dataset.id,
      activeTag:e.target.dataset.id
    })
  },
  handleTouchMove(e){
    this.setData({
      target:e.target.dataset.id,
      activeTag:e.target.dataset.id
    })
  }
})