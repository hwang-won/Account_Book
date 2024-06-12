<template>
    <div>
        <Graph/>
        <router-view/>
    </div>
</template>

<script>
import Graph from "@/components/chart/graph.vue"
import Header from '@/components/header.vue';
import Body from '@/components/body/body.vue';

export default {
    name: "mainView",
    components:{Header, Body, Graph},
    
}
</script>
<style>
    
</style>