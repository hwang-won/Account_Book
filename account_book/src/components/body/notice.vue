<template>
    <div>
        <h3>공지사항</h3>
    </div>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice, index) in sortDate" :key="index" @click="detailPage(notice.id)">
                    <td>{{ index + 1 }}</td>
                    <td>{{ notice.title }}</td>
                    <td>{{ notice.writer }}</td>
                    <td>{{ deleteT(notice.create_date) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Notice",
    data() {
        return {
            noticeList: []
        }
    },
    computed: {
        // 날짜 내림차순 정렬
        sortDate() {
            return this.noticeList.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
        }
    },
    mounted() {
        this.getNoticelist();
    },
    methods: {
        getNoticelist() {
            axios.get("http://localhost:3001/Notice")
                .then(res => {
                    this.noticeList = res.data;
                })
                .catch(err => alert("오류 발생: " + err));
        },
        detailPage(id) {
            this.$router.push({ name:'NoticeView', params: { 'id': id } });
        },
        deleteT(data) {
            return data.replace('T', ' ');
        }
    }
}
</script>

<style></style>
