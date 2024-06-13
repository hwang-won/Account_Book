<template>
    <div class="loginBox">
        <h1>A_B</h1>
        <br />
        <!-- login화면 -->
        <table border="1" class="loginTable">
            <tr>
                <td>
                    <input type="text" v-model="id" placeholder="아이디" size="20" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="password" v-model="pw" placeholder="비밀번호" size="20" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button v-on:click="login" class="loginBtn">로그인</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a :href="'/id_search'">아이디 찾기</a>
                    <a :href="'/pw_search'">비밀번호 찾기</a>
                    <a :href="'/regi'">회원가입</a>
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
            loginData: {}
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

                    const serverData = res.data[0];
                    //console.log(JSON.stringify(res.data))
                    if (serverData.user_id === this.id && serverData.password === this.pw) {
                        this.loginData = { user_id: serverData.user_id, password: serverData.password };
                        alert("로그인 성공")
                        //alert(serverData.user_id + "님 환영합니다");

                        localStorage.setItem("loginKey", JSON.stringify(this.loginData));
                        this.id = '';
                        this.pw = '';

                        // 로그인 성공한 경우 : 메인페이지로 이동(추가)
                        this.$router.push('/body');

                        
                    } else {
                        alert('로그인 정보가 일치하지 않습니다.');
                    }
                })
                .catch(err => alert('오류가 발생했습니다: ' + err));
        },
        checkloginStatus() {
            const value = localStorage.getItem('loginKey'); 
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
                this.$router.push('/body');
            } else {
                console.log('LocalStorage에 값이 없습니다.');
                // this.$router.push('/');
            }
        }
    },
    mounted() {
        this.checkloginStatus();
    }
}
</script>

<style scoped>
    h1 {
        padding-top: 60px;
    }
    .loginBox   {
        width: 700px;
        height: 500px;
        background-color: rgb(255, 245, 198);
        border-radius: 50px;
    }
    .loginTable {
        width: 100%;
        height: 250px;
        border: 1px solid rgb(255, 245, 198);
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid rgb(255, 245, 198);
        padding: 8px;
    }
    input[type=text] {
        width: 400px;
        padding: 12px;
        font-size: 16px;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid rgb(173, 173, 173);
    }
    input[type=text]:focus {
        outline: none;
        border: 1px solid black;
    }
    input[type=password] {
        width: 400px;
        padding: 12px;
        font-size: 16px;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid rgb(173, 173, 173);
    }
    input[type=password]:focus {
        outline: none;
        border: 1px solid black;
    }
    .loginBtn {
        width: 400px;
        border-radius: 5px;
        background-color: rgb(255, 204, 0);
        font-size: 20px;
    }
    td a {
        font-size: 16px;
        color: rgb(146, 146, 146);
        padding: 10px;
    }
    td a:hover {
        font-weight: 600;
        color: rgb(0, 0, 0);
    }

</style>