<template>
  <aside id="lesson">
    <div id="back" aria-label="previous lesson" class="primary circle" @click="back($event)">&lt;</div>
    <div id="next" aria-label="next lesson" class="primary circle" @click="next($event)">&gt;</div>
    <p v-for="(line, i) in lines" :key="`lesson-line-${i}`" :class="line.type">
      <span v-for="(content, j) in line.content" :key="`${i}-content-${j}`">{{ content }}</span>
    </p>
  </aside>
</template>

<style scoped>
#next, #back {
  margin: 0;
  top: 10px;
  padding: 0;
  width: 50px;
  z-index: 10;
  height: 50px;
  display: flex;
  color: white;
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background-color: orange;
  box-shadow: 0 3px 5px #ddd;
} #next {
  right: 10px;
  text-shadow: 3px 3px 3px rgb(228, 148, 0);
} #back {
  left: 10px;
  text-shadow: -3px 3px 3px rgb(228, 148, 0);
} #next:hover, #back:hover {
  opacity: 0.85;
  text-shadow: none;
} #next:active, #back:active {
  transition: 0.3s;
  text-shadow: none;
  box-shadow: 0 0 7px orange;
}

#lesson {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: center;
} #lesson p {
  display: flex;
  margin: 10px 0;
  max-width: 51%;
  min-width: 51%;
  padding: 10px 20px;
  border-radius: 3px;
  background-color: #eee;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 3px 5px #ddd;
} #lesson p span {
  margin: 0;
  max-width: 100%;
  min-width: 100%;
  box-shadow: none;
  padding: 5px 0 0 0;
  background-color: transparent;
} #lesson p.loading  {
  background-color: white;
  box-shadow: none;
} #lesson p.loading span {
  display: flex;
  font-size: 30px;
  min-height: 100%;
  align-items: center;
  justify-content: center;
} #lesson p.header span {
  padding: 0;
  display: flex;
  color: orange;
  font-size: 30px;
  align-items: center;
  justify-content: center;
} #lesson p.paragraph {
  color: dimgrey;
  font-size: 18px;
  align-items: center;
} #lesson p.code {
  background-color: black;
} #lesson p.code span {
  display: flex;
  color: bisque;
  font-family: monospace;
}

.blinking {
	animation:blinkingText 1s infinite;
}

@keyframes blinkingText{
	0%{		color: dimgrey;	}
	49%{	color: transparent;	}
	50%{	color: transparent;	}
	99%{	color:transparent;	}
	100%{	color: dimgrey;	}
}

@media only screen and (max-width:1385px){
  #lesson p {
    max-width: 80%;
    min-width: 80%;
  }
}

@media only screen and (max-width:800px){
  #lesson p {
    max-width: 75%;
    min-width: 75%;
  }
}
</style>

<script>
import store from "@/store";
export default {
  data () {
    return {
      total: 0,
      lesson: 1,
      lines: [{
        type: 'loading blinking',
        content: ['Loading...'],
      }],
    };
  },
  mounted () {
    this.getTotal();
    this.getLesson();
  },
  methods: {
    getTotal () {
      store.dispatch("count", {
        callback: ({ success, result }) => {
          if (!success) return;
          this.total = result;
        },
      });
    },

    getLesson () {
      store.dispatch("lesson", {
        id: this.lesson,
        callback: ({ success, result }) => {
          if (!success) return;
          this.lines = result;
        },
      });
    },

    back () {
      this.getTotal();
      if (this.lesson > 1) this.lesson--;
      this.getLesson();
    },

    next () {
      if (this.lesson < this.total) this.lesson++;
      this.getLesson();
      this.getTotal();
    },
  },
}
</script>