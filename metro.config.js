/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');
// const {resolver: defaultResolver} = getDefaultConfig.getDefaultValues();

module.exports = (async () => {
  const {
    resolver: {assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
      assetExts: [
        ...assetExts,
        'obj',
        'mtl',
        'JPG',
        'vrx',
        'hdr',
        'gltf',
        'glb',
        'bin',
        'arobject',
        'gif',
      ],
    },
  };
})();
