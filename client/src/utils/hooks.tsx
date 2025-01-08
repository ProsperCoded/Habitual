import { MESSAGE_API_CONTEXT } from '@/context/Contexts';
import { useContext } from 'react';

export function useMessageApi() {
  return useContext(MESSAGE_API_CONTEXT);
}

export function useErrorLogger() {
  const messageApi = useMessageApi();
  return (error: string) => {
    console.error(error);
    messageApi?.error(error);
  };
}
