<template>
    <div>
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
                <tr v-for="(content, index) in recentContents" :key="index" @click="detailPage(content)">
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
    data() {
        return {
            contents: [],
        };
    },
    computed: {
        // 최근 5개만
        recentContents() {
            return this.contents.slice(0, 5);
        }
    },
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
            }
            );
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
        }
    }
};
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #cfcfcf;
    padding: 8px;
}

th {
    background-color: #eeeeee;
}
</style>
