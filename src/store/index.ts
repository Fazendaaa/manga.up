import { createStore } from "vuex";

export default createStore({
  state: {
    theme:
      undefined !== localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : "dark",
    full: true,
  },
  getters: {},
  mutations: {
    toggleTheme: (state) => {
      const setTheme = (state.theme =
        state.theme === "light" ? "dark" : "light");
      localStorage.setItem("theme", setTheme);

      return setTheme;
    },
    setTheme: (state, value) => {
      state.theme = value;
      localStorage.setItem("theme", value);

      return value;
    },
    toggleFull: (state) => {
      state.full = !state.full;

      return state.full;
    },
  },
  actions: {},
  modules: {},
});
