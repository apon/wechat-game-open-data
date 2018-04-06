var handler = require("WXHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame
    update: function (dt) {

    },
    sendScore:function(){
        handler.setUserCloudStorage("100");
    },
    getFriendScore:function(){
        handler.getFriendCloudStorage();
    },
    getGroupScore:function(){
        //handler.getGroupCloudStorage(ticket)
    },
    drawRank:function(){
        var rank = this.node.getChildByName("rank");
        var sprite = rank.getComponent(cc.Sprite);

        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        
        var texture = new cc.Texture2D();
        texture.initWithElement(sharedCanvas);
        texture.handleLoadedTexture();
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        console.log("========drawRand=========");
    }
});
