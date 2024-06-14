<template>
    <div>
        <Header @toggle_aside="toggle_aside" />
        <Aside v-if="asideOpen" @tab_value="update_body" @tab_home="update_home" />
        <NoticeDetail v-bind:id="id"/>
    </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import NoticeDetail from '@/components/body/noticeDetail.vue';


export default {
    name: "NoticeView",
    components: { Header, Aside, NoticeDetail },
    data() {
        return {    
            asideOpen: false,
            id:''
        }
    },

    mounted() {
        this.id = this.$route.params.id;
        this.checkloginStatus();
    },

    methods: {
        checkloginStatus() {
            const value = localStorage.getItem('loginKey');
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
            } else {
                console.log('LocalStorage에 값이 없습니다.');
                this.$router.push('/');
            }
        },

        toggle_aside() {
            this.asideOpen = !this.asideOpen;
        }
    }
}
</script>

<style scoped>
.header {
    z-index: 4;
}

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    height: 100%;
}

.content-wrapper {
    display: flex;
    width: 100%;
}

.content {
    display: flex;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    max-width: 1500px;
    transition: margin-left 0.3s ease;
}

.content-with-aside {
    margin-left: 130px;
}

.aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
}

.toggle {
    position: fixed;
    z-index: 4;
}
</style>
