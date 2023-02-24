import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const theme = extendTheme({
	config:
		{
			initialColorMode: 'dark',
			useSystemColorMode: false
		},
	styles:
		{
			global:
				(props: any) => ({
					body:
						{
							bg: mode('#FFFFFF', '#374850')(props)
						}
				})
		},
	colors:
		{
			primary:
				{
					'50': '#5ed4c6',
					'100': '#4acfbf',
					'200': '#36c9b8',
					'300': '#30b5a6',
					'400': '#2ba193',
					'500': '#2A9D8F',
					'600': '#258d81',
					'700': '#20796f',
					'800': '#1b655c',
					'900': '#15514a'
				}
		}
});
