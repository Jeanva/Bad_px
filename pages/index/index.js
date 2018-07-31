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
    bgcolor:true,
    r:null,
    g:null,
    b:null,
    b_rgb:null,
    score:0,
    tx_x:null,
    tx_y:null,
    isShow:false,
    promp:false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getSystemInfo({
      success:function (res){
        console.log(res.windowWidth);
        const width=res.windowWidth;
        console.log(res.windowHeight);
        const height = res.windowHeight;
      }
    });
    var new_r,new_g,new_b,b_rgb=this.data.b_rgb;
    (function main_color(){
    //随机生成背景颜色
     new_r= Math.round(Math.random() * 250);
     new_g = Math.round(Math.random() * 250);
     new_b = Math.round(Math.random() * 250);
     var b_r = 250- new_r;
     var b_g = 250- new_r;
     var b_b = 250- new_b;
     b_rgb = 'rgb('+b_r+','+b_g+','+b_b+')';
     console.log('b_rgb'+b_rgb);
     return new_r,new_g,new_b,b_rgb;
    })();
    var x =this.data.offsetX;
    var y = this.data.offsetY;
    x = Math.round(Math.random() * 200);
    y = Math.round(Math.random() * 200);
    
    this.setData({
        offsetX:x,
        offsetY:y,
        r:new_r,
        g:new_g,
        b:new_b,
        b_rgb:b_rgb,
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
  getOpacity:function(){
    //坏点透明度--------------------------------
    var opac = this.data.opac;
    //如果分数高于90，透明度始终小于0.3
    if (score >= 90 || opac < 0.3) {
      opac = Math.ceil(Math.random() * 3);
      console.log('opac小于0.3', opac);
    }
    //如果分数高于60，透明度始终小于0.5
    else if (score >= 60 || opac <= 0.2) {
      opac = Math.ceil(Math.random() * 10);
      console.log('opac 小于0.6', opac);
    }
    //60分以下时，透明度始终大于
    else if (score > 0) {
      // opac = (Math.random() * 10+1)%10/10;
      opac = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1))) / 10;
      console.log(opac);
      if (opac <= 0.5) {
        opac = 0.5
        console.log('opac过小，修正后为', opac);
      }
      else { console.log('opac 没有限制', opac); }
    }
    return opac;
  },
  // 提示
  promtion:function (e){
    console.log(e);
    console.log(this.data.offsetX,this.data.offsetY);
    console.log(this.data.opac);
    console.log(this.data.promp);
    this.setData({
      promp: true
    });
    setTimeout(()=>{
      this.setData({
        promp:false
      })
    },1000);
  },
  
  addScore: function (e) { 
    var _this= this;
    var score=this.data.score;
    console.log(e);
    //特效坐标
    var tx_x=_this.data.offsetX;
    var tx_y=_this.data.offsetY;
    //是否显示特效
    var isShow= this.data.isShow;
    // setInterval(() => {
      this.setData({
        isShow: true,
        tx_x:tx_x,
        tx_y:tx_y,
      });
    // }, 2000);
    
    //随机生成颜色
    var new_r = Math.round(Math.random() * 250);
    var new_g = Math.round(Math.random() * 250);
    var new_b = Math.round(Math.random() * 250);
    // 坏点颜色
    function bad_color() {
      var b_r = 250 - new_r;
      var b_g = 250 - new_g;
      var b_b = 250 - new_b;
      return 'rgb(' + b_r + ',' + b_g + ',' + b_b + ')';
    }
    var b_rgb = bad_color();
    console.log('b_rgb' + b_rgb); 

    //坏点透明度--------------------------------
    
    var opac = this.data.opac;
    //如果分数高于90，透明度始终小于0.3
    if (score >= 90 || opac < 0.3) {
      opac = Math.ceil(Math.random() * 3);
      console.log('opac小于0.3', opac);
    }
    //如果分数高于60，透明度始终小于0.5
    else if (score >= 60 || opac <= 0.2) {
      opac = Math.ceil(Math.random() * 10);
      console.log('opac 小于0.6', opac);
    }
    //60分以下时，透明度始终大于
    else if (score > 0) {
      // opac = (Math.random() * 10+1)%10/10;
      opac = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1))) / 10;
      console.log(opac);
      /*if (opac <= 0.5) {
        opac = 0.5
        console.log('opac过小，修正后为', opac);
      }
      else { console.log('opac 没有限制', opac); }*/
    }
     
    // 坐标轴---------------------
    var offsetx = _this.data.offsetX;
    var y = _this.data.offsetY;
     offsetx = Math.round(Math.random() * 325);
     y=Math.round(Math.random()*520);
    console.log(offsetx, y);
    
    // 播放声音
    
    //在特效动画播放完毕后，生成新的坏点
    setTimeout(()=>{
      this.setData({
        offsetX:offsetx,
        offsetY:y,
        r:new_r,
        g:new_g,
        b:new_b,
        // opac:Math.random(),
        opac:opac,
        b_rgb: b_rgb,
        score:score+1,
        isShow:true,
      })
    },500);
    setInterval(()=>{
      this.setData({
        isShow:false
      }
      );
    },1000);
    
  }
})
