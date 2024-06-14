<template>
    <div>
        <h3>공지사항 상세</h3>
        <div>
            <table border="1">
                <tr>
                    <th>제목</th>
                    <td colspan="3">{{ notice.title }}</td>
                </tr>
                <tr>
                    <th>작성자</th>
                    <td>{{ notice.writer }}</td>
                    <th>작성일</th>
                    <td>{{ date }}</td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td colspan="3">{{ notice.content }}</td>
                </tr>
            </table>
        </div>
        <!-- <button @click="goBack">뒤로가기</button>  -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NoticeDetail',
    data() {
        return {
            notice: {},
            date: ""
        }
    },
    mounted() {
        this.getNoticeDetail();
    },
    methods: {
        getNoticeDetail() {
            const id = this.$route.params.id;
            axios.get(`http://localhost:3001/Notice/${id}`)
                .then(res => {
                    this.notice = res.data;
                    this.date = res.data.create_date.replace('T', ' ');

                })
                .catch(err => alert("오류 발생: " + err));
        },

        // goBack() {
        //     this.$router.push({ name: 'Notice' });
        // }
    }
}
</script>

<style></style>