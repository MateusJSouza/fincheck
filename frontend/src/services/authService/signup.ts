import { sleep } from "../../app/utils/sleep";
import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(params: SignupParams) {
  await sleep(1000)
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', params);

  return data;
}
