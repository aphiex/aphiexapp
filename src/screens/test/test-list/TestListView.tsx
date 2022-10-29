import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FolderPlus, HospitalBuilding, TestTube } from '../../../assets/icons';
import { CustomButton, LoadingState, PageTitle } from '../../../components';
import theme from '../../../styles/theme';
import { dateMask, Test } from '../../../utils';
import { styles } from './styles';

type TTestListView = {
	tests: Test[] | undefined;
	loading: boolean;
	selectTest: (id?: number) => void;
	goToCreateTest: () => void;
};

export function TestListView({
	loading,
	tests,
	selectTest,
	goToCreateTest,
}: TTestListView) {
	return (
		<View style={styles.container}>
			<PageTitle title="Exames" icon={<FolderPlus />} />

			{loading && <LoadingState />}

			{!loading && (!tests || tests?.length === 0) && (
				<View style={styles.button}>
					<CustomButton
						title="Cadastrar Exame"
						onPress={() => goToCreateTest()}
					/>
				</View>
			)}

			{!loading && tests && tests.length > 0 && (
				<View style={styles.listContainer}>
					{tests.map(test => (
						<Pressable
							key={test?.id}
							style={styles.listItem}
							onPress={() => selectTest(test?.id)}
						>
							<View style={styles.icon}>
								<TestTube color={theme.colors.white} size={25} />
							</View>
							<View style={styles.textContainer}>
								<Text numberOfLines={1} style={styles.text}>
									{test?.testType?.name || ''}
								</Text>
								<Text numberOfLines={1} style={styles.description}>
									{`${test?.date ? dateMask(new Date(test?.date)) : ''}${
										test?.hasImage === 'Y' ? '  • Possui imagem' : ''
									}`}
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
}
