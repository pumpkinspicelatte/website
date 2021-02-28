<template>
  <footer>
    <nav>
      <a href="/"
        @click="page($event, 'lesson')"
        :class="lesson ? 'active' : ''"
      ><span>{{ feature == 'lesson' ? 'Lesson' : 'Lesson' }}</span></a>
      <a href="/"
        @click="page($event, 'editor')"
        :class="editor ? 'active' : ''"
      ><span>{{ feature == 'editor' ? 'Editor' : 'Editor' }}</span></a>
      <a href="/"
        @click="page($event, 'output')"
        :class="output ? 'active' : ''"
      ><span>{{ feature == 'output' ? 'Output' : 'Output' }}</span></a>
    </nav>
  </footer>
</template>

<style scoped>
 img {
  width: 200px;
} nav {
  display: flex;
  min-width: 80%;
  min-height: 100%;
  max-width: 1152px;
  align-items: center;
  justify-content: space-around;
} nav.right {
  justify-content: flex-end;
} a {
  color: black;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
} a:hover, a:active {
  color: #e98667;
  opacity: 0.85;
  text-decoration: underline;
} .active {
  color: #e98667;
} .active img {
  opacity: 0.5;
} .logout {
  color: white;
  font-size: 14px;
  padding: 7px 30px;
  border-radius: 5px;
  background-color: #FFBD59;
} a.logout:hover {
  color: #777777;
}
</style>

<script>
import store from "@/store";
export default {
  data () {
    return {
      lesson: true,
      editor: true,
      output: false,
    };
  },
  methods: {
    page (event, feature) {
      event.preventDefault();
      this[feature] = !this[feature];
      store.dispatch("page", { feature });
    }
  }
};
</script>
