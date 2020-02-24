import api from "../../http/api"
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '59ba0dbb017336e411085a4e',
        books: [],
        index: 0,
        title: '',
        body: '',
        colour: [
            { name: '#FFFFFF' },
            { name: '#E4DCC8' },
            { name: '#E2E8DF' },
            { name: '#A3A3A3' },
            { name: '#D1E9CD' }

        ],
        fontsize: 35,
        fontcolour: '#FFFFFF',
        activeIndex: 0,
        activeName: 0,
        it: 0

    },

    //查询书籍
    bookChaptersBookId() {
        wx.showLoading({
            title: '加载中...'
        });
        api.bookChaptersBookId(this.data.id).then(res => {
            //console.log(res.mixToc.chapters);
            if (res.ok) {
                wx.hideLoading()
                let last = res.mixToc.chapters[this.data.index]
                    //console.log(res.books);
                api.chapterContent(last.link).then(res => {
                    //console.log(res);
                    if (res.ok) {
                        let article = res.chapter.body
                        WxParse.wxParse('article', 'md', article, this, 5);
                    }
                })
                this.setData({
                    title: last.title,
                    books: res.mixToc.chapters
                })
            }
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    //通过目录查看文章
    link(e) {
        this.setData({
            index: e.currentTarget.dataset.index
        })
        this.bookChaptersBookId()
        this.catalogue()
            //console.log(e.currentTarget.dataset.index);
    },
    //上一章
    getPre() {
        this.setData({
            index: this.data.index - 1
        })
        this.bookChaptersBookId()
    },
    //下一章
    getNext() {
        this.setData({
            index: this.data.index + 1
        })
        this.bookChaptersBookId()
    },
    //控制底部显示
    displaytest() {
        if (this.data.activeIndex === 0) {
            this.setData({
                activeIndex: 1
            })
        } else {
            if (this.data.activeName === 1) {
                this.setData({
                    activeName: 0
                })
            }
            this.setData({
                activeIndex: 0
            })
        }
    },
    //目录
    catalogue() {
        if (this.data.it === 0) {
            this.setData({
                it: 1,
                activeIndex: 0,
                activeName: 0
            })
        } else {
            this.setData({
                it: 0,
                activeIndex: 0,
                activeName: 0
            })
        }
    },
    //控制背景
    displayName() {
        if (this.data.activeName === 0) {
            this.setData({
                activeName: 1
            })
        } else {
            this.setData({
                activeName: 0
            })
        }
    },
    //修改背景颜色
    colour(e) {
        //console.log(e.currentTarget.dataset.name);
        this.setData({
            fontcolour: e.currentTarget.dataset.name
        })
    },
    //改变字体大小
    fontSize(e) {
        this.setData({
            fontsize: e.currentTarget.dataset.size - 5
        })
    },
    fontSiza(e) {
        //console.log(e.currentTarget.dataset.size);
        this.setData({
            fontsize: e.currentTarget.dataset.size + 5
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(options.id);
        if (options.id) {
            this.setData({
                id: options.id
            })
        }

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
        this.bookChaptersBookId()
            //this.chapterContent()
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