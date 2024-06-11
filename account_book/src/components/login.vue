<template>
    <div>
        <h1>로그인</h1>
        <br />
        <!-- login화면 -->
        <table border="1">
            <tr>
                <td>ID</td>
                <td>
                    <input v-model="id" placeholder="id" size="20" />
                </td>
            </tr>
            <tr>
                <td>PW</td>
                <td>
                    <input type="password" v-model="pw" placeholder="pw" size="20" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button v-on:click="login">로그인</button>

                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a :href="'/id_search'">ID 찾기 |</a>
                    <a :href="'/password_search'"> PW 찾기 |</a>
                    <a :href="'/regi'">  회원 가입</a>
                </td>
            </tr>
        </table>
    </div>

</template>
<script>
import axios from 'axios';

export default {
    name: 'login',
    data() {
        return {
            id: '',
            pw: '',
            login_data: {}
        }
    },
    methods: {
        login() {
                // ID와 PW가 빈칸인지 검사
                if (!this.id || !this.pw) {
                    alert("ID와 PW를 모두 입력해주세요.");
                    return;
                }

            // 사용자 정보 가져오기
            axios.get(`http://localhost:3001/User?user_id=${this.id}&password=${this.pw}`)
                .then(res => {

                    if (res.data.length === 0) {
                        alert('로그인 정보가 일치하지 않습니다.');
                        return;
                    }

                    const user = res.data[0];
                    if (user.user_id === this.id && user.password === this.pw) {
                        this.login_data = { user_id: user.user_id, password: user.password };
                        alert(user.user_id + "님 환영합니다");

                        localStorage.setItem("login_key", JSON.stringify(this.login_data));

                        // 메인페이지로 이동(추가)
                        this.$router.push('/main');

                        // 입력폼 초기화
                        
                    } else {
                        alert('로그인 정보가 일치하지 않습니다.');
                    }
                })
                .catch(err => alert('오류가 발생했습니다: ' + err));

        },
        check_loginStatus() {
            const value = localStorage.getItem('login_key'); 
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
                this.$router.push('/main');

            } else {
                console.log('LocalStorage에 값이 없습니다.');
                //this.$router.push('/');

            }
        }

    }

}
</script>


<style></style>