import api from "../../http/api"

// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected: 0,
        select: 0,
        typeList: [{
                id: 'hot',
                name: '热门'
            },
            {
                id: 'new',
                name: '新书'
            },
            {
                id: 'reputation',
                name: '好评'
            },
            {
                id: 'over',
                name: '完结'
            },
            {
                id: 'monthly',
                name: 'VIP'
            }
        ],
        arr: [],
        book: [],
        type: 'hot',
        minor: '',
        major: '奇幻',
        gender: ''
    },

    /**
     * 获取排行的信息
     */
    selected(e) {
        //console.log(e.currentTarget.dataset)
        this.setData({
            type: e.currentTarget.dataset.id
        })
        this.getCatsBooks()
        let index = e.currentTarget.dataset.index
            //console.log(index + 1)
        if (index == 0) {
            this.setData({
                selected: 0
            })
        } else if (index == 1) {
            this.setData({
                selected: 1
            })
        } else if (index == 2) {
            this.setData({
                selected: 2
            })
        } else if (index == 3) {
            this.setData({
                selected: 3
            })
        } else {
            this.setData({
                selected: 4
            })
        }
    },
    //获取minor小分类的信息
    select(e) {
        // console.log(e.currentTarget.dataset)
        if (e.currentTarget.dataset.item === '全部') {
            e.currentTarget.dataset.item = ''
        }
        this.setData({
            minor: e.currentTarget.dataset.item
        })
        this.getCatsBooks()
        let index = e.currentTarget.dataset.index
            //console.log(index + 1)
        if (index == 0) {
            this.setData({
                select: 0
            })
        } else if (index == 1) {
            this.setData({
                select: 1
            })
        } else if (index == 2) {
            this.setData({
                select: 2
            })
        } else if (index == 3) {
            this.setData({
                select: 3
            })
        } else {
            this.setData({
                select: 4
            })
        }
    },
    //获取小分类
    getMinor() {
        api.getMinor().then(res => {
            //console.log(res);
            if (res.ok === true) {

                let gender = this.data.gender
                let major = this.data.major
                if (gender === "female") {
                    res.female.map((item) => {
                        if (major === item.major) {
                            item.mins.unshift('全部')
                            this.setData({
                                arr: item.mins
                            })
                        }
                    })
                } else if (gender === "male") {
                    res.male.map((item) => {
                        if (major === item.major) {
                            item.mins.unshift('全部')
                            this.setData({
                                arr: item.mins
                            })
                        }
                    })
                } else if (gender === "press") {
                    res.press.map((item) => {
                        if (major === item.major) {
                            item.mins.unshift('全部')
                            this.setData({
                                arr: item.mins
                            })
                        }
                    })
                }



            }
        })
    },
    //获取分类的书籍
    getCatsBooks() {
        wx.showLoading({
            title: '加载中...'
        });
        let gender = this.data.gender;
        let major = this.data.major
        let start = 1;
        let type = this.data.type
        let minor = this.data.minor
        api.getCatsBooks(gender, type, major, minor, start).then(res => {
            //console.log(res);
            if (res.ok) {
                wx.hideLoading()
                res.books.map((item) => {
                    item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                    item.tags = item.tags.splice(0, 3)
                })
                this.setData({
                    book: res.books
                })
            }
        })
    },

    onLoad: function(options) {
        this.setData({
                gender: options.gender,
                major: options.name
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
        this.getMinor()
        this.getCatsBooks()
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