/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config) => {
      // .node uzantılı dosyalar için file-loader ekleyin
      config.module.rules.push({
        test: /\.node$/,
        use: 'file-loader',
      });
  
      return config;
    },
  };
