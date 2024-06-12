<template>
    <div class="header">
        <h3>헤더입니다</h3>
        <nav>
            <span>Menu1</span>
            <span>Menu2</span>
            <span>Menu3</span>
            <button @click="logout">로그아웃</button>
        </nav>
    </div>
</template>

<script>
export default {
    name : "header",
    methods: {

    logout() {
        localStorage.removeItem('loginKey'); 
        console.log('로그아웃되었습니다.');
        // 로그아웃 -> 로그인페이지로 이동
        this.$router.push('/');
    },
    checkloginStatus() {
        const value = localStorage.getItem('loginKey'); 
        if (value) {
            console.log('LocalStorage에 값이 있습니다:', value);
            //this.$router.push('/main');
        } else {
            console.log('LocalStorage에 값이 없습니다.');
            this.$router.push('/');
        }
        }
    },
    mounted() {
    this.checkloginStatus();
    }
}
</script>

<style scoped>
.header {  
  height: 75px;
  padding: 1rem;
  color: white;
  background: teal;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>