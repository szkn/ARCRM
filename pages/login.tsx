import { useState } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import Image from 'next/image';
import Link from 'next/link';
// import { FaMicrosoft } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('ログイン成功:', result);
        router.push('/');
      },
      onFailure: (err) => {
        console.error('ログイン失敗:', err);
        setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      }
    });
  };

  // const handleGoogleLogin = () => {
  //   const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  //   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  //   const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  //   const url = `${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
    
  //   window.location.href = url;
  // };

  // const handleMicrosoftLogin = () => {
  //   const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  //   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  //   const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  //   const url = `${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Microsoft`;
    
  //   window.location.href = url;
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Arc Lab"
            width={60}
            height={60}
            className="object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">ARC. Former ログイン</h2>
        </div>
        
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ログイン
            </button>
          </div>
        </form>
        
        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            パスワードをお忘れの方
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            新しく企業アカウントを作成する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;