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
<style scoped>
  .toggle-button {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #ffcc00;
    color: white;
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 40px;
    padding: 0 0 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .transaction-form {
    position: fixed;
    bottom: 120px;
    right: 20px;
    width: 300px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0 20px rgba(0, 0, 0, 0.2);
  }

  .wrap {
    display: flex;
    flex-direction: column;
  }

input[type="date"],
select {
    padding: 6px;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin-top: 16px;
}

input[type=text], input[type=number] {
  width: 200px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid rgb(173, 173, 173);
}
input[type=text]:focus, input[type=number]:focus {
  outline: none;
  border: 1px solid black;
}

.Btn {
    width: 100px;
    border-radius: 5px;
    background-color: rgb(255, 204, 0);
    color: rgb(66, 66, 66);
    font-size: 16px;
    font-weight: 600;
}
</style>