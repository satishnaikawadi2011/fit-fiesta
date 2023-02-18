import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IGroup } from '../../types/Group';
import groupApi from '../../api/group';
import Layout from '../layout/Layout';
import { useParams } from 'react-router-dom';
import { setGroupDetails } from '../../app/features/group';
import NotFoundPage from '../../pages/not-found';
import MembersSection from './MembersSection';

interface Props {
	children?: any;
}

const GroupDetailsPageLayout: React.FC<Props> = ({ children }) => {
	const { data, error, loading, request: getGroupDetails, errorMsg } = useApiUpdated<{ group: IGroup }>(
		groupApi.getGroupDetails
	);
	const dispatch = useAppDispatch();
	const params: any = useParams();
	const { groupDetails } = useAppSelector((state) => state.group);

	useEffect(() => {
		getGroupDetails(params.groupId);
	}, []);

	useEffect(
		() => {
			if (data && !error) {
				dispatch(setGroupDetails(data.group));
			}
		},
		[
			data,
			error
		]
	);

	if (error || !groupDetails) {
		return <NotFoundPage />;
	}

	if (loading) {
		return (
			<Center height={'100vh'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
			</Center>
		);
	}

	return (
		<Layout
			title={`${
				groupDetails ? groupDetails!.name :
				'Page Not Found'}`}
		>
			<Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
				<GridItem mx={3}>{children}</GridItem>
				<GridItem />
				<GridItem
					height={{ base: 'auto', md: 'calc(100vh - 80px)' }}
					right={0}
					overflow="auto"
					px={{ base: '20px' }}
					position={{ base: 'relative', md: 'fixed' }}
					width={{ base: 'full', md: '33vw' }}
					pb={5}
				>
					<MembersSection members={groupDetails!.members as any} admin={groupDetails!.admin as any} />
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default GroupDetailsPageLayout;
