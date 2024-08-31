import { useState } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../lib/cognitoConfig';
import styles from '../styles/Home.module.css';

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
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>確認コードを入力</h2>
          
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              type="text"
              placeholder="確認コード"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.formInput}
              required
            />
            <button type="submit" className={styles.loginButton}>
              確認
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ConfirmSignup;