export const getAccessToken = () => {
  return window.localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken: string) => {
  window.localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = () => {
  window.localStorage.removeItem('accessToken');
};
