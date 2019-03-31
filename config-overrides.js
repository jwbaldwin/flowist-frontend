const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { 
			// '@primary-color': '#DA0C79',
			// '@success-color': '#52c41a',                        // success state color
			// '@warning-color': '#faad14',                      	// warning state color
			// '@error-color': '#f5222d'                           // error state color
			'@primary-color': '#1CCCA3',
			'@layout-header-background': '#3A3A3A',
			'@success-color': '#1CCCA3',                        // success state color
			'@warning-color': '#FFE060',                      	// warning state color
			'@error-color': '#F25F5C'                           // error state color

		},
	}),
);
