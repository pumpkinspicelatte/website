<template>
  <aside id="lesson">
    <button id="back" aria-label="previous lesson" class="primary circle" @click="back($event)">&lt;</button>
    <button id="next" aria-label="next lesson" class="primary circle" @click="next($event)">&gt;</button>
    <p v-for="(line, i) in lines" :key="`lesson-line-${i}`" :class="line.type">
      <span v-for="(content, j) in line.content" :key="`${i}-content-${j}`">{{ content }}</span>
    </p>
  </aside>
</template>

<style scoped>
#next, #back {
  width: 50px;
  z-index: 10;
  height: 50px;
  font-size: 35px;
  margin-top: 10px;
  align-self: center;
} #next {
  float: right;
  margin-right: 10px;
} #back {
  float: left;
  margin-left: 10px;
}

#lesson {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  min-height: 100%;
  max-height: 100%;
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
    max-width: 95%;
    min-width: 95%;
  } #lesson p.header span,
  #lesson p.loading span {
    font-size: 5vw;
  } #lesson p.paragraph {
    font-size: 4vw;
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
      (async () => {
        const res = await fetch(`/lesson/count`).then(res => res.json());
        if (res.success) {
          this.total = res.result;
        }
      })();
    },

    getLesson () {
      (async () => {
        const res = await fetch(`/lesson/${this.lesson}`).then(res => res.json());
        if (res.success) {
          this.lines = res.result;
        }
      })();
    },

    back (event) {
      this.getTotal();
      if (this.lesson > 1) this.lesson--;
      this.getLesson();
    },

    next (event) {
      if (this.lesson < this.total) this.lesson++;
      this.getLesson();
      this.getTotal();
    },
  },
}
</script>