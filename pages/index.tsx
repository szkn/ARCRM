import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeScreen from '../components/HomeScreen';
import CompanyList from '../components/CompanyList';
import SalesMessageTool from '../components/SalesMessageTool';
import EmailTool from '../components/EmailTool';
import ContactForm from '../components/ContactForm';
import { userPool } from '../lib/cognitoConfig';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
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
    { id: 'home', label: 'ホーム' },
    { id: 'contact', label: 'お問合せフォーム' },
    { id: 'companies', label: '会社情報一覧' },
    { id: 'sales-message', label: '営業文面作成ツール' },
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
    <div className="flex flex-col min-h-screen bg-gray-100 m-0 p-0 rounded-3xl overflow-hidden">
      <header className="bg-arc-primary text-white py-4 px-8 flex justify-between items-center shadow-md w-full box-border">
        <h1 className="text-2xl font-bold m-0">ARC. Former</h1>
        <div className="flex items-center">
          <span>{username}</span>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="ml-2.5 text-sm !bg-white !text-blue-500 !border-blue-500 hover:!bg-blue-100"
          >
            ログアウト
          </Button>
        </div>
      </header>
      <div className="flex flex-1 w-full overflow-hidden">
        <nav className="w-50 bg-arc-primary-dark p-5 flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2.5 mb-2.5 text-white border-none text-left cursor-pointer transition duration-300 w-full ${
                activeTab === tab.id ? 'bg-blue-700' : 'bg-transparent hover:bg-blue-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="flex-1 p-8 bg-white shadow-md overflow-y-auto">
          {activeTab === 'home' && <HomeScreen username={username} />}
          {activeTab === 'contact' && <ContactForm />}
          {activeTab === 'companies' && <CompanyList />}
          {activeTab === 'sales-message' && <SalesMessageTool />}
          {/* {activeTab === 'email' && <EmailTool />} */}
        </main>
      </div>
    </div>
  );
};

export default Home;