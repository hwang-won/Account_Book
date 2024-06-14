<template>
    <div class="recent-container">
        <h1>Recent List</h1>
        <!-- 테이블 -->
        <div>
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
                    <tr v-for="(content, index) in recentContents" :key="index" @click="detailPage(content)">
                        <td>{{ deleteT(content.create_date) }}</td>
                        <td>{{ content.category }}</td>
                        <td>{{ content.money }}</td>
                        <td>{{ content.type }}</td>
                        <td>{{ content.memo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id : JSON.parse(localStorage.getItem("loginKey")).user_id,
            contents: [],
        };
    },
    computed: {
        // 최근 5개만
        recentContents() {
            return this.contents.slice(0, 10); 
        }
    },
    mounted() {
        axios.get('http://localhost:3001/Plus')
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
            }
        );
    },
    methods: {
        // json 데이터를 날짜 순으로 정렬
        sortDate() {

            this.contents.filter(content => {
                if(this.user_id == content.user_id){
                    return true
                } else{
                    return false
                }
            })

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
.recent-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
table {
    width:1100px;
    max-width: 1200px;
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow:  0 0 0 1px #e0e0e0;
    border-style: hidden;   
    text-align: left;
}
th, td {
    border: 1px solid #cfcfcf;
    padding:12px;
    border-right: none;
    border-left: none;
}
tr:hover {
    background-color: #ebebeb;
    cursor: pointer;
}
</style>
