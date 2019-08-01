import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import loading from './utils/loading';

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});


router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
})

export function post(url, data = {}) {
    loading.show();
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                loading.close()
                resolve(response.data)
            },
            err => {
                loading.close()
                reject(err)
            }
        )
    })
}

export function get(url){
    loading.show();
    return new Promise((resolve,reject) => {
        axios.get(url).then(
            response => {
                loading.close()
                resolve(response.data)
            },
            err => {
                loading.close()
                reject(err)
            }
        )
    })
}

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(
    response=>{
        return response
    },
    error => {
        return Promise.reject(error)
    }
);

Vue.prototype.$axios = axios;
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')