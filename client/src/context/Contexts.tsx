import { createContext, useState } from "react";
import { UserProfileType } from "@/types";

export const USER_PROFILE_CONTEXT = createContext<{
  userProfile: UserProfileType | null;
  setUserProfile: (userProfile: UserProfileType) => void;
}>({
  userProfile: null,
  setUserProfile: () => {},
});

type ContextWrapperProps = {
  children: React.ReactNode;
};
export function ContextWrapper({ children }: ContextWrapperProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  return (
    <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </USER_PROFILE_CONTEXT.Provider>
  );
}
