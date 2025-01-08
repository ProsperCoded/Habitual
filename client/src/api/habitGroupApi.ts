import { SERVER_BASE_URL } from '@/utils/config';
export async function getHabitGroups(errorLogger = (error: string) => {}) {
  const url = new URL('/habit-group', SERVER_BASE_URL);
  const response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function joinHabitGroup(
  groupId: string,
  errorLogger = (error: string) => {},
) {
  const url = new URL(`/habit-group/join-group/${groupId}`, SERVER_BASE_URL);
  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData;
}
