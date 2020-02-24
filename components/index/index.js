// components/index/index.js
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
        gender: {
            type: String,
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
        //到分类页面
        classify(e) {
            console.log(e.currentTarget.dataset);
            let na = e.currentTarget.dataset.name
            let gender = e.currentTarget.dataset.gender
            wx.navigateTo({
                url: `../../pages/classify/classify?name=${na}&gender=${gender}`,
            });
            wx.setNavigationBarTitle({
                title: na
            })
        },
    }
})