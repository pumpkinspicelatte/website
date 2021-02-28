const run = ({ commit }, payload) => commit("run", payload);
const open = ({ commit }, payload) => commit("open", payload);
const page = ({ commit }, payload) => commit("page", payload);
const count = ({ commit }, payload) => commit("count", payload);
const lesson = ({ commit }, payload) => commit("lesson", payload);
export default {
  run,
  open,
  page,
  count,
  lesson,
};