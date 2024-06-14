<template lang="">
    <div>
        <img src="@/../public/image/homeLogo.png" alt="홈 로고" />
    </div>
    <div class="loginBox">
        <h1>아이디 찾기</h1>
        <br>
        <table border="1" class="loginTable">
            <tr>
                <td>
                    <input type="text" v-model="name" placeholder="이름" size="20" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model="email" placeholder="이메일" size="20" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button v-on:click="findID" class="loginBtn">확인</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a :href="'/pw_search'">비밀번호 찾기</a>
                    <a :href="'/'">로그인</a>
                </td>
            </tr>
        </table>
        <br>
    </div>
</template>
<script>

import axios from 'axios';
export default {
    name: 'id_search',
    data() {
        return {
            name: '',
            email: '',
            resultID:''
        }
    },
    methods:{
        findID(){
            if (!this.name || !this.email) {
                alert("항목을 모두 입력해주세요.");
                return;
            }
            axios.get(`http://localhost:3001/User?name=${this.name}&email=${this.email}`)
                .then(res => {

                    if (res.data.length === 0) {
                        alert('현재 등록된 회원이 없습니다');
                        return;
                    }
                    const serverData = res.data[0];
                    if (serverData.name === this.name && serverData.email === this.email) {
                        this.resultID = serverData.user_id
                        alert("아이디 찾기 성공! 회원님의 아이디는 : " + this.resultID + " 입니다" );
                        
                    } else {
                        alert("현재 입력한 정보로 등록된 회원이 없습니다.")
                    }
                })
                .catch(err => alert('오류가 발생했습니다: ' + err));

        }
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