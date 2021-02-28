<template>
  <header :class="shrink ? 'hide' : ''">
    <nav>
      <a href="/"
        @click="page($event, 'dashboard')"
        :class="feature == 'dashboard' ? 'active' : ''"
      ><span>Dashboard</span></a>
      <a href="/"
        @click="page($event, 'profile')"
        :class="feature == 'profile' ? 'active' : ''"
      ><span>Dossier</span></a>
      <a class="logout" href="/logout">Logout</a>
    </nav>
  </header>
</template>

<style scoped>
footer {
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  position: fixed;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #f3f3f3;
} img {
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
