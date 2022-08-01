import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
	if (
		!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
			.exists
	) {
		await FileSystem.makeDirectoryAsync(
			FileSystem.documentDirectory + 'SQLite'
		);
	}
	await FileSystem.downloadAsync(
		Asset.fromModule(require('../assets/database/aphiexDB.db')).uri,
		FileSystem.documentDirectory + 'SQLite/aphiexDB.db'
	);
	return SQLite.openDatabase('aphiexDB.db');
}
export const database = openDatabase();

export async function deleteDatabase() {
	console.log('-------------------');
	console.log('DELETANDO DB...');
	try {
		(await database).closeAsync();
		(await database)
			.deleteAsync()
			.then(() => {
				console.log('Banco de dados deletado');
			})
			.catch(error => {
				console.log('Erro ao deletar o banco de dados: ', error);
			});
	} catch (error) {
		console.log('Erro ao deletar o banco de dados: ', error);
	}
}

export async function getCitiesFromDatabase(state: string) {
	(await database).transaction(tx => {
		tx.executeSql(
			`SELECT * FROM cities WHERE state = ?;`,
			[state],
			(_, { rows: { _array } }) => console.log(_array)
		);
	});
}
