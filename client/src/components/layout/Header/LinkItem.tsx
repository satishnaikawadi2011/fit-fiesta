import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
	Icon: IconType;
	title: string;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
	isActive?: boolean;
}

const LinkItem: React.FC<Props> = ({ Icon, title, onClick, isActive = false }) => {
	return (
		<VStack onClick={onClick}>
			<Icon size={25} />
			<Text
				color={

						isActive ? 'primary.300' :
						'black'
				}
				fontWeight={

						isActive ? 'medium' :
						'normal'
				}
				display={{ sm: 'none', md: 'inline-block' }}
			>
				{title}
			</Text>
		</VStack>
	);
};

export default LinkItem;
