<template>
    <div class="button-container">
        <button id="menu" @click="toggleSidebar">메뉴</button>

        <button id="home" @click="clickHome">홈(로고)</button>
        
        <button id="profile" @click="toggleProfile">프로필</button>
        <Profile v-if="profileOpen"/>
    </div>
</template>

<script>
import Profile from '@/components/login/profile.vue';

    export default {
        data(){
            return{
                profileOpen: false
            };
        },
        components:{
            Profile
        },
        methods:{
            toggleSidebar(){
                this.$emit('toggle-sidebar');
            },
            toggleProfile(){
                this.profileOpen = !this.profileOpen;
            },
            clickHome(){
                this.$emit('change-tab','Body');
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

#profile {
    position: fixed;
    margin-right: 10px;
    right: 10px;
}
</style>
