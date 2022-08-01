import CryptoES from 'crypto-es';
import { TAuthData } from '../context/Auth';
import { createSettingsTable, getPassWord, setPassword } from '../utils';

async function hasPassword(): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		getPassWord()
			.then(result => {
				if (result) resolve(true);
				else reject(false);
			})
			.catch(() => reject(false));
	});
}

async function savePassword(password: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
		createSettingsTable()
			.then(() => {
				const encryptedPassword = CryptoES.AES.encrypt(
					password,
					password
				).toString();
				setPassword(encryptedPassword)
					.then(() => resolve(password))
					.catch(() => reject(new Error('Falha ao salvar senha')));
			})
			.catch(() =>
				reject(new Error('Falha ao criar a tabela de configuracoes'))
			);
	});
}

async function signIn(password: string): Promise<TAuthData> {
	return new Promise(async (resolve, reject) => {
		getPassWord()
			.then(result => {
				if (result) {
					const decryptedPassword = CryptoES.AES.decrypt(
						result,
						password
					).toString(CryptoES.enc.Utf8);
					if (password === decryptedPassword)
						resolve({ authorized: true, key: password });
					else reject(new Error('Senha inválida'));
				} else reject(new Error('Falha ao obter senha'));
			})
			.catch(() => reject(new Error('Falha ao obter senha')));
	});
}

export const authService = { signIn, savePassword, hasPassword };
