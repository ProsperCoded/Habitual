import { createContext, useEffect, useState } from 'react';
import { UserProfileType } from '@/types';
import Initialize from '@/context/Initialize';

export const USER_PROFILE_CONTEXT = createContext<{
  userProfile: UserProfileType | null;
  setUserProfile: (userProfile: UserProfileType | null) => void;
}>({
  userProfile: null,
  setUserProfile: () => {},
});

type ContextWrapperProps = {
  children: React.ReactNode;
};
// set contexts and Initial values
export function ContextWrapper({ children }: ContextWrapperProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  return (
    <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
      <Initialize>{children}</Initialize>
    </USER_PROFILE_CONTEXT.Provider>
  );
}
