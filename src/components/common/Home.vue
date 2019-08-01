<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vHead, vSidebar
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
