<template>
    <div>
        <Header @toggle_aside="toggle_aside" />
        <Aside  v-if="asideOpen"
        @tab_value="update_body"
        @tab_home="update_home" />
        <Detail/>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Body from '@/components/body/body.vue';
import Client from '@/components/body/client.vue';
import Detail from '@/components/body/detail.vue';
import List from '@/components/body/list.vue';
import Notice from '@/components/body/notice.vue';

export default {
    name: "MainView",
    components:{Header, Aside, Body, Client, Detail, List, Notice},

    data(){
        return{
            tabs:"Body",
            asideOpen: false
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
        // 사이드바에서 탭 클릭시 동적 컴포넌트 기능으로 컴포넌트 변경
        update_body(e){
            this.tabs = e;
        },

        update_home(e){
            this.tabs = e;
        },

        toggle_aside() {
            this.asideOpen = !this.asideOpen;
        },
    }
}
</script>
<style>
    
</style>