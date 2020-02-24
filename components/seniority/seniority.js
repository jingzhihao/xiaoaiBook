// components/seniority/seniority.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        arr: {
            type: Array,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
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
        //调转到热搜榜
        clickRank(e) {
            //console.log(e.currentTarget.dataset.item.title);
            wx.navigateTo({
                url: `../../pages/hotbot/hotbot?id=${e.currentTarget.dataset.item._id}`,
            });
            wx.setNavigationBarTitle({
                title: e.currentTarget.dataset.item.title
            })
        },

    }
})