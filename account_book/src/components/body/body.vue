<template>
    <div>
      <Graph/>
      <RecentList ref="recentListComponent" @recent-add-transaction="handleRecentAddTransaction" />
    </div>
  </template>
  
  <script>
  import Graph from "@/components/body/graph.vue";
  import RecentList from "@/components/body/recentList.vue";
  
  export default {
    name: "Body",
    components: { Graph, RecentList },
    methods: {
      handleRecentAddTransaction(transactionData) {

      },
      addTransactionToRecentList(transactionData) {
        this.$refs.recentListComponent.handleAddTransaction(transactionData);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
