import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import classes from './badge.module.css';

interface Props {
	children?: any;
	max?: number;
	content: number;
	contentColor?: string;
	bgColor?: string;
	hideZero?: boolean;
}

const AppBadge: React.FC<Props> = ({ bgColor, content, children, contentColor, hideZero = false, max = 99 }) => {
	let modifiedContent =

			content > max ? `${max}+` :
			content;

	const hide = hideZero && modifiedContent === 0;
	return (
		<div className={classes.container}>
			<div>{children}</div>
			{!hide && (
				<span className={classes.badge} style={{ backgroundColor: bgColor, color: contentColor }}>
					{modifiedContent}
				</span>
			)}
		</div>
	);
};

export default AppBadge;
