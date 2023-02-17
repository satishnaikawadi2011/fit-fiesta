import * as React from 'react';
import { SVGProps } from 'react';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
	const fillProp = props.fill || 'black';
	return (
		<svg width={50} height={50} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
				fill={fillProp}
			/>
		</svg>
	);
};

export default SearchIcon;
