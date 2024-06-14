<template>
    <div class="loginBox">
        <div>
            <h1>프로필 수정페이지</h1>
        </div>
        <div>
            <table>
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
                            <input type="text" v-model="pw" />
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
                            <input type="text" v-model="name" />
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
                            <input type="text" v-model="email" />
                        </div>
                        <div v-else>
                            {{ userData.email }}
                        </div>
                    </td>
                </tr>
            </table>
            <br>
            <div class="btnBox"> 
                <button @click="goMain">메인페이지로</button>
                <button @click="editButton">{{ editMode ? '저장하기' : '수정하기' }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    data() {
        return {
            loginID: '',    
            dataID:'',   
            userData: {},
            pw: "",
            name: "",
            email: "",
            editMode: false
        }
    },
    methods: {
        getUser() {
            const value = JSON.parse(localStorage.getItem('loginKey'));
            this.loginID = value.user_id;
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

<style scoped>
h1 {
    padding-top: 60px;
}
.loginBox   {
    width: 700px;
    background-color: rgb(255, 245, 198);
    border-radius: 50px;
}
table {
    width: 80%;
    border-collapse: collapse;
    border-radius: 5px;
    border-style: hidden;  
    margin: 0 auto;

}
th, td {
    padding: 20px 0 20px 0;
    border-right: none;
    border-left: none;
}
tr > td {
    width: 50%;
    padding-left: 50px;
}
tr > td:nth-child(2) {
    width: 50%;
    padding-right: 50px;
}
th {
    background-color: #ebebeb;
}
tr:hover {
    background-color: rgb(255, 235, 146);
    cursor: pointer;
}
input[type=text] {
    width: 200px;
    padding: 10px;
    font-size: 12px;
    border-radius: 5px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid rgb(173, 173, 173);
}
input[type=text]:focus {
    outline: none;
    border: 1px solid black;
}
.btnBox {
    display: flex;
    justify-content: center;
}
button {
    background-color: rgb(255, 204, 0);
    margin: 0 20px 50px 20px;
    color: rgb(65, 65, 65);
    font-weight: 600;
}
</style>