var handler = {
  run:function(){
    wx.onMessage(data => {
      console.log(data)
      switch (data.type) {
        case 1://获取分数
          this.getUserCloudStorage();
          break;
        case 2://
          this.getFriendCloudStorage();
          break;
        case 3:
          this.getGroupCloudStorage(data.ticket);
          break;
      }
    });
  },
  //获取分数
  getUserCloudStorage:function(){
    wx.getUserCloudStorage({
      keyList:["score"],
      success:function(data){
        console.log("game.js->index.js getUserCloudStorage success:",data);
        var score = 0;
        for(kv in data){
          if(kv.key=="score"){
            score = kv.value;
            break;
          }
        }
      },
      fail:function(data){
        console.log("game.js->index.js getUserCloudStorage fail:",data)
      },
      complete:function(data){
        console.log("game.js->index.js getUserCloudStorage complete:",data)
      }
    });
  },
  //获取好友的数据
  getFriendCloudStorage:function(){
    wx.getFriendCloudStorage({
      keyList:["score"],
      success:function(data){
        console.log("game.js->index.js getFriendCloudStorage success:",data);
        handler.drawRankList(data.data);
      },
      fail:function(data){
        console.log("game.js->index.js getFriendCloudStorage fail:",data)
      },
      complete:function(data){
        console.log("game.js->index.js getFriendCloudStorage complete:",data)
      }
    });
  },
  /**
   * 获取群成员的数据
   * ticket群分享对应的 shareTicket
   */
  getGroupCloudStorage:function(ticket){
    wx.getFriendCloudStorage({
      shareTicket:ticket,
      keyList:["score"],
      success:function(data){
        console.log("game.js->index.js getFriendCloudStorage success:",data);
        handler.drawRankList(data);
      },
      fail:function(data){
        console.log("game.js->index.js getFriendCloudStorage fail:",data)
      },
      complete:function(data){
        console.log("game.js->index.js getFriendCloudStorage complete:",data)
      }
    });
  },
  //绘制排行榜
  drawRankList:function(arrayData){
    console.log("======drawRankList=======");
    let sharedCanvas = wx.getSharedCanvas()
    let context = sharedCanvas.getContext('2d')

    context.fillStyle = '#ffffff'
    context.font = "40px Arial";
    var baseLine = 0;
    var lineHeight = 80;
    var imgs=[];
    //为了展示这里重复显示一个数据
    for(var i=0,len = arrayData.length;i<5;i++){
      baseLine = lineHeight*i;
      data = arrayData[0];
      var avatarUrl = data.avatarUrl;
      var nickName = data.nickname;
      var openId = data.openid;
      var KVList = data.KVDataList;
      var score = 0;
      var img = wx.createImage();
      for (var j = 0, lenk = KVList.length; j < lenk; j++){
        var kv = KVList[j];
        console.log("======drawRankList=======", kv.key);

        if(kv.key==="score"){
          score = kv.value;
          break;
        }
      }
      context.fillText(nickName, 100, baseLine+lineHeight/2+5);
      context.fillText(score, 250, baseLine + lineHeight / 2+5);
      img.src = avatarUrl;
      //img.onload = function(){
        context.drawImage(img, 10, baseLine+10, 30, 60);
      //};
      console.log("avatarUrl:", avatarUrl, " nickName:", nickName, " score:", score);
    }
  }
};
module.exports = handler;