import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FcAddImage, FcCalendar, FcConferenceCall, FcSurvey } from 'react-icons/fc';
import {
	setIsAddEventModalOpen,
	setIsAddPostModalOpen,
	setIsAddResourceModalOpen,
	setIsCreateGroupModalOpen
} from '../app/features/ui';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import useBlockBgColor from '../hooks/useBlockBgColor';
import AddEventModal from './add-modals/AddEventModal';
import AddPostModal from './add-modals/AddPostModal';
import AddResourceModal from './add-modals/AddResourceModal';
import CreateGroupModal from './add-modals/CreateGroupModal';

interface ItemProps {
	title: string;
	Icon: IconType;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Item: React.FC<ItemProps> = ({ Icon, title, onClick }) => {
	return (
		<Flex mt={2} mr={2} onClick={onClick} cursor={'pointer'} alignItems={'center'}>
			<Icon size={20} />
			<Text ml={2} fontWeight={'medium'} fontSize={'md'}>
				{title}
			</Text>
		</Flex>
	);
};

const AddButtons = () => {
	const { isAddEventModalOpen, isAddPostModalOpen, isAddResourceModalOpen, isCreateGroupModalOpen } = useAppSelector(
		(state) => state.ui
	);
	const dispatch = useAppDispatch();
	const blockBg = useBlockBgColor();

	return (
		<React.Fragment>
			<AddEventModal isOpen={isAddEventModalOpen} onClose={() => dispatch(setIsAddEventModalOpen(false))} />
			<AddPostModal isOpen={isAddPostModalOpen} onClose={() => dispatch(setIsAddPostModalOpen(false))} />
			<AddResourceModal
				isOpen={isAddResourceModalOpen}
				onClose={() => dispatch(setIsAddResourceModalOpen(false))}
			/>
			<CreateGroupModal
				isOpen={isCreateGroupModalOpen}
				onClose={() => dispatch(setIsCreateGroupModalOpen(false))}
			/>
			<Flex
				p={3}
				flexWrap={'wrap'}
				bg={blockBg}
				justifyContent={'space-around'}
				boxShadow="md"
				rounded={'md'}
				mb={5}
			>
				<Item Icon={FcAddImage} title="Post" onClick={() => dispatch(setIsAddPostModalOpen(true))} />
				<Item Icon={FcCalendar} title="Event" onClick={() => dispatch(setIsAddEventModalOpen(true))} />
				<Item Icon={FcSurvey} title="Resources" onClick={() => dispatch(setIsAddResourceModalOpen(true))} />
				<Item Icon={FcConferenceCall} title="Group" onClick={() => dispatch(setIsCreateGroupModalOpen(true))} />
			</Flex>
		</React.Fragment>
	);
};

export default AddButtons;
