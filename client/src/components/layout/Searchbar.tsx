import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftAddon, Icon, Button, useColorMode, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../app/features/common';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
	const { searchTerm } = useAppSelector((state) => state.common);
	const dispatch = useAppDispatch();
	const { colorMode } = useColorMode();
	const navigate = useNavigate();

	return (
		<Box my={4}>
			<InputGroup>
				<InputLeftAddon
					bgColor={'#fff'}
					children={
						<Icon
							name="search"
							color={

									colorMode === 'light' ? 'gray.600' :
									'white'
							}
						/>
					}
				/>
				<Input
					bgColor={'#fff'}
					type="search"
					value={searchTerm}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchTerm(e.target.value))}
					placeholder="Search..."
				/>
				<IconButton
					color="primary.300"
					aria-label="Search database"
					icon={<SearchIcon />}
					onClick={() => navigate(`/search/${searchTerm}`)}
					ml="2"
					bgColor={'#fff'}
				/>
			</InputGroup>
		</Box>
	);
};

export default SearchBar;
