var WXHandler = {
    //获取自己的游戏数据
    getUserCloudStorage:function(){
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
        type: 1,
        })
    },
    //获取好友的游戏数据
    getFriendCloudStorage:function(){
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
        type: 2
        })
    },
    ////获取群成员的游戏数据
    getGroupCloudStorage:function(ticket){
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
        type: 3,
        ticket:ticket
        })
    },
    //上传自己的游戏数据
    setUserCloudStorage:function(score){
        wx.setUserCloudStorage({
            KVDataList:[{key:"score",value:score}],
            success:function(data){
              console.log("game.js setUserCloudStorage success:",data);
            },
            fail:function(data){
              console.log("game.js setUserCloudStorage fail:",data)
            },
            complete:function(data){
              console.log("game.js setUserCloudStorage complete:",data)
            }
          });
    },
    showRankList:function(cocosCanvas){
        let openDataContext = wx.getOpenDataContext()
        let sharedCanvas = openDataContext.canvas
        
        //let canvas = wx.createCanvas()
        //let context = canvas.getContext('2d')
        //context.drawImage(sharedCanvas, 0, 0)
        cocosCanvas.drawImage(sharedCanvas, 0, 0)
    }
};
module.exports = WXHandler;