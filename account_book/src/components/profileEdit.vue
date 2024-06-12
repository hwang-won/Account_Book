<template lang="">
    <div>
        <h2>프로필 수정페이지</h2>
    </div>
    <div>
        <thead>
            <tr>
                   <th>id</th>
                  <th>first_Name</th>
                        <th>last_Name</th>
                        <th>email</th>
                        <th>gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="person in human" :key="person.id">
                        <td>{{ person.id }}</td>
                        <td>{{ person.first_name }}</td>
                        <td>{{ person.last_name }}</td>
                        <td>
                            <a :href="`mailto:${person.email}`">{{ person.email }}</a>
                        </td>
                        <td>{{ person.gender }}</td>
                    </tr>
                </tbody>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'profileEdit',
    data() {
        return {
            currentID: ''
        }
    },
    methods: {
        getUser() {
            alert("get user 실행");
            const value = JSON.parse(localStorage.getItem('loginKey'));
            this.currentID = value.user_id;
            //console.log(this.currentID);

            axios.get(`http://localhost:3001/User?user_id=${this.currentID}`)
                .then(res => {


                })
                .catch(err => alert("오류발생 :" + err))


        }
    },
    mounted() {
        this.getUser();
    }
}
</script>

<style lang="">

</style>
