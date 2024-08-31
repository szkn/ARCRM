import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const SignupSuccess = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>アカウント作成成功</h2>
          <p className={styles.successMessage}>
            アカウントが正常に作成されました。
          </p>
          <p>
            {email} 宛に確認メールを送信しました。メールをご確認の上、アカウントを有効化してください。
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/login" className={styles.loginButton}>
              ログインページへ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupSuccess;