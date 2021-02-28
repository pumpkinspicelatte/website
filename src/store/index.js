import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";

const state = {
  info: {
    lesson: true,
    editor: true,
    output: false,
  },
};

export default createStore({
  state,
  actions,
  mutations
});
