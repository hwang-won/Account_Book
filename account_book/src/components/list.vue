<template>
    <div>
        <h1>수입 및 지출 내역</h1>
        <div>
            <!-- 카테고리 선택 -->
            <label for="category-filter">카테고리:</label>
            <select id="category-filter" v-model="categoryFilter">
                <option value="">전체</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
            
            <!-- 수입/지출 선택 -->
            <label for="type-filter">수입/지출:</label>
            <select id="type-filter" v-model="typeFilter">
                <option value="">전체</option>
                <option value="수입">수입</option>
                <option value="지출">지출</option>
            </select>
        </div>

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
            <tbody>
                <tr v-for="content in filterContents" :key="content.id">
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
            categoryFilter: '',
            typeFilter: '',
        };
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
        axios.get('http://localhost:3002/Plus')
            .then(plusRes => {
                plusRes.data.forEach(item => {
                    item.type = '수입';
                    this.contents.push(item);
                }
            );
                axios.get('http://localhost:3002/Minus')
                    .then(minusRes => {
                        minusRes.data.forEach(item => {
                            item.type = '지출';
                            this.contents.push(item);
                        });
                        // 날짜 순으로 정렬하기
                        this.contents.sort((a, b) => new Date(a.create_date) - new Date(b.create_date));
                    }
                );
            }
        );
    },
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
