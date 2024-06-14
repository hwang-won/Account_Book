<template>
    <div class="wrap">
        <div class="box"  @click="toggleAside"> 
            <p>메뉴</p>
        </div>
        <div class="box" @click="clickHome">
            <img src="@/../public/image/homeLogo.png" alt="홈 로고" />
        </div>
        <div class="profileBox box">
            <p class="profileBtn" @click="toggleProfile">프로필</p>
            <div class="dropdown" v-if="profileOpen">
                <ul>
                    <li @click="viewProfile">내정보</li>
                    <li @click="logout">로그아웃</li>
                </ul>
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

<style scoped>
.wrap {
    width: 100%;
    background-color: #FFD700; 
    position: fixed;
    top: 0;
    left: 0;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
.box {
    font-size: 600;
    border: 5px;
    border: 1px solid transparent;
    border-radius: 10px;
}
.box:hover {
    border: 1px solid #ffe75d;
    background-color: #ffe75d;
    cursor: pointer;
}
p {
    font-size: 20px;
    font-weight: 600;
    margin: 16px 20px 16px 20px;
    padding: 0;
}
.profileBox {
    position: relative;
}
.profileBtn{
    margin-right: 30px;
}
.dropdown {
    width: 200px;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    opacity: 0;
}
.profileBox:hover .dropdown {
    visibility: visible;
    opacity: 1;
}
li {
    list-style: none;
}
.dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.dropdown li {
    padding: 12px;
    cursor: pointer;
}
.dropdown li:hover {
    background-color: #fff2a8;
}

img {
    width: 150px;
    height: auto;
}
</style>


z-index: 100;