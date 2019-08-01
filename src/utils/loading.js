import {Loading} from 'element-ui';

let loading;
export default {
    show : function() {
        loading = Loading.service({
            lock : true,
            text : "加载中",
            background : 'rgba(0, 0, 0, 0.6)'
        });
    },

    close : function() {
        loading.close();
    }

} 