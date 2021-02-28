const open = ({ commit }, payload) => commit("open", payload);
const page = ({ commit }, payload) => commit("page", payload);
export default {
  open,
  page,
};