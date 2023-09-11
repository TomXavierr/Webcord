

export const selectAdminAuth = (state) => state.adminAuth;
export const selectAdminAccessToken = (state) => selectAdminAuth(state).access;
export const selectAdminIsAuthenticated = (state) => selectAdminAuth(state).isAuthenticated;
export const selectAdminIsAdmin = (state) => selectAdminAuth(state).isAdmin;
export const selectAdminLoginError = (state) => selectAdminAuth(state).admin_login_error;
