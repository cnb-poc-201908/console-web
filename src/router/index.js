import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/services-manager'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '服务治理' },
            children:[
                {
                    path: '/services-manager',
                    component: resolve => require(['../components/page/ServicesManager.vue'], resolve),
                    meta: { title: '服务治理' }
                },
                {
                    path: '/dev-ops',
                    component: resolve => require(['../components/page/DevOps.vue'], resolve),
                    meta: { title: 'DevOps' }
                },
                {
                    path: '/monitor',
                    component: resolve => require(['../components/page/Monitor.vue'], resolve),
                    meta: { title: '监控' }
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/LogWatcher.vue'], resolve),
                    meta: { title: '日志' }
                },
                {
                    path: '/quarlity',
                    component: resolve => require(['../components/page/Sonarqube.vue'], resolve),
                    meta: { title: '质量管理' }
                },
                {
                    path: '/services-chain',
                    component: resolve => require(['../components/page/ServicesChain.vue'], resolve),
                    meta: { title: '服务链路' }
                },
                {
                    path: '/alert-event',
                    component: resolve => require(['../components/page/AlertEvent.vue'], resolve),
                    meta: { title: '告警事件' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
