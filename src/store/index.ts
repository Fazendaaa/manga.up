import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "light",
    msalConfig: {
      auth: {
        clientId: "e7857093-616f-42cd-82f8-7e5c6bcb9650",
        authority:
          "https://login.microsoftonline.com/484956e8-c781-4ec5-bc87-1597efc63706",
      },
      cache: {
        cacheLocation: "localStorage",
      },
    },
    accessToken: "",
  },
  getters: {},
  mutations: {
    toggleTheme: (state) =>
      (state.theme = state.theme === "light" ? "dark" : "light"),
    setAccessToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {},
  modules: {},
});
