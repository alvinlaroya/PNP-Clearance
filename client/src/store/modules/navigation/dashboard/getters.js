export const allProductionWriters = (state) => state.productionWriters;

// Articles Dashboard
export const articlesToday = (state) => ({
  data: state.dashboardArticles.today.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }),
  count: state.dashboardArticles.today.length,
});
export const articlesAdvance = (state) => ({
  data: state.dashboardArticles.advance.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }),
  count: state.dashboardArticles.advance.length,
});
export const articlesLastSevenDays = (state) => ({
  data: state.dashboardArticles.lastSevenDays.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }),
  count: state.dashboardArticles.lastSevenDays.length,
});
export const articlesSentBack = (state) => ({
  data: state.dashboardArticles.sentBack.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }),
  count: state.dashboardArticles.sentBack.length,
});

// Articles Preview
export const articles = (state) => state.articlesPreview
