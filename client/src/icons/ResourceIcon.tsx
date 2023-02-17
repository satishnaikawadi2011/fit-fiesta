import * as React from 'react';
import { SVGProps } from 'react';

const ResourceIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg width={50} height={50} fill="black" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			d="M17.85 17.854A.496.496 0 0 0 18 17.5V3.499a.5.5 0 0 0-1 0V17H3.5a.5.5 0 0 0 0 1h14a.497.497 0 0 0 .353-.146Zm-2-2A.496.496 0 0 0 16 15.5V1.499a.5.5 0 0 0-1 0V15H1.5a.5.5 0 0 0 0 1h14a.497.497 0 0 0 .353-.146ZM0 1.007C0 .45.45 0 1.007 0h11.986C13.55 0 14 .45 14 1.007v11.986C14 13.55 13.55 14 12.993 14H1.007C.45 14 0 13.55 0 12.993V1.007Z"
		/>
	</svg>
);

export default ResourceIcon;
