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
import Sidebar from './Sidebar.vue';
import Profile from './Profile.vue';
    export default {
        data(){
            return{
                sideBarOpen: false,
                profileOpen: false
            };
        },
        components:{
            Sidebar, Profile
        },
        methods:{
            toggleSidebar(){
                this.sideBarOpen = !this.sideBarOpen;
            },
            toggleProfile(){
                this.profileOpen = !this.profileOpen;
            },
            clickHome(){
                this.$router.push("/main");
            }
        }
    }
</script>

<style>
.button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFD700; 
    padding: 10px;
}

#menu {
    margin-left: 10px;
}

#home {
    margin: 0 auto;
}

#profile {
    margin-right: 10px;
}
</style>