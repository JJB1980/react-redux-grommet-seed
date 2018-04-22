export default {
  getToken: () => window.localStorage.getItem('token'),
  window,
  localStorage: window.localStorage
}
