//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    offsetX:null,
    offsetY:null,
    opac:1,
    // bgcolor:{r:0,g:0,b:0},
    r:32,
    g:23,
    b:50,
    score:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //随机生成颜色
    var new_r = Math.round(Math.random() * 250);
    var new_g = Math.round(Math.random() * 250);
    var new_b = Math.round(Math.random() * 250);

    var x =this.data.offsetX;
    var y = this.data.offsetY;
    x = Math.round(Math.random() * 200);
    y = Math.round(Math.random() * 200);
    this.setData({
        offsetX:x,
        offsetY:y,
        r:new_r,
        g:new_g,
        b:new_b
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  addScore: function (e) { 
    var _this= this;
    var score=this.data.score;
    console.log(e);

    //随机生成颜色
    var new_r = Math.round(Math.random() * 250);
    var new_g = Math.round(Math.random() * 250);
    var new_b = Math.round(Math.random() * 250);

    var offsetx = _this.data.offsetX;
    var y = this.data.offsetY;
    _this.data.offsetX = Math.round(Math.random() * 200);
    // var y=Math.round(Math.random()*750);
    console.log(_this.data.offsetX, y);
    //如果x轴和y轴值为null,则随机分配
    if(offsetx ==null|| y == null){
      offsetx = Math.round(Math.random()*200);
      y = Math.round(Math.random()*750);
    }
  
    this.setData({
      offsetX: Math.round(Math.random() * 325),
      offsetY: Math.round(Math.random() * 600),
      r:new_r,
      g:new_g,
      b:new_b,
      opac:Math.random(),
      score:score+1
    })
  }
})
