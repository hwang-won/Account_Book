<template>
  <div id="app">
    <sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import list from './components/List.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    list,
    Sidebar
  }
};
</script>

<style>
</style>