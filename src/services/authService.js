export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
