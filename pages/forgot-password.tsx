import { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
          <h2 className={styles.loginTitle}>パスワードをお忘れの方</h2>
          
          {message && <p className={styles.successMessage}>{message}</p>}
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
            <button type="submit" className={styles.loginButton}>
              パスワードリセット
            </button>
          </form>
          
          <Link href="/login" className={styles.backToLogin}>
            ログインページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;