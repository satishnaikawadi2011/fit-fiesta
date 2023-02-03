import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftAddon, Icon, Button, useColorMode, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../app/features/common';
import { useAppDispatch } from '../../app/hooks';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
	const dispatch = useAppDispatch();
	const { colorMode } = useColorMode();
	const navigate = useNavigate();
	const location = useLocation();
	const [
		query,
		setQuery
	] = useState('');

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
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
					placeholder="Search..."
				/>
				<IconButton
					color="primary.300"
					aria-label="Search database"
					icon={<SearchIcon />}
					onClick={() => {
						if (!query || query.trim() === '') return;
						dispatch(setSearchTerm(query));
						if (location.pathname === '/search') return;
						navigate('/search');
					}}
					ml="2"
					bgColor={'#fff'}
				/>
			</InputGroup>
		</Box>
	);
};

export default SearchBar;
