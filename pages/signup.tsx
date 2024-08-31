import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import styles from '../styles/Home.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('サインアップエラー:', err);
        setError(err.message || 'サインアップ中にエラーが発生しました。');
        return;
      }
      console.log('サインアップ成功:', result);
      router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <Image
            src="/logo.png"
            alt="Arc Lab"
            width={40}
            height={40}
            objectFit="contain"
          />
          
          <h2 className={styles.loginTitle}>アカウントの作成</h2>
          
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
            />
            <button type="submit" className={styles.loginButton}>
              アカウント作成
            </button>
          </form>
          
          <Link href="/login" className={styles.createAccount}>
            既にアカウントをお持ちの方はこちら
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Signup;