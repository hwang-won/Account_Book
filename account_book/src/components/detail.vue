<template>
    <div>
        <div>
            <table style="width: 500px;" border="1">
                <tr>
                    <td>회원명</td>
                    <td>{{ user_id }}</td>
                </tr>
                <tr>
                    <td>
                        <span v-if="isPlus=='plus'">수입액</span>
                        <span v-else>지출액</span>
                    </td>
                    <td v-if="isUpdate==false">{{ money }}</td>
                    <td v-if="isUpdate==true"><input type="text" v-model.number="update_money"></td>
                </tr>
                <tr>
                    <td>카테고리</td>
                    <td v-if="isUpdate==false">{{ category }}</td>
                    <td v-if="isUpdate==true"><input type="text" v-model="update_category"></td>
                </tr>
                <tr>
                    <td>생성일</td>
                    <td>{{ create_date }}</td>
                </tr>
                <tr>
                    <td>수정일</td>
                    <td>{{ update_date }}</td>
                </tr>
                <tr>
                    <td>메모</td>
                    <td v-if="isUpdate==false">{{ memo }}</td>
                    <td v-if="isUpdate==true"><input type="text" v-model="update_memo"></td>
                </tr>
            </table>
        </div>
        <div>
            <div v-if="isUpdate==false">
                <button @click="startUpdate">수정</button>
            </div>
            <div v-if="isUpdate==true">
                <button @click="setUpdate">완료</button>
            </div>
            <div>
                <button @click="setDelete">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    name: "Detail",
    data(){
        return {
            // 상세 페이지 받아올 값들
            id:"",
            user_id:"",
            money: 0,
            create_date: new Date(),
            update_date: new Date(),
            category: "",
            memo : "",

            // 수정할 값들
            update_money: 0,
            update_category: "",
            update_memo : "",

            isPlus: "Plus",     // 수출입 구분
            isUpdate: false // 수정 전(false)/ 수정 후(false)
        }
    },

    created(){
        this.isUpdate = false;
        this.id = "1";
        this.user = "user_id"
    },

    mounted(){
        this.getDetail();
        this.isUpdate = false;
    },

    methods: {

        getDetail(){
            let url = "http://localhost:3001/" + this.isPlus
            let params = {"user_id" : this.user_id, "id" : this.id}
            axios.get(url,{params})
                .then((response) => {

                    this.user_id = response.data[0].user_id
                    this.money = response.data[0].money
                    this.create_date = response.data[0].create_date;
                    this.update_date = response.data[0].update_date;
                    this.category = response.data[0].category;
                    this.memo = response.data[0].memo;

                    return 
                })
                .catch((error) =>{
                    alert("error");
                })
        },

        startUpdate(){
            this.isUpdate = true;
        },

        setUpdate(){
            let url = "http://localhost:3001/" + this.isPlus + "/" + this.id;
            let params = {
                "money" : this.update_money, 
                "category" : this.update_category, 
                "memo" : this.update_memo,
                "create_date" : this.create_date,
                "update_date" : new Date()
            };

            axios.put(url, params)
                .then((response) =>{
                    alert("변경 완료");
                    this.user_id = response.data.user_id
                    this.money = response.data.money
                    this.update_date = response.data.update_date;
                    this.category = response.data.category;
                    this.memo = response.data.memo;

                    this.isUpdate = false;
                })
                .catch((error) => {
                    alert(error);
                })
        },

        setDelete(){
            let url = "http://localhost:3001/" + this.isPlus;
            let params = {"id" : this.id}
            axios.delete(url, params)
                .then((response) => {
                    alert(response);
                    this.$router.go(-1);
                })
                .catch((error) => {
                    alert(error.data);
                })
        },

    },
}
</script>

<style>
    
</style>