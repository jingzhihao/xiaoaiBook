import api from "../../http/api";

// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        new: [{
                name: "详情"
            },
            {
                name: "评论"
            }
        ],
        activeIndex: 0,
        id: '59ba0dbb017336e411085a4e',
        arr: [],
        list: [0, 1, 2, 3, 4],
        score: 0,
        docs: [],
        books: [],
        last: [],
        number: 2,
        img: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        if (options.name) {
            this.setData({
                id: options.name
            })
        }
    },

    //跳转到书籍详情e
    getTo(e) {
        //console.log(e.currentTarget.dataset.id);
        this.setData({
            id: e.currentTarget.dataset.id
        })
        this.bookInfo()
    },
    //
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            activeIndex: index,
        })
    },
    //获取书籍的详情信息
    bookInfo() {
        wx.showLoading({
            title: '加载中...'
        });
        //console.log(this.data.id);
        api.bookInfo(this.data.id).then(res => {
            wx.hideLoading()
                //console.log(res);
            this.setData({
                    arr: res,
                    score: Math.round(res.rating.score / 2)
                })
                //console.log(Math.round(this.data.arr.rating.score / 2));
        })
    },
    //加入书架
    joinbook(e) {
        console.log(e.currentTarget.dataset.item);

        this.setData({
            number: 1
        })
        let obj = {
            cover: e.currentTarget.dataset.item,
            title: e.currentTarget.dataset.title,
            id: e.currentTarget.dataset.id
        }

        let cotion = []
        if (wx.getStorageSync('bookshelf')) {
            cotion = wx.getStorageSync('bookshelf')
        }
        cotion.push(obj)
        wx.setStorageSync('bookshelf', cotion)

        // wx.switchTab({
        //     url: `../../pages/bookrack/bookrack`,

        // });
    },
    image() {
        if (this.data.img === 0) {
            this.setData({
                img: 1
            })
        } else {
            this.setData({
                img: 0
            })
        }
    },
    //下载图片
    img(e) {
        //console.log(e.currentTarget.dataset.img);
        wx.downloadFile({
            url: e.currentTarget.dataset.img,
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res1) {
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 1500
                            });
                        }
                    });
                }
            }
        });

    },
    //开始阅读
    read(e) {
        //console.log(e.currentTarget.dataset.item._id);
        wx.navigateTo({
            url: `../../pages/read/read?id=${e.currentTarget.dataset.item._id}`,

        });

    },
    //获取评论
    shortReviews() {
        api.shortReviews(this.data.id).then(res => {
            //console.log(res);
            this.setData({
                docs: res.docs
            })
        })
    },
    // 相关推荐
    relatedRecommendedBooks() { // @param book_id 书籍id
        api.relatedRecommendedBooks(this.data.id).then(res => {
            if (res.ok) {
                this.setData({
                    last: res.books
                })
                this.huan()
            }
        })
    },
    //换一换
    huan() {
        let last = this.data.last.slice(0)
        let book = []
            //console.log(res.books);
        for (let i = 0; i < 3; i++) {
            let rand = Math.floor(Math.random() * (last.length - 0) + 0);
            book.push(last[rand])
            last.splice(rand, 1)
        }
        //console.log(book);
        this.setData({
            books: book
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
        this.bookInfo()
        this.shortReviews()
        this.relatedRecommendedBooks()
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