import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";

const state = {
  info: {
    feature: "none"
  },
};

export default createStore({
  state,
  actions,
  mutations
});
