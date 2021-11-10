const path = require('path');
const dev = process.env.NODE_ENV === 'dev'; // On choisit le mode selon la variable d'environnement NODE_ENV
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;




let config = {
    mode: dev ? 'development' : 'production', // On choisis le mode en fonction de la variable d'environnement ( dev / prod)
    entry: './assets/js/app.js', // Le fichier d'entrée
    output: { // Les options de sortie
        path: path.resolve('./dist'), // Le dossier de sortie
        filename: '[name].js', // Le nom du fichier de sortie + mise en cache
        assetModuleFilename: 'images/[name].[hash:7].[ext]'
    },
    resolve: {
        alias: { // On définit les alias pour les modules
            '@js': path.resolve('./assets/js'),
            '@css': path.resolve('./assets/css'),
            '@img': path.resolve('./assets/img'),
            '@fonts': path.resolve('./assets/fonts'),
        }
    },
    watch: true, // On active le mode watch
    module: {
        rules: [{ // Convertir les fichiers .js en ES6
                test: /\.js$/, // on teste si le fichier est un fichier js
                exclude: /node_modules/, // on exclut les fichiers dans le dossier node_modules
                use: {
                    loader: 'babel-loader', // on utilise le loader babel
                    options: { // Options du loader
                        presets: ['@babel/preset-env'] // on utilise le preset babel
                    }
                }
            },
            { // On incluse les fichiers .css dans le bundle
                test: /\.css$/, // on teste si le fichier est un fichier css
                sideEffects: true, // on active le sideEffects
                exclude: /node_modules/, // on exclut les fichiers dans le dossier node_modules
                use: [
                    MiniCssExtractPlugin.loader, // on utilise le loader mini-css-extract-plugin
                    'css-loader', // on utilise le loader css-loader
                ]

            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    optimization: { // On active l'optimisation
        minimize: !dev, // On minimise le fichier de sortie
        minimizer: [
            new CssMinimizerPlugin(), // On utilise le plugin css-minimizer-webpack-plugin
            new TerserPlugin() // On utilise le plugin terser-webpack-plugin
        ]
    },
    plugins: [new HtmlWebpackPlugin({
            template: './assets/index.html', // Le template à utiliser
            filename: 'index.html', // Le nom du fichier de sortie
        }),
        new MiniCssExtractPlugin({ // On utilise les plugins
            filename: '[name].css', // On utilise le nom du fichier de sortie + mise en cache
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // Static = fichier html
            openAnalyzer: false, // Ouverture automatique de l'analyseur
            reportFilename: 'report.html', // Nom du fichier de sortie
        })
    ],
};




module.exports = config; // On exporte le fichier de configuration