export default {
  UPDATE(state, obj) {
    Object.assign(state, obj);
  },
  UPDATE_SESSION(state, { salt, challenge, level }) {
    Object.assign(state.session, { salt, challenge, level });
  },
};
