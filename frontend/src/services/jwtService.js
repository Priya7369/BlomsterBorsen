export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
};
