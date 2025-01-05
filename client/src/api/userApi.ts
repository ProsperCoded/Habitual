import { SERVER_BASE_URL } from '@/utils/config';

export async function getUserProfile(errorLogger: (error: any) => void) {
  const url = new URL('user/profile', SERVER_BASE_URL);

  const response = await fetch(url, {
    method: 'GET',

    // to ensure cookies stored by the server is sent back
    credentials: 'include',
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.error);
    return;
  }

  return responseData.data;
}
