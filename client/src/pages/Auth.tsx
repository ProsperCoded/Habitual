import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLogin } from '@/services/authService';
function Auth() {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const autoLogin = useLogin();
  // const messageApi = us
  useEffect(() => {
    // serve as the auth handler, set the user profile automatically
    autoLogin();
  }, []);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center w-max">
        <div className="w-[15rem] loader"></div>
        <div className="flex flex-col items-center font-extrabold text-[4rem] text-Primary">
          <p>Authenticating...</p>
          <p className="flex space-x-5 text-base">
            <p>🙁 Tired of Waiting</p>
            <Link className="flex text-Primary hover:text-P2 underline" to="/">
              {' '}
              <ArrowLeft /> Go Back Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
