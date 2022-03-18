export const allVersionLogs = (state) =>
  state.versionLogs.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
