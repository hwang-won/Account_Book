<template lang="">
    <div>
        <img src="@/../public/image/homeLogo.png" alt="홈 로고" />
    </div>
    <div class="loginBox">
        <h1>회원가입</h1>
        <table class="loginTable">
            <tr>
                <td class="idTd1">
                    <input type="text" v-model="id" placeholder="아이디" size="20" />
                </td>
                <td class="idTd2">
                    <button @click="idcheck">중복확인</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type=password v-model="pw" placeholder="비밀번호" size="20"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="text" v-model="name" placeholder="이름" size="20"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="text" v-model="email" placeholder="이메일" size="20"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="addUser" class="loginBtn">확인</button>
                </td>
            </tr>
        </table>
        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "regi",
    data() {
        return {
            id: "",
            pw: "",
            name: "",
            email: "",
            account: "",
            message: ""
        }
    },
    methods: {
        idcheck() {
            axios.get(`http://localhost:3001/User?user_id=${this.id}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        alert("중복입니다");
                        this.id = "";
                    } else {
                        alert("사용할 수 있는 아이디 입니다.")
                    }

                })
                .catch(err => alert(err));
        },
        addUser() {
            if (!this.id || !this.pw || !this.name || !this.email) {
                alert("모든 값을 입력해주세요.");
                return;
            }
            const newUser = {
                user_id: this.id, password: this.pw,
                name: this.name, email: this.email
            };
            axios.post("http://localhost:3001/User", newUser)
                .then(res => {
                    this.form_init();
                    alert("회원가입 완료")
                    this.$router.push('/');
                })
                .catch(err => alert(err));
        },
        form_init() {
            this.id = '';
            this.pw = '';
            this.name = '';
            this.email = '';
            this.account = '';
        }

    }

}
</script>
<style scoped>
h1 {
    padding-top: 60px;
}

.idTd1 input {
    float: right;
}

.idTd2 {
    width: 125px;
}

.idTd2 button {
    float: left;
    color: rgb(85, 85, 85);
    background-color: rgb(240, 240, 240);
    border: 1px solid rgb(170, 170, 170);
}

.idTd2 button:hover {
    border: 1px solid rgb(121, 121, 121);

}

.loginBox {
    width: 700px;
    height: 550px;
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