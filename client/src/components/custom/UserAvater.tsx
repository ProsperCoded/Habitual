import { useContext } from 'react';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import { Avatar, Popover } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { googleCallback } from '@/utils/config';
import { useLogout } from '@/services/authService';
export function UserAvatar({
  showName,
  auth,
}: {
  showName: boolean;
  auth: boolean;
}) {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();
  const logoutService = useLogout();
  const handleLogout = () => {
    logoutService();
  };
  useEffect(() => {
    console.log('user Profile changed', userProfile);
  }, [userProfile]);
  const name = userProfile?.firstName;
  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[15ch] text-primary">
        <li
          className="hover:font-semibold hover:text-primaryDark transition-colors cursor-pointer select-none"
          onClick={() => {
            handleLogout();
          }}
        >
          Sign out
        </li>
        <li
          className="hover:font-semibold hover:text-primaryDark transition-colors cursor-pointer select-none"
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          Dashboard
        </li>
      </ul>
    </div>
  );
  return userProfile && name ? (
    <span
      onDoubleClick={() => {
        navigate('/profile');
      }}
      className="select-none"
    >
      <Popover
        placement="bottom"
        content={options}
        style={{ backgroundColor: '#EBEBEB' }}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0.5}
      >
        <div className="cursor-pointer">
          {showName ? (
            <div className="flex items-center bg-background px-2 py-1.5 rounded-full">
              <Avatar
                style={{
                  backgroundColor: 'var(--primary)',
                  verticalAlign: 'middle',
                }}
                size="default"
              >
                <img
                  src={userProfile.profilePicture}
                  alt={name}
                  className="rounded-full"
                />
              </Avatar>
              <span className="ml-2 font-semibold text-Primary algin-middle">
                {name}
              </span>
            </div>
          ) : (
            <Avatar
              style={{ backgroundColor: '#D6D979', verticalAlign: 'middle' }}
              size="large"
            >
              {/* <span className="font-semibold">{name[0]}</span> */}
              <img
                src={userProfile.profilePicture}
                alt={name}
                className="rounded-full"
              />
            </Avatar>
          )}
        </div>
      </Popover>
    </span>
  ) : (
    auth && (
      <div className="flex md:flex-row flex-col gap-3 ml-auto">
        <a
          href={googleCallback.toString()}
          className="border-white hover:bg-white px-4 py-1 border rounded-full text-white hover:text-Primary transition"
        >
          Login
        </a>
        <a
          href={googleCallback.toString()}
          className="bg-Primary hover:bg-P2 px-4 py-1 rounded-full text-white transition"
        >
          Sign Up
        </a>
      </div>
    )
  );
}
