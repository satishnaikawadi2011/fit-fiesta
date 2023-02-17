import * as React from 'react';
import { SVGProps } from 'react';

const ConnectionIcon = (props: SVGProps<SVGSVGElement>) => {
	const fillProp = props.fill || 'black';
	return (
		<svg width={50} height={50} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<defs>
				<style>
					{`.cls-1{fill:none;stroke:${fillProp};stroke-linecap:square;stroke-miterlimit:10;stroke-width:1.91px}`}
				</style>
			</defs>
			<g id="connection">
				<path
					className="cls-1"
					d="M10.09 15.82 12 13.91l1.91 1.91M12 12v1.91M12 5.32h0a2.86 2.86 0 0 1 2.86 2.86v1h0-5.72 0v-1A2.86 2.86 0 0 1 12 5.32Z"
				/>
				<circle className="cls-1" cx={12} cy={3.41} r={1.91} />
				<path
					className="cls-1"
					d="M19.64 18.68h0a2.86 2.86 0 0 1 2.86 2.86v1h0-5.73 0v-1a2.86 2.86 0 0 1 2.87-2.86Z"
				/>
				<circle className="cls-1" cx={19.64} cy={16.77} r={1.91} />
				<path
					className="cls-1"
					d="M4.36 18.68h0a2.86 2.86 0 0 1 2.86 2.86v1h0H1.5h0v-1a2.86 2.86 0 0 1 2.86-2.86Z"
				/>
				<circle className="cls-1" cx={4.36} cy={16.77} r={1.91} />
			</g>
		</svg>
	);
};

export default ConnectionIcon;
