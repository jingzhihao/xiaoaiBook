// components/index/stly.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: {
            type: Array,
            value: '',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //跳转到详情页
        details(e) {
            console.log(e.currentTarget.dataset);
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `../../pages/details/details?name=${id}`,
            });
        },
    }
})