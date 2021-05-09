var path = require("path");

module.exports = [{
    entry: [path.resolve(__dirname, "./src/index.tsx")],
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./docs")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader?{configFile: \"tsconfig.json\"}",
                include: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./components")],
                options: { allowTsInNodeModules: true }
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts",".jsx",".js",]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    // devtool: "source-map",
    watch: true
}];