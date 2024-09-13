import { useState } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import { FaMicrosoft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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

  const handleGoogleLogin = () => {
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const url = `${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
    
    window.location.href = url;
  };

  const handleMicrosoftLogin = () => {
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const url = `${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Microsoft`;
    
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
        <Image
          src="/logo.png"
          alt="Arc Lab"
          width={60}
          height={60}
          objectFit="contain"
        />
          <h2 className={styles.loginTitle}>メールアドレスでログイン</h2>
          
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
              ログイン
            </button>
          </form>
          
          <Link href="/forgot-password" className={styles.link}>
            パスワードをお忘れの方
          </Link>

          {/*
          <div className={styles.divider}>
            <span>外部アカウントでログイン</span>
          </div>
          
          <div className={styles.externalLogin}>
            <button className={styles.microsoftLogin} onClick={handleMicrosoftLogin}>
              <FaMicrosoft /> Microsoftアカウントでログイン
            </button>
            <button className={styles.googleLogin} onClick={handleGoogleLogin}>
              <FcGoogle /> Googleアカウントでログイン
            </button>
          </div>
          */}
          
          <div className={styles.divider}>
          <span>または</span>
          </div>

          <Link href="/signup" className={styles.link}>
            新しく企業アカウントを作成する
          </Link>

        </div>
      </main>
    </div>
  );
};

export default Login;