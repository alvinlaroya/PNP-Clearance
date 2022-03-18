export const allMedia = (state) => state.allMedia;
export const count = (state) => state.count;
export const mediaLoading = (state) => state.mediaLoading;
export const badges = state => ({
    customers: state.badges.customers,
    competitors: state.badges.competitors,
    products: state.badges.products
})