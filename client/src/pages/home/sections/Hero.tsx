import { Button } from '@/components/ui/button';
import googleIcon from '@/assets/google-icon.svg';
import HeroImage from '@/assets/hero-image.jpeg';
import HeroItem from '@/assets/hero-item.png';
import { useNavigate } from 'react-router-dom';
import { googleCallback } from '@/utils/config';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import { useContext } from 'react';

export default function hero() {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  return (
    <div className="flex flex-col items-center mx-auto px-6 py-12 text-center container">
      <h1 className="mb-6 font-bold text-4xl text-primary md:text-5xl lg:text-6xl">
        Transform Your Sleep Habits
      </h1>
      <p className="mb-12 max-w-3xl text-lg text-primaryDark md:text-xl">
        Join a community focused on improving sleep quality by waking up at a
        consistent time each day. Track your progress, share goals, and achieve
        better sleep together.
      </p>
      {!userProfile && (
        <div className="flex sm:flex-row flex-col gap-4 mb-16">
          <a
            className="flex justify-center items-center gap-3 bg-accent hover:bg-secondary px-8 py-3 rounded-full text-lg text-white hover:text-white transition-colors cursor-pointer"
            href={googleCallback.toString()}
          >
            <img src={googleIcon} alt="" className="w-6" />
            Sign In
          </a>

          <a
            className="flex justify-center items-center gap-3 bg-accent hover:bg-secondary px-8 py-3 rounded-full text-lg text-white hover:text-white transition-colors cursor-pointer"
            target="_blank"
            href={googleCallback.toString()}
          >
            <img src={googleIcon} alt="" className="w-6" />
            Sign Up
          </a>
        </div>
      )}
      <div className="relative w-full max-w-2xl aspect-[4/3]">
        <img
          src={HeroItem}
          alt="Peaceful sleep illustration"
          width={800}
          height={600}
          className="object-contain"
        />
      </div>
    </div>
  );
}
