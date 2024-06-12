<template>
  <div id="app">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import List from './components/List.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    List,
    Sidebar,
  }
};
</script>

<style>
</style>