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
footer {
height: 49px;
    border-top: 1px solid orange;
} img {
  width: 200px;
} nav {
  display: flex;
  min-width: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: space-evenly;
} nav.right {
  justify-content: flex-end;
} a {
  width: 75px;
  height: 47px;
  display: flex;
  color: orange;
  font-size: 18px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  border-top: 3px solid white;
} a:hover, a:active {
  opacity: 0.85;
  color: #aaaaaa;
  border-top: 3px solid #aaaaaa;
} .active {
  border-top: 3px solid orange;
} .active img {
  opacity: 0.5;
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
