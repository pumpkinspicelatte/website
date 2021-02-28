import { api, emit } from "@/utils";
const { get, post } = emit;
export default {
  count (state, payload) {
    const { callback } = payload;
    get('/lesson/count', callback);
  },
  lesson (state, payload) {
    const { id, callback } = payload;
    get(`/lesson/${id}`, callback);
  },
  run (state, payload) {
    const { code, callback } = payload;
    post(api, code, callback);
  },
  open (state, payload) {
    const { callback } = payload;
    state.open = callback;
  },
  page (state, payload) {
    const { feature } = payload;
    if (state.open) state.open(feature);
    state.info[feature] = !state.info[feature];
  },
};