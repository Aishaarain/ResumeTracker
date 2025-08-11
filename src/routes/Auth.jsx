import React, { useEffect } from 'react';
import { usePuterStore } from '../../lib/puter';
import { useLocation, useNavigate } from 'react-router-dom';

export const meta = [
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'log into your account' }
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next"); // safer extraction
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-4 rounded-2xl shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="animate-pulse rounded-full py-2 items-center px-8 cursor-pointer w-[200px] max-md:w-full text-lg font-semibold text-white bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00]">
                <p>Signing you in...</p>
              </button>
            ) : auth.isAuthenticated ? (
              <button
                className="rounded-full py-2 px-8 cursor-pointer w-[200px] max-md:w-full text-lg font-semibold text-white bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00]"
                onClick={auth.signOut}
              >
                Log Out
              </button>
            ) : (
              <button
                className="rounded-full py-2 px-8 cursor-pointer w-[200px] max-md:w-full text-lg font-semibold text-white bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00]"
                onClick={auth.signIn}
              >
                Sign In
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
