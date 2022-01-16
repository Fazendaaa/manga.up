// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 80,
    public: "0.0.0.0:80",
  },
};
