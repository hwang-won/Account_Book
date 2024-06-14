<template>
    <div class="wrap">
        <h1>거래내역</h1>
        <div class="filter">
            <!-- 날짜선택 -->
            <div>
                <label for="startDate">시작일</label>
                <input type="date" id="startDate" v-model="startDate">
            </div>
            <div>
                <label for="endDate">종료일</label>
                <input type="date" id="endDate" v-model="endDate">
            </div>
            <!-- 카테고리 선택 -->
            <div>
                <label for="category">카테고리</label>
                <select id="category" v-model="categoryFilter">
                    <option value="">전체</option>
                    <option v-for="category in categories" :key="category">{{ category }}</option>
                </select>
            </div>
            <!-- 수입/지출 선택 -->
            <div>
            <label for="type">수입/지출</label>
                <select id="type" v-model="typeFilter">
                    <option value="">전체</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                </select>
            </div>
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
            user_id : JSON.parse(localStorage.getItem("loginKey")).user_id,
            contents: [],
            categoryFilter: '',
            typeFilter: '',
            startDate: '',
            endDate: '',
        };
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem("loginKey")).user_id;
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
        let params = {"user_id" : this.user_id}
        axios.get('http://localhost:3001/Plus', {params})
            .then(plusRes => {
                plusRes.data.forEach(item => {
                    item.type = '수입';
                    item.jsonType = 'Plus';
                    this.contents.push(item);
                });
                return axios.get('http://localhost:3001/Minus');
            })
            .then(minusRes => {
                minusRes.data.forEach(item => {
                    item.type = '지출';
                    item.jsonType = 'Minus';
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
                name: 'ListDetailView',
                params: { id: content.id, jsonType: content.jsonType }
            });
        },
        // 날짜에 t 없애기
        deleteT(data) {
            return data.replace('T', ' ');
        },
        // 트랜잭션 객체
        handleAddTransaction({ type, transaction }) {
            transaction.type = type === 'Plus' ? '수입' : '지출';
            transaction.jsonType = type;
            this.contents.unshift(transaction);
            this.sortDate();
        }
    }
};
</script>
<style scoped>
h1 {
    margin-bottom: 50px;
}
.wrap {
    width: 1000px;
    margin: 0 auto;
    padding: 30px;
    background-color: rgb(252, 250, 241);
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.2);
}
.filter {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    background-color: white;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
label {
    margin-right: 10px;
    font-weight: 600;
}
input[type="date"],
select {
    padding: 6px;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
}
table {
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border-radius: 5px;
    box-shadow:  0 0 0 1px #e0e0e0;
    border-style: hidden;  
}
th, td {
    border: 1px solid #CFCFCF;
    padding: 8px;
    border-right: none;
    border-left: none;
}
th {
    background-color: #EBEBEB;
}
tr:hover {
    background-color: #EBEBEB;
    cursor: pointer;
}
</style>