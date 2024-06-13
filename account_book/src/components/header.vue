<template>
    <div class="button-container">
        <button id="menu" @click="toggleAside">메뉴</button>
        <Aside v-if="asideOpen" />

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
import Profile from '@/components/login/profile.vue';

export default {
    data() {
        return {
            asideOpen: false,
            profileOpen: false
        };
    },
    components: {
        Aside, Profile
    },
    methods: {
        toggleAside() {
            this.asideOpen = !this.asideOpen;
        },
        toggleProfile() {
            this.profileOpen = !this.profileOpen;
        },
        clickHome() {
            this.$router.push("/main");
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
    right: 0;
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

.profile-container {
    position: fixed;
    margin-right: 10px;
    right: 10px;
}

.profile-dropdown {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0;
}

.profile-dropdown button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.profile-dropdown button:hover {
    background-color: #ddd;
}

.profile-container:hover .profile-dropdown {
    display: block;
}
</style>
