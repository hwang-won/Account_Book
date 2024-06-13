<template>
    <div>
        <Header @toggle_aside="toggle_aside" />
        <Aside  v-if="asideOpen"
        @tab_value="update_body"
        @tab_home="update_home"
        v-bind:create_tab="create_tab"
        />
        <component :is="tabs" ref="listComponent"></component>
        <Toggle @add-transaction="handleAddTransaction"/>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Body from '@/components/body/body.vue';
import Client from '@/components/body/client.vue';
import List from '@/components/body/list.vue';
import Notice from '@/components/body/notice.vue';
import Toggle from '@/components/body/addToggle.vue';

export default {
    name: "MainView",
    components:{Header, Aside, Body, Client, List, Notice, Toggle},

    data(){
        return{
            tabs:"Body",
            create_tab:"Body",
            asideOpen: false,
            checkLoginInterval: null
        }
    },

    mounted(){
        this.checkloginStatus();
        this.startLoginCheckTimer();

    },

    beforeDestroy() {
        this.stopLoginCheckTimer();
    },

    methods:{
        checkloginStatus() {
            const value = localStorage.getItem('loginKey'); 
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
                
            } else {
                console.log('LocalStorage에 값이 없습니다.');
                this.$router.push('/');
            }
        },
        // 사이드바에서 탭 클릭시 동적 컴포넌트 기능으로 컴포넌트 변경
        update_body(e){
            this.tabs = e;
            this.create_tab = this.tabs
        },

        update_home(e){
            this.tabs = e;
            this.create_tab = this.tabs
        },

        toggle_aside() {
            this.asideOpen = !this.asideOpen;
        },

        // 현재 탭이 List 일때 데이터를 바로 반응형으로 전달 
        handleAddTransaction(transactionData) {
            if (this.tabs === "List" && this.$refs.listComponent) {
            this.$refs.listComponent.handleAddTransaction(transactionData);
            }
        },
        startLoginCheckTimer() {
            this.checkLoginInterval = setInterval(this.checkLoginStatus, 5000); // 5초
            
        },
        stopLoginCheckTimer() {
            if (this.checkLoginInterval) {
                clearInterval(this.checkLoginInterval);
                this.checkLoginInterval = null;
            }
        }
    }
}
</script>
<style>
    
</style>