import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { MyNetworkNavigationType } from '../../app/features/common';
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

	if (error) {
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
		<Layout title={`${groupDetails!.name}`}>
			<Grid templateColumns="1fr 2fr" gap={4}>
				<GridItem mt={10} mx={3}>
					{children}
				</GridItem>
				<GridItem />
				<GridItem height={'calc(100vh - 6rem)'} position={'fixed'} width={'33vw'} right={0}>
					<MembersSection members={groupDetails!.members as any} admin={groupDetails!.admin as any} />
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default GroupDetailsPageLayout;
