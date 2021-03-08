<template>
  <main>
    <section>
      <Lesson v-if="lesson" :class="`${editor || output ? 'editor' : ''}`"/>
      <Editor
        v-if="editor"
        :class="`${lesson ? 'lesson' : ''} ${output ? 'output' : ''}`"
      />
      <Output
        v-if="output"
        :class="`${lesson ? 'lesson' : ''} ${editor ? 'editor' : ''}`"
      />
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
} #lesson, #editor, #output {
  height: 100%;
  max-height: 100%;
  min-height: 100%;
} #editor.lesson, #output.lesson, #lesson.editor {
  height: 50%;
  max-height: 50%;
  min-height: 50%;
} #editor.lesson.output, #output.lesson.editor {
  width: 50%;
  max-width: 50%;
  min-width: 50%;
}
</style>

<script>
import store from "@/store";

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
  },
  mounted () {
    store.dispatch('open', {
      callback: (key) => {
        this[key] = !this[key];
      }
    });
  }
}
</script>


