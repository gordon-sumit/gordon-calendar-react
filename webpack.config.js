const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/gordonCalendar',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        // library: 'my-react-library',
        // libraryTarget: 'umd',
        library: {
            type: 'module', // Specify ESM output
        },
    },
    experiments: {
        outputModule: true, // Enable module output
    },
    externals: {
        react: 'react',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/, // Add this rule for CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
