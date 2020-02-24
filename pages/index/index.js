import api from "../../http/api";

//Page Object
Page({
    data: {
        activeIndex: 0,
        list: ['分类', '排行'],
        female: [],
        male: [],
        press: [],
        name: '',
        male1: [],
        female1: [],
        press1: []
    },
    rankCategory() {
        wx.showLoading({
            title: '加载中...'
        });
        api.rankCategory().then(res => {
            if (res.ok === true) {
                wx.hideLoading()
                    //console.log(res);
                this.setData({
                    male1: res.male.slice(0, 6),
                    female1: res.female.slice(0, 6),
                    press1: res.epub
                })
            }
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },

    getCats() {
        wx.showLoading({
            title: '加载中...'
        });
        api.getCats().then(res => {
            if (res.ok === true) {
                wx.hideLoading()
                this.setData({
                    male: res.male,
                    female: res.female,
                    press: res.press
                })
            }
            //console.log(res);
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            activeIndex: index
        })
    },
    //options(Object)
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {
        this.getCats()
        this.rankCategory()
    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});