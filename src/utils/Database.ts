import { Asset } from "expo-asset";
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require('../assets/database/aphiexDB.db')).uri,
    FileSystem.documentDirectory + 'SQLite/aphiexDB.db'
  );
  return SQLite.openDatabase('aphiexDB.db');
}

export async function getCitiesFromDatabase(dataBase: Promise<SQLite.WebSQLDatabase>, state: string) {
  (await dataBase).transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM cities WHERE state = ?;`,
      [state],
      (_, { rows: { _array } }) => console.log(_array)
    );
  });
}