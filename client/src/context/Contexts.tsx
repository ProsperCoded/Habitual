import { createContext, useEffect, useState } from 'react';
import { UserProfileType } from '@/types';
import Initialize from '@/context/Initialize';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

export const USER_PROFILE_CONTEXT = createContext<{
  userProfile: UserProfileType | null;
  setUserProfile: (userProfile: UserProfileType | null) => void;
}>({
  userProfile: null,
  setUserProfile: () => {},
});
export const MESSAGE_API_CONTEXT = createContext<MessageInstance | null>(null);

type ContextWrapperProps = {
  children: React.ReactNode;
};
// set contexts and Initial values
export function ContextWrapper({ children }: ContextWrapperProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  messageApi.destroy();
  return (
    <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
      <MESSAGE_API_CONTEXT.Provider value={messageApi}>
        {contextHolder}
        <Initialize>{children}</Initialize>
      </MESSAGE_API_CONTEXT.Provider>
    </USER_PROFILE_CONTEXT.Provider>
  );
}
