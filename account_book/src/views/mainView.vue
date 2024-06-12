<template>
    <div>
        <header/>
        <aside/>
        <router-view/>
    </div>
</template>

<script>
import header from '@/components/header.vue';
import aside from '@/components/aside.vue';
import body from '@/components/body/body.vue';

export default {
    name: "mainView",
    components:{header, aside, body},
    
}
</script>
<style>
    
</style>