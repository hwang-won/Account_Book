<template>
    <div>
        <h1>로그인 성공시 메인페이지</h1>
        <button @click="logout">(임시)로그아웃</button>


    </div>
</template>

<script>
export default {

    methods: {


        logout() {
            localStorage.removeItem('loginKey'); 
            console.log('로그아웃되었습니다.');
            // 로그아웃 -> 로그인페이지로 이동
            this.$router.push('/');
        }
    }
}
</script>

<style lang="">
</style>
