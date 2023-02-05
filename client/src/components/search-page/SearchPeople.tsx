import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../../api/client';
import { useAppSelector } from '../../app/hooks';
import { IUser } from '../../types/User';
import ConnectUserCard from '../my-network/ConnectUserCard';

const SearchPeople = () => {
	const [
		resultPeople,
		setResultPeople
	] = useState<IUser[]>([]);
	const [
		page,
		setPage
	] = useState(1);
	const [
		loading,
		setLoading
	] = useState(false);

	const { searchTerm } = useAppSelector((state) => state.common);

	const [
		hasMore,
		setHasMore
	] = useState(resultPeople.length > 0);

	const fetchPeople = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`http://localhost:5000/api/user/search/${searchTerm}?limit=6&page=1`);
		setResultPeople(data.data);
		setLoading(false);
	};

	useEffect(
		() => {
			if (searchTerm) {
				fetchPeople();
				setPage(page + 1);
			}
		},
		[
			searchTerm
		]
	);

	const fetchMorePeople = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(
			`http://localhost:5000/api/user/search/${searchTerm}?limit=6&page=${page}`
		);
		if (data.data.length == 0) setHasMore(false);
		setResultPeople([
			...resultPeople,
			...data.data
		]);
		setLoading(false);
	};
	return (
		<React.Fragment>
			{loading && (
				<Center>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
				</Center>
			)}
			<InfiniteScroll
				dataLength={resultPeople.length} //This is important field to render the next data
				next={fetchMorePeople}
				hasMore={hasMore}
				loader={
					<Center>
						<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
					</Center>
				}
				endMessage={

						resultPeople.length === 0 ? <p style={{ textAlign: 'center' }}>
							<b>No results found</b>
						</p> :
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
				}
			>
				{resultPeople.map((p) => {
					return <ConnectUserCard key={p._id} user={p} />;
				})}
			</InfiniteScroll>
		</React.Fragment>
	);
};

export default SearchPeople;
