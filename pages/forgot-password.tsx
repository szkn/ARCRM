import { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import Image from 'next/image';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setMessage('パスワードリセットの手順をメールで送信しました。');
      },
      onFailure: (err) => {
        console.error('パスワードリセット失敗:', err);
        setError('パスワードリセットに失敗しました。メールアドレスを確認してください。');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Arc Lab"
            width={40}
            height={40}
            className="object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">パスワードをお忘れの方</h2>
        </div>
        
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            required
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            パスワードリセット
          </button>
        </form>
        
        <div className="text-sm mt-3">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            ログインページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;