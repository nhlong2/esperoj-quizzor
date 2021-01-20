const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync({
      ...env,
      // Passing true will enable the default Workbox + Expo SW configuration.
      offline: true,
    }, argv);
  // Customize the config before returning it.
  return config;
};
