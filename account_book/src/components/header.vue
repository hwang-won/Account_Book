<template>
    <div class="button-container">
        <button id="menu" @click="toggleAside">메뉴</button>
        <button id="home" @click="clickHome">홈(로고)</button>
        <div class="profile-container">
            <button id="profile" @click="toggleProfile">프로필</button>
            <div class="profile-dropdown" v-if="profileOpen">
                <button @click="viewProfile">내정보</button>
                <button @click="logout">로그아웃</button>
            </div>
        </div>
    </div>
</template>

<script>
import Aside from '@/components/aside.vue';

    export default {
        data(){
            return{
                asideOpen: false,
                profileOpen: false,

                //홈버튼 클릭시 Home tab 가기 위한 변수,
                tab: ""
            };
        },
        components:{
            Aside
        },
        methods:{
            toggleAside(){
                this.$emit("toggle_aside");
            },

            toggleProfile(){
                this.profileOpen = !this.profileOpen;
            },

            clickHome(){
                this.tab = "Home";
                if (this.$route.path == "/main") {
                    this.$emit("tab_home", this.tab)
                } else {
                    this.$router.push("/main");
                }
            },

            logout() {
                localStorage.removeItem('loginKey')
                console.log("로그아웃 되었습니다.");
                this.profileOpen = false;
                this.$router.push('/');
            },

            viewProfile() {
                this.profileOpen = false;
                this.$router.push('/profile');
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