<template lang="">
    <div>
        <h1>회원가입</h1>
        <table>
            <tr>
                <td>아이디</td>
                <td>
                    <input v-model="id" placeholder="id 입력" size="20" />
                    <p>{{ message }}</p>
                    <button @click="idcheck">중복확인</button>
                </td>
            </tr>
            <tr>
                <td>비밀번호</td>
                <td>
                    <input type=password v-model="pw" placeholder="pw 입력" size="20"/>
                </td>
            </tr>
            <tr>
                <td>이름</td>
                <td>
                    <input v-model="name" placeholder="이름 입력" size="20"/>
                </td>
            </tr>
            <tr>
                <td>이메일</td>
                <td>
                    <input v-model="email" placeholder="이메일 입력" size="20"/>
                </td>
            </tr>
            <tr>
                <td>계좌잔고</td>
                <td>
                    <input v-model="account" placeholder="계좌잔고 입력" size="20"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="addUser">회원가입</button>
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
            //alert('id호출')
            axios.get(`http://localhost:3001/User?user_id=${this.id}`)
                .then((res) => {


                    // console.log("idcheck실행")
                    // console.log(JSON.stringify(res.data))

                    if (res.data.length > 0) {
                        // user_id가 중복되는 경우
                        this.message = "중복";
                        this.id = "";
                    } else {
                        // 사용할 수 있는 id
                        this.message = "사용할 수 있는 id"
                    }

                })
                .catch(err => alert(err));
        },
        addUser() {
            //console.log("addUser실행")

            if (!this.id || !this.pw || !this.name || !this.email || !this.account) {
                alert("모든 값을 입력해주세요.");
                return;
            }
            const newUser = {
                user_id: this.id, password: this.pw,
                name: this.name, email: this.email,
                account: this.account
            };
            axios.post("http://localhost:3001/User", newUser)
                .then(res => {
                    console.log("user 추가 완료")

                    this.form_init();

                    alert("회원가입 완료")
                    // 로그인 페이지 이동
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
<style lang="">

</style>