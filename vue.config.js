module.exports = {
  pages: {
    index: {
      entry: "src/cockpit/main.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true,
      },
    },
  },
};
