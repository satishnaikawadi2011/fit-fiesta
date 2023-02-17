import { useAppSelector } from '../../app/hooks';
import GroupDetails from '../../components/group/GroupDetails';
import GroupDetailsPageLayout from '../../components/group/GroupDetailsPageLayout';

const GroupDetailsPage = () => {
	const { groupDetails } = useAppSelector((state) => state.group);
	return (
		<GroupDetailsPageLayout>
			<GroupDetails group={groupDetails as any} />
		</GroupDetailsPageLayout>
	);
};

export default GroupDetailsPage;
