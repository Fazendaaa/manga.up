const { defineConfig } = require("@vue/cli-service");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "src/locales/",
      enableInSFC: true,
    },
  },
});
