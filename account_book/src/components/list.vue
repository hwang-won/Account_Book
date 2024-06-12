<template>
    <div>
        <h1>list</h1>
        <div>
            <!-- 날짜선택 -->
            <label for="startDate">시작일:</label>
            <input type="date" id="startDate" v-model="startDate">
            <label for="endDate">종료일:</label>
            <input type="date" id="endDate" v-model="endDate">

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
                <tr v-for="content in filteredContents" :key="content.id" @click="detailPage(content)">
                    <td>{{ deleteT(content.create_date) }}</td>
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
    data() {
        return {
            contents: [],
            categoryFilter: '',
            typeFilter: '',
            startDate: '',
            endDate: '',
        };
    },
    computed: {
        // 필터링
        filteredContents() {
            let filtered = this.contents.filter(content => {
                // 카테고리 필터링
                if (this.categoryFilter && content.category !== this.categoryFilter) {
                    return false;
                }
                // 수입/지출 필터링
                if (this.typeFilter && content.type !== this.typeFilter) {
                    return false;
                }
                // 날짜 기간 필터링
                if (this.startDate && this.endDate) {
                    let startDate = new Date(this.startDate);
                    let endDate = new Date(this.endDate);
                    let contentDate = new Date(content.create_date.replace('T', ' '));
                    return contentDate >= startDate && contentDate <= endDate;
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
    // json server 값 받아오기
    mounted() {
        axios.get('http://localhost:3001/Plus')
            .then(plusRes => {
                plusRes.data.forEach(item => {
                    item.type = '수입';
                    item.jsonType = 'plus';
                    this.contents.push(item);
                });
                return axios.get('http://localhost:3001/Minus');
            })
            .then(minusRes => {
                minusRes.data.forEach(item => {
                    item.type = '지출';
                    item.jsonType = 'minus';
                    this.contents.push(item);
                });
                // 날짜 순 정렬
                this.sortDate();
            })
            .catch(err => {
                alert(err);
            });
    },
    methods: {
        // json 데이터를 날짜 순으로 정렬
        sortDate() {
            this.contents.sort((a, b) => {
                let A = new Date(a.create_date.replace('T', ' '));
                let B = new Date(b.create_date.replace('T', ' '));
                return B - A;
            });
        },
        // 클릭한 행의 id, jsonType 데이터를 전달
        detailPage(content) {
            this.$router.push({ 
                name: 'Detail', 
                params: { id: content.id, jsonType: content.jsonType } 
            });
        },
        // 날짜에 t 없애기
        deleteT(data) {
            return data.replace('T', ' ');
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
