import { useState, FormEvent, useEffect } from 'react';
import Input from './common/Input';
import Button from './common/Button';

const ContactForm = () => {
  const [domains, setDomains] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [nameFirst, setNameFirst] = useState('');
  const [nameKanaLast, setNameKanaLast] = useState('');
  const [nameKanaFirst, setNameKanaFirst] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [postalCode1, setPostalCode1] = useState('');
  const [postalCode2, setPostalCode2] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [salesMessage, setSalesMessage] = useState('');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setProgress(0);

      const domainList = domains.split('\n').filter(d => d.trim() !== '');
      
      try {
          // 通知を送信
          await sendNotification();

          // 送信完了を設定
          setIsSubmitted(true);
          // アラートを表示
          alert('送信が完了しました！');
      } catch (err) {
        if (err instanceof Error) {
          setError(`通知の送信中にエラーが発生しました: ${err.message}`);
        } else {
          setError('通知の送信中に予期せぬエラーが発生しました。');
        }
      }
    };

  const sendNotification = async () => {
    try {
      console.log('通知を送信中...');
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains,
          nameLast,
          nameFirst,
          nameKanaLast,
          nameKanaFirst,
          email,
          subject,
          company,
          title,
          department,
          phone: `${phone1}-${phone2}-${phone3}`,
          postalCode: `${postalCode1}-${postalCode2}`,
          message,
        }),
      });
      
      const responseText = await response.text();
      console.log('APIの応答:', response.status, responseText);

      if (!response.ok) {
        throw new Error(`通知の送信に失敗しました: ${response.status} ${responseText}`);
      }
      
      const data = JSON.parse(responseText);
      console.log('通知送信成功:', data);
    } catch (error) {
      console.error('通知エラー:', error);
      throw error;
    }
  };

  const sendForm = async (domain: string) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          nameLast,
          nameFirst,
          nameKanaLast,
          nameKanaFirst,
          email,
          subject,
          company,
          title,
          department,
          phone: `${phone1}-${phone2}-${phone3}`,
          postalCode: `${postalCode1}-${postalCode2}`,
          message,
        }),
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  // ローカルストレージから状態を読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('contactFormState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setDomains(parsedState.domains || '');
      setNameLast(parsedState.nameLast || '');
      setNameFirst(parsedState.nameFirst || '');
      setNameKanaLast(parsedState.nameKanaLast || '');
      setNameKanaFirst(parsedState.nameKanaFirst || '');
      setEmail(parsedState.email || '');
      setSubject(parsedState.subject || '');
      setCompany(parsedState.company || '');
      setTitle(parsedState.title || '');
      setDepartment(parsedState.department || '');
      setPhone1(parsedState.phone1 || '');
      setPhone2(parsedState.phone2 || '');
      setPhone3(parsedState.phone3 || '');
      setPostalCode1(parsedState.postalCode1 || '');
      setPostalCode2(parsedState.postalCode2 || '');
      setMessage(parsedState.message || '');
    }

    // SalesMessageToolの状態を読み込む
    const savedSalesMessageState = localStorage.getItem('salesMessageToolState');
    if (savedSalesMessageState) {
      const parsedSalesMessageState = JSON.parse(savedSalesMessageState);
      setSalesMessage(parsedSalesMessageState.editableMessage || '');
    }
  }, []);

  // 状態が変更されたらローカルストレージに保存
  useEffect(() => {
    const stateToSave = {
      domains,
      nameLast,
      nameFirst,
      nameKanaLast,
      nameKanaFirst,
      email,
      subject,
      company,
      title,
      department,
      phone1,
      phone2,
      phone3,
      postalCode1,
      postalCode2,
      message,
    };
    localStorage.setItem('contactFormState', JSON.stringify(stateToSave));
  }, [domains, nameLast, nameFirst, nameKanaLast, nameKanaFirst, email, subject, company, title, department, phone1, phone2, phone3, postalCode1, postalCode2, message]);

      // 営業文面を取り込む関数
  const importSalesMessage = () => {
    setMessage(salesMessage);
  };
  
  return (
    <div className="flex gap-8 max-w-6xl mx-auto">
      <div className="w-1/2">
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">ARC. Former</h2>
          <div className="mb-4">
            <label htmlFor="domains" className="block mb-2 font-medium text-gray-700">ドメイン（改行で複数指定可）</label>
            <textarea
              id="domains"
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label htmlFor="name_last" className="block mb-2 font-medium text-gray-700">姓</label>
              <input
                type="text"
                id="name_last"
                value={nameLast}
                onChange={(e) => setNameLast(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="name_first" className="block mb-2 font-medium text-gray-700">名</label>
              <input
                type="text"
                id="name_first"
                value={nameFirst}
                onChange={(e) => setNameFirst(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label htmlFor="name_kana_last" className="block mb-2 font-medium text-gray-700">姓（フリガナ）</label>
              <input
                type="text"
                id="name_kana_last"
                value={nameKanaLast}
                onChange={(e) => setNameKanaLast(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="name_kana_first" className="block mb-2 font-medium text-gray-700">名（フリガナ）</label>
              <input
                type="text"
                id="name_kana_first"
                value={nameKanaFirst}
                onChange={(e) => setNameKanaFirst(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">件名</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block mb-2 font-medium text-gray-700">会社名</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-medium text-gray-700">役職</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block mb-2 font-medium text-gray-700">部署</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">電話番号</label>
            <div className="flex space-x-2">
              <input
                type="tel"
                id="phone1"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                maxLength={4}
                className="w-1/3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <span className="self-center">-</span>
              <input
                type="tel"
                id="phone2"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                maxLength={5}
                className="w-1/3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <span className="self-center">-</span>
              <input
                type="tel"
                id="phone3"
                value={phone3}
                onChange={(e) => setPhone3(e.target.value)}
                maxLength={5}
                className="w-1/3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="postcode" className="block mb-2 font-medium text-gray-700">郵便番号</label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="postcode1"
                value={postalCode1}
                onChange={(e) => setPostalCode1(e.target.value)}
                maxLength={3}
                className="w-1/3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <span className="self-center">-</span>
              <input
                type="text"
                id="postcode2"
                value={postalCode2}
                onChange={(e) => setPostalCode2(e.target.value)}
                maxLength={4}
                className="w-2/3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">メッセージ</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-40 resize-y px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">実行</button>
          {isSubmitted && (
            <p className="mt-4 text-green-600 font-medium">送信が完了しました。</p>
          )}
          {progress > 0 && (
            <div className="mt-4 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{width: `${progress}%`}}
                role="progressbar" 
                aria-valuenow={progress} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
          )}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </form>
      </div>
      <div className="w-1/2">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">生成された営業文面</h4>
          <div
            className="w-full p-4 border rounded bg-gray-50 text-gray-700 whitespace-pre-wrap"
          >
            {salesMessage}
          </div>
        </div>
        <Button onClick={importSalesMessage} type="button" className="mt-4">
          営業文面を取り込む
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;