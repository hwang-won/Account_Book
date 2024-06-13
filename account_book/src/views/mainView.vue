<template>
    <div class="main-container">
        <Header class="header" @toggle-sidebar="toggleSidebar" @change-tab="update_body"/>
        <Aside v-if="asideOpen" @tab_value="update_body" class="aside" />
            <div class="content">
            <component :is="tabs" ref="listComponent"></component>
            </div>
        <Toggle class="toggle" @add-transaction="handleAddTransaction"/>
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
import Toggle from '@/components/body/addToggle.vue';

export default {
    name: "MainView",
    components:{Header, Aside, Body, Client, Detail, List, Notice,Toggle},

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
        update_body(e){
            this.tabs = e;
        },
        toggleSidebar() {
            this.asideOpen = !this.asideOpen;
        },
        // 현재 탭이 List 일때 데이터를 바로 반응형으로 전달 
        handleAddTransaction(transactionData) {
            if (this.tabs === "List" && this.$refs.listComponent) {
            this.$refs.listComponent.handleAddTransaction(transactionData);
            }
        }
    }
}
</script>
<style>
.header{
    z-index:4;
}
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    height: 100%;
    z-index: 1;
}

.content {
    display: flex;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    z-index: 2;
    width: 1500px;
    height:1500px;
}
.aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3; /* 컨텐트 보다 앞에 나오게 */ 
}
.toggle{
    position:fixed;
    z-index: 4;
}
</style>