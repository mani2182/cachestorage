module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.map$/,
        use: "ignore-loader",
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};
