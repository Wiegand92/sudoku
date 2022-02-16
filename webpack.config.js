const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const production = process.env.NODE_ENV === "production";

const plugins = [new HtmlWebpackPlugin({ template: "src/index.html" })];

if (!production) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "scripts/style.css",
    })
  );
}

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "scripts/index.js",
    path: path.join(__dirname, "/public"),
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !production,
            },
            emitCss: production,
            hotReload: !production,
            preprocess: require("svelte-preprocess")({
              postcss: {
                plugins: [
                  require("tailwindcss/nesting"),
                  require("tailwindcss"),
                  require("autoprefixer"),
                ],
              },
            }),
          },
        },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  mode: production ? "production" : "development",
  devtool: production ? false : "source-map",
  devServer: {
    hot: true,
  },
};
