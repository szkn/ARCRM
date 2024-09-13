import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import styles from '../styles/Home.module.css';
import CompanyList from '../components/CompanyList';
import EmailTool from '../components/EmailTool';
import ContactForm from '../components/ContactForm';
import { userPool } from '../lib/cognitoConfig';

const Home = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            router.push('/login');
          } else if (session.isValid()) {
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                console.error(err);
              } else {
                const emailAttribute = attributes?.find(attr => attr.Name === 'email');
                setUsername(emailAttribute?.Value || 'メールアドレス不明');
              }
            });
          }
        });
      } else {
        router.push('/login');
      }
    };
    checkAuth();
  }, []);

  const tabs = [
    { id: 'contact', label: 'お問合せフォーム' },
    { id: 'companies', label: '会社情報一覧' },
    // { id: 'email', label: 'メール自動送信ツール' },
  ];

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    router.push('/login');
  };

    // 認証されていない場合は何も表示しない
    if (!username) {
      return null;
    }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ARC. Former</h1>
        <div className={styles.userInfo}>
          <span>{username}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>ログアウト</button>
        </div>
      </header>
      <div className={styles.content}>
        <nav className={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className={styles.mainContent}>
          {activeTab === 'companies' && <CompanyList />}
          {activeTab === 'email' && <EmailTool />}
          {activeTab === 'contact' && <ContactForm />}
        </main>
      </div>
    </div>
  );
};

export default Home;