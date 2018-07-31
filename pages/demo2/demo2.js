// pages/demo2/demo2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      width:null,
      height:null,
      x:null,
      y:null,
      a:null,
      target_cl:null,
      game_h:null,
      game_bg_h:null,
      game_bg:null,
      score:20,
      promot:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let c_width = null;
    let c_height = null;
    wx.getSystemInfo({
      success: function (res) {
        console.log('windowWidth:'+res.windowWidth);
        c_width = res.windowWidth;
        console.log('windowHeight:'+res.windowHeight);
        c_height = res.windowHeight; 
      }
    });
    //判断 如果是i6或i7则高度为
    if(c_width==375 && c_height==603 ){
      this.setData({
        game_h:(c_height-92)*2
        // game_h:(c_height-160)*2+14
      })
      console.log('game_h',this.data.game_h);
    }
    // i6plus或ip7plus游戏实际高度为672
    else if(c_height==672){
      this.setData({
        //游戏有效区域为，减去上下padding各40,再减去上方80的分数栏
        game_h:(c_height-160)*2,
        //游戏背景边框，游戏有效高度+40（padding）-12*2(边框)
        game_bg_h: (c_height -160) * 2 +14
      })
      console.log('game_h',this.data.game_h,'game_bg_h',this.data.game_bg_h);
    }
    var new_x = this.data.x;
    var new_y = this.data.y;
    // 随机生成x,y值
    
    var get_init=function(max,min){
      var init = Math.round(Math.random() * (max-45));

      if(init==null || init<min || init>(max-45)){
      //如果x值小于20或width-45，重新计算值，直到获得理想值为止
        return get_init(max,min);
      }
      console.log('init初始值',init);
      return init
    }
    new_x=get_init(c_width,20);
    // if (new_y == false || new_y < 120 || new_y > (c_height-45)){
    //   new_y = Math.abs(Math.round(Math.random() * (c_height-45)));
    // }
    new_y=get_init(c_height,120);

    //随机生成rgba值
    let new_color=(()=>{
      let new_r = Math.round(Math.random()*250);
      let new_g = Math.round(Math.random() * 250);
      let new_b = Math.round(Math.random() * 250);
      return "rgb("+new_r+","+new_g+","+new_b+")";
    })()

    this.setData({
      x:new_x,
      y:new_y,
      target_cl: new_color,
      width: c_width,
      height: c_height
    });
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
  
  },
  // 生成随机x,y值，min值为左边距或上边距,target为客户端 宽度或高度
  get_num: function (min,target) {
    let tmp_x = Math.round(Math.random() * (target - 37));
    if (tmp_x < min || tmp_x > (target - 57)) {
      console.log('原x' + tmp_x);
      return this.get_num(min,target);
    }
    return tmp_x;
  },
  //随机生成颜色和透明度
  get_color:function(){
    var cl = Math.round(Math.random()*250);
    // return "rgb("+cl+","+cl+","+cl+")"
    console.log('颜色'+cl);
    return cl;
  },
  get_alpha:function(){
    let al = (Math.round((Math.random()*10+1))%10)/10;
    console.log('al',al);
    if(this.data.score>30){
      if(al>.3|| al==0){
        console.log('大于.3，需校正');
        return this.get_alpha();
      }
      // else{
      //   return al=al/10
      // }
    }
    else if(this.data.score>20){
      if(al>.5||al==0){
        console.log('大于.5，需校正');
        return this.get_alpha();
      }
    }
    else{
      if (al < .3){
        console.log('小于.3，需校正'); 
        return this.get_alpha();
      }
    }
    return al;
  },
  newpx:function(){
    var new_x=this.data.x;
    var new_y=this.data.y;
    var new_score=this.data.score;
    
    // 获得随机x 和 y的位置,如果落在边界位置，就重新生成新值，直到符合规范
    let c_width=this.data.width;
    let c_height=this.data.height;
    new_x = this.get_num(32,c_width);
    new_y = this.get_num(132,c_height);

    // 随机生成颜色
    let new_r =this.get_color();
    let new_g =this.get_color();
    let new_b =this.get_color();
    let new_a = this.get_alpha();
    let new_cl='rgba('+new_r+","+new_g+","+new_b+","+new_a+')';
    console.log(new_cl);
    let bg_rgb = (()=>{
      let bg_r = this.get_color();
      let bg_g=250-new_g;
      let bg_b=250-new_b;
      return "rgb("+bg_r+','+bg_g+','+bg_g+")";
    })();
   
    new_score++;
    this.setData({
      x:new_x,
      y:new_y,
      target_cl:new_cl,
      game_bg:bg_rgb,
      score:new_score
    });
  },
  promotFn:function(){
    
    console.log('提示');
    this.setData({
      promot:true
    })
    setTimeout(() => {
      // this.promot = false
      this.setData({
        promot: false
      })
    }, 900);
  }
})