<template>
    <div>
        <h2>프로필 수정페이지</h2>
    </div>
    <div>
        <h3>회원정보</h3>
        <table border="1">
            <tr>
                <td>아이디</td>
                <td>
                    {{ userData.user_id }}
                </td>
            </tr>
            <tr>
                <td>비밀번호</td>
                <td>
                    <div v-if="editMode">
                        <input v-model="pw" />
                    </div>
                    <div v-else>
                        {{ userData.password }}
                    </div>
                </td>
            </tr>
            <tr>
                <td>이름</td>
                <td>
                    <div v-if="editMode">
                        <input v-model="name" />
                    </div>
                    <div v-else>
                        {{ userData.name }}
                    </div>
                </td>
            </tr>
            <tr>
                <td>이메일</td>
                <td>
                    <div v-if="editMode">
                        <input v-model="email" />
                    </div>
                    <div v-else>
                        {{ userData.email }}
                    </div>
                </td>
            </tr>
        </table>
        <div v-if="editMode">* 아이디는 수정불가합니다.</div>
        <br>
        <button @click="goMain">메인페이지로</button>
        <button @click="editButton">{{ editMode ? '저장하기' : '수정하기' }}</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    data() {
        return {
            loginID: '',    //login 아이디
            dataID:'',      //json-server에서 부여한 id
            userData: {},
            pw: "",
            name: "",
            email: "",
            editMode: false
        }
    },
    methods: {
        getUser() {
            //alert("get user 실행");
            const value = JSON.parse(localStorage.getItem('loginKey'));
            this.loginID = value.user_id;
            console.log("현재 접속된 계정:", this.loginID);

            axios.get(`http://localhost:3001/User?user_id=${this.loginID}`)
                .then(res => {
                    this.userData = res.data[0];
                    this.pw = this.userData.password;
                    this.name = this.userData.name;
                    this.email = this.userData.email;
                    this.dataID = this.userData.id;
                })
                .catch(err => alert("오류발생 :" + err));
        },
        editButton() {
            if (this.editMode) {
                if (!this.pw || !this.name || !this.email) {
                    alert("모든 값을 입력해주세요.");
                    return;
                }
                const newUser = {
                    user_id: this.loginID,
                    password: this.pw,
                    name: this.name,
                    email: this.email,
                };

                axios.put(`http://localhost:3001/User/${this.dataID}`, newUser)
                    .then(res => {
                        this.userData = res.data;
                        console.log(JSON.stringify(this.userData));
                        alert("데이터를 저장합니다.");
                    })
                    .catch(err => alert("오류발생 :" + err));
            }
            this.editMode = !this.editMode;
        },
        goMain(){
            this.$router.push('/main');
        }
    },
    mounted() {
        this.getUser();
    }
}
</script> 

<style lang="">
</style>