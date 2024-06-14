<template>
    <div>
        <Profile/>
    </div>
</template>
<script>
import Profile from '@/components/login/profile.vue';

export default {

    components:{Profile},
    data(){
        return{
            tabs:"Body",
            asideOpen: false
        }
    },
    mounted(){
        this.checkloginStatus();
    },

    methods:{
        checkloginStatus() {
            const value = localStorage.getItem('loginKey'); 
            if (value) {
                console.log('LocalStorage에 값이 있습니다:', value);
            } else {
                console.log('LocalStorage에 값이 없습니다.');
                this.$router.push('/');
            }
        }
    }
}
</script>
<style>
    
</style>