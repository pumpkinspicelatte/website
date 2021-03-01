<template>
  <main>
    <section>
      <Lesson v-if="lesson"/>
      <Editor v-if="editor"/>
      <Output v-if="output"/>
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
} section {
  overflow: auto;
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
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
  },
  data () {
    return {
      lesson: true,
      editor: true,
      output: false,
    };
  }
}
</script>


