<template>
    <div class="button-container">
        <button id="menu" @click="toggleAside">메뉴</button>
        <Aside v-if="asideOpen"/>

        <button id="home" @click="clickHome">홈(로고)</button>
        
        <button id="profile" @click="toggleProfile">프로필</button>
        <Profile v-if="profileOpen"/>
    </div>
</template>

<script>
import Aside from '@/components/aside.vue';
import Profile from '@/components/login/profile.vue';

    export default {
        data(){
            return{
                asideOpen: false,
                profileOpen: false
            };
        },
        components:{
            Aside, Profile
        },
        methods:{
            toggleSidebar(){
                this.asideOpen = !this.asideOpen;
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