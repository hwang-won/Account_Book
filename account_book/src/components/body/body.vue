<template>
    <div>
        <Graph/>
        <RecentList/>
    </div>
</template>

<script>
import Graph from "@/components/body/graph.vue"
import RecentList from "@/components/body/recentList.vue";

export default {
    name: "Body",
    components : {Graph, RecentList}
}
</script>

<style>
    
</style>