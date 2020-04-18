//index.js
//获取应用实例
const app = getApp()
const {http}=require("../../utils/util")
const api=require("../../api/index")
Page({
  data: {
    slide_list: wx.getStorageSync('slide_list')||[],   
    classify_list: wx.getStorageSync('classify_list')||[],  
    bottom_list: wx.getStorageSync('bottom_list')||[],  
    hots_show_list:wx.getStorageSync('hots_show_list')||[],
    recomment_list:wx.getStorageSync('recomment_list')||[],
    nowCity_name:"全国",
    nowCity_id:0
  },
  
  homeDataInfo:{
    city_id: 0,
    abbreviation:'',
    version: '6.1.1',
    referer: 2
  },
  hot_data:{
    city_id: 0,
    version: '6.1.1',
    referer: 2
  },
  recomment:{
    city_id: 0,
    category:'', 
    keywords: '',
    venue_id: '',
    start_time: '',
    page: 1,
    referer_type: 'index',
    version: '6.1.1',
    referer: 2
  },
  onLoad(options){
    //获取首页数据
    let {id,name,simple}=options;
    if(id||!wx.getStorageSync('slide_list')){
      if(id){
        this.homeDataInfo.city_id=id;
        this.homeDataInfo.abbreviation=simple;
      }
      this.getHomeData(this.homeDataInfo)
    }  
    //获取热门赛事数据
    if(id||wx.getStorageSync('hots_show_list')){
      if(id){
        this.hot_data.city_id=id
      }
      this.getHotshowData(this.hot_data)
    }
    //获取为你推荐数据
    if(id||wx.getStorageSync('recomment_list')){
      if(id){
        this.recomment.city_id=id
      }
      this.getRecommendList(this.recomment)
    }
   if(options){
    this.setData({
      nowCity_name:options.name,
     
    })
   }
  },
  getHomeData(info){
    http({
      method:"get",
      url:api.home.homeDataApi,
      data:info
    }).then(this.handleHomeDataSucc.bind(this))
  },
  getHotshowData(data){
    http({
      method:'get',
      url:"https://api.juooo.com/home/index/getHotsRecommendList",
      data,
    }).then( this.getHotshowDataSucc.bind(this))
  },
  getRecommendList(info){
    http({
      method:'get',
      url:"https://api.juooo.com/Show/Search/getShowList",
      data:info
    }).then(this.getRecommentListSucc.bind(this))
  },
  getRecommentListSucc(data){
      if(wx.getStorageSync('recomment_list')&&this.recomment.page!=1){
        this.setData({
          recomment_list: [...this.data.recomment_list,...data.data.data.list],
        })
      }else{
        wx.setStorageSync('recomment_list', data.data.data.list)
        this.setData({
          'recomment_list': data.data.data.list,
        })
      }
  },
  getHotshowDataSucc(data){
    wx.setStorageSync('hots_show_list',data.data.data.hots_show_list)
    this.setData({
      'hots_show_list': data.data.data.hots_show_list,
    })
  },
  handleHomeDataSucc(data){
    wx.setStorageSync('bottom_list',data.data.data.bottom_list);
    wx.setStorageSync({
      data: data.data.data.classify_list,
      key: 'classify_list',
    }),
    wx.setStorageSync('slide_list', data.data.data.slide_list)
    this.setData({
      'slide_list': data.data.data.slide_list,
      'classify_list':data.data.data.classify_list,

    })
  },
  onReachBottom(){
   this.recomment.page=++this.recomment.page;
   this.getRecommendList(this.recomment)
  },
  //详情页的跳转
  handleToDetails(e){
   let {id}=e.currentTarget.dataset;
   wx.navigateTo({
     url: '/pages/details/details?id='+id,
   })
  }

})
