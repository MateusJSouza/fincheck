import { httpClient } from '../httpClient';

export interface BankAccountParams {
  name: string,
	initialBalance: number,
	color: string,
	type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

interface BankAccountResponse {
  accessToken: string;
}

export async function create(params: BankAccountResponse) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}
