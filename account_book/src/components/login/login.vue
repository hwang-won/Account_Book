<template>
    <div>
        <img src="@/../public/image/homeLogo.png" alt="홈 로고" />
    </div>
    <div class="loginBox">
        <h1>A_B</h1>
        <br />
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
import Swal from 'sweetalert2';
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
            if (!this.id || !this.pw) {
                Swal.fire({
                    title: '아이디/비밀번호를 \n 정확히 입력해 주세요!',
                    imageUrl: '@/../public/image/login_id_password.png',
                    imageWidth: 150,
                    imageHeight: 150,
                    imageAlt: 'Custom image',
                })
                return;
            }
            axios.get(`http://localhost:3001/User?user_id=${this.id}&password=${this.pw}`)
                .then(res => {
                    if (res.data.length === 0) {
                        Swal.fire({
                            title: '아이디/비밀번호를 \n 다시 확인해주세요!',
                            imageUrl: '@/../public/image/login_fail.png',
                            imageWidth: 150,
                            imageHeight: 150,
                            imageAlt: 'Custom image',
                        })
                        return;
                    }
                    const serverData = res.data[0];
                    if (serverData.user_id === this.id && serverData.password === this.pw) {
                        this.loginData = { user_id: serverData.user_id, password: serverData.password };
                        localStorage.setItem("loginKey", JSON.stringify(this.loginData));
                        this.id = '';
                        this.pw = '';
                        Swal.fire({
                            title: '로그인 성공!',
                            text: `어서오세요 ${this.loginData.user_id}님`,
                            imageUrl: '@/../public/image/login_success.png',
                            imageWidth: 150,
                            imageHeight: 150,
                            imageAlt: 'Custom image',
                        })
                        this.$router.push('/main');
                    } else {
                        Swal.fire({
                            title: '아이디/비밀번호를 \n 다시 확인해주세요',
                            imageUrl: '@/../public/image/login_fail.png',
                            imageWidth: 150,
                            imageHeight: 150,
                            imageAlt: 'Custom image',
                        })
                    }
                })
                .catch(err => alert('오류가 발생했습니다: ' + err));
        },
        checkloginStatus() {
            const value = localStorage.getItem('loginKey');
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
                this.$router.push('/main');
            } else {
                console.log('LocalStorage에 값이 없습니다.');
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

.loginBox {
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

th,
td {
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

img {
    width: 300px;
    height: auto;
}
</style>