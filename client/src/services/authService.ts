import { useNavigate } from 'react-router-dom';
// import { mess } from '@/context/Contexts';
import { logoutApi } from '@/api/authApi';
import { getUserProfile } from '@/api/userApi';
import { useErrorLogger } from '@/utils/hooks';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import { useContext } from 'react';

export function useLogout() {
  const navigate = useNavigate();
  // const message = useContext(MESSAGE_API_CONTEXT);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const errorLogger = useErrorLogger();
  return async () => {
    const response = await logoutApi(errorLogger);
    if (!response) return;
    console.log('Logged out successfully');
    setUserProfile(null);
    return navigate('/');
  };
}
export function useLogin() {
  const navigate = useNavigate();
  const errorLogger = useErrorLogger();
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  return async () => {
    const response = await getUserProfile(errorLogger);
    if (response) {
      setUserProfile(response);
      navigate('/');
    }
  };
}
