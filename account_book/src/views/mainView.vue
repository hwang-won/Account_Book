<template>
    <div>
        <Header/>
        <Aside @tab_value="update_body" />
        <component :is="tabs"></component>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Body from '@/components/body/body.vue';
import Client from '@/components/body/client.vue';
import Detail from '@/components/body/detail.vue';
import List from '@/components/body/list.vue';
import Notice from '@/components/body/notice.vue'

export default {
    name: "MainView",
    components:{Header, Aside, Body, Client, Detail, List, Notice},

    data(){
        return{
            tabs:"Body"
        }
    },

    mounted(){
        this.checkloginStatus();
    },

    methods:{
        checkloginStatus() {
            const value = localStorage.getItem('loginKey'); 
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
                //this.$router.push('/main');
            } else {
                console.log('LocalStorage에 값이 없습니다.');
                this.$router.push('/');
            }
        },
        update_body(e){
            this.tabs = e;
        },
    }
}
</script>
<style>
    
</style>