export const allClearance = (state) => state.allClearance;
export const pendingClearance = (state) => state.pendingClearance;
export const issuedClearance = (state) => state.issuedClearance;
export const verifiedClearance = (state) => state.verifiedClearance;
export const badges = (state) => ({
  all: state.badges.all,
  verified: state.badges.verified,
});
export const currentClearance = (state) => state.currentClearance;
export const currentClearanceRenew = (state) => state.currentClearanceRenew;
export const issuedClearanceCount = (state) => state.issuedClearanceCount;
