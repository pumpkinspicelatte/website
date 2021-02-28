export default {
  open (state, payload) {
    const { callback } = payload;
    state.open = callback;
  },
  page (state, payload) {
    const { feature } = payload;
    if (state.open) state.open(feature);
    state.info.feature = feature;
  },
};