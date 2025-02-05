import { SERVER_BASE_URL } from '@/utils/config';

export async function logoutApi(errorLogger = (error: any) => {}) {
  const url = new URL('/auth/logout', SERVER_BASE_URL);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.error);
    return;
  }
  return responseData;
}
export async function loginApi() {}
