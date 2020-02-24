import store from '../../store/index'
import create from '../../utils/store/create'
// pages/bookrack/bookrack.js
create.Page(store, {

    /**
     * 页面的初始数据
     */
    data: {
        bookshelf: [],
        active: 0,
        msg: 0
    },
    getTo(e) {
        //console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: `../../pages/details/details?name=${id}`,

        });

    },
    help() {
        wx.navigateTo({
            url: '/pages/help/help'
        })
    },
    //开启删除
    openDel() {
        if (this.data.bookshelf.length > 0) {
            this.setData({
                msg: 1,
                active: 1
            })
        }
        // if (this.data.msg === 1) {
        //     this.setData({
        //         msg: 0,
        //         active: 0
        //     })
        // }

    },

    //关闭删除
    closeDel() {
        this.setData({
            msg: 0,
            active: 0
        })
    },

    delete(e) {
        console.log(e);
        let title = e.currentTarget.dataset.title
        let arr = this.data.bookshelf.filter(item => {
            return item.title !== title
        })
        this.setData({
            bookshelf: arr
        })
        if (arr.length === 0) {
            this.setData({
                msg: 0
            })
        }
        wx.setStorageSync('bookshelf', arr)
        console.log(arr);
    },
    //获取本地的书籍数据
    getBooks() {
        wx.showLoading({
            title: '加载中...'
        });
        if (wx.getStorageSync('bookshelf')) {
            // wx.removeStorageSync('bookshelf')
            let arr = wx.getStorageSync('bookshelf')
            this.setData({
                    bookshelf: arr,
                })
                //console.log(this.data.bookshelf);
            wx.hideLoading()
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(this.store.data.bookList);
        wx.setNavigationBarTitle({
            title: '小爱书城',
        })
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
        this.getBooks()
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