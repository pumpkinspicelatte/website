<template>
  <header>
    <nav>
      <a href="/"
        @click="page($event, 'lesson')"
        :class="feature == 'lesson' ? 'active' : ''"
      ><span>{{ feature == 'lesson' ? 'Lesson' : 'Lesson' }}</span></a>
      <a href="/"
        @click="page($event, 'editor')"
        :class="feature == 'editor' ? 'active' : ''"
      ><span>{{ feature == 'editor' ? 'Editor' : 'Editor' }}</span></a>
      <a href="/"
        @click="page($event, 'output')"
        :class="feature == 'output' ? 'active' : ''"
      ><span>{{ feature == 'output' ? 'Output' : 'Output' }}</span></a>
    </nav>
  </header>
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
      hide: false,
      shrink: false,
      feature: "none",
      greeting: "loading..."
    };
  },
  mounted () {
    store.dispatch("user", {
      callback: ({ success, result }) => {
        if (!success) window.location.href = "/login";
        else this.greeting = result.message;
        this.feature = store.state.info.feature;
        setTimeout(() => {
          this.hide = true;
          setTimeout(() => {
            this.shrink = true;
            document.body.classList.add("hide");
          }, 350);
        }, 1500);
      },
    });
  },
  methods: {
    page (event, feature) {
      event.preventDefault();
      this.feature = feature;
      store.dispatch("page", { feature });
    }
  }
};
</script>
