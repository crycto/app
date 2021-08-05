const localStorage = {
  set: (key, value) => {
    if (window.localStorage) {
      window.localStorage.setItem(key, value + "");
    }
  },
  setJSON: (key, value) => {
    if (window.localStorage) {
      JSON.stringify(window.localStorage.setItem(key, JSON.stringify(value)));
    }
  },
  get: (key) => window.localStorage && window.localStorage.getItem(key),
  getJSON: (key) =>
    window.localStorage && JSON.parse(window.localStorage.getItem(key)),
  has: (key) => window.localStorage && !!window.localStorage.getItem(key),
};

export default localStorage;
