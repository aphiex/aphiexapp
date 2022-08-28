import { NavigationContainer } from '@react-navigation/native';
import { useAuth, useProfile } from '../context';
import PrivateStack from './PrivateStack';
import ProfileStack from './ProfileStack';
import PublicStack from './PublicStack';

export function Router() {
	const { auth } = useAuth();
	const { currentProfile } = useProfile();
	return (
		<NavigationContainer>
			{auth && auth?.authorized && currentProfile ? (
				<PrivateStack />
			) : auth && auth?.authorized ? (
				<ProfileStack />
			) : (
				<PublicStack />
			)}
		</NavigationContainer>
	);
}
