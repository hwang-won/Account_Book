<template>
    <div class="sidebar">
        <ul class="menu">
            <li>
                <button @click="changeTab('Body')">Home</button>
            </li>
            <li>
                <button @click="changeTab('List')">거래내역</button>
            </li>
            <li>
                <button @click="changeTab('Notice')">공지사항</button>
            </li>
            <li>
                <button @click="changeTab('Client')">고객문의</button>
            </li>
        </ul>
    </div>
</template>

<script>

export default{
    name: "Aside",
    data(){
       return{
            tab:"Body"
       } 
    },
    created(){
        this.$emit("tab_value", this.tab)
    },
    methods:{
        changeTab(name){
            if (this.$route.path != "/main"){
                this.$router.push("/main")
            } else{
                this.tab = name;
                this.$emit("tab_value", this.tab)
            }
        }
    }
}

</script>

<style>
.sidebar {
    margin-top: 60px;
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff2d1;
    border-right: 1px solid #e9e9e9ee;
}

.menu {
    list-style: none;
    padding: 0;
}

.menu li {
    padding: 16px;
    margin: 10px;
    background-color: white;
    border-radius: 10px;
}

.menu li a {
    text-decoration: none;
    color: black;
    font-size: 16px;
}

.router-link-active {
    font-weight: 600;
}
</style>