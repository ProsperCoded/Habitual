import { UserAvatar } from '@/components/custom/UserAvater';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white shadow-sm px-2 md:px-4 py-4 border-b border-border rounded-b-xl">
      <Link to={'/'} className="flex items-center gap-2">
        <div className="text-primary">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </div>
        <span className="font-medium text-primary text-xl select-none">
          Habitual Sleep
        </span>
      </Link>
      <div className="flex items-center gap-8">
        <div className="md:flex gap-8 hidden">
          <Link to="/groups" className="text-primary hover:text-primary/80">
            Groups
          </Link>
          <Link to="/dashboard" className="text-primary hover:text-primary/80">
            Dashboard
          </Link>
        </div>
        <UserAvatar showName={false} auth={false} />
      </div>
    </nav>
  );
}
