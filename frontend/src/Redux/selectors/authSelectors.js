
export const selectAuth = (state) => state.auth;
export const selectAuthError = (state) => selectAuth(state).error;
export const selectIsAuthenticated = (state) => selectAuth(state).isAuthenticated;
