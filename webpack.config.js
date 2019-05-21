// entry => output

const path = require("path");

module.exports = {
	entry: "./src/app.jsx",
	output: {
		path: path.join(__dirname, "public"), // Absolute
		filename: "bundle.js"
	},
	module: {
		rules: [{
			loader: "babel-loader",
			test: /\.jsx$/,
			exclude: /node_modules/
		}, {
			test: /\.s?css$/,
			use: [
			"style-loader",
			"css-loader",
			"sass-loader"
			]
		}, {
			loader: "url-loader?limit=100000",
			test: /\.png$/,
		}]
	},
	devtool: "cheap-module-eval-source-map", // Source map
	devServer: {
		contentBase: path.join(__dirname, "public")
	}
};