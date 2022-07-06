const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { 
        '@primary-color'     : '#1DA57A', 
        '@popover-bg'        : '#E7CEC9', 
        '@border-color-base' : '#000000', 
        '@table-header-bg'   : '#000000', 
        '@table-header-color': 'white',
      },
    },
  }),
);
