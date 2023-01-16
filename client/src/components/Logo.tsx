import * as React from 'react';
import { SVGProps } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

const Logo = (props: IconProps) => (
	<Icon viewBox="0 0 702 448" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<svg
			id="Icons"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			xmlSpace="preserve"
			fill={props.fill as any}
		>
			<style>
				{
					'.st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
				}
			</style>
			<path d="M7 25c-1.7 0-3-1.3-3-3V10c0-1.7 1.3-3 3-3s3 1.3 3 3v12c0 1.7-1.3 3-3 3zM25 25c-1.7 0-3-1.3-3-3V10c0-1.7 1.3-3 3-3s3 1.3 3 3v12c0 1.7-1.3 3-3 3z" />
			<path d="M23 17H9c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1zM2 10.2c-1.2.4-2 1.5-2 2.8v6c0 1.3.8 2.4 2 2.8V10.2zM30 10.2v11.6c1.2-.4 2-1.5 2-2.8v-6c0-1.3-.8-2.4-2-2.8z" />
		</svg>
	</Icon>
);

export default Logo;
