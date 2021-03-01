<template>
  <aside id="editor">
    <div v-for="(line, i) in lines" :key="`line-${i}`" :id="`line-${i}`" class="row" @click="focus($event)">
      <div :title="i">{{ i + 1 }}</div>
      <div :title="i">
        <span v-for="(token, j) of line" :key="`${i}-token-${j}`" :title="j" :class="token.type">
          {{ token.content }}
        </span>
      </div>
    </div>
    <div id="caret" class="hidden">|</div>
  </aside>
</template>

<style scoped>
#caret {
  z-index: 10;
  color: white;
  display: block;
  position: absolute;
} #caret.hidden {
  display: none;
}

#editor {
  height: 50%;
  cursor: text;
  color: white;
  display: flex;
  overflow: auto;
  min-height: 50%;
  flex-direction: column;
  background-color: black;
} #editor .row {
  width: 100%;
  display: flex;
  flex-direction: row;
  font-family: 'Courier New', Courier, monospace;
} #editor .row div:first-child {
  color: bisque;
  display: flex;
  min-width: 30px;
  border-right: 1px bisque solid;
  font-family: 'Courier New', Courier, monospace;
} #editor .row div:last-child {
  flex: 1 0;
  display: flex;
  margin-left: 10px;
  overflow-x: visible;
  font-family: 'Courier New', Courier, monospace;
} #editor .row div:last-child span {
  max-height: 21px;
  overflow-x: visible;
  white-space: nowrap;
  padding-right: 8.5px;
  font-family: 'Courier New', Courier, monospace;
} .OPEN, .CLOSE {
  color: lightsalmon;
} .TYPE {
  color: orange;
} .LITERAL, .QUOTE {
  color: lightgrey;
} .ERROR {
  color: salmon;
} .OUT {
  color: lightgreen;
} .IN {
  color: cyan;
} .MATH, .REFID {
  color: plum;
} .ID {
  color: yellow;
} .IF, .ENDIF, .WHILE, .ENDWHILE {
  color: skyblue;
}
</style>

<script>
import store from "@/store";

import { id, token, tokens, keywords } from '@/utils';

const TOP = 18;
const SPACE = 9.609;
const LEFT_BASE = 41;
const LEFT = 9.609;

export default {
  data () {
    return {
      open: '',
      caret: null,
      interval: null,
      currentLine: 0,
      currentToken: 0,
      state: tokens.NONE,
      currentPosition: 0,
      lines: [
        [{
          type: tokens.OPEN,
          content: '<3',
        }], [{
          type: tokens.OUT,
          content: 'can.i.just.say.something:',
        }, {
          type: tokens.QUOTE,
          content: '"Hello, world!"',
        }], [{
          type: tokens.CLOSE,
          content: '</3',
        }],
      ],
    };
  },
  mounted () {
    this.caret = document.getElementById('caret');
    this.count();
  },
  methods: {
    count () {
      const { caret, lines, currentLine, currentToken, currentPosition } = this;
      this.state = lines[currentLine][currentToken].type;

      let spaces = 0;
      let letters = 0;
      for (let y = 0; y < currentToken; y++) {
        const c = lines[currentLine][y].content;
        letters += c.length;
        spaces++;
      } letters += currentPosition;

      spaces = spaces * SPACE;
      letters = letters * LEFT;

      // TODO: update scroll to position of editor to caret
      const line = currentLine < 20 ? currentLine : currentLine % 20;

      caret.style.marginTop = `${line * TOP}px`;
      caret.style.marginLeft = `${letters + spaces + LEFT_BASE}px`;
    },

    copy (arr = [], s = 0, e = arr.length, add = []) {
      let copy = [];

      for (let i = s; i < e; i++) {
        let toke = {
          type: null,
          content: null,
        };

        toke.type = tokens.NONE;
        toke.content = arr[i].content;

        copy.push(toke);
      }

      for (let i = 0; i < add.length; i++) {
        let toke = {
          type: null,
          content: null,
        };

        toke.type = tokens.NONE;
        toke.content = add[i].content;

        copy.push(toke);
      }

      return copy;
    },

    range () {
      if (window.getSelection && window.getSelection().rangeCount > 0) {
        return window.getSelection().getRangeAt(0).cloneRange();
      } return null;
    },

    tokenize () {
      const { lines } = this;
      for (const line of lines) {
        for (const token of line) {
          token.content = token.content.trim();
          if (keywords[token.content]) {
            token.type = keywords[token.content];
          } else {
            const cont = token.content;
            if (cont && (cont[0] === '"' || cont[0] === "'")) {
              token.type = tokens.QUOTE;
            } else {
              token.type = tokens.NONE;
            }
          }
        }
      }
    },

    blur () {
      const { down } = this;

      document.removeEventListener('keydown', down);
      delete document.removeEditorListeners;

      clearInterval(this.interval);
      this.interval = null;

      const caret = document.getElementById('caret');
      if (!caret.classList.contains('hidden')) {
        caret.classList.add('hidden');
      }
    },

    async run () {
      const { lines } = this;

      let code = '';
      for (const line of lines) {
        const prev = code;
        for (const token of line) {
          if (!token.content) continue;
          code += token.content + ' ';
        }

        if (prev !== code) code += '\n';
      }

      store.dispatch("run", {
        code,
        callback: (stdout, stderr) => {
          const result = document.getElementById('output');
          result.innerHTML = stdout || stderr;
          document.toggleResult();
        }
      });
    },

    focus (event) {
      event.preventDefault();

      const row = id(event.target) || 0;
      if (row < 0) return;

      const { blur, down, caret, lines, range } = this;
      const toke = Number(token(event.target) || lines[row].length - 1);

      this.currentLine = row;
      this.currentToken = toke;

      const so = range();
      if (token(event.target) && so) {
        this.currentPosition = so.startOffset - 1;
      } else {
        this.currentPosition = lines[row][toke].content.length;
      }

      document.addEventListener('keydown', down);
      document.removeEditorListeners = blur;

      this.count();
      if (!this.interval) this.interval = setInterval(() => {
        if (caret.classList.contains('hidden')) {
          caret.classList.remove('hidden');
        } else {
          caret.classList.add('hidden');
        }
      }, 500);
    },

    down (event) {
      const { copy, lines, tokenize } = this;

      // TODO: event.code does not exist on ms edge
      const i = this.currentLine;
      const t = this.currentToken;
      const p = this.currentPosition;

      switch (event.code) {
        case 'Fn':
        case 'End':
        case 'Home':
        case 'Insert':
        case 'PageUp':
        case 'Delete':
        case 'AltLeft':
        case 'AltRight':
        case 'CapsLock':
        case 'PageDown':
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'ControlLeft':
        case 'ControlRight':
          event.preventDefault();
        break;

        case 'Tab':
          event.preventDefault();
        break;

        case 'ArrowUp':
          if (i) {
            this.currentLine--;
            if (t > lines[i - 1].length - 1) {
              this.currentToken = lines[i - 1].length - 1;
              this.currentPosition = lines[i - 1][this.currentToken].content.length;
            } else if (p > lines[i - 1][t].content.length - 1) {
              this.currentPosition = lines[i - 1][t].content.length;
            }
          }
        break;
        case 'ArrowDown':
          if (i < lines.length - 1) {
            this.currentLine++;
            if (t > lines[i + 1].length - 1) {
              this.currentToken = lines[i + 1].length - 1;
              this.currentPosition = lines[i + 1][this.currentToken].content.length;
            } else if (p > lines[i + 1][t].content.length - 1) {
              this.currentPosition = lines[i + 1][t].content.length;
            }
          }
        break;
        case 'ArrowRight':
          if (p < lines[i][t].content.length - 1) this.currentPosition++;
          else if (t < lines[i].length - 1) {
            this.currentToken++;
            this.currentPosition = 0;
          } else if (i < lines.length - 1) {
            this.currentLine++;
            this.currentToken = 0;
            this.currentPosition = 0;
          }
        break;
        case 'ArrowLeft':
          if (p) this.currentPosition--;
          else if (t) {
            this.currentToken--;
            this.currentPosition = lines[i][t - 1].content.length;
          } else if (i) {
            this.currentLine--;
            this.currentToken = lines[i - 1].length - 1;
            this.currentPosition = lines[i - 1][this.currentToken].content.length;
          }
        break;

        case 'Space':
          event.preventDefault();
          if (this.state === tokens.QUOTE) {
            const cont = lines[i][t].content;
            lines[i][t].content = cont.substring(0, p) + event.key + cont.substring(p);
          } else if (!p) {
            lines[i].splice(t, 0, {
              type: tokens.NONE,
              content: '',
            });
          } else if (t === lines[i].length - 1) {
            lines[i].push({
              type: tokens.NONE,
              content: '',
            });
          } else {
            const cont = lines[i][t].content;
            const start = cont.substring(0, p);
            const end = cont.substring(p);

            lines[i].splice(t, 0, {
              type: tokens.NONE,
              content: '',
            });

            lines[i][t].content = start;
            lines[i][t + 1].content = end;
          }

          if (this.state === tokens.QUOTE) {
            this.currentPosition++;
          } else {
            this.currentToken++;
            this.currentPosition = 0;
            tokenize();
          }

        break;

        case 'Backspace': {
          event.preventDefault();
          if (!p && !t && !i) return tokenize();
          const cont = lines[i][t].content;

          if (!cont) {
            lines[i].splice(t, 1);
            if (!lines[i].length) {
              lines.splice(i, 1);
            } if (!t) {
              this.currentLine--;
              this.currentToken = lines[i - 1].length - 1;
              this.currentPosition = lines[i - 1][this.currentToken].content.length;
            } else {
              this.currentToken--;
              this.currentPosition = lines[i][this.currentToken].content.length;
            }
          } else {
            if (!p && t) {
              this.currentPosition = lines[i][t - 1].content.length;
              lines[i][t - 1].content = lines[i][t - 1].content + cont;
              this.currentToken--;
              lines[i].splice(t, 1);
            } else if (!p && !t) {
              const last = lines[i - 1].length - 1;
              lines[i - 1] = copy(lines[i - 1], 0, lines[i - 1].length, lines[i]);
              lines.splice(i, 1);

              this.currentLine = i - 1;
              this.currentPosition = 0;
              this.currentToken = last + 1;
            } else {
              lines[i][t].content = cont.substring(0, p - 1) + cont.substring(p);
              this.currentPosition--;
            }

            const char = cont[!p ? p : p - 1];

            if (char === this.open) {
              this.state = tokens.NONE;
              this.open = '';
            } else if (char === '"' || char === "'"){
              this.state = tokens.NONE;
              this.open = '';
            }
          } tokenize();
        } break;

        case 'Enter':
        case 'NumpadEnter': {
          event.preventDefault();

          const cont = lines[i][t].content;
          const start = cont.substring(0, p);
          const end = cont.substring(p);

          const begin = copy(lines[i], 0, t, [{
            type: tokens.NONE,
            content: start,
          }]);

          const final = copy(lines[i], t);
          final[0].content = end;

          lines.splice(i, 0, []);
          lines[i] = begin;
          lines[i + 1] = final;

          tokenize();

          this.currentLine++;
          this.currentToken = 0;
          this.currentPosition = 0;
        } break;

        case 'Quote':
          if (this.open === event.key) {
            this.state = tokens.NONE;
            this.open = '';
          } else {
            this.state = tokens.QUOTE;
            this.open = event.key;
          } lines[i][t].type = this.state;
          break;
        default: {
          const cont = lines[i][t].content;

          if (event.keyCode > 64 && event.keyCode < 91) {
            const to = event.shiftKey ? event.key.toUpperCase() : event.key;
            lines[i][t].content = cont.substring(0, p) + to + cont.substring(p);
          } else {
            console.log(event.code, event.key, event.keyCode);
            lines[i][t].content = cont.substring(0, p) + event.key + cont.substring(p);
          }

          this.currentPosition++;
          tokenize();
        } break;
      }

      this.count();
    }
  }
}
</script>