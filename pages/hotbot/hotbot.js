import api from "../../http/api";

// pages/hotbot/hotbot.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        books: []
    },

    rankInfo() {
        wx.showLoading({
            title: '加载中...'
        });
        api.rankInfo(this.data.id).then(res => {
            //console.log(res);
            if (res.ok) {
                wx.hideLoading()
                this.setData({
                    books: res.ranking.books
                })
            }
            //console.log(this.data.books);
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
                id: options.id
            })
            //console.log(options);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        this.rankInfo()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})