import { useRouter } from 'next/router';
import Link from 'next/link';

const SignupSuccess = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウント作成成功
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アカウントが正常に作成されました。
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            {email} 宛に確認メールを送信しました。メールをご確認の上、アカウントを有効化してください。
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ログインページへ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;