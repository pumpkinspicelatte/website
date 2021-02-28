<template>
  <main>
    <section>
      <Lesson />
      <Editor />
      <Output />
    </section>
    <Navigation />
  </main>
</template>

<style>
main {
  overflow: hidden;
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
}
</style>

<script>
import Editor from "@/components/Editor";
import Lesson from "@/components/Lesson";
import Output from "@/components/Output";
import Navigation from "@/components/Navigation";

export default {
  components: {
    Editor,
    Lesson,
    Output,
    Navigation,
  }
}
</script>


