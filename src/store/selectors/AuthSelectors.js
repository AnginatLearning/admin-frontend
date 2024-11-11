export const isAuthenticated = (state) => {
    const token = localStorage?.getItem('accessToken')
    if (token) return true;
    return false;
};
