import { useState } from 'react';
import styles from '../styles/Home.module.css';
import CompanyList from '../components/CompanyList';
import EmailTool from '../components/EmailTool';
import ContactForm from '../components/ContactForm';

const Home = () => {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <div className={styles.container}>
      <h1>CRMシステム</h1>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${activeTab === 'companies' ? styles.active : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          会社情報一覧
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'email' ? styles.active : ''}`}
          onClick={() => setActiveTab('email')}
        >
          メール自動送信ツール
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'contact' ? styles.active : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          お問合せフォーム自動送信ツール
        </div>
      </div>
      <div className={styles.content}>
        {activeTab === 'companies' && <CompanyList />}
        {activeTab === 'email' && <EmailTool />}
        {activeTab === 'contact' && <ContactForm />}
      </div>
    </div>
  );
};

export default Home;