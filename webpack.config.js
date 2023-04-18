const nodeExternals = require("webpack-node-externals")
const path = require("path")

const typicalReact = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    }
  ]
}

const clientConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  mode: "development",
  module: typicalReact
}

const clientConfigCars = {
  entry: "./src/indexcars.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "maincars.js"
  },
  mode: "development",
  module: typicalReact
}
const clientConfigNature = {
  entry: "./src/indexnature.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "mainnature.js"
  },
  mode: "development",
  module: typicalReact
}
const clientConfigForest = {
  entry: "./src/indexforest.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "mainforest.js"
  },
  mode: "development",
  module: typicalReact
}

const clientConfigReg = {
  entry: "./src/indexreg.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "mainreg.js"
  },
  mode: "development",
  module: typicalReact
}

const clientConfigLogin = {
  entry: "./src/indexlogin.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "mainlogin.js"
  },
  mode: "development",
  module: typicalReact
}
const serverConfig = {
  entry: "./server.js",
  output: {
    path: __dirname,
    filename: "server-compiled.js"
  },
  externals: [nodeExternals()],
  target: "node",
  mode: "production",
  module: typicalReact
}

module.exports = [clientConfig,clientConfigCars, clientConfigNature,clientConfigForest,clientConfigReg,clientConfigLogin, serverConfig]