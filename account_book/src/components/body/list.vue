<template>
    <div>
        <h1>list</h1>
        <div>
            <!-- 카테고리 선택 -->
            <label for="category">카테고리:</label>
            <select id="category" v-model="categoryFilter">
                <option value="">전체</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
            
            <!-- 수입/지출 선택 -->
            <label for="type">수입/지출:</label>
            <select id="type" v-model="typeFilter">
                <option value="">전체</option>
                <option value="수입">수입</option>
                <option value="지출">지출</option>
            </select>
        </div>

        <!-- 테이블 -->
        <table>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>수입/지출</th>
                    <th>메모</th>
                </tr>
            </thead>
            <!-- for문으로 값 넣기 -->
            <tbody>
                <tr v-for="content in filterContents" :key="content.id" @click="detailPage(content)">
                    <td>{{ content.create_date }}</td>
                    <td>{{ content.category }}</td>
                    <td>{{ content.money }}</td>
                    <td>{{ content.type }}</td>
                    <td>{{ content.memo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : "List",
    data() {
        return {
            user_id : JSON.parse(localStorage.getItem("loginKey")).user_id,
            contents: [],
            categoryFilter: '',
            typeFilter: '',
        };
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem("loginKey")).user_id;
    },
    computed: {
        filterContents() {
            let filtered = this.contents.filter(content => {
                // 카테고리 필터링
                if (this.categoryFilter && content.category !== this.categoryFilter) {
                    return false;
                }
                // 수입/지출 필터링
                if (this.typeFilter && content.type !== this.typeFilter) {
                    return false;
                }
                // 아이디 필터링
                if (this.user_id != content.user_id){
                    return false;
                }
                
                return true;
            });
            return filtered;
        },
        categories() {
            // 카테고리 목록 생성
            return [...new Set(this.contents.map(content => content.category))];
        },
    },
    mounted() {
        axios.get('http://localhost:3001/Plus')
            .then(plusRes => {
                plusRes.data.forEach(item => {
                    item.type = '수입';
                    item.jsonType = 'Plus';
                    this.contents.push(item);
                });
                axios.get('http://localhost:3001/Minus')
                    .then(minusRes => {
                        minusRes.data.forEach(item => {
                            item.type = '지출';
                            item.jsonType = 'Minus';
                            this.contents.push(item);
                        });
                    });
            });
    },
    methods: {
        detailPage(content) {
            // 클릭한 행의 id, jsonType 데이터를 전달
            this.$router.push({ 
                name: 'Detail', 
                params: { id: content.id, jsonType: content.jsonType } 
            });
        }
    }
};
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #cfcfcf;
        padding: 8px;
    }
    th {
        background-color: #eeeeee;
    }
</style>