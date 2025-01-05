import { useLogin } from '@/services/authService';
import React, { useEffect } from 'react';

export default function Initialize({
  children,
}: {
  children: React.ReactNode;
}) {
  const autoLogin = useLogin();
  // attempt to auto login
  useEffect(() => {
    autoLogin();
  }, []);
  return <>{children}</>;
}
