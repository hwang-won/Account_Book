<template>
  <div>
    <Header />
    <Graph />
    <bodyView/>
  </div>
</template>
<script>
import BodyView from "../components/BodyView.vue";
import Graph from "../components/Graph.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    Graph,
    Header,
    BodyView,
  },
};
</script>

<style scoped>

Header {
  position: absolute;
  top: 10px;
  left:0;
  right:0;
}

</style>
