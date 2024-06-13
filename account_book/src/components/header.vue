<template>
    <div class="button-container">
        <button id="menu" @click="toggleSidebar">메뉴</button>
        <Sidebar v-if="sideBarOpen"/>

        <button id="home" @click="clickHome">홈(로고)</button>
        
        <button id="profile" @click="toggleProfile">프로필</button>
        <Profile v-if="profileOpen"/>
    </div>
</template>

<script>
import Sidebar from './aside.vue';
import Profile from './login/profile.vue';

    export default {
        data(){
            return{
                sideBarOpen: false,
                profileOpen: false
            };
        },
        components:{
            Sidebar,Profile
        },
        methods:{
            toggleSidebar(){
                this.sideBarOpen = !this.sideBarOpen;
            },
            toggleProfile(){
                this.profileOpen = !this.profileOpen;
            },
            clickHome(){
                this.$router.push("/mainView");
            }
        }
    }
</script>

<style>
.button-container {
    margin-top: 0;
    width: 100%;
    height: 42px;
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    align-items: center;
    background-color: #FFD700; 
    padding: 10px;
    
}

#menu {
    position: fixed;
    margin-left: 10px;
    left: 10px
}

#home {
    position: fixed;
    margin: 0 auto;
}

#profile {
    position: fixed;
    margin-right: 10px;
    right: 10px;
}
</style>