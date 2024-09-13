import { useState } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import styles from '../styles/Home.module.css';
import Image from 'next/image';


const ConfirmSignup = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (typeof email !== 'string') {
      setError('メールアドレスが無効です。');
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error('確認コードエラー:', err);
        setError('確認コードが正しくありません。');
        return;
      }
      console.log('確認成功:', result);
      router.push(`/signup-success?email=${encodeURIComponent(email)}`);
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            確認コードを入力
          </h2>
        </div>
        
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              placeholder="確認コード"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              確認
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignup;