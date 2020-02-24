import api from "../../http/api"

// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        history: [],
        inputValue: '',
        newHotWords: [],
        book: [],

        last: [],
        number: 1
    },
    //跳转到书籍详情e
    getTo(e) {
        console.log(e.currentTarget.dataset.name);
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/details/details?name=${name}`,
        });

    },
    getInput(e) {
        //console.log(e.detail.value);
        wx.showLoading({
            title: '加载中...'
        });
        this.setData({
            inputValue: e.detail.value
        })

        //把搜索的数据存在本地
        let history = []
        if (wx.getStorageSync('history')) {
            history = wx.getStorageSync('history')
        }
        history.push(e.detail.value)
        wx.setStorageSync('history', history)
            //console.log(e.detail.value)
        api.bookSearch(e.detail.value).then(res => {

            //console.log(res);
            if (res.ok) {
                wx.hideLoading()
                this.setData({
                    book: res.books
                })
            }
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    //清空搜索框
    image() {
        //console.log(123);
        let value = ''
        this.setData({
            inputValue: value
        })
        this.getHistory()
    },
    //获取搜索历史
    getHistory() {
        let add = wx.getStorageSync('history')

        if (add.length > 0) {
            let arr = add.filter(function(item, index, add) {
                return add.indexOf(item) === index;
            });
            this.setData({
                history: arr,
            })
        }
    },
    //点击搜索历史
    clickItem(e) {
        let value = e.currentTarget.dataset.value
        this.setData({
            inputValue: value,
            number: 2
        })
        api.bookSearch(value).then(res => {
            let arr = res.books
                // arr.map(item => {
                //     item.cover = this.data.HOST + item.cover
                // })
            this.setData({
                book: arr
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    },
    //获取热词
    hotWord() {
        api.hotWord().then(res => {
            if (res.ok) {
                this.setData({
                    last: res.newHotWords
                })
                this.huan()
            }
            //console.log(res);
        })
    },
    //换一换
    huan() {
        let last = this.data.last.slice(0)
        let book = []
            //console.log(res.books);
        for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * (last.length - 0) + 0);
            book.push(last[rand])
            last.splice(rand, 1)
        }
        //console.log(book);
        this.setData({
            newHotWords: book
        })
    },
    //删除搜索历史
    clickTo() {
        wx.showModal({
            content: '您确定删除搜索记录吗?',
            success: (result) => {
                if (result.confirm) {
                    wx.removeStorageSync('history')
                    this.setData({
                        history: [],
                    })
                } else {

                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
        this.hotWord();

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
        //console.log(123);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})