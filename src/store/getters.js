export default {
  language(state) {
    return Object.assign(
      {},
      ...(state.locales || [])
        .map(({ code, name }) => ({ [code]: name })),
    );
  },
  serverTime(state) {
    return new Date(+new Date(state.meta.standardTime) + Date.now() - state.metaTime);
  },
  isAdmin(state) {
    return (state.session.user || {}).isAdmin === true;
  },
  isEmbed(state) {
    return state.meta.mode === 'embed';
  },
};
