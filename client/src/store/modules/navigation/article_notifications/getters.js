export const allNotifications = (state) =>
  state.notifications.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

export const currentNotification = (state) => state.currentNotification;
export const loadingNotification = (state) => state.loadingNotification;
