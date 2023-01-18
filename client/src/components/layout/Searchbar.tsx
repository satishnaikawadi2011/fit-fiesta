import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftAddon, Icon, Button, useColorMode, IconButton } from '@chakra-ui/react';
import React from 'react';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [
		query,
		setQuery
	] = React.useState('');
	const { colorMode } = useColorMode();

	return (
		<Box my={4}>
			<InputGroup>
				<InputLeftAddon
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
					type="search"
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
					placeholder="Search..."
				/>
				<IconButton
					color="primary.300"
					aria-label="Search database"
					icon={<SearchIcon />}
					onClick={() => onSearch(query)}
					ml="2"
				/>
			</InputGroup>
		</Box>
	);
};

export default SearchBar;
