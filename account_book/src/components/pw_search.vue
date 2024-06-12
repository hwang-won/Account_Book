<template lang="">
    <div>
        <h1>비밀번호 찾기</h1>
        <br>
        <!--입력 폼 -->
        <table border="1">
            <tr>
                <td>ID</td>
                <td>
                    <input v-model="id" placeholder="id" size="20" />
                </td>
            </tr>
            <tr>
                <td>이름</td>
                <td>
                    <input v-model="name" placeholder="name" size="20" />
                </td>
            </tr>
            <tr>
                <td>이메일</td>
                <td>
                    <input v-model="email" placeholder="email" size="20" />
                </td>
            </tr>
            
            <tr>
                <td colspan="2">
                    <button v-on:click="findPassword">PW찾기</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a :href="'/id_search'"> id 찾기 |  </a>
                    <a :href="'/'"> 로그인 페이지로 </a>

                </td>
            </tr>

        </table>
        <br>
        회원님의 password: {{ resultPassword }}

    </div>
</template>
<script>

import axios from 'axios';
export default {
    name: 'id_search',
    data() {
        return {
            id:'',
            name: '',
            email: '',
            resultPassword:''
        }
    },
    methods:{
        findPassword(){
            if (!this.id || !this.name || !this.email) {
                alert("항목을 모두 입력해주세요.");
                return;
            }
            axios.get(`http://localhost:3001/User?user_id=${this.id}&name=${this.name}&email=${this.email}`)
                .then(res => {
                    if (res.data.length === 0) {
                        alert('현재 등록된 회원이 없습니다');
                        return;
                    }
                    const serverData = res.data[0];
                    if (serverData.user_id === this.id && serverData.name === this.name && serverData.email === this.email) {
                        this.resultPassword = serverData.password
                        alert("password 찾기 성공");
                        console.log("회원님의 Password :",this.resultPassword);
                        //alert(serverData.user_id + "님 환영합니다");

                        // this.email = '';
                        // this.name = '';
                        
                    } else {
                        alert("현재 입력한 정보로 등록된 회원이 없습니다.")
                    }
                })
                .catch(err => alert('오류가 발생했습니다: ' + err));

        }
    }
}

</script>
<style lang="">

</style>